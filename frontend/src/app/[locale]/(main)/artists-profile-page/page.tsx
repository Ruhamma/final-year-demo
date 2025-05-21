"use client";
import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
// import { Heart } from "lucide-react";

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`bg-none p-4 ${className}`}>{children}</div>;
}

function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

type ButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  let baseStyle = "px-4 py-2 rounded-2xl font-medium";
  let variantStyle = "";

  switch (variant) {
    case "outline":
      variantStyle =
        "border border-gray-300 bg-transparent text-black hover:bg-gray-100";
      break;
    case "ghost":
      variantStyle = "bg-transparent text-gray-500 hover:text-black";
      break;
    default:
      variantStyle = "bg-black text-white hover:bg-gray-800";
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default function ArtistProfile() {
  const [activePage, setActivePage] = useState(1);
  const artworks = new Array(9).fill({
    title: "Jae Namaz, 2012",
    artist: "Bilen Assefa",
    dimensions: "120 x 100 cm",
    price: "ETB 9,000",
    image: "/artwork.jpg",
  });

  return (
    <div className="bg-cream min-h-screen text-gray-800 bg-[#FFFCEA]">
      <div
        className="relative w-full h-[300px] bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/images/background.png')` }}
      >
        {/* <div className="absolute top-0 left-0 w-full h-full bg-green-900/80 flex flex-col justify-end text-white p-8">
          <div className="w-2/3 ">
            {" "}
            <p className="text-[50px]">Discover Artist</p>
            <p>
              Immerse yourself in a world of artistic brilliance! Explore our
              curated selection of talented artists, each with a unique voice
              and style waiting to be discovered. Whether you're a seasoned
              collector or just beginning your art journey, we offer a diverse
              range of mediums and artistic expressions to captivate your
              imagination. Find the perfect piece to add a touch of magic to
              your space, or simply connect with artists and be inspired by
              their creative vision.
            </p>
          </div>
        </div> */}
      </div>
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-10 ">
        <div className="md:col-span-1 flex flex-col items-center text-center mt-[-150px] z-10 ">
          <Image
            src="/images/port1.jpg"
            alt="Bilen Assefa"
            width={200}
            height={200}
            className="rounded-full h-[170px] w-[170px]"
          />
          <h2 className="mt-4 text-xl font-semibold">Bilen Assefa</h2>
          <div className="text-yellow-500">★★★★★ (12)</div>
          <p className="mt-2 text-sm text-gray-600">Joined May 2016</p>
          <p className="mt-4 text-sm">
            I’m Bilen, a surrealist artist creating mixed-media paintings and
            digital collages. Inspired by dreams and the works of Salvador Dali,
            I aim to challenge societal norms and spark conversations about the
            subconscious mind through my art.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between mb-6">
            <div className="space-x-4">
              <Button variant="outline">All Filters</Button>
              <Button variant="outline">Price</Button>
              <Button variant="outline">Medium</Button>
              <Button variant="outline">Size</Button>
            </div>
            <Button variant="ghost">Clear All</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((art, idx) => (
              <Card key={idx} className="relative">
                <CardContent className="">
                  <Image
                    src="/images/expressionism.png"
                    alt={art.title}
                    width={300}
                    height={300}
                    className="h-[300px] w-full"
                  />
                  <div className="relative h-auto flex flex-col w-full">
                    <h3 className="mt-2 font-semibold italic">{art.title}</h3>
                    <p className="text-sm">{art.artist}</p>
                    <p className="text-sm italic">{art.dimensions}</p>
                    <p className="text-sm font-medium text-black">
                      {art.price}
                    </p>
                    <button className="absolute top-2 right-0 text-gray-500 hover:text-red-500">
                      {/* <Heart size={20} /> */}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-full border ${
                  activePage === page
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
