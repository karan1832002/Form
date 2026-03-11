import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="employee"
        options={{ title: "Employee Form" }}
      />
      <Stack.Screen
        name="signin"
        options={{ title: "Sign In" }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up" }}
      />
    </Stack>
  );
}