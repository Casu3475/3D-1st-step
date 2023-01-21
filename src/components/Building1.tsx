import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Building1 = () => {
  const model = useLoader(GLTFLoader, "./models/building1.glb");
  // console.log(model);
  model.scene.scale.set(50, 50, 50);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  return (
    <>
      <object3D position={[-300, 0, -300]}>
        <primitive object={model.scene} />
      </object3D>
    </>
  );
};

export default Building1;
