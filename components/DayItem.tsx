import { Task } from "@/types";
import { formatDate, smoothLayoutAnimation } from "@/utils";
import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import TaskContent from "./TaskContent";
import TaskInput from "./TaskInput";

type Props = {
  day: { date: Date; label: string };
  index: number;
  isOpen: boolean;
  isToday: boolean;
  tasks: Task[];
  onToggleOpen: () => void;
  toggleTask: (date: Date, id: string) => void;
  addTask: (date: Date, text: string) => void;
};

export default function DayItem({
  day,
  index,
  isOpen,
  isToday,
  tasks,
  onToggleOpen,
  toggleTask,
  addTask,
}: Props) {
  const hasTasks = tasks.length > 0;
  const allDone = hasTasks && tasks.every((t) => t.done);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        LayoutAnimation.configureNext(smoothLayoutAnimation);
        onToggleOpen();
      }}
      style={{
        width: "100%",
        borderBottomWidth: index === 6 ? 0 : 1,
        borderColor: "#a1a1a1",
        padding: 28,
        position: "relative",
      }}
    >
      {hasTasks && (
        <View
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: allDone ? "#0fbe38" : "#ff7a00",
          }}
        />
      )}

      <Text
        style={{
          fontFamily: "Goldman_700Bold",
          fontSize: 40,
          letterSpacing: 2,
          color: "#1e1e1e",
        }}
      >
        {isToday ? "TODAY" : day.label}
      </Text>

      {isOpen && (
        <View style={{ marginTop: 10, gap: 10 }}>
          <Text style={{ color: "#4c4c4c" }}>{formatDate(day.date)}</Text>

          <TaskContent tasks={tasks} date={day.date} toggleTask={toggleTask} />

          <TaskInput onAdd={(text) => addTask(day.date, text)} />
        </View>
      )}
    </TouchableOpacity>
  );
}
