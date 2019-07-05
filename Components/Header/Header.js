import React from "react";
import { Button, Header } from "react-native-elements";

const styles = {
  container: {
    height: 50,
    paddingTop: -20
  }
};

const LocationHeader = props => {
  return (
    <Header
      containerStyle={styles.container}
      centerComponent={
        <Button
          title={props.location}
          onPress={() => console.warn("Change location")}
          type={"clear"}
        />
      }
      statusBarProps={{ barStyle: "light-content" }}
    />
  );
};

export default LocationHeader;
