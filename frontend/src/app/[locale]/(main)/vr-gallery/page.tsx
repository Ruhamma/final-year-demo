"use client";
import { useGetPublicArtworksQuery } from "@/store/api/artwork/artwork";
import { LoadingOverlay } from "@mantine/core";
import VirtualGallery from "./_components/VirtualGallery";

const VirtualGalleryPage = () => {
  // const { data: artworksData, isLoading } = useGetPublicArtworksQuery({
  //   skip: 1,
  //   limit: 10,
  // });

  // if (isLoading || !artworksData) {
  //   return <LoadingOverlay visible />;
  // }
  const artworksData = {
    total: 27,
    artworks: [
      {
        created_at: "2025-05-22T23:48:03.899299",
        updated_at: "2025-05-22T23:48:03.899299",
        id: "ee0433f5-3461-4dfc-a3de-9e260e66de2b",
        title: "gown2",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--Bxqc4RjX--/v1747957708/artworks/qt3uxcfuztcyiuduff9b.jpg",
            public_id: "artworks/qt3uxcfuztcyiuduff9b",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 0,
        favorites: 0,
        artist: {
          first_name: "Rekik",
          last_name: "Solomo",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278758/profile_pictures/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_profile.jpg",
          thumbnail:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278759/thumbnails/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_thumbnail.png",
          contact_email: "rekiksolomon@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: true,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-23T00:03:48.251334",
        updated_at: "2025-05-23T00:03:48.251334",
        id: "e7dde49a-9e40-4b37-bf8f-a0bb5be7ae6b",
        title: "gown2",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--oOsJr_OB--/v1747958631/artworks/q90o9zj9oybyxbmlsuhq.jpg",
            public_id: "artworks/q90o9zj9oybyxbmlsuhq",
            is_watermarked: true,
            is_downloadable: false,
          },
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--nIz5YFuc--/v1747958632/artworks/oxpcvjiylfdnps8bkdz7.jpg",
            public_id: "artworks/oxpcvjiylfdnps8bkdz7",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 0,
        favorites: 0,
        artist: {
          first_name: "Rekik",
          last_name: "Solomo",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278758/profile_pictures/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_profile.jpg",
          thumbnail:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278759/thumbnails/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_thumbnail.png",
          contact_email: "rekiksolomon@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: true,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-21T04:40:11.239743",
        updated_at: "2025-05-25T06:58:58.256021",
        id: "407865e4-54cf-4ef2-8bc0-8147a57a4f14",
        title: "Test art piece",
        description: "test multiple image uplaod ",
        price: 144444,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747802416/artworks/xrurzcffexa1xkfx3muj.png",
            public_id: "artworks/xrurzcffexa1xkfx3muj",
            is_watermarked: null,
            is_downloadable: false,
          },
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747802419/artworks/gdpojm0ykdj1nfkubqvg.png",
            public_id: "artworks/gdpojm0ykdj1nfkubqvg",
            is_watermarked: null,
            is_downloadable: false,
          },
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747802422/artworks/gjb9eh6klpms6xemgbk1.png",
            public_id: "artworks/gjb9eh6klpms6xemgbk1",
            is_watermarked: null,
            is_downloadable: false,
          },
        ],
        category: {
          id: "b2c3d4e5-6789-0123-4567-890123456789",
          name: "Realism",
        },
        medium: {
          id: "b0c1d2e3-4567-8901-2345-678901234567",
          name: "Oil Paint",
        },
        style: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Surrealism",
        },
        tags: [
          {
            id: "f8a9b0c1-2345-6789-0123-456789012345",
            name: "Minimalism",
          },
          {
            id: "a9b0c1d2-3456-7890-1234-567890123456",
            name: "Pop Art",
          },
          {
            id: "b0c1d2e3-4567-8901-2345-678901234567",
            name: "Impressionism",
          },
        ],
        size: {
          width: 87,
          height: 67,
          unit: "in",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 2,
        favorites: 1,
        artist: {
          first_name: "",
          last_name: "",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "seller4@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 4,
        rating_count: 1,
        ratings: [
          {
            id: "f2de3f0a-a290-4ed0-a816-02a3b43a79f6",
            user_id: "192812f1-f99b-4d96-be82-c65a962dfc32",
            artwork_id: "407865e4-54cf-4ef2-8bc0-8147a57a4f14",
            rating: 4,
            review: "test",
            created_at: "2025-05-21T10:08:11.146723",
            updated_at: "2025-05-21T10:08:11.146723",
          },
        ],
      },
      {
        created_at: "2025-05-21T04:10:44.207546",
        updated_at: "2025-05-25T08:59:23.041508",
        id: "1436ea43-bc65-41c3-b754-5a1e65cdc146",
        title: "The Silent Brush",
        description:
          "Discover how minimalist artists express profound ideas through simple lines, muted palettes, and negative space",
        price: 23333,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747800646/artworks/ogmob0eixx88xztqai9r.jpg",
            public_id: "artworks/ogmob0eixx88xztqai9r",
            is_watermarked: null,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "b0c1d2e3-4567-8901-2345-678901234567",
          name: "Oil Paint",
        },
        style: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Surrealism",
        },
        tags: [
          {
            id: "e7f8a9b0-1234-5678-9012-345678901234",
            name: "Black and White",
          },
          {
            id: "f8a9b0c1-2345-6789-0123-456789012345",
            name: "Minimalism",
          },
          {
            id: "a9b0c1d2-3456-7890-1234-567890123456",
            name: "Pop Art",
          },
        ],
        size: {
          width: 24,
          height: 34,
          unit: "in",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 1,
        favorites: 0,
        artist: {
          first_name: "",
          last_name: "",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "seller4@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-25T09:40:00.547982",
        updated_at: "2025-05-25T09:40:00.547982",
        id: "703f12d8-36fa-40b3-a35d-286c3789b3cb",
        title: "moon Over Mountains ",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--Dv1_Gwke--/v1748166010/artworks/cjo0bxfx6wrzvrxbyptt.jpg",
            public_id: "artworks/cjo0bxfx6wrzvrxbyptt",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 0,
        favorites: 0,
        artist: {
          first_name: "artist",
          last_name: "artist-N",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "artist@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-25T20:16:07.736783",
        updated_at: "2025-05-25T20:16:07.736783",
        id: "7419baa7-29bd-4e96-a00c-b8e6cd3f5c5b",
        title: "Sleep",
        description: "The art of sleeping",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--uFBqYhld--/v1748204174/artworks/pyfgi9dn6iplkomple3d.jpg",
            public_id: "artworks/pyfgi9dn6iplkomple3d",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: false,
        is_active: true,
        view_count: 0,
        favorites: 0,
        artist: {
          first_name: "Rekik",
          last_name: "Solomo",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278758/profile_pictures/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_profile.jpg",
          thumbnail:
            "https://res.cloudinary.com/dre2otd4n/image/upload/v1748278759/thumbnails/artist_28c67ea0-bfae-4bc2-8c24-c21fb0176e46_thumbnail.png",
          contact_email: "rekiksolomon@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: true,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-25T09:41:33.032941",
        updated_at: "2025-05-25T20:56:50.536380",
        id: "02adc3d5-5b42-4607-ad50-52fcac3874b3",
        title: "moon Over Mountains ",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--PzWT1_mU--/v1748166095/artworks/zgilmgpktfzpltj4z9bv.jpg",
            public_id: "artworks/zgilmgpktfzpltj4z9bv",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 0,
        favorites: 1,
        artist: {
          first_name: "artist",
          last_name: "artist-N",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "artist@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-21T04:34:03.156898",
        updated_at: "2025-05-25T21:18:05.126815",
        id: "ed88837d-c77b-424d-9912-cc543253bcfa",
        title: "Through the Lens",
        description:
          "A look into how contemporary photographers are blending technology, storytelling, and aesthetics in the digital era.",
        price: 45555,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747802061/artworks/kvm9mstol5fzwpxl3cp0.png",
            public_id: "artworks/kvm9mstol5fzwpxl3cp0",
            is_watermarked: null,
            is_downloadable: false,
          },
        ],
        category: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Impressionism",
        },
        medium: {
          id: "e3f4a5b6-7890-1234-5678-901234567890",
          name: "Charcoal",
        },
        style: {
          id: "b2c3d4e5-6789-0123-4567-890123456789",
          name: "Pop Art",
        },
        tags: [
          {
            id: "e7f8a9b0-1234-5678-9012-345678901234",
            name: "Black and White",
          },
          {
            id: "f8a9b0c1-2345-6789-0123-456789012345",
            name: "Minimalism",
          },
          {
            id: "b0c1d2e3-4567-8901-2345-678901234567",
            name: "Impressionism",
          },
        ],
        size: {
          width: 87,
          height: 67,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 3,
        favorites: 0,
        artist: {
          first_name: "",
          last_name: "",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "seller4@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-25T09:49:09.323383",
        updated_at: "2025-05-25T21:54:48.357163",
        id: "27f9e8cc-2991-46a5-954b-69a5380c4563",
        title: "moon Over Mountains ",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/private/s--__H6QX4S--/v1748166556/artworks/rujwh4j1u4bre58vkbb7.jpg",
            public_id: "artworks/rujwh4j1u4bre58vkbb7",
            is_watermarked: true,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 1,
        favorites: 0,
        artist: {
          first_name: "artist",
          last_name: "artist-N",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "artist@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 0,
        rating_count: 0,
        ratings: [],
      },
      {
        created_at: "2025-05-17T16:46:11.563533",
        updated_at: "2025-05-26T17:27:50.261812",
        id: "1b30d073-0782-48e2-8f93-b1815e5cd6af",
        title: "Sunset Over Mountains",
        description: "Oil painting of mountain sunset",
        price: 450,
        images: [
          {
            url: "https://res.cloudinary.com/dre2otd4n/image/upload/v1747500373/artworks/vdpmg6c7b0j1evb7b5g9.jpg",
            public_id: "artworks/vdpmg6c7b0j1evb7b5g9",
            is_watermarked: null,
            is_downloadable: false,
          },
        ],
        category: {
          id: "a1b2c3d4-5678-9012-3456-789012345678",
          name: "Abstract",
        },
        medium: {
          id: "a5b6c7d8-9012-3456-7890-123456789012",
          name: "Digital",
        },
        style: {
          id: "c3d4e5f6-7890-1234-5678-901234567890",
          name: "Minimalism",
        },
        tags: [
          {
            id: "d4e5f6a7-8901-2345-6789-012345678901",
            name: "Vintage",
          },
        ],
        size: {
          width: 60,
          height: 40,
          unit: "cm",
        },
        is_sold: false,
        is_featured: false,
        is_digital: null,
        is_active: true,
        view_count: 2,
        favorites: 1,
        artist: {
          first_name: "artist",
          last_name: "artist-N",
          bio: "",
          profile_picture:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1692117728/cld-sample.jpg",
          thumbnail:
            "https://res.cloudinary.com/dk4gxgooc/image/upload/v1746393150/pexels-curtis-adams-1694007-4469186_g2t3ww.jpg",
          contact_email: "artist@gmail.com",
          phone_number: null,
          location: null,
          website: null,
          instagram: null,
          tiktok: null,
          facebook: null,
          twitter: null,
          youtube: null,
          is_active: true,
          is_verified: false,
        },
        favorite_count: null,
        average_rating: 4.5,
        rating_count: 2,
        ratings: [
          {
            id: "87790caf-e6c9-4cd4-9092-3ce1d78eaeb0",
            user_id: "349c8009-8057-4d18-a565-7d52705da918",
            artwork_id: "1b30d073-0782-48e2-8f93-b1815e5cd6af",
            rating: 5,
            review:
              "Absolutely stunning piece! The colors are vibrant and the detail is amazing.",
            created_at: "2025-05-20T09:33:38.380908",
            updated_at: "2025-05-20T09:33:38.380908",
          },
          {
            id: "0395e87f-4d14-4bad-88af-e3f20564956d",
            user_id: "192812f1-f99b-4d96-be82-c65a962dfc32",
            artwork_id: "1b30d073-0782-48e2-8f93-b1815e5cd6af",
            rating: 4,
            review: "test review",
            created_at: "2025-05-26T17:27:50.090777",
            updated_at: "2025-05-26T17:27:50.090777",
          },
        ],
      },
    ],
  };
  // Map artworks to match the expected Artwork type for VirtualGallery
  const mappedArtworks = artworksData.artworks.map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    images: artwork.images.map((img) => ({ url: img.url })),
    artist: {
      user: {
        username:
          artwork.artist?.first_name || artwork.artist?.last_name
            ? `${artwork.artist.first_name ?? ""}${
                artwork.artist.last_name ? " " + artwork.artist.last_name : ""
              }`.trim() ||
              artwork.artist.contact_email?.split("@")[0] ||
              "unknown"
            : artwork.artist.contact_email?.split("@")[0] || "unknown",
      },
    },
    price: artwork.price,
    description: artwork.description,
  }));

  return (
    <div className="w-full h-screen">
      <VirtualGallery artworks={mappedArtworks} />
    </div>
  );
};

export default VirtualGalleryPage;
