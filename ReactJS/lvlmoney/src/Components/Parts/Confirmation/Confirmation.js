import React from "react";
import "./Confirmation.css";

export const Confirmation = ({ purpose, image }) => {
  return (
    <section className={`section ${purpose} confirmation_page`}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <img src={image} alt={purpose}></img>
          {(() => {
            if (purpose === "ContactForm") {
              return (
                <div className="confirmation_text">
                  <h3>Your Issue was Successfully Forwarded to our team</h3>
                  <h5>
                    A Member from our Support Staff will get back to you as soon
                    as possible
                  </h5>
                </div>
              );
            }
            if (purpose === "OrganizationForm") {
              return (
                <div className="confirmation_text">
                  <h3>
                    Your Details was Successfully Forwarded to our Sales Team
                  </h3>
                  <h5>We will get back to you shortly with a quote.</h5>
                </div>
              );
            }
            if (purpose === "RegisterPage") {
              return (
                <div className="confirmation_text">
                  <h3>Your Account was Created Successfully</h3>
                  <h5>
                    We recomment that you enable 2 Factor Authentication via the
                    link in the Mail Sent to you.
                  </h5>
                </div>
              );
            }
            if (purpose === "2FAPage") {
              return (
                <div className="confirmation_text">
                  <h3>2 Factor Authentication Successfully Completed</h3>
                  <h5>Enjoy Security.</h5>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </section>
  );
};
