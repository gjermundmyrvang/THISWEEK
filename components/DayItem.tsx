import { useTheme } from "@/providers/ThemeProvider";
import { Day, Task } from "@/types";
import { formatDate } from "@/utils";
import * as Haptics from "expo-haptics";
import { Pressable, Text, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import TaskContent from "./TaskContent";
import TaskInput from "./TaskInput";
import Accordion from "./ui/Accordion";

type Props = {
  day: Day;
  index: number;
  isOpen: boolean;
  isToday: boolean;
  tasks: Task[];
  onToggleOpen: () => void;
  toggleTask: (date: Date, id: string) => void;
  deleteTask: (date: Date, id: string) => void;
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
  deleteTask,
  addTask,
}: Props) {
  const theme = useTheme();

  const hasTasks = tasks.length > 0;
  const allDone = hasTasks && tasks.every((t) => t.done);

  const expanded = useDerivedValue(() => isOpen);

  return (
    <View
      style={{
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
          onToggleOpen();
          Haptics.selectionAsync();
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
      <Accordion isExpanded={expanded} viewKey="accordion">
        <Text
          style={{ fontFamily: "DMSans_500Medium", color: theme.labelText }}
        >
          {formatDate(day.date)}
        </Text>

        <TaskContent
          tasks={tasks}
          date={day.date}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

        <TaskInput onAdd={(text) => addTask(day.date, text)} />
      </Accordion>
    </View>
  );
}
