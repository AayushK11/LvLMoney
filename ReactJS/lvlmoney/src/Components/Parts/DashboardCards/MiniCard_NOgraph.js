import React from "react";
import "./MiniCard.css";


export const MiniCardNograph = ({ minititle, price, pricechange, percentchange, imgsrc }) => {
  
  
  return (
  
      <div className="col col-sm-6 col-lg-3 col-xl-3 col-xxl-3 d-flex text-white">
        <div className="card flex-fill bg-dark mt-2">
          <div className="card-body py-4">
            <div className="d-flex align-items-start">
              <div className="flex-grow-1">
                <h4 className="mb-2">{minititle}</h4>
                <p className="mb-2">{price}</p>
                <div className="mb-0">
                  <span className="text-muted">{pricechange}</span>
                  <span className="badge bg-success"> {percentchange} </span>
                </div>
              </div>
              <div className="col-6 align-self-end text-end">
              <img src={imgsrc} alt="" className="img-fluid illustration-img"></img>
          </div>
            </div>
          </div>
        </div>
      </div>
  );
};
