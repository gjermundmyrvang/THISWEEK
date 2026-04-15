import DayItem from "@/components/DayItem";
import { useTasks } from "@/providers/TaskProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { getKey, getNext7Days } from "@/utils";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const days = getNext7Days();

  const { tasksByDate, toggleTask, deleteTask, addTask, refresh } = useTasks();
  const theme = useTheme();

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior="padding"
    >
      <FlatList
        data={days}
        keyExtractor={(item) => item.label}
        extraData={{ openIndex, tasksByDate }}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor="#ff7a00"
          />
        }
        renderItem={({ item, index }) => {
          const tasks = tasksByDate[getKey(item.date)] || [];

          return (
            <DayItem
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
        }}
      />
    </KeyboardAvoidingView>
  );
}
