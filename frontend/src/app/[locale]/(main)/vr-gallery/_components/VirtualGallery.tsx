"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Button, Group, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notify } from "@/shared/components/notification/notification";
import { useAddCartItemMutation } from "@/store/api/artwork/cart";
import {
  IconInfoCircle,
  IconPaint,
  IconShoppingBag,
  IconUser,
  IconX,
} from "@tabler/icons-react";

interface Artwork {
  id: string;
  title: string;
  images: { url: string }[];
  artist: {
    user: {
      username: string;
    };
  };
  price: number;
  description: string;
}

const VirtualGallery = ({ artworks }: { artworks: Artwork[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [roomStyle, setRoomStyle] = useState("classic");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [addToCart, { isLoading }] = useAddCartItemMutation();

  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const soundRef = useRef<THREE.Audio | null>(null);
  const audioLoaderRef = useRef<THREE.AudioLoader | null>(null);
  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Hide navbar and footer
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (nav) nav.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      document.body.style.overflow = "";
      if (nav) nav.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  // Main scene setup
  useEffect(() => {
    if (!containerRef.current || artworks.length === 0) return;

    // Clear previous scene if it exists
    if (sceneRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    }

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera with safe defaults
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5);
    camera.rotation.set(0, 0, 0);
    cameraRef.current = camera;

    // Initialize audio listener
    const listener = new THREE.AudioListener();
    listenerRef.current = listener;
    camera.add(listener);

    // Initialize audio
    soundRef.current = new THREE.Audio(listener);
    audioLoaderRef.current = new THREE.AudioLoader();

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize OrbitControls with limits
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.minDistance = 0.1;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.screenSpacePanning = true;
    controls.target.set(0, 1.6, 0);
    // Add this in your createGallery function

    const createGalleryLogo = async (scene: THREE.Scene) => {
      try {
        const font = await new Promise<Font>((resolve) => {
          new FontLoader().load(
            "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
            resolve
          );
        });

        // 1. Create a subtle fabric texture instead of grid
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d")!;

        // Create elegant fabric-like pattern
        ctx.fillStyle = "#f8f8f8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(200, 200, 210, 0.3)";
        ctx.lineWidth = 2;

        // Diagonal weave pattern
        for (let i = -canvas.width; i < canvas.width; i += 15) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + canvas.height, canvas.height);
          ctx.stroke();
        }

        const panelTexture = new THREE.CanvasTexture(canvas);
        panelTexture.wrapS = panelTexture.wrapT = THREE.RepeatWrapping;
        panelTexture.repeat.set(2, 2);

        // 2. Create elegant panel with border
        const panelGroup = new THREE.Group();
        panelGroup.position.set(0, 3.5, -10.05);

        // Main panel with fabric texture
        const panelGeometry = new THREE.PlaneGeometry(7, 3);
        const panelMaterial = new THREE.MeshStandardMaterial({
          map: panelTexture,
          color: 0xf5f5f5,
          roughness: 0.5,
          metalness: 0.1,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0,
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panelGroup.add(panel);

        const borderGeometry = new THREE.RingGeometry(3.4, 3.6, 64);
        const borderMaterial = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          roughness: 0.3,
          metalness: 0.9,
          side: THREE.DoubleSide,
        });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.rotation.x = Math.PI / 2;
        border.position.z = -0.01;
        panelGroup.add(border);

        scene.add(panelGroup);

        const createText = (text: string, size: number, yOffset: number) => {
          const textGeom = new TextGeometry(text, {
            font: font,
            size: size,
            depth: 0.05,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.01,
          });

          textGeom.computeBoundingBox();
          const textWidth =
            textGeom.boundingBox!.max.x - textGeom.boundingBox!.min.x;

          const textMesh = new THREE.Mesh(
            textGeom,
            new THREE.MeshStandardMaterial({
              color: 0x222222,
              metalness: 0.7,
              roughness: 0.2,
              transparent: true,
              opacity: 0, // Start transparent
            })
          );

          textMesh.position.set(-textWidth / 2, yOffset, -10.03);
          return textMesh;
        };

        const kuruText = createText("KURU", 0.8, 3.7);
        const galleryText = createText("GALLERY", 0.7, 3.0);

        scene.add(kuruText);
        scene.add(galleryText);

        // 4. Enhanced animations
        let animationRunning = true;
        const startTime = Date.now();

        const animateAll = () => {
          if (!animationRunning) return;

          const time = (Date.now() - startTime) / 1000;

          // Entrance animation (first 2 seconds)
          if (time < 2) {
            const progress = time / 2;
            panelMaterial.opacity = progress * 0.9;
            kuruText.material.opacity = progress;
            galleryText.material.opacity = progress;

            // Gentle drop effect
            panelGroup.position.y = 3.5 - (1 - progress) * 0.2;
          }

          // Continuous pulsing
          const pulse = Math.sin(time * 1.5) * 0.05 + 0.95;
          panelMaterial.emissiveIntensity = pulse * 0.1;

          // Text subtle animation
          kuruText.position.y = 3.7 + Math.sin(time * 1.2) * 0.01;
          galleryText.position.y = 3.0 + Math.sin(time * 1.4) * 0.01;

          // Border shimmer
          borderMaterial.emissiveIntensity = Math.sin(time * 2) * 0.2 + 0.3;

          requestAnimationFrame(animateAll);
        };

        animateAll();

        // 5. Interactive hover effect
        const onMouseMove = (event: MouseEvent) => {
          const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects([
            panel,
            kuruText,
            galleryText,
          ]);

          if (intersects.length > 0) {
            // Highlight effect
            panelMaterial.emissive.setHex(0xaaaaaa);
            borderMaterial.emissive.setHex(0xffd700);
          } else {
            // Return to normal
            panelMaterial.emissive.setHex(0x000000);
            borderMaterial.emissive.setHex(0x000000);
          }
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
          animationRunning = false;
          window.removeEventListener("mousemove", onMouseMove);
        };
      } catch (error) {
        console.error("Error creating gallery logo:", error);
      }
    };
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;

      // Rotate camera based on mouse movement
      camera.rotation.y -= deltaX * 0.002;
      camera.rotation.x -= deltaY * 0.002;

      // Limit vertical rotation
      camera.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, camera.rotation.x)
      );

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight1.position.set(-10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight2.position.set(10, 10, 10);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight3.position.set(0, 10, -10);
    scene.add(directionalLight3);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    // Load assets and create gallery
    const textureLoader = new THREE.TextureLoader();
    const fontLoader = new FontLoader();

    const loadAssets = async () => {
      try {
        const font = await new Promise<Font>((resolve) => {
          fontLoader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            resolve
          );
        });

        createGallery(scene, artworks.slice(0, 10), font);
        await createGalleryLogo(scene);
        setLoading(false);
      } catch (error) {
        console.error("Error loading assets:", error);
      }
    };

    const createGallery = (
      scene: THREE.Scene,
      artworks: Artwork[],
      font: Font
    ) => {
      // Clear previous gallery elements
      scene.children = scene.children.filter(
        (obj) => obj.userData.isGalleryElement !== true
      );

      // Create floor
      const floorGeometry = new THREE.PlaneGeometry(30, 20);
      const floorTexture = textureLoader.load(
        "https://threejs.org/examples/textures/hardwood2_diffuse.jpg"
      );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(4, 4);
      const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.8,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0;
      floor.receiveShadow = true;
      floor.userData.isGalleryElement = true;
      scene.add(floor);

      // Create walls
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: roomStyle === "modern" ? 0xeeeeee : 0xf5f5f5,
        roughness: 0.7,
      });

      const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 5),
        wallMaterial
      );
      backWall.position.set(0, 2.5, -10);
      backWall.userData.isGalleryElement = true;
      scene.add(backWall);

      const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 5),
        wallMaterial
      );
      leftWall.position.set(-15, 2.5, 0);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.userData.isGalleryElement = true;
      scene.add(leftWall);

      const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 5),
        wallMaterial.clone()
      );
      rightWall.position.set(15, 2.5, 0);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.userData.isGalleryElement = true;
      scene.add(rightWall);

      // Create ceiling
      const ceilingGeometry = new THREE.PlaneGeometry(30, 20);
      const ceilingTexture = new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/brick_diffuse.jpg"
      );
      ceilingTexture.wrapS = THREE.RepeatWrapping;
      ceilingTexture.wrapT = THREE.RepeatWrapping;
      ceilingTexture.repeat.set(6, 6); // Adjust repeat for proper brick scale

      const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0x999999, // Medium grey base color
        map: ceilingTexture, // Brick pattern texture
        side: THREE.DoubleSide,
        roughness: 0.7, // Slightly rough surface
        metalness: 0.1, // Minimal reflectivity
        bumpMap: ceilingTexture, // Add depth to bricks
        bumpScale: 0.02, // Subtle brick relief
      });

      const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
      ceiling.position.y = 5;
      ceiling.rotation.x = Math.PI / 2;
      ceiling.receiveShadow = true;
      ceiling.userData.isGalleryElement = true;
      scene.add(ceiling);

      const ceilingLights = new THREE.Group();
      for (let i = -12; i <= 12; i += 6) {
        for (let j = -8; j <= 8; j += 6) {
          const light = new THREE.PointLight(0xffffff, 0.5, 5);
          light.position.set(i, 4.8, j);
          ceilingLights.add(light);

          const fixture = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16),
            new THREE.MeshStandardMaterial({ color: 0x333333 })
          );
          fixture.position.set(i, 4.9, j);
          fixture.rotation.x = Math.PI / 2;
          ceilingLights.add(fixture);
        }
      }
      scene.add(ceilingLights);

      // Add artworks
      artworks.forEach((artwork, index) => {
        const wallIndex = index % 3;
        const position = new THREE.Vector3();
        let rotation = 0;

        if (wallIndex === 0) {
          position.set(-12 + (index % 5) * 6, 2.5, -9.99);
        } else if (wallIndex === 1) {
          position.set(-14.99, 2.5, -8 + (index % 4) * 5);
          rotation = Math.PI / 2;
        } else {
          position.set(14.99, 2.5, -8 + (index % 4) * 5);
          rotation = -Math.PI / 2;
        }

        createArtworkDisplay(scene, artwork, position, rotation, font);
      });

      // Add decorations
      addGalleryDecorations(scene, roomStyle);
    };

    const createArtworkDisplay = (
      scene: THREE.Scene,
      artwork: Artwork,
      position: THREE.Vector3,
      rotation: number,
      font: Font
    ) => {
      const group = new THREE.Group();
      group.position.copy(position);
      group.rotation.y = rotation;
      group.userData.artwork = artwork;
      group.userData.isGalleryElement = true;

      // Frame
      const frameGeometry = new THREE.BoxGeometry(4, 3, 0.2);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color:
          roomStyle === "modern"
            ? 0x333333
            : roomStyle === "ornate"
            ? 0xc9b037
            : 0x8b4513,
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.castShadow = true;
      group.add(frame);

      // Artwork
      textureLoader.load(artwork.images[0].url, (texture) => {
        const artworkGeometry = new THREE.PlaneGeometry(3.5, 2.5);
        const artworkMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const artworkMesh = new THREE.Mesh(artworkGeometry, artworkMaterial);
        artworkMesh.position.z = 0.15;
        artworkMesh.userData.clickable = true;
        artworkMesh.userData.artwork = artwork;
        group.add(artworkMesh);
      });

      // Label
      const labelGeometry = new TextGeometry(
        `${artwork.title}\n${artwork.artist.user.username}`,
        {
          font: font,
          size: 0.15,
          depth: 0.01,
        }
      );
      const labelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(-1.5, -1.8, 0.11);
      group.add(label);

      scene.add(group);
    };

    const addGalleryDecorations = (scene: THREE.Scene, style: string) => {
      // Benches
      const benchGeometry = new THREE.BoxGeometry(3, 0.5, 0.5);
      const benchMaterial = new THREE.MeshStandardMaterial({
        color: style === "modern" ? 0x333333 : 0x8b4513,
      });

      const bench1 = new THREE.Mesh(benchGeometry, benchMaterial);
      bench1.position.set(-6, 0.25, -5);
      bench1.userData.isGalleryElement = true;
      scene.add(bench1);

      const bench2 = new THREE.Mesh(benchGeometry, benchMaterial);
      bench2.position.set(6, 0.25, -5);
      bench2.userData.isGalleryElement = true;
      scene.add(bench2);

      // Plants
      if (style !== "modern") {
        const plantGeometry = new THREE.ConeGeometry(0.5, 1, 8);
        const plantMaterial = new THREE.MeshStandardMaterial({
          color: 0x228b22,
        });
        const plant = new THREE.Mesh(plantGeometry, plantMaterial);
        plant.position.set(-12, 0.5, 5);
        plant.userData.isGalleryElement = true;
        scene.add(plant);

        const plant2 = new THREE.Mesh(plantGeometry, plantMaterial);
        plant2.position.set(12, 0.5, 5);
        plant2.userData.isGalleryElement = true;
        scene.add(plant2);
      }
    };

    // Event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      const moveSpeed = 0.2;
      const rotationAngle = 0.02;
      const maxVerticalAngle = Math.PI / 2 - 0.1;

      if (e.key === "m") {
        setAudioPlaying((prev) => !prev);
        return;
      }

      if (
        [
          "a",
          "d",
          "w",
          "s",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      switch (e.key.toLowerCase()) {
        case "ArrowUp":
          // Move forward in the direction camera is facing
          camera.translateZ(-moveSpeed);
          break;
        case "ArrowDown":
          // Move backward
          camera.translateZ(moveSpeed);
          break;
        case "ArrowLeft":
          // Strafe left
          camera.translateX(-moveSpeed);
          break;
        case "ArrowRight":
          // Strafe right
          camera.translateX(moveSpeed);
          break;
      }
    };

    const onMouseClick = (event: MouseEvent) => {
      event.preventDefault();

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      for (const intersect of intersects) {
        if (intersect.object.userData.clickable) {
          setSelectedArtwork(intersect.object.userData.artwork);
          break;
        }
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop with camera validation
    const animate = () => {
      requestAnimationFrame(animate);

      if (isValidCamera(camera)) {
        controls.update();
        renderer.render(scene, camera);
      } else {
        resetCamera();
      }
    };

    const isValidCamera = (camera: THREE.PerspectiveCamera) => {
      return [
        camera.position.x,
        camera.position.y,
        camera.position.z,
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z,
      ].every(Number.isFinite);
    };

    const resetCamera = () => {
      camera.position.set(0, 1.6, 5);
      camera.rotation.set(0, 0, 0);
      controls.reset();
    };

    // Load audio
    const loadAudio = async () => {
      if (!audioLoaderRef.current || !soundRef.current) return;

      try {
        const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
          audioLoaderRef.current!.load(
            "/audio/betterdays.mp3",
            resolve,
            undefined,
            reject
          );
        });

        soundRef.current!.setBuffer(buffer);
        soundRef.current!.setLoop(true);
        soundRef.current!.setVolume(0.5);
        if (audioPlaying) soundRef.current!.play();
      } catch (err) {
        console.error("Audio load error:", err);
      }
    };

    // Initialize everything
    loadAssets();
    loadAudio();

    // Add event listeners
    window.addEventListener("resize", onWindowResize);
    renderer.domElement.addEventListener("click", onMouseClick, false);
    renderer.domElement.addEventListener("mousedown", onMouseDown, false);
    renderer.domElement.addEventListener("mouseup", onMouseUp, false);
    renderer.domElement.addEventListener("mouseleave", onMouseUp, false);
    renderer.domElement.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("keydown", handleKeyDown);

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.domElement.removeEventListener("click", onMouseClick, false);
      renderer.domElement.removeEventListener("mousedown", onMouseDown, false);
      renderer.domElement.removeEventListener("mouseup", onMouseUp, false);
      renderer.domElement.removeEventListener("mouseleave", onMouseUp, false);
      renderer.domElement.removeEventListener("mousemove", onMouseMove, false);
      document.removeEventListener("keydown", handleKeyDown);

      // Dispose Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });

      // Stop and clean up audio
      if (soundRef.current?.isPlaying) {
        soundRef.current.stop();
      }
      soundRef.current?.disconnect();
      soundRef.current = null;

      // Remove listener from camera
      if (listenerRef.current) {
        camera.remove(listenerRef.current);
        listenerRef.current = null;
      }

      // Dispose renderer and controls
      renderer.dispose();
      controls.dispose();

      // Remove renderer from DOM
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [artworks, roomStyle]); // Only recreate when artworks or roomStyle changes

  // Audio control effect
  useEffect(() => {
    if (!soundRef.current) return;

    if (audioPlaying) {
      try {
        soundRef.current.play();
      } catch (e: any) {
        console.error("Audio play failed:", e);
      }
    } else {
      soundRef.current.pause();
    }
  }, [audioPlaying]);

  const toggleAudio = () => {
    setAudioPlaying((prev) => !prev);
  };

  const changeRoomStyle = (style: string) => {
    setRoomStyle(style);
  };
  const [isInCart, setIsInCart] = useState(false);
  const handleAddToCart = async (id: any) => {
    try {
      await addToCart({ artwork_id: id }).unwrap();
      setIsInCart(true);
      notify("Success", "Added to cart");
    } catch (error) {
      notify("Error", "Failed to add to cart");
      console.log(error);
    }
  };
  return (
    <div className="relative w-full h-screen" style={{ margin: 0, padding: 0 }}>
      <LoadingOverlay visible={loading} />

      {/* Gallery canvas */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ position: "fixed", top: 0, left: 0 }}
      />

      {/* UI Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
        <button
          onClick={() => changeRoomStyle("classic")}
          className={`px-4 py-2 rounded-lg ${
            roomStyle === "classic"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
        >
          Classic
        </button>
        <button
          onClick={() => changeRoomStyle("modern")}
          className={`px-4 py-2 rounded-lg ${
            roomStyle === "modern"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
        >
          Modern
        </button>
        <button
          onClick={() => changeRoomStyle("ornate")}
          className={`px-4 py-2 rounded-lg ${
            roomStyle === "ornate"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white"
          }`}
        >
          Ornate
        </button>
        <button
          onClick={toggleAudio}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          {audioPlaying ? (
            <>
              <span className="mr-2">🔊</span> Mute Audio
            </>
          ) : (
            <>
              <span className="mr-2">🔇</span> Play Audio
            </>
          )}
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Exit Gallery
        </button>
      </div>

      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative space-y-4">
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <IconX size={24} />
            </button>

            {/* Artwork Title */}
            <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-2 text-capitalize">
              <IconPaint size={24} />
              {selectedArtwork.title}
            </h2>

            {/* Artist */}
            <p className="text-md text-gray-600 mb-2 flex items-center gap-2">
              <IconUser size={18} className="text-gray-500" />
              by{" "}
              <span className="font-medium text-gray-800">
                {selectedArtwork.artist.user.username}
              </span>
            </p>

            <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={selectedArtwork.images[0].url}
                alt={selectedArtwork.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <p className="text-gray-800 text-sm leading-relaxed flex gap-2">
              <IconInfoCircle size={18} className="text-gray-600 mt-0.5" />
              {selectedArtwork.description}
            </p>

            <Group mt="md" className="justify-end gap-3">
              <Button
                variant="outline"
                color="gray"
                onClick={() => setSelectedArtwork(null)}
                leftSection={<IconX size={18} />}
              >
                Close
              </Button>
              <Button
                onClick={() => handleAddToCart(selectedArtwork?.id)}
                loading={isLoading}
                leftSection={<IconShoppingBag size={18} />}
              >
                Add to Cart
              </Button>
            </Group>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualGallery;
