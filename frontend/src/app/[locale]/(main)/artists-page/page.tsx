"use client";
import Image from "next/image";
import { useState } from "react";

export default function ArtistsPage() {
  const [page, setPage] = useState(1);
  const artists = new Array(12).fill({
    name: "Bilen Assefa",
    location: "Addis Ababa, Ethiopia",
    image: "/artist.jpg",
    tag: "Fine Art",
  });

  const artworks = new Array(8).fill({
    name: "Bilen Assefa",
    location: "Addis Ababa, Ethiopia",
    image: "/artwork.jpg",
    tag: "Style",
  });

  return (
    <div className="bg-[#fffbea] text-gray-800">
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/Product Image (2).png')` }}
      >
        <div className="absolute inset-0 bg-[#283618]/60 flex flex-col justify-center items-left text-white text-center px-4">
          <h1 className="text-4xl font-bold font-serif text-left">Discover Artist</h1>
          <p className="mt-4 max-w-2xl text-left">
            Immerse yourself in a world of artistic brilliance! Explore our
            curated selection of talented artists, each with a unique voice and
            style.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">
        <h2 className="text-2xl font-bold font-serif mb-2">
          Bestselling Artist
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="shadow overflow-hidden">
                <Image
                  src="/images/pain13.jpg"
                  alt="Artwork"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Bilen Assefa</h3>
                  <p className="text-xs text-gray-500">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-serif">Discover Artist</h2>
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="border px-4 py-1 rounded-full">All Filters</button>
          <button className="border px-4 py-1 rounded-full">Style</button>
          <button className="border px-4 py-1 rounded-full">Medium</button>
          <button className="border px-4 py-1 rounded-full">Subject</button>
          <button className="underline text-sm">Clear all</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {artworks.map((artist, idx) => (
            <div key={idx} className="shadow overflow-hidden">
              <Image
                src="/images/paint2.jpg"
                alt={artist.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{artist.name}</h3>
                <p className="text-xs text-gray-500">{artist.location}</p>
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
  <div className="text-center mb-20">
    <h2 className="text-3xl font-semibold text-black">Rising Artist</h2>
    <p className="text-gray-500 mt-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    </p>
  </div>

  <div className="flex gap-6">
    
    <div className="flex flex-col gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="relative w-[250px] h-[350px]">
          <Image
            src="/images/port1.jpg"
            alt="artist"
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
            <h3 className="font-semibold text-sm">Bilen Assefa</h3>
            <p className="text-xs text-[#facc15]">My Art</p>
            <p className="text-xs">New York</p>
          </div>
        </div>
      ))}
    </div>

  
    <div className="flex flex-col gap-6 -mt-10">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="relative w-[250px] h-[350px]">
          <Image
            src="/images/port1.jpg"
            alt="artist"
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
            <h3 className="font-semibold text-sm">Bilen Assefa</h3>
            <p className="text-xs text-[#facc15]">My Art</p>
            <p className="text-xs">New York</p>
          </div>
        </div>
      ))}
    </div>

    {/* Right Column */}
    <div className="flex flex-col gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="relative w-[250px] h-[350px]">
          <Image
            src="/images/port1.jpg"
            alt="artist"
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
            <h3 className="font-semibold text-sm">Bilen Assefa</h3>
            <p className="text-xs text-[#facc15]">My Art</p>
            <p className="text-xs">New York</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <section className="container mx-auto px-6 py-12 text-center text-sm text-gray-600">
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias.
        </p>
        <p className="mt-4">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias.
        </p>
      </section>
    </div>
  );
}
