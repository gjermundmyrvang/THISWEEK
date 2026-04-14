import DayItem from "@/components/DayItem";
import { useTasks } from "@/providers/TaskProvider";
import { getKey, getNext7Days } from "@/utils";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const days = getNext7Days();
  const { tasksByDate, toggleTask, addTask } = useTasks();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <FlatList
        data={days}
        keyExtractor={(item) => item.label}
        extraData={{ openIndex, tasksByDate }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
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
              onToggleOpen={() => handleToggle(index)}
              addTask={addTask}
            />
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}
