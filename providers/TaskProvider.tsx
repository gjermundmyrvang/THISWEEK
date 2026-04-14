import { Task, TasksByDate } from "@/types";
import { getKey } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type TaskContextType = {
  tasksByDate: TasksByDate;
  addTask: (date: Date, text: string) => void;
  toggleTask: (date: Date, taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  // load
  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("tasks");
      if (data) setTasksByDate(JSON.parse(data));
    };
    load();
  }, []);

  // save
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  const addTask = (date: Date, text: string) => {
    if (!text.trim()) return;

    const key = getKey(date);

    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
    };

    setTasksByDate((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newTask],
    }));
  };

  const toggleTask = (date: Date, taskId: string) => {
    const key = getKey(date);

    setTasksByDate((prev) => ({
      ...prev,
      [key]: prev[key].map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t,
      ),
    }));
  };

  return (
    <TaskContext.Provider value={{ tasksByDate, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
