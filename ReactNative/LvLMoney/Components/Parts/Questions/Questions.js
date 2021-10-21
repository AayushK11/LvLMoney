import React from "react";
import {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";

const pixelratio = PixelRatio.get();

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Choice: -1,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        {(() => {
          if (this.props.QuestionNo === 0 || this.props.QuestionNo === 11) {
            return (
              <View>
                <Text style={styles.QuestionWelcome}>{this.props.Text1}</Text>
                <Text style={styles.QuestionWelcome}>{this.props.Text2}</Text>
                <Text style={styles.QuestionWelcome}>{this.props.Text3}</Text>
                <View
                  style={{
                    marginHorizontal: 100 / pixelratio,
                    marginTop: 100 / pixelratio,
                  }}
                >
                  <TouchableHighlight
                    style={styles.QuestionsNextButton}
                    underlayColor="#007AFF"
                    onPress={() => {
                      if (this.props.QuestionNo === 0) {
                        this.props.QuestionSwitch(0, "Next");
                      } else {
                        this.setState({ Choice: -1 });
                        this.props.QuestionSwitch(0, "Reset");
                      }
                    }}
                  >
                    <Text style={styles.QuestionsButtonText}>
                      {this.props.QuestionNo === 0
                        ? "Agree and Begin Test"
                        : "Retake the Test"}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            );
          } else {
            return (
              <View>
                <Text style={styles.QuestionText}>{this.props.Question}</Text>
                <View
                  style={{
                    flexDirection: "column",
                    marginHorizontal: 100 / pixelratio,
                    marginTop: 50 / pixelratio,
                  }}
                >
                  <View>
                    <View style={styles.QuestionsRadioButton}>
                      <RadioButton.Android
                        value={9}
                        status={
                          this.state.Choice === 9 ? "checked" : "unchecked"
                        }
                        onPress={() => this.setState({ Choice: 9 })}
                        color={"#00c9ff"}
                        uncheckedColor="#ffffff"
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ Choice: 9 })}
                      >
                        <Text style={styles.QuestionsRadioButtonText}>
                          {this.props.Option1}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "white",
                        marginVertical: 25 / pixelratio,
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View>
                    <View style={styles.QuestionsRadioButton}>
                      <RadioButton.Android
                        value={7}
                        status={
                          this.state.Choice === 7 ? "checked" : "unchecked"
                        }
                        onPress={() => this.setState({ Choice: 7 })}
                        color={"#00c9ff"}
                        uncheckedColor="#ffffff"
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ Choice: 7 })}
                      >
                        <Text style={styles.QuestionsRadioButtonText}>
                          {this.props.Option2}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "white",
                        marginVertical: 25 / pixelratio,
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View>
                    <View style={styles.QuestionsRadioButton}>
                      <RadioButton.Android
                        value={5}
                        status={
                          this.state.Choice === 5 ? "checked" : "unchecked"
                        }
                        onPress={() => this.setState({ Choice: 5 })}
                        color={"#00c9ff"}
                        uncheckedColor="#ffffff"
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ Choice: 5 })}
                      >
                        <Text style={styles.QuestionsRadioButtonText}>
                          {this.props.Option3}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "white",
                        marginVertical: 25 / pixelratio,
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View>
                    <View style={styles.QuestionsRadioButton}>
                      <RadioButton.Android
                        value={3}
                        status={
                          this.state.Choice === 3 ? "checked" : "unchecked"
                        }
                        onPress={() => this.setState({ Choice: 3 })}
                        color={"#00c9ff"}
                        uncheckedColor="#ffffff"
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ Choice: 3 })}
                      >
                        <Text style={styles.QuestionsRadioButtonText}>
                          {this.props.Option4}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "white",
                        marginVertical: 25 / pixelratio,
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View>
                    <View style={styles.QuestionsRadioButton}>
                      <RadioButton.Android
                        value={1}
                        status={
                          this.state.Choice === 1 ? "checked" : "unchecked"
                        }
                        onPress={() => this.setState({ Choice: 1 })}
                        color={"#00c9ff"}
                        uncheckedColor="#ffffff"
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ Choice: 1 })}
                      >
                        <Text style={styles.QuestionsRadioButtonText}>
                          {this.props.Option5}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "white",
                        marginVertical: 25 / pixelratio,
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 100 / pixelratio,
                    marginTop: 100 / pixelratio,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableHighlight
                    style={styles.QuestionsDualButton}
                    underlayColor="#007AFF"
                    onPress={() => {
                      this.props.QuestionSwitch(this.state.Choice, "Restart");
                      this.setState({ Choice: -1 });
                    }}
                  >
                    <Text style={styles.QuestionsButtonText}>Restart</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.QuestionsDualButton}
                    underlayColor="#007AFF"
                    onPress={() => {
                      if (this.state.Choice === -1) {
                        alert("Please Select a Choice");
                      } else {
                        this.props.QuestionSwitch(this.state.Choice, "Next");
                        this.setState({ Choice: -1 });
                      }
                    }}
                  >
                    <Text style={styles.QuestionsButtonText}>
                      {this.props.QuestionNo == 10 ? "Submit" : "Next"}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  QuestionWelcome: {
    color: "white",
    fontSize: 50 / pixelratio,
    marginHorizontal: 100 / pixelratio,
    fontFamily: "Trebuchet",
    marginTop: 100 / pixelratio,
  },
  QuestionsNextButton: {
    backgroundColor: "#2196F3",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
  },
  QuestionsButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 35 / pixelratio,
    fontFamily: "Trebuchet",
  },
  QuestionText: {
    color: "white",
    fontSize: 50 / pixelratio,
    marginHorizontal: 100 / pixelratio,
    fontFamily: "Trebuchet",
    marginTop: 50 / pixelratio,
  },
  QuestionsRadioButton: {
    textAlign: "left",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 50 / pixelratio,
  },
  QuestionsRadioButtonText: {
    color: "#ffffff",
    fontFamily: "Trebuchet",
    fontWeight: "bold",
    fontSize: 50 / pixelratio,
    marginLeft: 20 / pixelratio,
    marginVertical: 20 / pixelratio,
  },
  QuestionsDualButton: {
    backgroundColor: "#2196F3",
    height: 100 / pixelratio,
    borderRadius: 10 / pixelratio,
    justifyContent: "center",
    width: 250 / pixelratio,
  },
});
