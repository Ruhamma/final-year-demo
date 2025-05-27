"use client";
import Image from "next/image";
import {
  useState,
} from "react";
import {
  useGetArtistsQuery,
  useGetBestsellingArtistsQuery,
  useGetRisingArtistsQuery,
} from "@/store/api/artist/profile";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ArtistsPage() {
  const t = useTranslations("common.Artist");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetArtistsQuery();
  const {
    data: risingData,
    isLoading: risingIsLoading,
    error: risingError,
  } = useGetRisingArtistsQuery();
  const {
    data: bestsellingData,
    isLoading: bestsellingIsLoading,
    error: bestsellingError,
  } = useGetBestsellingArtistsQuery();

  const artists = data?.artists || [];
  const risingArtists = risingData?.artists || [];
  const bestsellingArtists = bestsellingData?.artists || []; // Adjust this according to your API response structure
  console.log("artists hello", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="bg-[#fffbea] text-gray-800">
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/Product Image (2).png')` }}
      >
        <div className="absolute inset-0 bg-[#283618]/60 flex flex-col justify-center items-left text-white text-center px-4">
          <h1 className="text-4xl font-bold font-serif text-left">
            {t("Discover Artist")}
          </h1>
          <p className="mt-4 max-w-2xl text-left">
           {t('description')}
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">
        <h2 className="text-2xl font-bold font-serif mb-2">
          {t("Bestselling Artists")}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
         {t("BestsellingArtistsDesc")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestsellingArtists.map((artist: any) => (
            <div key={artist.id} className="shadow overflow-hidden">
              <Image
                src={artist?.thumbnail || '/images/placeholder.png'}
                alt="Artwork"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-row justify-between items-center p-3">
                <div className="">
                  <h3 className="font-semibold">{artist.first_name}</h3>
                  <p className="text-xs text-gray-500">{artist.location}</p>
                </div>
                <Button>
                  <Link href={`/artists-profile-page/${artist.id}`} passHref>
                    {t("Profile")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-serif">{t("Discover Artist")}</h2>
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button className="border px-4 py-1 rounded-full">{t('All filters')}</button>
          <button className="border px-4 py-1 rounded-full">{t("Style")}</button>
          <button className="border px-4 py-1 rounded-full">{t("Medium")}</button>
          <button className="border px-4 py-1 rounded-full">{t("Subject")}</button>
          <button className="underline text-sm">{t("ClearAll")}</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {artists.map((artist: any) => (
            <div key={artist.id} className="shadow overflow-hidden">
              <Image
                src={artist?.thumbnail || '/images/placeholder.png'}
                alt={artist.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-row justify-between items-center p-3">
                <div>
                  <h3 className="font-semibold">{artist.first_name}</h3>
                  <p className="text-xs text-gray-500">{artist.location}</p>
                </div>
                <Button>
                  <Link href={`/artists-profile-page/${artist.id}`} passHref>
                    {t("Profile")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-full border ${
                page === p ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* <section className="py-12 container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold font-serif mb-2">Rising Artist</h2>
        <p className="text-sm text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {artists.map((artist, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden">
              <Image
                src={artist.image}
                alt={artist.name}
                width={300}
                height={300}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 text-left">
                <h3 className="font-semibold text-sm">{artist.name}</h3>
                <p className="text-xs italic">My Art</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="w-full py-12 bg-[#fffaf0] flex flex-col items-center">
        {/* Heading */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl font-semibold text-black">{t("Rising Artists")}</h2>
          <p className="text-gray-500 mt-2 mb-4">
            {t("RisingArtistsDesc")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 items-center md:items-start">
          {/* Column 1 */}

          <div className="flex flex-col gap-6 mb-6 md:mb-0">
            {risingArtists.slice(0, 2).map((artist: any) => (
              <div
                key={artist.id}
                className="relative w-[90vw] max-w-[250px] h-[350px]"
              >
                <Image
                  src={artist.thumbnail}
                  alt={artist?.first_name || "artist thumbnail" }
                  fill
                  className="object-cover rounded-md"
                />
                <Image
                  src="/images/Overlay.png"
                  alt="overlay"
                  width={400}
                  height={100}
                  className="absolute bottom-0 left-0 w-full h-[100px] object-cover"
                />
                <div className="absolute bottom-3 right-4 text-white z-10">
                  <h3 className="font-semibold text-sm">{artist.first_name}</h3>
                  <p className="text-xs text-[#facc15]">{artist.artStyle}</p>
                  <p className="text-xs">{artist.location}</p>
                  <div className="text-yellow-400 text-sm mt-1">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j}>{j < artist.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-6 mb-6 md:mb-0 md:-mt-10">
            {risingArtists.slice(0, 2).map((artist: any) => (
              <div
                key={artist.id}
                className="relative w-[90vw] max-w-[250px] h-[350px]"
              >
                <Image
                  src={artist.thumbnail}
                  alt={artist.first_name}
                  fill
                  className="object-cover rounded-md"
                />
                <Image
                  src="/images/Overlay.png"
                  alt="overlay"
                  width={400}
                  height={100}
                  className="absolute bottom-0 left-0 w-full h-[100px] object-cover"
                />
                <div className="absolute bottom-3 right-4 text-white z-10">
                  <h3 className="font-semibold text-sm">{artist.first_name}</h3>
                  <p className="text-xs text-[#facc15]">{artist.artStyle}</p>
                  <p className="text-xs">{artist.location}</p>
                  <div className="text-yellow-400 text-sm mt-1">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j}>{j < artist.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {risingArtists.slice(0, 2).map((artist: any) => (
              <div
                key={artist.id}
                className="relative w-[90vw] max-w-[250px] h-[350px]"
              >
                <Image
                  src={artist.thumbnail}
                  alt={artist.first_name}
                  fill
                  className="object-cover rounded-md"
                />
                <Image
                  src="/images/Overlay.png"
                  alt="overlay"
                  width={400}
                  height={100}
                  className="absolute bottom-0 left-0 w-full h-[100px] object-cover"
                />
                <div className="absolute bottom-3 right-4 text-white z-10">
                  <h3 className="font-semibold text-sm">{artist.first_name}</h3>
                  <p className="text-xs text-[#facc15]">{artist.artStyle}</p>
                  <p className="text-xs">{artist.location}</p>
                  <div className="text-yellow-400 text-sm mt-1">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j}>{j < artist.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
