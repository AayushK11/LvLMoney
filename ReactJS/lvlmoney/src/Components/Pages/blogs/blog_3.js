import React from "react";
import Footer from "../../Parts/Footer/Footer";
import Navbar from "../../Parts/Navbar/Navbar";
import "./blog_1.css";
import { Helmet } from "react-helmet";

export default class Blog_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
    };
  }

  render() {
    return (
      <>
        <div className="blog_1_main">
          <Helmet>
            <title>LvLMoney | Personal Finance</title>
          </Helmet>
          <Navbar />
          <div className="container px-4 py-5">
            <div className="row">
              <div className="col-lg-9 col-12 ">
                <h2>
                  <strong>Magic of compound interest</strong>
                </h2>
                <h3>Compounded returns</h3>
                <p>
                The concept of compounded return is similar to compound interest. The concept of return and interest is very similar, just like the two sides of the same coin. The interest is what you pay when you borrow money in any form and the return is what you earn when you invest your money in any asset. Therefore, if you understand interest, then it is easy to understand the return.
                </p>
                <p>
                In this section, you will learn about how the return is measured. Based on the time horizon of your investment, the return measurement differs.
                </p>
                <p>You will use the absolute method to measure the return if your investment horizon is less than a year. Otherwise, if your investment horizon is more than a year, you will use CAGR or the compounded annual growth rate, to measure returns.</p>
                <p>I guess the difference in absolute and CAGR is best understood with an example.</p>
                <p>Assume you invested Rs.100,000/- on 1st Jan 2019 in a financial instrument which yields you a 10% return (per year) and you withdraw this investment a year later. How much money do you make?</p>
                <p>Quite straight forward as you can imagine –</p>
                <p>You will make 10% of 100,000 which is Rs.10,000/-, in other words, your investment has grown by 10% on a year on year basis. This is the absolute return. This is straightforward because the time under consideration is 1 year or 365 days.</p>
                <p>Now, what if the same investment was held for 3 years instead of 1 year, and what if instead of a simple return of 10%, the return was compounded annually at 10%? How much money would you make at the end of 3 years?</p>
                <p>To calculate this, we simply have to apply the growth rate formula –</p>
                <p><strong>Amount = Principal*(1+return)^(time)</strong></p>
                <p>Which as you realize is the same formula used while calculating the compound interest. Applying this formula –</p>
                <p>100,000*(1+10%)^(3)</p>
                <p><strong>= Rs.133,100/-</strong></p>
                <p>Referring to the previous section, if you were to charge compound interest, then this is the same amount of interest you receive from your friend in the 3rd year.</p>
                <p>Continuing on the same lines, here is another question –</p>
                <p>If you invest Rs.100,000/- and receive Rs.133,100/- after 3 years, then what is the growth rate of your investment?</p>
                <p>To answer this question, we just need to reorganize this formula –</p>
                <p><strong>Amount = Principal*(1+return)^(time)</strong></p>
                <p>and solve for ‘return’.</p>

                <p>By doing so, the formula reworks itself to –</p>
                <p><strong>Return = [(Amount/Principal)^(1/time)] – 1</strong></p>
                <p>Return here is the growth rate or the CAGR.</p>
                <p>Applying this to the problem –</p>
                <p>CAGR = [(133100/100000)^(1/3)]-1</p>
                <p><strong>=10%</strong></p>

                <p>So, the CAGR is 10% and the absolute return is Rs.10,000/-.</p>
                <h3>The compounding effect</h3>
                <p>Apparently, Albert Einstein once described ‘compound interest’ as the 8th wonder of the world. I guess he could not describe it any better. To understand why you need to understand the compound interest in conjunction with time.</p>
                <p>Compounding in the finance world refers to the ability of money to grow, given that the gains of year 1 get reinvested for year 2, gains of year 2 gets reinvested for year 3, so on and so forth.</p>
                <p>For example, consider you invest Rs.100 which is expected to grow at 20% year on year (recall this is also called the CAGR or simply the growth rate). At the end of the first year, the money grows to Rs.120.</p>
                <p>At the end of year 1, you have two options –</p>
                <ul>
                  <li><p>Let Rs.20 in profits remain invested along with the original principal of Rs.100 or</p></li>
                  <li><p>Withdraw the profits of Rs.20</p></li>
                </ul>
                <p>You decide not to withdraw Rs.20 profit; instead, you decide to reinvest the money for the 2nd year. At the end of the 2nd year, Rs.120 grows at 20% to Rs.144. At the end of 3rd year, Rs.144 grows at 20% to Rs.173. So on and so forth.</p>
                <p>Compare this with withdrawing Rs.20 profits every year. Had you opted to withdraw Rs.20 every year then at the end of the 3rd year the profits collected would be Rs. 60.</p>
                <p>However, since you decided to stay invested, the profits at the end of 3 years are Rs.173/-. This is good Rs.13 or 21.7% over Rs.60 earnt because you opted to do nothing and decided to stay invested.</p>
                <p>This is called the <strong>compounding effect.</strong></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
               
              </div>
              <div className="col-lg-3 col-12 faq_link_contact_section">
                <div className="row">
                  <h5>
                    <strong>Can't Find Your Answer?</strong>
                  </h5>
                  <p>
                    Fill Out a Request on the Support Form, and we'll get back
                    to you ASAP
                  </p>
                  <a
                    className="faq_link_contact_button"
                    href={window.location.origin.concat("/contactus")}
                  >
                    Support Form
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
