import { useEffect, useRef } from "react";
import { Animated, type ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  duration?: number;
  children: React.ReactNode;
};

export default function FadeInView({ style, duration = 300, children }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration, opacity]);

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}
