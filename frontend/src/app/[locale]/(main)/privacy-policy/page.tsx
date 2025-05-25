"use client";
import {
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  Space,
  Select,
} from "@mantine/core";
import {
  IconCheck,
  IconLock,
  IconShield,
  IconDatabase,
  IconLanguage,
} from "@tabler/icons-react";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("common.Privacy");
  const renderListWithIcons = (items) => {
    return items.map((item, index) => (
      <List.Item
        key={index}
        icon={
          <ThemeIcon color="teal" size={18} radius="xl">
            <IconCheck size="1rem" />
          </ThemeIcon>
        }
      >
        {item}
      </List.Item>
    ));
  };

  const renderObjectListItems = (items) => {
    return items.map((item, index) => (
      <List.Item key={index}>
        <Text className="font-medium">{item.label}:</Text> {item.detail}
      </List.Item>
    ));
  };
  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>

      <Container size="lg" className="py-12">
        <div className="text-center mb-12">
          <Title order={1} className="text-4xl font-bold mb-4 text-gray-800">
            {t("title")}
          </Title>
          <Text size="lg" className="text-gray-600 max-w-3xl mx-auto">
            {t("lastUpdated")}
          </Text>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("introduction.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("introduction.content1")}
          </Text>
          <Text className="text-gray-700">{t("introduction.content2")}</Text>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("informationWeCollect.title")}
          </Title>

          <Title order={3} className="text-xl font-medium mb-4 text-gray-700">
            {t("informationWeCollect.personalInfo.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("informationWeCollect.personalInfo.description")}
          </Text>
          <List spacing="sm" className="mb-8">
            {renderListWithIcons(
              t.raw("informationWeCollect.personalInfo.items")
            )}
          </List>

          <Title order={3} className="text-xl font-medium mb-4 text-gray-700">
            {t("informationWeCollect.artworkData.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("informationWeCollect.artworkData.description")}
          </Text>
          <List spacing="sm" className="mb-6">
            {renderListWithIcons(
              t.raw("informationWeCollect.artworkData.items")
            )}
          </List>

          <Title order={3} className="text-xl font-medium mb-4 text-gray-700">
            {t("informationWeCollect.technicalData.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("informationWeCollect.technicalData.description")}
          </Text>
          <List spacing="sm">
            {renderListWithIcons(
              t.raw("informationWeCollect.technicalData.items")
            )}
          </List>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("howWeUseInfo.title")}
          </Title>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <ThemeIcon color="blue" size={48} radius="md" className="mb-4">
                <IconDatabase size="1.5rem" />
              </ThemeIcon>
              <Title
                order={3}
                className="text-lg font-medium mb-2 text-gray-700"
              >
                {t("howWeUseInfo.platformOperation.title")}
              </Title>
              <Text className="text-gray-600">
                {t("howWeUseInfo.platformOperation.description")}
              </Text>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ThemeIcon color="violet" size={48} radius="md" className="mb-4">
                <IconShield size="1.5rem" />
              </ThemeIcon>
              <Title
                order={3}
                className="text-lg font-medium mb-2 text-gray-700"
              >
                {t("howWeUseInfo.securityCompliance.title")}
              </Title>
              <Text className="text-gray-600">
                {t("howWeUseInfo.securityCompliance.description")}
              </Text>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ThemeIcon color="green" size={48} radius="md" className="mb-4">
                <IconCheck size="1.5rem" />
              </ThemeIcon>
              <Title
                order={3}
                className="text-lg font-medium mb-2 text-gray-700"
              >
                {t("howWeUseInfo.personalization.title")}
              </Title>
              <Text className="text-gray-600">
                {t("howWeUseInfo.personalization.description")}
              </Text>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ThemeIcon color="orange" size={48} radius="md" className="mb-4">
                <IconLock size="1.5rem" />
              </ThemeIcon>
              <Title
                order={3}
                className="text-lg font-medium mb-2 text-gray-700"
              >
                {t("howWeUseInfo.marketing.title")}
              </Title>
              <Text className="text-gray-600">
                {t("howWeUseInfo.marketing.description")}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("dataSharing.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("dataSharing.description")}
          </Text>
          <List spacing="sm" className="mb-4">
            {renderObjectListItems(t.raw("dataSharing.items"))}
          </List>
          <Text className="text-gray-700">{t("dataSharing.noSelling")}</Text>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("dataSecurity.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("dataSecurity.description")}
          </Text>
          <List spacing="sm">
            {renderListWithIcons(t.raw("dataSecurity.measures"))}
          </List>
          <Text className="text-gray-700">{t("dataSecurity.disclaimer")}</Text>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("yourRights.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("yourRights.description")}
          </Text>
          <List spacing="sm">
            {renderListWithIcons(
              t.raw("informationWeCollect.technicalData.items")
            )}
          </List>
          <Text className="text-gray-700">{t("yourRights.contact")}</Text>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <Title
            order={2}
            className="text-2xl font-semibold mb-6 text-gray-800"
          >
            {t("policyChanges.title")}
          </Title>
          <Text className="mb-4 text-gray-700">
            {t("policyChanges.description1")}
          </Text>
          <Text className="text-gray-700">
            {t("policyChanges.description2")}
          </Text>
        </div>

        <Space h="xl" />

        <div className="text-center">
          <Title order={3} className="text-xl font-medium mb-4 text-gray-800">
            {t("contact.title")}
          </Title>
          <Text className="text-gray-700">{t("contact.description")}</Text>
          <Text className="text-blue-600 font-medium">
            {t("contact.email")}
          </Text>
        </div>
      </Container>
    </>
  );
}
