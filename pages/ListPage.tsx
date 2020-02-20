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
  Platform,
  PermissionsAndroid,
  AsyncStorage
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
  IconButton,
  BottomNavigation
} from "react-native-paper";

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";


import Constants from "expo-constants";
import { NavigationStackProp } from "react-navigation-stack";

// const myData = [];

const URL ="../data/AMBULANZOGD.json"

// Bottom Navigation
const Suche = () => <Text>Suche</Text>;
const Favoriten = () => <Text>Favoriten</Text>;
const Impressum = () => <Text>Impressum</Text>;

// const URL =
//   "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:AMBULANZOGD&srsName=EPSG:4326&outputFormat=json";
//impressum: "https://www.data.gv.at/katalog/dataset/7fcf7f09-12d7-4b06-a183-93c51f940670";  
//apo : "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:APOTHEKEOGD&srsName=EPSG:4326&outputFormat=json";

const array = ["520","421"];

interface ListPageProps {
  navigation: NavigationStackProp<{}>;
}

export default class ListPage extends React.Component<ListPageProps> {
  static navigationOptions = ({ navigation }) => {
    
    return {
      title: "Krankenhäuser Wien",
      // headerRight: () => (
      //   <IconButton
      //     icon="information-outline"
      //     color={"blue"}
      //     size={25}
      //     onPress={() => navigation.navigate("ImpressumPage")}
      //   />
      // )
    };
  };

  state = {
    inputText: "",
    data: [],
    isLoading: false,

  };


  componentDidMount() {
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => this.setState({ data: data.features }))
    //   .catch(error => console.log(error));
    setTimeout(() => {
      const data = require(URL);
      this.setState({ data: data.features, isLoading: false });
      console.log(this.state.data)
    }, 3000);
  }


  getFilteredItems = () =>
    this.state.data.filter(
      value => {
        const KhAbteilung = (value !== null) ? false : value.properties.ABTEILUNG.includes(this.state.inputText)
        return value.properties.KRANKENHAUS_BEZEICHNUNG.includes(this.state.inputText) ||
          KhAbteilung ||
          value.properties.ADRESSE.includes(this.state.inputText) ||
          value.properties.BEZEICHNUNG.includes(this.state.inputText)         
      });
  
// getFilteredItems = () =>
// this.state.data.filter(
//   value => 
//     value.properties.OBJECTID.includes(520)
//   );


  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{ paddingTop: 10 }}
              animating={true}
              color={"blue"}
            />
          ) : (
              <ScrollView
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ padding: 16, marginTop: 10 }}
              >
                <View style={{ zIndex: 10, elevation: 10, paddingTop: 10 }}>
                  <Searchbar
                    placeholder="Suchen"
                    onChangeText={query => this.setState({ inputText: query })}
                    value={this.state.inputText}
                  />
                </View>

                <View style={{ height: 10 }} />

                {this.getFilteredItems().map(value => (
                  <View
                    key={value.properties.OBJECTID}
                    style={{ paddingBottom: 10 }}
                  >
                    <KhItem
                      name={value.properties.KRANKENHAUS_BEZEICHNUNG}
                      adresse={value.properties.ADRESSE}
                      abteilung={value.properties.ABTEILUNG}
                      splitabteilung = {value.properties.ABTEILUNG}
                      objektid = {value.properties.OBJECTID}

                      //const [Abteilung,Ambulanz] = splitabteilung.split('<br />')
                     
                      onKhthekeClicked={() =>
                        this.props.navigation.navigate("DetailPage", {
                          value: value
                        })
                      }
                    />
                  </View>
                ))}
              </ScrollView>

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
  abteilung: string;
  splitabteilung: string;
  objektid: string;
  // const:  [Abteilung:string; Ambulanz];
  onKhthekeClicked(): void;
}



class KhItem extends React.Component<ItemProps> {
  render() {

    const [Abteilung,Ambulanz] = this.props.abteilung.split('<br />')

    return (
      <>
          <Card onPress={this.props.onKhthekeClicked}>
          <Card.Title
            title  = {Ambulanz}
            subtitle={Abteilung}
            left={props => <Avatar.Icon {...props} icon="doctor" />}
          />  
          <Card.Content>
          <Title>{this.props.name}</Title>
          <Paragraph>{this.props.adresse}</Paragraph>
          </Card.Content>

          </Card>
      </>
    );
  }
}

// class KhItem extends React.Component<ItemProps> {
//   render() {
//     return (
//       <>
//           <Card onPress={this.props.onKhthekeClicked}>
//           <Card.Title
//             title  = {this.props.name}
//             subtitle={this.props.adresse}
//             left={props => <Avatar.Icon {...props} icon="doctor" />}
//           />
//         </Card>
//       </>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
