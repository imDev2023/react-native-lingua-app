import { Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabConfig {
  name: string;
  title: string;
  activeIcon: IoniconName;
  inactiveIcon: IoniconName;
}

const TABS: TabConfig[] = [
  { name: "index", title: "Home", activeIcon: "home", inactiveIcon: "home-outline" },
  { name: "learn", title: "Learn", activeIcon: "book", inactiveIcon: "book-outline" },
  { name: "ai-teacher", title: "AI Teacher", activeIcon: "hardware-chip", inactiveIcon: "hardware-chip-outline" },
  { name: "chat", title: "Chat", activeIcon: "chatbubble", inactiveIcon: "chatbubble-outline" },
  { name: "profile", title: "Profile", activeIcon: "person", inactiveIcon: "person-outline" },
];

const CIRCLE_SIZE = 48;
const TAB_HEIGHT = 64;
const PURPLE = "#6C4EF5";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);
  const circleX = useRef(new Animated.Value(0)).current;
  const initialised = useRef(false);

  useEffect(() => {
    if (tabWidth === 0) return;
    const toX = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
    if (!initialised.current) {
      circleX.setValue(toX);
      initialised.current = true;
      return;
    }
    Animated.spring(circleX, {
      toValue: toX,
      useNativeDriver: true,
      damping: 18,
      mass: 1,
      stiffness: 200,
    }).start();
  }, [state.index, tabWidth]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const totalWidth = e.nativeEvent.layout.width;
    const tw = totalWidth / TABS.length;
    setTabWidth(tw);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Sliding circle indicator — rendered first so it sits behind the icons */}
      {tabWidth > 0 && (
        <Animated.View
          style={[styles.circle, { transform: [{ translateX: circleX }] }]}
        />
      )}

      {/* Tab row */}
      <View style={styles.tabsRow} onLayout={handleLayout}>
        {state.routes.map((route, index) => {
          const tab = TABS.find((t) => t.name === route.name) ?? TABS[0];
          const isActive = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title ?? tab.title;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              activeOpacity={0.8}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.inactiveIcon}
                size={22}
                color={isActive ? "#FFFFFF" : "#9CA3AF"}
              />
              {!isActive && <Text style={styles.label}>{label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  circle: {
    position: "absolute",
    top: (TAB_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: PURPLE,
    zIndex: 0,
  },
  tabsRow: {
    flexDirection: "row",
    height: TAB_HEIGHT,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#9CA3AF",
  },
});
