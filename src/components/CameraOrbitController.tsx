import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const CameraOrbitController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.1;
    // controls.enableZoom = true;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default CameraOrbitController;
