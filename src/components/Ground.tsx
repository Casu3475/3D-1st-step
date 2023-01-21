const Ground: React.FC = () => {
  return (
    <mesh rotation-x={Math.PI * -0.5} receiveShadow>
      <planeGeometry args={[2500, 2500]} />
      <meshStandardMaterial color={"#857979"} />
    </mesh>
  );
};

export default Ground;
