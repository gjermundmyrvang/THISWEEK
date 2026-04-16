import { Day, Task, TasksByDate } from "@/types";
import { getKey, getNext7Days } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type TaskContextType = {
  days: Day[];
  tasksByDate: TasksByDate;
  addTask: (date: Date, text: string) => void;
  toggleTask: (date: Date, taskId: string) => void;
  deleteTask: (date: Date, taskId: string) => void;
  refresh: () => Promise<void>;
};

const TaskContext = createContext<TaskContextType | null>(null);

function cleanPastDays(data: TasksByDate): TasksByDate {
  const todayKey = getKey(new Date());
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => key >= todayKey),
  );
}

export function TaskProvider({ children }: React.PropsWithChildren) {
  const [days, setDays] = useState<Day[]>(getNext7Days() ?? []);
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  // Load Tasks
  const load = async () => {
    setDays(getNext7Days());
    const data = await AsyncStorage.getItem("tasks");
    const parsed: TasksByDate = data ? JSON.parse(data) : {};
    const cleaned = cleanPastDays(parsed);
    setTasksByDate(cleaned);
    await AsyncStorage.setItem("tasks", JSON.stringify(cleaned));
  };

  useEffect(() => {
    // Trigger load on mount
    load();
  }, []);

  const addTask = async (date: Date, text: string) => {
    if (!text.trim()) return;
    const key = getKey(date);
    const newTask: Task = { id: Date.now().toString(), text, done: false };
    const updated = {
      ...tasksByDate,
      [key]: [...(tasksByDate[key] || []), newTask],
    };
    setTasksByDate(updated);
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));
  };

  const toggleTask = async (date: Date, taskId: string) => {
    const key = getKey(date);
    const updated = {
      ...tasksByDate,
      [key]: tasksByDate[key].map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t,
      ),
    };
    setTasksByDate(updated);
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));
  };

  const deleteTask = async (date: Date, taskId: string) => {
    const key = getKey(date);
    const updated = {
      ...tasksByDate,
      [key]: tasksByDate[key].filter((t) => t.id !== taskId),
    };
    setTasksByDate(updated);
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <TaskContext.Provider
      value={{
        days,
        tasksByDate,
        addTask,
        toggleTask,
        deleteTask,
        refresh: load,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
