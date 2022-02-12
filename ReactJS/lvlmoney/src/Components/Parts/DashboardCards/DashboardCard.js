import react from "react";
import "./DashboardCard.css";

export const DashboardCard = ({ CardHeading, CardSubHeading, CardContent, CardButton }) => {
   
    return (
    
        <div class="card col col-sm  bg-dark text-white">
            <h5 class="card-header">{ CardHeading}</h5>
        <div class="card-body">
                <h5 class="card-title">{ CardSubHeading}</h5>
                <p class="card-text">{CardContent}</p>
                <a href="#" class="btn btn-primary">{ CardButton}</a>
        </div>
      </div>
    );
  };
  