import { StyleSheet, Text, View } from "react-native";
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

export function LiveCaptions() {
  const { useCallClosedCaptions } = useCallStateHooks();
  const captions = useCallClosedCaptions();

  if (captions.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {captions.map(({ user, start_time, text }) => (
        <View key={`${user.id}/${start_time}`} style={styles.row}>
          <Text
            className="font-poppins-semibold text-[12px]"
            style={{ color: "#A78BFA" }}
          >
            {user.name}:{" "}
          </Text>
          <Text
            className="font-poppins-regular text-[13px]"
            style={{ color: "#FFFFFF", flexShrink: 1 }}
          >
            {text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 110,
    left: 14,
    right: 14,
    gap: 6,
  },
  row: {
    backgroundColor: "rgba(0, 0, 0, 0.62)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
