"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useVerifyEmailMutation,
  useResendCodeMutation,
} from "@/app/services/auth";
export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <EmailVerificationContent />
    </Suspense>
  )
}

 function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(600); // 10 minutes in seconds

  // RTK Query mutations
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();

  // Get email from query params
  const email = searchParams.get("email") || "";

  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) =>
        value.length === 6 ? null : "OTP must be 6 characters long",
    },
  });

  const handleVerify = async (values: { otp: string }) => {
    setError("");
    console.log("Verifying OTP:", values.otp);
    try {
      const response = await verifyEmail({
        email: email,
        otp: values.otp,
      }).unwrap();

      notifications.show({
        title: "Email Verified!",
        message:
          response?.message || "Your email has been successfully verified",
        color: "green",
        icon: <IconCheck size={18} />,
      });

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.data?.message || "Invalid OTP code. Please try again.");
      console.error("Verification error:", err);
    }
  };

  const handleResendOTP = async () => {
    setError("");

    try {
      const response = await resendCode(email).unwrap();

      notifications.show({
        title: "New OTP Sent!",
        message:
          response.message ||
          "A new verification code has been sent to your email",
        color: "green",
        icon: <IconCheck size={18} />,
      });

      setResendDisabled(true);
      setResendTimer(600); // Reset to 10 minutes
    } catch (err: any) {
      setError(err.data?.message || "Failed to resend OTP. Please try again.");
      console.error("Resend error:", err);
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, resendTimer]);

  // Format timer to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center">
      <Container size="xs" className="w-full">
        <Paper withBorder shadow="md" p={30} radius="md" className="relative">
          <LoadingOverlay visible={isVerifying || isResending} />

          <Button
            leftSection={<IconArrowLeft size={14} />}
            variant="subtle"
            size="sm"
            mb="xl"
            onClick={() => router.back()}
            className="absolute top-4 left-4"
          >
            Back
          </Button>

          <Title order={2} className="text-center" mb="md">
            Verify Your Email
          </Title>

          <Text className="text-center" c="dimmed" mb="xl">
            We have sent a 6-digit verification code that will expire after 10
            min to <span className="font-semibold text-gray-700">{email}</span>
          </Text>

          {error && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              title="Error"
              color="red"
              mb="xl"
            >
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleVerify)}>
            <TextInput
              label="Verification Code"
              placeholder="Enter 6-digit code"
              size="md"
              maxLength={6}
              {...form.getInputProps("otp")}
              classNames={{
                input: "text-center tracking-widest font-mono text-xl h-14",
              }}
            />

            <Group gap="apart" mt="lg">
              <Button
                variant="subtle"
                onClick={handleResendOTP}
                disabled={resendDisabled}
                size="sm"
                loading={isResending}
              >
                Resend Code {resendDisabled && `(${formatTime(resendTimer)})`}
              </Button>

              <Button type="submit" size="sm" loading={isVerifying}>
                Verify Email
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </div>
  );
}