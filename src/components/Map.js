const Map = ({ first, second, opacity }) => {
  const styles = {
    parent: {
      position: "relative",
      top: "0",
      left: "0",
    },
    behindImage: {
      position: "relative",
      top: "0",
      left: "0",
    },
    frontImage: {
      position: "absolute",
      top: "0",
      left: "0",
      opacity: `${opacity}`,
    },
  };

  return (
    <div>
      <div style={styles.parent}>
        <img style={styles.behindImage} src={second} width="520" alt="second" />
        <img style={styles.frontImage} src={first} width="520" alt="first" />
      </div>
    </div>
  );
};
export default Map;
