import DayItem from "@/components/DayItem";
import { useTasks } from "@/providers/TaskProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { getKey } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, RefreshControl, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Index() {
  const { days, tasksByDate, toggleTask, deleteTask, addTask, refresh } =
    useTasks();
  const theme = useTheme();
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleToggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
  };

  return (
    <View
      style={{ flex: 1, maxWidth: 680, alignSelf: "center", width: "100%" }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        bottomOffset={40}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {days.map((item, index) => {
          const tasks = tasksByDate[getKey(item.date)] || [];
          return (
            <DayItem
              key={item.label}
              day={item}
              index={index}
              isOpen={openIndex === index}
              isToday={index === 0}
              tasks={tasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              onToggleOpen={() => handleToggle(index)}
              addTask={addTask}
            />
          );
        })}
      </KeyboardAwareScrollView>

      <GlassView
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isLiquidGlassAvailable()
            ? "transparent"
            : theme.placeholderText,
        }}
      >
        <Pressable onPress={() => router.push("/temp-notes")}>
          <Ionicons
            name="document-text-outline"
            size={22}
            color={theme.titleText}
          />
        </Pressable>
      </GlassView>
    </View>
  );
}
