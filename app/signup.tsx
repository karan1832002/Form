import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";

/* ─────────────── ⋆⋅☆ Zod Schema ☆⋅⋆ ─────────────── */

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

/* ─────────────── ⋆⋅☆ Components ☆⋅⋆ ─────────────── */

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign Up:", data);
    alert("Account created successfully!");
    reset();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Create Account</Text>
          <Text style={styles.title}>Sign Up</Text>

          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your name"
                style={[styles.input, errors.name && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                style={[styles.input, errors.password && styles.inputError]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Confirm password"
                secureTextEntry
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <Pressable
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


/* ─────────────── ⋆⋅☆ Styles ☆⋅⋆ ─────────────── */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5f5",
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});