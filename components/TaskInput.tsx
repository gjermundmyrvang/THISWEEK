import { useState } from "react";
import { Keyboard, TextInput, View } from "react-native";

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  return (
    <View style={{ marginTop: 20 }}>
      <TextInput
        placeholder="Add new task..."
        value={value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={() => {
          if (!value.trim()) return;
          onAdd(value);
          setValue("");
          Keyboard.dismiss();
        }}
        style={{
          color: "#4c4c4c",
          width: "100%",
          paddingVertical: 8,
        }}
      />
    </View>
  );
}
