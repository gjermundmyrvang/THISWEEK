import { TaskProvider } from "@/providers/TaskProvider";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";
import {
  Goldman_400Regular,
  Goldman_700Bold,
} from "@expo-google-fonts/goldman";
import { useFonts } from "expo-font";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function RootApp() {
  const theme = useTheme();
  const [loaded, error] = useFonts({
    Goldman_400Regular,
    Goldman_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      />
      <Stack.Screen
        name="temp-notes"
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : theme.background,
          },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <KeyboardProvider>
          <RootApp />
        </KeyboardProvider>
      </ThemeProvider>
    </TaskProvider>
  );
}
