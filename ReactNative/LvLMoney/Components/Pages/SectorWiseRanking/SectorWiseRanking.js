import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListDropDown from "../../Parts/ListDropDown/ListDropDown";
import Server_Path from "../../Parts/Server/Server";

const pixelratio = PixelRatio.get();

export default class SectorWiseRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Automobiles: [],
      Banking: [],
      Fmcg: [],
      InformationTechnology: [],
      Media: [],
      Metal: [],
      Pharmaceutical: [],
      Realty: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.fetchleaders = this.fetchleaders.bind(this);
    this.sortdata = this.sortdata.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  sortdata(data) {
    let AUTOMOBILE = [],
      FINANCIALSERVICES = [],
      CONSUMERGOODS = [],
      IT = [],
      MEDIA = [],
      METALS = [],
      CONSTRUCTION = [],
      PHARMA = [];
    for (var key in data) {
      if (data[key] === "AUTOMOBILE") {
        AUTOMOBILE.push(key);
      } else if (data[key] === "FINANCIAL SERVICES") {
        FINANCIALSERVICES.push(key);
      } else if (data[key] === "CONSUMER GOODS") {
        CONSUMERGOODS.push(key);
      } else if (data[key] === "IT") {
        IT.push(key);
      } else if (data[key] === "MEDIA ENTERTAINMENT & PUBLICATION") {
        MEDIA.push(key);
      } else if (data[key] === "METALS") {
        METALS.push(key);
      } else if (data[key] === "CONSTRUCTION") {
        CONSTRUCTION.push(key);
      } else if (data[key] === "PHARMA") {
        PHARMA.push(key);
      }
    }
    this.setState({
      Automobiles: AUTOMOBILE,
      Banking: FINANCIALSERVICES,
      Fmcg: CONSUMERGOODS,
      InformationTechnology: IT,
      Media: MEDIA,
      Metal: METALS,
      Pharmaceutical: PHARMA,
      Realty: CONSTRUCTION,
    });
  }

  fetchleaders() {
    fetch(Server_Path.concat("/sectorleaders/"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.sortdata(json);
      })
      .catch((error) => {
        alert("Something Went Wrong");
      });
  }

  componentDidMount() {
    this.fetchleaders();
  }

  render() {
    return (
      <View style={styles.SectorWiseRankingBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.SectorWiseRankingHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.SectorWiseRankingTextHeader}>
            Sector Wise Rankings
          </Text>
        </TouchableOpacity>
        {(() => {
          if (this.state.Automobiles.length === 0) {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontFamily: "Trebuchet",
                    fontSize: 40 / pixelratio,
                    marginTop: -100 / pixelratio,
                  }}
                >
                  Fetching Details from the Server...
                </Text>
              </View>
            );
          } else {
            return (
              <ScrollView>
                <ListDropDown
                  Title="Automobiles"
                  Description="Indian Automobiles Sector including but not limited to Vehicles such as 4-Wheelers, 2-Wheelers, etc."
                  Stocks={this.state.Automobiles}
                />
                <ListDropDown
                  Title="Banking"
                  Description="The Banking Sector includes the largest Indian Banking Stock, both Public and Private."
                  Stocks={this.state.Banking}
                />
                <ListDropDown
                  Title="FMCG"
                  Description="FMCG, which stands for Fast Moving Consumer Goods, consists of companies that provide goods that are non-durable and are available on and off the shelf."
                  Stocks={this.state.Fmcg}
                />
                <ListDropDown
                  Title="Information Technology"
                  Description="Information Technology, often abbreviated as IT, roughly includes companies that provide Technological Solutions and generally deal with creating software for clients and customers."
                  Stocks={this.state.InformationTechnology}
                />
                <ListDropDown
                  Title="Media"
                  Description="When we talk about the Media Sector, we talk about companies that provide services such as entertainment, printing, and publishing."
                  Stocks={this.state.Media}
                />
                <ListDropDown
                  Title="Metal"
                  Description="The Metal Sector covers companies that provide raw materials and mining services in India."
                  Stocks={this.state.Metal}
                />
                <ListDropDown
                  Title="Pharmaceutical "
                  Description="The Pharmaceutical industry discovers, develops, produces, and markets drugs or pharmaceutical drugs for use as medications to be administered to patients, with the aim to cure them, vaccinate them, or alleviate the symptoms."
                  Stocks={this.state.Pharmaceutical}
                />
                <ListDropDown
                  Title="Realty"
                  Description="The Realty industry companies that are primarily engaged into the construction of residential and commercial properties."
                  Stocks={this.state.Realty}
                />
              </ScrollView>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SectorWiseRankingBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  SectorWiseRankingHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  SectorWiseRankingTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
});
