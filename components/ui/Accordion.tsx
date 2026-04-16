import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  DerivedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AccordionProps = {
  isExpanded: DerivedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

export default function Accordion({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: AccordionProps) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
    overflow: "hidden",
  }));

  return (
    <Animated.View key={`accordionItem_${viewKey}`} style={[bodyStyle, style]}>
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={{ position: "absolute", width: "100%" }}
      >
        {children}
      </View>
    </Animated.View>
  );
}
