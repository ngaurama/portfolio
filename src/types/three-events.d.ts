import * as THREE from "three";

declare module "three" {
  interface Object3DEventMap {
    click: THREE.Event;
    pointerenter: THREE.Event;
    pointerleave: THREE.Event;
  }
}
