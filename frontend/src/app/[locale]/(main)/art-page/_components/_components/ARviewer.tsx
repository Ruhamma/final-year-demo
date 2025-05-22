"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

interface ARViewerProps {
  imageUrl: string; // URL from your backend
}

const ARViewer: React.FC<ARViewerProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!navigator.xr) {
      alert("WebXR is not supported on this device/browser.");
      return;
    }

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

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default ARViewer;
