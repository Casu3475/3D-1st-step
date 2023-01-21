import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  Torus,
  useTexture,
  TransformControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import Trees from "../components/Trees";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Bikes from "../components/Bikes";
import Church from "../components/Church";
// import Building1 from "../components/Building1";
import Player from "../components/Player";
// import City from "../components/City";

const Home: NextPage = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows camera={{ position: [1, 1, 0] }}>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[50]} /> : null}
        {testing ? <gridHelper args={[1000, 1000]} /> : null}
        <OrbitControls />
        <Bikes />
        <Trees boundary={200} count={100} />
        <Lights />
        <Ground />
        <Church />
        {/* <Building1 /> */}
        <Player />
        {/* <City /> */}
      </Canvas>
    </div>
  );
};

export default Home;
