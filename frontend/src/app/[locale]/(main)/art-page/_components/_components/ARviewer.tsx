"use client";
import { Image } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

interface ARViewerProps {
  imageUrl: string;
}

type FrameStyle = "classic" | "modern" | "ornate" | "minimal";

const ARViewer: React.FC<ARViewerProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [arFrameStyle, setArFrameStyle] = useState<FrameStyle>("classic");
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      if (!navigator.xr) {
        setIsSupported(false);
        return;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setIsSupported(supported);
      } catch {
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  useEffect(() => {
    if (isSupported === false) return;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const initAR = async () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      document.body.appendChild(
        ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
      );

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        30
      );

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const loader = new THREE.TextureLoader();
      loader.load(imageUrl, (texture) => {
        const geometry = new THREE.PlaneGeometry(1, 0.75);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 1, -2.5);
        scene.add(plane);
      });

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    initAR();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [imageUrl]);

  const captureScene = () => {
    const renderer = containerRef.current?.querySelector("canvas");
    if (renderer) {
      const link = document.createElement("a");
      link.download = "ar-artwork.png";
      link.href = renderer.toDataURL("image/png");
      link.click();
    }
  };

  if (isSupported === false) {
    return <DesktopArtView imageUrl={imageUrl} />;
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />

      {isSupported && showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black bg-opacity-50 p-2 rounded-full">
          <button
            onClick={() => setArFrameStyle("classic")}
            className={`px-3 py-1 rounded-full text-sm ${
              arFrameStyle === "classic" ? "bg-white text-black" : "text-white"
            }`}
          >
            Classic
          </button>
          <button
            onClick={() => setArFrameStyle("modern")}
            className={`px-3 py-1 rounded-full text-sm ${
              arFrameStyle === "modern" ? "bg-white text-black" : "text-white"
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => setArFrameStyle("ornate")}
            className={`px-3 py-1 rounded-full text-sm ${
              arFrameStyle === "ornate" ? "bg-white text-black" : "text-white"
            }`}
          >
            Ornate
          </button>
          <button
            onClick={() => setArFrameStyle("minimal")}
            className={`px-3 py-1 rounded-full text-sm ${
              arFrameStyle === "minimal" ? "bg-white text-black" : "text-white"
            }`}
          >
            Minimal
          </button>
          <button
            onClick={captureScene}
            className="px-3 py-1 rounded-full text-sm bg-blue-500 text-white"
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};

const DesktopArtView = ({ imageUrl }: { imageUrl: string }) => {
  const [currentRoom, setCurrentRoom] = useState(0);
  type FrameStyle = "classic" | "modern" | "ornate" | "minimal";
  const [frameStyle, setFrameStyle] = useState<FrameStyle>("classic");

  const rooms = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661329978986-c40c0d5ed856?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Living room",
      description: "Clean museum-style white wall perfect for artwork display",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661777863705-d3232b7c8088?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Modern living",
      description: "Contemporary art gallery with track lighting",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1683121370285-6ebcd97de2dd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Empty Room",
      description: "Professional exhibition wall with proper hanging system",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661333572695-eac78e219d6b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Blue Wall",
      description: "Industrial-style exposed brick wall",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664298509421-afbc108d4e8d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Minimalist Wall",
      description: "Sleek modern interior with neutral backdrop",
    },
  ];

  const frameStyles = {
    classic: "border-[12px] border-yellow-900",
    modern: "border-[6px] border-gray-900",
    ornate: "border-[10px] border-yellow-600",
    minimal: "border-[2px] border-gray-400",
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${rooms[currentRoom].image})` }}
      />

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        <div
          className={`shadow-xl bg-white ${frameStyles[frameStyle]}`}
          style={{
            width: "320px",
            height: "240px",
          }}
        >
          <Image
            src={imageUrl}
            alt="Artwork"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center space-y-4">
        <div className="flex gap-3 justify-center">
          {rooms.map((room, i) => (
            <button
              key={i}
              onClick={() => setCurrentRoom(i)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                currentRoom === i
                  ? "bg-white text-black shadow"
                  : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          {Object.keys(frameStyles).map((style) => (
            <button
              key={style}
              onClick={() => setFrameStyle(style as FrameStyle)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                frameStyle === style
                  ? "bg-white text-black shadow"
                  : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
