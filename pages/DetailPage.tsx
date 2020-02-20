import { View, Text, Linking, Platform, PermissionsAndroid, AsyncStorage } from "react-native";
import React from "react";
import {
  Card,
  Avatar,
  Title,
  Paragraph,
  Button,
  List,
  Divider,
  IconButton
} from "react-native-paper";


import { NavigationStackProp } from "react-navigation-stack";

interface DetailPageProps {
  navigation: NavigationStackProp<{}>;

}

export default class DetailPage extends React.Component<DetailPageProps> {

  
    setAsFavorite = async () => {
      try {
        await AsyncStorage.setItem('key', 'My Value');
        // OBJECTID
      } catch (error) {
        // Error saving data
      }
    };

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
          // We have data!!
          console.log(value);
        } else {console.log ("hir")}
      } catch (error) {
        console.log(error);
      }
    };

    remove = async () => {
      try {
        await AsyncStorage.removeItem('key');
      } catch (error) {
      }
    };


  static navigationOptions = ({ navigation }) => {

    return {
      title: "Details",

    };
  };



  openMaps = (lat, lng) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  render() {
    const value = this.props.navigation.getParam("value");

    const geo = value.geometry.coordinates;

    const { KRANKENHAUS_BEZEICHNUNG, ABTEILUNG, BEZEICHNUNG, ADRESSE, TELEFON, EMAIL, WEBLINK1 } = value.properties;

    const [Abteilung, Ambulanz] = ABTEILUNG.split('<br />')

    // "KRANKENHAUS_BEZEICHNUNG": "Sozialmedizinisches Zentrum Ost - Donauspital",
    // "ABTEILUNG": "Dermatologische Abteilung<br />Dermatologische Ambulanz",
    // "BEZEICHNUNG": "Dermatologische Spezialambulanz für Kinder",

    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content>
            <Title>{KRANKENHAUS_BEZEICHNUNG}</Title>

            <Button icon="heart" onPress ={() => this.setAsFavorite()}>
              Als Favorit speichern
            </Button>

            <Button icon="camera" onPress ={() => this._retrieveData()}>
              speicher auslesen
            </Button>

            <Button icon="camera" onPress ={() => this.remove()}>
              delete
            </Button>

            <Paragraph>{Abteilung}</Paragraph>
            <Paragraph>{Ambulanz}</Paragraph>
            <Paragraph>{BEZEICHNUNG}</Paragraph>
            <Paragraph>{ADRESSE}</Paragraph>
            <List.Section>
              <Divider />
              {TELEFON && (
                <List.Item
                  onPress={() => Linking.openURL(`tel:${TELEFON}`)}
                  title={"Telefon: " + TELEFON}
                  left={() => <List.Icon icon="phone" />}
                />
              )}

              {EMAIL && (
                <List.Item
                  onPress={() => Linking.openURL("mailto:" + EMAIL)}
                  title={"Mail: " + EMAIL}
                  left={() => <List.Icon color="#000" icon="email" />}
                />
              )}
              {WEBLINK1 && (
                <List.Item
                  onPress={() => Linking.openURL(WEBLINK1)}
                  title={"Website: " + WEBLINK1}
                  left={() => <List.Icon color="#000" icon="web" />}
                />
              )}
              {geo && (
                <List.Item
                  onPress={() => this.openMaps(geo[1], geo[0])}
                  title={"Auf Karte anzeigen"}
                  left={() => <List.Icon color="#000" icon="map" />}
                />
              )}
            </List.Section>
          </Card.Content>
        </Card>
      </View>
    );
  }
}
