import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
}: Props) {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      setCode("");
      setError(null);
      setVerifying(false);
    }
  }, [visible]);

  const submit = async (value: string) => {
    setVerifying(true);
    setError(null);
    try {
      await onVerify(value);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid code. Please try again.";
      setError(message);
      setCode("");
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (text: string) => {
    if (verifying) return;
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);
    if (error) setError(null);
    if (digits.length === 6) {
      submit(digits);
    }
  };

  const handleResend = async () => {
    if (verifying) return;
    setCode("");
    setError(null);
    try {
      await onResend();
    } catch {
      setError("Could not resend the code. Please try again.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Check your email 📧</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            <Text style={styles.emailText}>{email || "your email"}</Text>
          </Text>

          {/* OTP digit boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.otpWrapper}
          >
            <View style={styles.otpRow}>
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.otpBox,
                    code.length === i && styles.otpBoxActive,
                    code.length > i && styles.otpBoxFilled,
                    !!error && styles.otpBoxError,
                  ]}
                >
                  <Text style={styles.otpDigit}>{code[i] ?? ""}</Text>
                </View>
              ))}
            </View>

            {/* Hidden input that captures number-pad input */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={6}
              caretHidden
              autoFocus
              editable={!verifying}
              style={styles.hiddenInput}
            />
          </TouchableOpacity>

          {verifying ? (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color="#6C4EF5" />
              <Text style={styles.statusText}>Verifying…</Text>
            </View>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleResend}
            disabled={verifying}
            style={styles.resendBtn}
          >
            <Text style={styles.resendText}>
              Didn&apos;t receive it?{" "}
              <Text style={styles.resendAction}>Resend code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#001132",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emailText: {
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
  otpWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 28,
  },
  otpRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  otpBox: {
    width: 48,
    height: 58,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F7FB",
  },
  otpBoxActive: {
    borderColor: "#6C4EF5",
    backgroundColor: "#ffffff",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  otpBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#ffffff",
  },
  otpBoxError: {
    borderColor: "#FF4D4F",
  },
  otpDigit: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#001132",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#FF4D4F",
    textAlign: "center",
    marginBottom: 16,
  },
  resendBtn: {
    paddingVertical: 4,
  },
  resendText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
  },
  resendAction: {
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
  },
});
