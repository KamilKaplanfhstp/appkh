import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  FlatList
  Platform
} from "react-native";
import {
  Provider as PaperProvider,
  Card,
  Avatar,
  Title,
  Paragraph,
  Button,
  Searchbar,
  ActivityIndicator,
  IconButton
} from "react-native-paper";
import Constants from "expo-constants";
import { NavigationStackProp } from "react-navigation-stack";

const myData = [];

const URL =
"https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:AMBULANZOGD&srsName=EPSG:4326&outputFormat=json"; 
//impressum: "https://www.data.gv.at/katalog/dataset/7fcf7f09-12d7-4b06-a183-93c51f940670";  
//apo : "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:APOTHEKEOGD&srsName=EPSG:4326&outputFormat=json";

interface ListPageProps {
  navigation: NavigationStackProp<{}>;
}

export default class ListPage extends React.Component<ListPageProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Krankenhäuser Wien",
      headerRight: () => (
        <IconButton
          icon="information-outline"
          color={"blue"}
          size={25}
          onPress={() => navigation.navigate("ImpressumPage")}
        />
      )
    };
  };

  state = {
    inputText: "",
    data: [],
    isLoading: false
  };

  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(data => this.setState({ data: data.features }))
      .catch(error => console.log(error));
    // this.setState({ isLoading: true });
    // fakeHttpRequest()
    //   .then(response =>
    //     this.setState({ data: response.features, isLoading: false })
    //   );
  }

  getFilteredItems = () =>
    this.state.data.filter(
      value =>
        value.properties.KRANKENHAUS_BEZEICHNUNG.includes(this.state.inputText) ||
        value.properties.ADRESSE.includes(this.state.inputText)
    );

  render() {
    const marginTop = Platform.OS === "android" ? 30 : 0;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{ paddingTop: 40 }}
              animating={true}
              color={"blue"}
            />
          ) : (
            <>
              <FlatList data={this.getFilteredItems()} 
              this.renderItem={(item)} />

              <View
                  key={value.properties.OBJECTID}
                  style={{ paddingBottom: 16 }}
                >
                  <ApothekenItem
                    adresse={value.properties.ADRESSE}
                    name={value.properties.KRANKENHAUS_BEZEICHNUNG}
                    onApothekeClicked={() =>
                      this.props.navigation.navigate("DetailPage", {
                        value: value
                      })
                    }
                  />
                </View>

              stickyHeaderIndices={[0]}
              contentContainerStyle={{ padding: 16, marginTop: marginTop }}
            >
              <View style={{ zIndex: 10, elevation: 10, paddingTop: 10 }}>
                <Searchbar
                  placeholder="Search"
                  onChangeText={query => this.setState({ inputText: query })}
                  value={this.state.inputText}
                />
              </View>

              <View style={{ height: 16 }} />

            </>
          )}
        </PaperProvider>
      </SafeAreaView>
    );
  }
}

// function fakeHttpRequest(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = require("../data/apotheken.json");
//       resolve(data);
//     }, 3000);
//   });
// }

interface ItemProps {
  name: string;
  adresse: string;
  onApothekeClicked(): void;
}

class ApothekenItem extends React.Component<ItemProps> {
  render() {
    return (
      <>
        <Card onPress={this.props.onApothekeClicked}>
          <Card.Title
            title={this.props.name}
            subtitle={this.props.adresse}
            left={props => <Avatar.Icon {...props} icon="doctor" />}
          />
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
