import React from "react";
import {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Questions from "../../Parts/Questions/Questions";

const pixelratio = PixelRatio.get();

export default class RiskProfileTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Question: 0,
      Score: 0,
      InvestorType: "",
      Description: "",
      Solution: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.QuestionSwitch = this.QuestionSwitch.bind(this);
  }

  handleClick(ClickedItem) {
    if (ClickedItem === "Back") {
      this.props.navigation.goBack();
    }
    console.log(ClickedItem);
  }

  QuestionSwitch(AnswerValue, ButtonPress) {
    if (ButtonPress === "Next") {
      this.setState({
        Question: this.state.Question + 1,
        Score: this.state.Score + AnswerValue,
      });
      if (this.state.Question === 10) {
        if (this.state.Score <= 21) {
          this.setState({
            InvestorType: "You are a Conservative Investor",
            Description:
              "Your Current Priority lies in safeguarding your Current Capital rather than looking for Potential Returns on your Capital",
            Solution:
              "A Bank Fixed Deposit or a Recurring Deposit is the safest and the most reliable solution for your capital. The other option would be looking for Conservative Funds in our 'Funds Ranking'",
          });
        } else if (this.state.Score >= 22 || this.state.Score <= 44) {
          this.setState({
            InvestorType: "You are a Moderate Investor",
            Description:
              "You are a Moderate Investor looking for Potential Returns on your capital while taking the least possible risk. You are willing to accept lower returns due to the lower risk you prefer",
            Solution:
              "A Good Solution would be combining Largecap Equity Funds with Less Volatile Bonds and Riskless Securities, usually divided in a 50/50 format. You can find Equity Funds in our 'Funds Ranking'.",
          });
        } else if (this.state.Score >= 45 || this.state.Score <= 68) {
          this.setState({
            InvestorType: "You are a Balanced Investor",
            Description:
              "You are a Balanced Investor who prefers a Decent Balance between Capital Growth and Capital Security. You are fine with Short Term Risk as long as you get Long Term Gains",
            Solution:
              "A Balanced Investor usually goes for a good mix of all the funds such as Largecap Dividend Paying Bluechip Equity funds, Smallcap Funds, AAA Rated Government Bonds, and Investment Grade Corporate Bond usually in a 25/25/25/25 ratio. You can find the Equity Funds and Smallcap Funds in our 'Funds Ranking'",
          });
        } else if (this.state.Score >= 69 || this.state.Score <= 90) {
          this.setState({
            InvestorType: "You are an Assertive Investor",
            Description:
              "You are an Assertive Investor who understands the risks before making decisions and hence looks for Long term gains by taking calculated risks",
            Solution:
              "Tax Saving Funds, Funds that Invest in Foreign Stocks, Equity Largecap Funds, and Funds of Funds all would be a decent solution. You can find the best funds in our 'Funds Ranking'",
          });
        } else if (this.state.Score >= 91) {
          this.setState({
            InvestorType: "You are an Aggressive Investor",
            Description:
              "You are an Aggressive Investor who looks at maximum growth in capital even though there may be performance fluctuations and very high risk.",
            Solution:
              "Smallcap Funds and Tax Saving Funds are the best funds for you. Additionally, Funds that Invest in Foreign Stocks, Equity Largecap Funds, and Funds of Funds all would be a decent solution. You can find the best funds in our 'Funds Ranking'",
          });
        }
      }
    } else {
      this.setState({
        Question: 0,
        Score: 0,
      });
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.RiskProfileTestBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#010312" />
        <TouchableOpacity
          style={styles.RiskProfileTestHeader}
          onPress={() => this.handleClick("Back")}
        >
          <Ionicons name="arrow-back" size={50 / pixelratio} color={"white"} />
          <Text style={styles.RiskProfileTestTextHeader}>
            Risk Profile Test
          </Text>
        </TouchableOpacity>
        <View>
          {(() => {
            if (this.state.Question === 0) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Text1="This Test Determines the Type of Investor you are by analyzing your risk appetite and hence predicts your Risk to Reward Ratio."
                    Text2="The Test is a Pre-defined Algorithm developed by studying various types of investors and understanding their Risk Appetite."
                    Text3="The Test may not be 100% accurate. Please consult your Financial Advisor before making any decision."
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 1) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="In which Group does your Age fall into?"
                    Option1="18 - 25"
                    Option2="26 - 35"
                    Option3="36 - 45"
                    Option4="46 - 55"
                    Option5="55+"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 2) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="How Many Months can your Emergency Fund Cover ?"
                    Option1="More than 9 Months"
                    Option2="7 to 9 Months"
                    Option3="4 - 6 Months"
                    Option4="Less than 3 Months"
                    Option5="I Do Not Have an Emergency Fund"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 3) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="How Much of your Monthly Income Can you put aside for Investing ?"
                    Option1="31% or more"
                    Option2="21% to 30%"
                    Option3="11% to 20%"
                    Option4="1% to 10%"
                    Option5="0%"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 4) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="When would you want to Cash Out your Investment ?"
                    Option1="10 years or longer"
                    Option2="8 years to 10 years"
                    Option3="5 years to 7 years"
                    Option4="2 years to 4 years"
                    Option5="Less than 1 Year"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 5) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="How Many People Financially Depend on You ?"
                    Option1="0"
                    Option2="1"
                    Option3="2"
                    Option4="3"
                    Option5="More than 3"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 6) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="What Rate of Return would you expect on your investment ?"
                    Option1="More than 15% P.A."
                    Option2="15% P.A."
                    Option3="12% P.A."
                    Option4="10% P.A."
                    Option5="6% P.A."
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 7) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="What Percent Drop in your Investment Value would make you want to stop the Investment ?"
                    Option1="More than 31% P.A."
                    Option2="21% to 30% P.A."
                    Option3="11% to 20% P.A."
                    Option4="5% to 10% P.A."
                    Option5="Less than 5% P.A."
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 8) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="What is your Primary Objective for Investing ?"
                    Option1="Future Lifestyle Improvement"
                    Option2="Inheritance / Gifting"
                    Option3="Childeren's Education"
                    Option4="Emergency Fund"
                    Option5="Capital Preservation"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 9) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="What is your Annual Income Range ?"
                    Option1="More than 20L"
                    Option2="Between 10L and 20L"
                    Option3="Between 5L and 10L"
                    Option4="Between 3L and 5L"
                    Option5="Less than 3L"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 10) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Question="How Much of your Income do you Put aside for Repaying liabilities ?"
                    Option1="Less than 1%"
                    Option2="Between 2% and 5%"
                    Option3="Between 6% and 15%"
                    Option4="Between 20% and 40%"
                    Option5="More than 40%"
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            } else if (this.state.Question === 11) {
              return (
                <View>
                  <Questions
                    QuestionNo={this.state.Question}
                    Text1={this.state.InvestorType}
                    Text2={this.state.Description}
                    Text3={this.state.Solution}
                    QuestionSwitch={this.QuestionSwitch}
                  />
                </View>
              );
            }
          })()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RiskProfileTestBackground: {
    backgroundColor: "#010312",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "column",
  },
  RiskProfileTestHeader: {
    flexDirection: "row",
    marginTop: 75 / pixelratio,
    marginBottom: 100 / pixelratio,
    marginLeft: 50 / pixelratio,
    alignItems: "center",
  },
  RiskProfileTestTextHeader: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Trebuchet",
    fontSize: 50 / pixelratio,
    marginLeft: 25 / pixelratio,
  },
});
