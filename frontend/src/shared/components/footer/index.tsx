import { Box, Flex, Stack ,Text, TextInput, Button, ActionIcon} from "@mantine/core";
import { IconBrandInstagram, IconBrandTiktok, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations('common.Footer');
  return (
    <Box className="container mx-auto sm:pt-16 py-10">
      <Stack gap={80}>
        <Flex justify="space-between" align="center" py={20} px={24} bg={'#606C38'}>
          <Text fs="italic" fz={32} c={'white'} className="playfair-display">{t('Subscribe to our newsletter')}</Text>
          <Flex w={'60%'} align={'center'}>
            <TextInput placeholder={t("Enter your email")} w={'50%'} size={'lg'} radius={0}></TextInput>
            <Button radius={0} size="lg" bg={'#BC6C25'} className="tracking-[0.1em]">{t('Subscribe')}</Button>
          </Flex>
          </Flex>
          <Flex justify={'space-between'} align={'center'} py={20} px={24}>
            <Text fz={16} c={'dimmed'} className="tracking-wide">© 2025 {t('Copyright All rights reserved')}</Text>
            <Flex>
              <ActionIcon variant="transparent">
                <IconBrandX size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandYoutube size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandInstagram size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandTiktok size={20} stroke={1.5} />
              </ActionIcon>
            </Flex>
            <Link href={'#'} ><Text c={'dimmed'} fz={14}>{t('Terms')}</Text></Link>
          </Flex>
      </Stack>
    </Box>
  );
}