import { useTheme } from "@/providers/ThemeProvider";
import { Task } from "@/types";
import { formatDate } from "@/utils";
import { LayoutAnimation, Pressable, Text, View } from "react-native";
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
  const theme = useTheme();

  const hasTasks = tasks.length > 0;
  const allDone = hasTasks && tasks.every((t) => t.done);

  return (
    <View
      style={{
        width: "100%",
        borderBottomWidth: index === 6 ? 0 : 1,
        borderColor: theme.border,
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
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onToggleOpen();
        }}
      >
        <Text
          style={{
            fontFamily: "Goldman_700Bold",
            fontSize: 40,
            letterSpacing: 2,
            color: theme.titleText,
          }}
        >
          {isToday ? "TODAY" : day.label}
        </Text>
      </Pressable>
      {isOpen && (
        <View style={{ marginTop: 10, gap: 10 }}>
          <Text style={{ color: theme.labelText }}>{formatDate(day.date)}</Text>

          <TaskContent tasks={tasks} date={day.date} toggleTask={toggleTask} />

          <TaskInput onAdd={(text) => addTask(day.date, text)} />
        </View>
      )}
    </View>
  );
}
