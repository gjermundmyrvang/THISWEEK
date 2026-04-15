import { useTheme } from "@/providers/ThemeProvider";
import { Task } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Checkbox } from "expo-checkbox";
import * as Haptics from "expo-haptics";
import { Platform, Pressable, Text, View } from "react-native";

type TaskContentProps = {
  tasks: Task[];
  date: Date;
  toggleTask: (d: Date, id: string) => void;
  deleteTask: (d: Date, id: string) => void;
};

export default function TaskContent({
  tasks,
  date,
  toggleTask,
  deleteTask,
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
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              flexShrink: 1,
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
                flexShrink: 1,
                ...Platform.select({ web: { wordBreak: "break-word" } }),
              }}
            >
              {t.text}
            </Text>
          </View>
          <Pressable onPress={() => deleteTask(date, t.id)}>
            <Ionicons name="trash-outline" color={theme.labelText} size={20} />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
