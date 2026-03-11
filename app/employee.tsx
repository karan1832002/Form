import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

/* ─────────────── Zod Schema ─────────────── */

const employeeSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(
      /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
      "Enter a valid Canadian postal code (e.g. T2P 1J9)"
    ),

  department: z
    .string()
    .min(1, "Department is required")
    .max(30, "Department must be at most 30 characters"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

/* ─────────────── Component ─────────────── */

export default function EmployeeScreen() {
  const params = useLocalSearchParams<{ name?: string; email?: string }>();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: params.name ?? "",
      email: params.email ?? "",
      phone: "",
      postalCode: "",
      department: "",
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    Alert.alert("Success", `Employee ${data.fullName} submitted!`);
    console.log(data);
    reset();
  };

  const getInputStyle = (fieldName: string, hasError: boolean) => [
    styles.input,
    focusedField === fieldName && styles.inputFocused,
    hasError && styles.inputError,
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.subtitle}>Employee Details</Text>
            <Text style={styles.title}>Employee Information</Text>

            {/* Full Name */}
            <View style={styles.labelRow}>
              <Ionicons name="person-outline" size={16} color="#334155" />
              <Text style={styles.label}>Full Name</Text>
            </View>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="John Doe"
                  placeholderTextColor="#94a3b8"
                  style={getInputStyle("fullName", !!errors.fullName)}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.error}>{errors.fullName.message}</Text>
            )}

            {/* Email */}
            <View style={styles.labelRow}>
              <Ionicons name="mail-outline" size={16} color="#334155" />
              <Text style={styles.label}>Email</Text>
            </View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="john@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={getInputStyle("email", !!errors.email)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            {/* Phone */}
            <View style={styles.labelRow}>
              <Ionicons name="call-outline" size={16} color="#334155" />
              <Text style={styles.label}>Phone Number</Text>
            </View>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="4031234567"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  style={getInputStyle("phone", !!errors.phone)}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}

            {/* Postal Code */}
            <View style={styles.labelRow}>
              <Ionicons name="location-outline" size={16} color="#334155" />
              <Text style={styles.label}>Postal Code</Text>
            </View>
            <Controller
              control={control}
              name="postalCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="T2P 1J9"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="characters"
                  style={getInputStyle("postalCode", !!errors.postalCode)}
                  onFocus={() => setFocusedField("postalCode")}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.postalCode && (
              <Text style={styles.error}>{errors.postalCode.message}</Text>
            )}

            {/* Department */}
            <View style={styles.labelRow}>
              <Ionicons name="briefcase-outline" size={16} color="#334155" />
              <Text style={styles.label}>Department</Text>
            </View>
            <Controller
              control={control}
              name="department"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Engineering"
                  placeholderTextColor="#94a3b8"
                  style={getInputStyle("department", !!errors.department)}
                  onFocus={() => setFocusedField("department")}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.department && (
              <Text style={styles.error}>{errors.department.message}</Text>
            )}

            {/* Submit */}
            <Pressable
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─────────────── Styles ─────────────── */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eaf2ff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#0f172a",
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#f8fafc",
    fontSize: 15,
    color: "#0f172a",
  },
  inputFocused: {
    borderColor: "#2563eb",
    borderWidth: 2,
  },
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  error: {
    color: "#dc2626",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
