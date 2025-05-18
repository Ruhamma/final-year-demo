"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  Group,
  Paper,
  Stack,
  Divider,
  Title,
  FileInput,
  Checkbox,
  Pill,
  Box,
  LoadingOverlay,
  Text,
  Image,
  Flex,
} from "@mantine/core";
import {
  useGetMetadataQuery,
  useGetMyArtworksDetailQuery,
  useUpdateArtworkMutation,
} from "@/store/api/artwork/artwork";
import { IconUpload, IconX, IconCheck } from "@tabler/icons-react";
import { notify } from "@/shared/components/notification/notification";
import { useParams } from "next/navigation";
interface Category {
  id: string;
  name: string;
  description: string;
}
interface Medium {
  id: string;
  name: string;
  description: string;
}
interface Style {
  id: string;
  name: string;
  description: string;
}
interface Tag {
  id: string;
  name: string;
  description: string;
}

const parseSize = (sizeString: string) => {
  const regex = /^(\d+(\.\d+)?)x(\d+(\.\d+)?)\s*(in|cm)$/i;
  const match = sizeString.match(regex);

  if (match) {
    return {
      width: parseFloat(match[1]),
      height: parseFloat(match[3]),
      unit: match[5].toLowerCase(),
    };
  }

  return null;
};

const artworkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  price: z.number().min(0, "Price must be positive").optional(),
  category_id: z.string().min(1, "Category is required"),
  medium_id: z.string().min(1, "Medium is required"),
  style_id: z.string().min(1, "Style is required"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed").optional(),

  size: z
    .string()
    .optional()
    .refine((sizeString) => {
      if (!sizeString) return true;
      const parsedSize = parseSize(sizeString);
      if (!parsedSize) {
        return false;
      }
      return true;
    }, "Invalid size format (expected: 'width x height unit)")

    .transform((sizeString) => {
      if (sizeString) {
        return parseSize(sizeString);
      }
      return null;
    }),

  is_published: z.boolean().default(false),
});

type ArtworkFormValues = z.infer<typeof artworkSchema>;

const UpdateArtworkPage = () => {
  const { id } = useParams();
  const { data: metadata } = useGetMetadataQuery({});
  const [updateArtwork] = useUpdateArtworkMutation();
  const { data: artworkData, isLoading } = useGetMyArtworksDetailQuery(id);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  useEffect(() => {
    if (artworkData?.images?.length) {
      setImagePreview(artworkData.images[0].url);
    }
  }, [artworkData]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      tags: [],
      is_published: false,
    },
  });
  const formattedSize =
    artworkData?.size &&
    artworkData.size.width &&
    artworkData.size.height &&
    artworkData.size.unit
      ? `${artworkData.size.width}x${artworkData.size.height} ${artworkData.size.unit}`
      : "";

  useEffect(() => {
    if (artworkData) {
      reset({
        title: artworkData.title,
        description: artworkData.description,
        price: artworkData.price,
        size: formattedSize,
        category_id: artworkData.category?.id,
        medium_id: artworkData.medium?.id,
        style_id: artworkData.style?.id,
        tags: artworkData.tags.map((tag: Tag) => tag.id),
      });
      setPreviewUrl(artworkData.images[0].url || null);
    }
  }, [artworkData, reset]);
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);
  const onSubmit = async (data: ArtworkFormValues) => {
    try {
      const formData = new FormData();
      const { ...rest } = data;
      const artworkData = Object.entries(rest).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      formData.append("artwork", JSON.stringify(artworkData));

      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      await updateArtwork({ id, formData }).unwrap();
      reset();
      notify("Success", "Artwork updated successfully");
    } catch (error) {
      console.error("Failed to update artwork:", error);
      notify("Error", "Failed to update artwork");
    }
  };

  return (
    <Paper p="xl" bg={"none"} mx="auto">
      <LoadingOverlay visible={isLoading} />
      <Title order={2} mb="xl">
        Update Artwork
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="lg">
          <Divider label="Basic Information" labelPosition="center" />
          <TextInput
            label="Title"
            withAsterisk
            {...register("title")}
            error={errors.title?.message}
          />

          <Textarea
            label="Description"
            autosize
            minRows={3}
            {...register("description")}
            error={errors.description?.message}
          />

          <Group grow>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Price (ETB)"
                  step={10}
                  value={field.value || undefined}
                  onChange={(value) => field.onChange(value)}
                  error={errors.price?.message}
                  thousandSeparator
                />
              )}
            />
            <TextInput
              label="Size (e.g., 24x36 in)"
              {...register("size")}
              error={errors.size?.message}
            />
          </Group>

          <Divider label="Artwork Image" labelPosition="center" />
          <Flex className="gap-4 ">
            {previewUrl && (
              <Box>
                <Text size="sm" w={500} mb={4} className="text-center">
                  Current Image
                </Text>
                <Image
                  src={previewUrl}
                  alt="Current artwork"
                  className="w-[200px] h-[200px]"
                  style={{
                    objectFit: "contain",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            )}
          </Flex>

          <Box mt="md" style={{ maxWidth: 320 }}>
            <FileInput
              label="Upload New Image"
              withAsterisk
              accept="image/*"
              leftSection={<IconUpload size={16} />}
              value={selectedFile}
              onChange={setSelectedFile}
              clearable
            />
          </Box>

          <Divider label="Artwork Details" labelPosition="center" />
          <Group grow>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  withAsterisk
                  data={
                    metadata?.categories?.map((c: Category) => ({
                      value: c.id,
                      label: c.name,
                    })) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.category_id?.message}
                />
              )}
            />

            <Controller
              name="medium_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Medium"
                  withAsterisk
                  data={
                    metadata?.media?.map((m: Medium) => ({
                      value: m.id,
                      label: m.name,
                    })) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.medium_id?.message}
                />
              )}
            />

            <Controller
              name="style_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Style"
                  withAsterisk
                  data={
                    metadata?.styles?.map((s: Style) => ({
                      value: s.id,
                      label: s.name,
                    })) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.style_id?.message}
                />
              )}
            />
          </Group>

          <Divider label="Tags" labelPosition="center" />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="Add tags (max 5)"
                data={
                  metadata?.tags?.map((t: Tag) => ({
                    value: t.id,
                    label: t.name,
                  })) || []
                }
                maxValues={5}
                value={field.value}
                onChange={field.onChange}
                error={errors.tags?.message}
                renderOption={({ option, checked }) => (
                  <Pill withRemoveButton={checked} onRemove={() => {}}>
                    {option.label}
                  </Pill>
                )}
              />
            )}
          />

          <Divider label="Publishing Options" labelPosition="center" />
          <Checkbox label="Publish immediately" {...register("is_published")} />

          <Group justify="flex-end" mt="xl">
            <Button
              variant="default"
              leftSection={<IconX size={16} />}
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              leftSection={<IconCheck size={16} />}
              loading={isLoading}
            >
              Create Artwork
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default UpdateArtworkPage;
