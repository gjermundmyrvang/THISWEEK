import { TaskProvider } from "@/providers/TaskProvider";
import {
  Goldman_400Regular,
  Goldman_700Bold,
  useFonts,
} from "@expo-google-fonts/goldman";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

function RootApp() {
  const [loaded, error] = useFonts({
    Goldman_400Regular,
    Goldman_700Bold,
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
      <RootApp />
    </TaskProvider>
  );
}
