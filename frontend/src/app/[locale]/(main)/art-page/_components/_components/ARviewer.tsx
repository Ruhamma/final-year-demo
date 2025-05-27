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
    let hitTestSource: XRHitTestSource | undefined;
    let reticle: THREE.Mesh;
    let plane: THREE.Group;
    let session: XRSession;
    let scale = 1;
    let lastTouchDistance = 0;
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };

    const initScene = async () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      if (isSupported) {
        renderer.xr.enabled = true;
        document.body.appendChild(
          ARButton.createButton(renderer, {
            requiredFeatures: ["hit-test", "light-estimation"],
          })
        );
      }

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        30
      );

      // Improved lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Add reticle for placement
      const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32);
      const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
      reticle.rotation.x = -Math.PI / 2;
      reticle.visible = false;
      scene.add(reticle);

      const loader = new THREE.TextureLoader();

      const createArtwork = (texture: THREE.Texture) => {
        const frameWidth = 0.1;

        // Main artwork
        const geometry = new THREE.PlaneGeometry(1, 0.75);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        const artwork = new THREE.Mesh(geometry, material);
        artwork.castShadow = true;
        artwork.receiveShadow = true;

        // Frame
        const frameGeometry = new THREE.BoxGeometry(
          1 + frameWidth * 2,
          0.75 + frameWidth * 2,
          0.05
        );
        const frameMaterial = new THREE.MeshStandardMaterial({
          color:
            arFrameStyle === "classic"
              ? 0x8b4513
              : arFrameStyle === "modern"
              ? 0x333333
              : arFrameStyle === "ornate"
              ? 0xd4af37
              : 0xcccccc,
          roughness: 0.5,
          metalness: 0.5,
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.castShadow = true;
        frame.receiveShadow = true;

        const group = new THREE.Group();
        group.add(frame);
        group.add(artwork);
        artwork.position.z = 0.026;

        // Add measurement text
        const textLoader = new THREE.TextureLoader();
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 128;
        const context = canvas.getContext("2d")!;
        context.fillStyle = "white";
        context.font = "24px Arial";
        context.fillText("1m × 0.75m", 10, 30);

        const textTexture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
          map: textTexture,
          transparent: true,
        });
        const textGeometry = new THREE.PlaneGeometry(0.5, 0.25);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, -0.6, 0.026);
        group.add(textMesh);

        return group;
      };

      let referenceSpace: XRReferenceSpace | null = null;
      if (isSupported) {
        session = renderer.xr.getSession() as XRSession;
        if (!session) {
          throw new Error("XRSession is not available.");
        }

        referenceSpace = await renderer.xr.getReferenceSpace();
        const viewerSpace = await session.requestReferenceSpace("viewer");
        if (typeof session.requestHitTestSource === "function") {
          hitTestSource = await session.requestHitTestSource({
            space: viewerSpace,
          });
        } else {
          throw new Error(
            "requestHitTestSource is not supported on this session."
          );
        }

        session.addEventListener("end", () => {
          reticle.visible = false;
          setShowControls(false);
        });

        let placed = false;

        const placeArtwork = () => {
          if (!placed && reticle.visible) {
            loader.load(imageUrl, (texture) => {
              if (plane) scene.remove(plane);
              plane = createArtwork(texture);
              plane.position.copy(reticle.position);
              plane.quaternion.copy(reticle.quaternion);
              scene.add(plane);
              placed = true;
              reticle.visible = false;
              setShowControls(true);
            });
          }
        };

        // Click handler for placement
        containerRef.current?.addEventListener("click", placeArtwork, {
          once: true,
        });

        // Touch handlers for scaling
        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length === 2 && plane) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
              touch2.clientX - touch1.clientX,
              touch2.clientY - touch1.clientY
            );

            if (lastTouchDistance > 0) {
              scale *= distance / lastTouchDistance;
              plane.scale.set(scale, scale, scale);
            }
            lastTouchDistance = distance;
          }
        };

        const handleTouchEnd = () => {
          lastTouchDistance = 0;
        };

        containerRef.current?.addEventListener("touchmove", handleTouchMove);
        containerRef.current?.addEventListener("touchend", handleTouchEnd);

        // Mouse handlers for rotation
        const handleMouseDown = (e: MouseEvent) => {
          isDragging = true;
          previousPosition = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging || !plane) return;

          const deltaX = e.clientX - previousPosition.x;
          const deltaY = e.clientY - previousPosition.y;

          plane.rotation.y += deltaX * 0.01;
          plane.rotation.x += deltaY * 0.01;

          previousPosition = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
          isDragging = false;
        };

        containerRef.current?.addEventListener("mousedown", handleMouseDown);
        containerRef.current?.addEventListener("mousemove", handleMouseMove);
        containerRef.current?.addEventListener("mouseup", handleMouseUp);

        // Cleanup
        return () => {
          containerRef.current?.removeEventListener("click", placeArtwork);
          containerRef.current?.removeEventListener(
            "touchmove",
            handleTouchMove
          );
          containerRef.current?.removeEventListener("touchend", handleTouchEnd);
          containerRef.current?.removeEventListener(
            "mousedown",
            handleMouseDown
          );
          containerRef.current?.removeEventListener(
            "mousemove",
            handleMouseMove
          );
          containerRef.current?.removeEventListener("mouseup", handleMouseUp);
        };
      } else {
        // Non-AR fallback
        loader.load(imageUrl, (texture) => {
          if (plane) scene.remove(plane);
          plane = createArtwork(texture);
          plane.position.set(0, 0, -2);
          scene.add(plane);
        });
      }
      renderer.setAnimationLoop((time: number, frame: XRFrame) => {
        if (frame && hitTestSource !== undefined && !plane && referenceSpace) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const pose = hit.getPose(referenceSpace);
            if (pose) {
              reticle.visible = true;
              reticle.position.setFromMatrixPosition(
                new THREE.Matrix4().fromArray(pose.transform.matrix)
              );
            }
          }
        }
        renderer.render(scene, camera);
      });
    };

    if (isSupported !== null) {
      initScene();
    }

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [imageUrl, isSupported, arFrameStyle]);

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


