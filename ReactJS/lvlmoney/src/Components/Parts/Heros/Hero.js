import React from "react";
import "./Hero.css";

export const Hero = ({
  button_link,
  heading,
  subheading1,
  subheading2,
  button_text,
  src,isVisible
}) => {
  return (
    <section className={`hero`}>
      <div class="container col-xxl-8 px-4 py-1 ">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-4 d-flex justify-content-center">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src={src}
              class="d-block img-fluid"
              alt="LvLMoney"
              width="500"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3 text-white">{heading}</h1>
            <p class="lead">
              {subheading1}
              <br />
              {subheading2}
            </p>
            {isVisible?
              
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <a
                class="btn btn-primary btn-lg px-4 me-md-2 "
                href={button_link}
                role="button"
              >
                {button_text}
              </a>
              </div>
            :""}
          </div>
        </div>
       
      </div>
      
    </section>
  );
};
