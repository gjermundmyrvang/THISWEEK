import { useState } from "react";
import { Keyboard, Platform, TextInput } from "react-native";

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false); // Need this for the WEB app

  return (
    <TextInput
      placeholder={focused ? "" : "New Item..."}
      value={value}
      onChangeText={setValue}
      onFocus={() => setFocused(true)}
      returnKeyType="done"
      onSubmitEditing={() => {
        if (!value.trim()) return;
        onAdd(value);
        setValue("");
        setFocused(false);
        Keyboard.dismiss();
      }}
      style={{
        color: "#4c4c4c",
        width: "100%",
        marginTop: 16,
        paddingVertical: 16,
        ...Platform.select({
          web: { outline: "none" },
        }),
      }}
      placeholderTextColor="#999999"
      selectionColor={"#ff7a00"}
    />
  );
}
