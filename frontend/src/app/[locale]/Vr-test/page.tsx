"use client";
import { useGLTF } from "@react-three/drei";
import { Object3D } from "three";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@mantine/core";
export default function GalleryModel() {
  const { scene } = useGLTF(
    "/models/the-mardou-museum/source/MardouMuseumResult.glb"
  ) as { scene: Object3D };
  return (
    <Box className="w-[100vw] h-[100vh]">
      <Canvas>
        <primitive object={scene} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </Box>
  );
}
