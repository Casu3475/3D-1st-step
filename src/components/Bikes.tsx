import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const PanigaleV4 = () => {
  const model = useLoader(GLTFLoader, "./models/panigaleV4.glb");
  // console.log(model);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  return (
    <>
      <object3D position={[2, 1.4, 6]}>
        <primitive object={model.scene} />
      </object3D>
    </>
  );
};

export default PanigaleV4;
