import { TaskProvider } from "@/providers/TaskProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";
import {
  Goldman_400Regular,
  Goldman_700Bold,
} from "@expo-google-fonts/goldman";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function RootApp() {
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

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <RootApp />
      </ThemeProvider>
    </TaskProvider>
  );
}
