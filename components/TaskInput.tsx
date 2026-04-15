import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { Keyboard, Platform, TextInput } from "react-native";

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const theme = useTheme();

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false); // Need this for the WEB app

  return (
    <TextInput
      placeholder={focused ? "" : "New Item..."}
      value={value}
      onChangeText={setValue}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputMode="text"
      returnKeyType="done"
      onSubmitEditing={() => {
        if (!value.trim()) return;
        onAdd(value);
        setValue("");
        Keyboard.dismiss();
      }}
      style={{
        fontFamily: "DMSans_400Regular",
        color: theme.labelText,
        width: "100%",
        paddingVertical: 32,
        ...Platform.select({
          web: { outline: "none" },
        }),
      }}
      placeholderTextColor={theme.placeholderText}
      selectionColor={"#ff7a00"}
    />
  );
}
