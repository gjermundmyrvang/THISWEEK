import { useTheme } from "@/providers/ThemeProvider";
import { Task } from "@/types";
import { formatDate } from "@/utils";
import * as Haptics from "expo-haptics";
import { LayoutAnimation, Pressable, Text, View } from "react-native";
import TaskContent from "./TaskContent";
import TaskInput from "./TaskInput";
import FadeInView from "./ui/FadeInView";

type Props = {
  day: { date: Date; label: string };
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

  return (
    <View
      style={{
        width: "100%",
        maxWidth: 680, // For WEB Apps
        alignSelf: "center",
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
      {isOpen && (
        <FadeInView duration={500} style={{ marginTop: 10, gap: 10 }}>
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
        </FadeInView>
      )}
    </View>
  );
}
