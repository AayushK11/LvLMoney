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
                  <strong>Math in Personal Finance</strong>
                </h2>
                <h3>Simple Interest</h3>
                <p>
                  When it comes to personal finance, one of the key things to
                  learn is the math that surrounds this topic. Once you
                  understand the math bit, the rest is just the application of
                  it and life becomes easy after that. </p><p>
                  Let us run through an imaginary transaction, my guess is that
                  this a familiar situation for most of us.
                </p>
                <p>
                  Imagine that one of your friends needs money urgently and he
                  approaches you for it. Being a friend, you agree to help him
                  with the money but being a capitalist at heart, you also
                  expect your friend to pay you ‘interest’ on the cash you lend
                  to him. I know we don’t usually ask a friend to pay us
                  interest, but let’s just assume he is a friend whom you’d like
                  to help, but not at the opportunity cost of your money. </p><p>The
                  transaction details are below –
                </p>
                <ul>
                  <li><p>Amount – Rs.100,000/-</p></li>
                  <li><p>Tenure – 5 years</p></li>
                  <li><p>Interest (%) – 10</p></li>
                </ul>
               
                <p>
                  {" "}
                  As you can see, your friend agrees to repay Rs.100,000/- over
                  a 5 year period and also agrees to pay you an interest of 10%.
                  Given this, how much money will you make at the end of 5
                  years? Let’s do the math and find out the details.{" "}
                </p>

                <p>
                  Remember, the yearly interest is paid on the principal amount.{" "}
                </p>
                <p>Principal = Rs.100,000/-</p>
                <p> Interest = 10% </p>
                <p>Yearly interest amount = 10% * 100,000 </p>
                <p>= Rs.10,000/- </p>
                

                <p>
                  So as you can see, you can earn Rs.50,000/- in total interest
                  from this payment. The amount you earn from the interest can
                  also be calculated by applying a simple formula, which you may
                  remember from your school days –
                </p>
                <p>
                  <strong> Amount = Principal * Time * Return </strong>
                </p>
                <p> Where the return is the interest percentage.</p>
                <p>Amount = Rs.100,000 * 5 * 10%</p>
                <p>
                  <strong>= Rs.50,000/-</strong>
                </p>
                <p>I’m sure you’d agree that this is quite straightforward and most of you would remember that this is simple interest.</p>
                <p>In simple interest, the interest gets charged only on the outstanding principal.</p>
                <p>Imagine a bank transaction, you deposit Rs.100,000/- in a bank’s Fixed Deposit scheme, which promises to pay you a simple interest of 10% year on year for 5 years. At the end of 5 years, you’ll earn Rs.50,000/- as interest income. The math is still the same.</p>
                <h3>Compound interest</h3>

                <p>Compound interest works differently compared to simple interest. If someone agrees to pay you compound interest, then it essentially means that the person or the entity is agreeing to pay you interest on the interest already earned.</p>
                <p>Let’s figure this out with the same example discussed above. The transaction details are as follows –</p>
                <ul>
                  <li><p>Amount – Rs.100,000/-</p></li>
                  <li> <p>Tenure – 5 years</p> </li>
                  <li> <p>Interest (%) – 10 </p></li>
                  <li><p>Interest type – Compound Interest (compounded annually)</p></li>
                </ul>
               
                <p>The math is as follows –</p>
                <p><strong>Year 1</strong></p>
                <p>At the end of 1st year, you are entitled to receive a 10% interest on the principal outstanding and previous interest (if any). For a moment assume you are closing this at the end of the 1st years, then you would receive the principal amount plus the interest applicable on the principal amount.</p>
                <p>Amount = Principal + (Principal * Interest),  this can be simplified to</p>
                <p>= Principal * (1+ interest)</p>
                <p>Here, (1+interest) is the ‘interest’ part and the principal is obviously the principal. Applying this –</p>
                <p>= 100,000 *(1+10%)</p>
                <p>= 110,000</p>
                <p><strong>Year 2</strong></p>
                <p>Now assume, you want to close this in the 2nd year instead of the first, here is how much you’d get back –</p>
                <p>Remember, you are supposed to get paid interest on the interest earned in the first year, hence –</p>
                <p><strong>Principal *(1+ Interest) * (1+Interest)</strong></p>
                <p>We can simplify the above equation –</p>
                <p>= Principal *(1+ Interest)^(2)</p>
                <p>= 100,000*(1+10%)^(2)</p>
                <p>= 121,000</p>
                <p><strong>Year 3</strong></p>
                <p>In the 3rd year, you’d get interest on the 1st two year’s interest as well. The math –</p>
                <p><strong>Principal *(1+ interest) *(1+interest) *(1+interest)</strong></p>
                <p>We can simplify the above equation –</p>
                <p>= Principal *(1+ Interest)^(3)</p>
                <p>= 100,000*(1+10%)^(3)</p>
                <p>= 133,100</p>
                <p>We can generalize this –</p>
                <p>P*(1+R)^(n), where –</p>
                <ul>
                  <li><p>P – Principal</p></li>
                  <li><p>R – Interest</p></li>
                  <li><p>n – Number of years</p></li>
                </ul>
                <p>So, if you were to have this open for the entire 5 years, you’d receive –</p>
                <p>= 100,000*(1+10%)^(5)</p>
                <p><strong>=Rs.161,051/-</strong></p>
                <p>Contrast the difference between the 50K received in simple interest versus the Rs.61,051/- received via compound interest.</p>
                <p>Compound interest and compounded return work magic in finance. At the end of the day, every aspect of personal finance boils down to the compounded return. For this reason, I think it is best to spend some more time trying to understand the concept of compounding of money.</p>
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
