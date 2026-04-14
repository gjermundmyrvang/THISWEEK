import { useTheme } from "@/providers/ThemeProvider";
import { Task } from "@/types";
import { Checkbox } from "expo-checkbox";
import * as Haptics from "expo-haptics";
import { Text, View } from "react-native";

type TaskContentProps = {
  tasks: Task[];
  date: Date;
  toggleTask: (d: Date, id: string) => void;
};

export default function TaskContent({
  tasks,
  date,
  toggleTask,
}: TaskContentProps) {
  const theme = useTheme();

  if (tasks.length === 0)
    return (
      <Text
        style={{
          fontFamily: "Goldman_400Regular",
          fontSize: 12,
          color: theme.placeholderText,
        }}
      >
        No task yet
      </Text>
    );

  return (
    <View>
      {tasks.map((t) => (
        <View
          key={t.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
          }}
        >
          <Checkbox
            value={t.done}
            onValueChange={() => {
              toggleTask(date, t.id);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }}
            color={t.done ? "#ff6a00" : undefined}
            style={{
              width: 22,
              height: 22,
              borderColor: theme.border,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: theme.labelText,
              textDecorationLine: t.done ? "line-through" : "none",
            }}
          >
            {t.text}
          </Text>
        </View>
      ))}
    </View>
  );
}
