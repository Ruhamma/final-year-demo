import * as THREE from "three";
import { JSX } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      meshStandardMaterial: ReactThreeFiber.MaterialNode<
        THREE.MeshStandardMaterial,
        typeof THREE.MeshStandardMaterial
      >;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.PlaneGeometry,
        typeof THREE.PlaneGeometry
      >;
      ambientLight: ReactThreeFiber.Object3DNode<
        THREE.AmbientLight,
        typeof THREE.AmbientLight
      >;
      pointLight: ReactThreeFiber.Object3DNode<
        THREE.PointLight,
        typeof THREE.PointLight
      >;
      perspectiveCamera: ReactThreeFiber.Object3DNode<
        THREE.PerspectiveCamera,
        typeof THREE.PerspectiveCamera
      >;

      // Add any other Three.js elements you use
    }
  }
}
