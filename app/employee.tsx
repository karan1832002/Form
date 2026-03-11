import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { z } from "zod";

// ─── Zod Schema ─────────────────────────────────────────────
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
      "Enter a valid Canadian postal code (e.g. T2P 1J9)",
    ),

  department: z
    .string()
    .min(1, "Department is required")
    .max(30, "Department must be at most 30 characters"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

// ─── Component ──────────────────────────────────────────────
export default function EmployeeScreen() {
  const { control, handleSubmit } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      postalCode: "",
      department: "",
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <ScrollView style={{ padding: 24 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Employee Information
      </Text>

      <Text>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="John Doe"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="john@example.com"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="4031234567"
            keyboardType="phone-pad"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Postal Code</Text>
      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="T2P 1J9"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Department</Text>
      <Controller
        control={control}
        name="department"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Engineering"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
