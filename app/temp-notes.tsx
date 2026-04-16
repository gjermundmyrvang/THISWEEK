import TaskContent from "@/components/TaskContent";
import TaskInput from "@/components/TaskInput";
import { Task } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const STORAGE_KEY = "temp";

export default function TempNotes() {
  const [notes, setNotes] = useState<Task[]>([]);

  const load = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: Task[] = data ? JSON.parse(data) : [];
    setNotes(parsed);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (updated: Task[]) => {
    setNotes(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addNote = async (text: string) => {
    const newNote: Task = { id: Date.now().toString(), text, done: false };
    await save([...notes, newNote]);
  };

  const toggleNote = async (id: string) => {
    await save(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)));
  };

  const deleteNote = async (id: string) => {
    await save(notes.filter((n) => n.id !== id));
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, padding: 16 }} bottomOffset={40}>
      <TaskContent
        date={new Date()}
        tasks={notes}
        toggleTask={(_, id) => toggleNote(id)}
        deleteTask={(_, id) => deleteNote(id)}
      />
      <TaskInput onAdd={addNote} />
    </KeyboardAwareScrollView>
  );
}
