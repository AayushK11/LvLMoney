import React from "react";
import "./MiniCard.css";


export const MiniCard_NOgraph = ({ minititle, price, pricechange, percentchange, imgsrc }) => {
  
  
  return (
  
      <div class="col col-sm-6 col-xxl-3 d-flex text-white">
        <div class="card flex-fill bg-dark">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h4 class="mb-2">{minititle}</h4>
                <p class="mb-2">{price}</p>
                <div class="mb-0">
                  <span class="text-muted">{pricechange}</span>
                  <span class="badge bg-success"> {percentchange} </span>
                </div>
              </div>
              <div class="col-6 align-self-end text-end">
              <img src={imgsrc} alt="" class="img-fluid illustration-img"></img>
          </div>
            </div>
          </div>
        </div>
      </div>
  );
};
