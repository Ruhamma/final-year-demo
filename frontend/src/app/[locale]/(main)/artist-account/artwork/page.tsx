"use client";
import React from "react";
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
  Flex,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import {
  useCreateArtworkMutation,
  useGetMetadataQuery,
} from "@/store/api/artwork/artwork";
import { IconUpload, IconX, IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { notify } from "@/shared/components/notification/notification";
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
  images: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file.size <= 5_000_000, "Max image size is 5MB"),
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

const CreateArtworkPage = () => {
  const { data: metadata } = useGetMetadataQuery({});
  const [createArtwork, { isLoading }] = useCreateArtworkMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      tags: [],
      is_published: false,
    },
  });

  const onSubmit = async (data: ArtworkFormValues) => {
    try {
      const formData = new FormData();
      const { images, ...rest } = data;
      const artworkData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      formData.append("artwork", JSON.stringify(artworkData));

      if (images) {
        formData.append("image", images);
      }
      await createArtwork(formData).unwrap();
      reset();
      notify("Success", "Artwork created successfully");
    } catch (error) {
      console.error("Failed to create artwork:", error);
      notify("Error", "Failed to create artwork");
    }
  };

  const imageFile = watch("images");

  return (
    <Paper p="xl" bg={"none"} mx="auto">
      <LoadingOverlay visible={isLoading} />
      <Title order={2} mb="xl">
        Create New Artwork
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
          <FileInput
            label="Upload Image"
            withAsterisk
            accept="image/*"
            leftSection={<IconUpload size={16} />}
            placeholder="Select artwork image"
            onChange={(file) => setValue("images", file || null)}
            error={errors.images?.message}
          />

          {imageFile && (
            <Box mt="sm">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </Box>
          )}

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

export default CreateArtworkPage;
