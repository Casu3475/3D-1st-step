import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Church = () => {
  const model = useLoader(GLTFLoader, "./models/church.glb");
  // console.log(model);
  model.scene.scale.set(800, 800, 800);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  return (
    <>
      <object3D position={[100, 0, 100]}>
        <primitive object={model.scene} />
      </object3D>
    </>
  );
};

export default Church;
