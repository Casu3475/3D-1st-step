import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const City = () => {
  const model = useLoader(GLTFLoader, "./models/city.glb");
  // console.log(model);
  model.scene.scale.set(80, 80, 80);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  return (
    <>
      <object3D position={[-200, 0, -200]}>
        <primitive object={model.scene} />
      </object3D>
    </>
  );
};

export default City;
