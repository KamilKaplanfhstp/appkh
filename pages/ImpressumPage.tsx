import React from "react";
import { View, Text } from "react-native";

export default class ImpressumPage extends React.Component {
  static navigationOptions = {
    title: "Impressum"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Impressum</Text>
        <Text>Diese App wird entwickelt von Kamil Kaplan</Text>
        <Text>Daten werden bezogen von https://www.data.gv.at/katalog/dataset/7fcf7f09-12d7-4b06-a183-93c51f940670";</Text>

      </View>
    );
  }
}
