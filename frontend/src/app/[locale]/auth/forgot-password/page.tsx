"use client";
import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Button,
  LoadingOverlay,
  TextInput,
  Alert,
  PasswordInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCheck,
  IconAlertCircle,
  IconMail,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import {
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from "@/app/services/auth";
import { useRouter } from "@/i18n/routing";

enum ForgotPasswordStep {
  EMAIL,
  OTP,
  NEW_PASSWORD,
}

// Zod schemas
const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

const passwordSchema = z
  .object({
    newPassword: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.EMAIL);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const [forgotPassword, { isLoading: isSendingEmail }] = useForgotPasswordMutation();
  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    getValues,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const handleSendEmail = async (values: z.infer<typeof emailSchema>) => {
    setError("");
    try {
      await forgotPassword(values.email).unwrap();
      setEmail(values.email);
      setStep(ForgotPasswordStep.OTP);
      notifications.show({
        title: "Email Sent",
        message: "Check your email for the OTP code",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    } catch (err: any) {
      setError(err.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyCode = async (values: z.infer<typeof otpSchema>) => {
    setError("");
    try {
      await verifyCode({ email, otp: values.code }).unwrap();
      setStep(ForgotPasswordStep.NEW_PASSWORD);
      setCode(values.code);
      notifications.show({
        title: "OTP Verified",
        message: "You can now reset your password",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    } catch (err: any) {
      setError(err.data?.message || "Invalid OTP code. Please try again.");
    }
  };

  const handleResetPassword = async (values: z.infer<typeof passwordSchema>) => {
    setError("");
    try {
      await resetPassword({
        email: email,
        otp: code,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      }).unwrap();

      notifications.show({
        title: "Password Reset",
        message: "Your password has been updated successfully",
        color: "green",
        icon: <IconCheck size={18} />,
      });

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.data?.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <Container size="xs" className="w-full">
        <Paper withBorder shadow="md" p={30} radius="md" className="relative">
          <LoadingOverlay visible={isSendingEmail || isVerifying || isResetting} />

          <Title order={2} className="text-center" mb="md">
            {step === ForgotPasswordStep.EMAIL && "Forgot Password"}
            {step === ForgotPasswordStep.OTP && "Verify OTP"}
            {step === ForgotPasswordStep.NEW_PASSWORD && "Reset Password"}
          </Title>

          {error && (
            <Alert icon={<IconAlertCircle size={18} />} color="red" mb="xl">
              {error}
            </Alert>
          )}

          {step === ForgotPasswordStep.EMAIL && (
            <form onSubmit={handleSubmitEmail(handleSendEmail)}>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                leftSection={<IconMail size={16} />}
                {...registerEmail("email")}
                error={emailErrors.email?.message}
                mb="md"
              />
              <Button type="submit" fullWidth>
                Send OTP
              </Button>
            </form>
          )}

          {step === ForgotPasswordStep.OTP && (
            <>
              <Text className="text-center" color="dimmed" mb="xl">
                We sent a 6-digit code to <span className="font-semibold">{email}</span>
              </Text>
              <form onSubmit={handleSubmitOtp(handleVerifyCode)}>
                <TextInput
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  {...registerOtp("code")}
                  error={otpErrors.code?.message}
                  classNames={{
                    input: "text-center tracking-widest font-mono text-xl h-14",
                  }}
                  mb="md"
                />
                <Group justify="space-between">
                  <Button variant="subtle" onClick={() => setStep(ForgotPasswordStep.EMAIL)}>
                    Change Email
                  </Button>
                  <Button type="submit">Verify Code</Button>
                </Group>
              </form>
            </>
          )}

          {step === ForgotPasswordStep.NEW_PASSWORD && (
            <form onSubmit={handleSubmitPassword(handleResetPassword)}>
              <PasswordInput
                label="New Password"
                placeholder="At least 8 characters"
                {...registerPassword("newPassword")}
                error={passwordErrors.newPassword?.message}
                mb="md"
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your new password"
                {...registerPassword("confirmPassword")}
                error={passwordErrors.confirmPassword?.message}
                mb="xl"
              />
              <Button type="submit" fullWidth>
                Reset Password
              </Button>
            </form>
          )}

          <Text className="text-center" mt="lg">
            <Button variant="subtle" size="sm" onClick={() => router.push("/auth/login")}>
              Back to Login
            </Button>
          </Text>
        </Paper>
      </Container>
    </div>
  );
}
