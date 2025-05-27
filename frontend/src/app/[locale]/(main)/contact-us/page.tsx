"use client";
import {
  Box,
  Image,
  Text,
  Stack,
  Flex,
  TextInput,
  Textarea,
  Button,
  Alert,
} from "@mantine/core";
import {
  IconMapPinFilled,
  IconPhoneFilled,
  IconClockFilled,
  IconCheck,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";


export default function Page() {
  const t = useTranslations("common.Contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Fake submission logic
    setSubmitted(true);

    // Clear form fields
    setName("");
    setEmail("");
    setSubject("");

    // Hide message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Box className="container mx-auto sm:pt-16 py-10 px-4">
      {/* ... header and contact info above stays the same ... */}

      {/* Main Content Section */}
      <Flex
        className="flex-col lg:flex-row gap-10 mt-10"
        align="start"
        justify="space-between"
        p={20}
      >
        {/* Contact Info - remains unchanged */}

        {/* Contact Form */}
        <Stack className="w-full lg:w-2/3 gap-6">
          {submitted && (
            <Alert
              icon={<IconCheck size={20} />}
              title="Success"
              color="green"
              radius="md"
            >
               "Form submitted successfully!"
            </Alert>
          )}
          <TextInput
            placeholder={t("NamePlaceholder")}
            label={t("Name")}
            size="lg"
            radius={8}
            className="w-full tracking-wide"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            styles={{
              label: { marginBottom: "12px" },
            }}
          />
          <TextInput
            placeholder="example@gmail.com"
            label={t("Email")}
            size="lg"
            radius={8}
            className="w-full tracking-wide"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            styles={{
              label: { marginBottom: "12px" },
            }}
          />
          <Textarea
            placeholder={t("SubjectPlaceholder")}
            label={t("Subject")}
            size="lg"
            radius={8}
            className="w-full tracking-wide"
            value={subject}
            onChange={(e) => setSubject(e.currentTarget.value)}
            minRows={5}
            styles={{
              label: { marginBottom: "12px" },
            }}
          />
          <Button
            radius={8}
            size="lg"
            bg="#BC6C25"
            color="#fff"
            className="self-end w-full sm:w-[40%] md:w-[30%] lg:w-[20%]"
            onClick={handleSubmit}
          >
            {t("Submit")}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
