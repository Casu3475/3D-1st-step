import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect } from "react";

type treeType = {
  position: { x: number; z: number };
  box: number;
};

type props = {
  boundary: number;
  count: number;
};

const Trees: React.FC<props> = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "./models/tree.glb");
  // console.log(model);
  const [trees, setTrees] = useState<treeType[]>([]);

  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  const isOverlapping = (index: number, tree: any, trees: any[]) => {
    // console.log(tree.position);
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    for (let i = 0; i < index; i++) {
      if (i === index) continue;
      let minX = trees[i].position.x - trees[i].box / 2;
      let maxX = trees[i].position.x + trees[i].box / 2;
      let minZ = trees[i].position.z - trees[i].box / 2;
      let maxZ = trees[i].position.z + trees[i].box / 2;
      if (
        boxIntersect(
          minTargetX,
          maxTargetX,
          minTargetZ,
          maxTargetZ,
          minX,
          maxX,
          minZ,
          maxZ
        )
      ) {
        // console.log("content box overlapping", tree.position);
        return true;
      }
    }
    return false;
  };

  const newPosition = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray: treeType[], boundary: number) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index, tree, treeArray));
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees: treeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    console.log(tempTrees);
    updatePosition(tempTrees, boundary);
  }, [boundary, count]);

  return (
    <group rotation={[0, 4, 0]}>
      {trees.map((tree, index) => {
        return (
          <object3D
            key={index}
            position={[tree.position.x, 0, tree.position.z]}
          >
            <mesh scale={[tree.box, tree.box, tree.box]}>
              <boxGeometry />
              <meshBasicMaterial color={"black"} wireframe />
            </mesh>
            <primitive object={model.scene.clone()} />
          </object3D>
        );
      })}
    </group>
  );
};

// <object3D position={[6, 0, 0]}>
//   <primitive object={model.scene.clone()} />
// </object3D>

export default Trees;
