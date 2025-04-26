import * as THREE from "three";

declare module "three" {
  interface Object3DEventMap {
    select: { target: THREE.Object3D };
    squeeze: { target: THREE.Object3D };
    end: { target: THREE.Object3D };
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: JSX.IntrinsicElements["group"] &
        THREE.AmbientLightParameters;
      pointLight: JSX.IntrinsicElements["group"] & THREE.PointLightParameters;
      mesh: JSX.IntrinsicElements["group"] & THREE.MeshParameters;
    }
  }
}
