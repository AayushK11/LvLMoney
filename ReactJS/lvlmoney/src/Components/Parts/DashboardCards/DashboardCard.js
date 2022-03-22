
import "./DashboardCard.css";

export const DashboardCard = ({ CardHeading, CardSubHeading, CardContent, CardButton }) => {
   
    return (
    
        <div className="card col col-sm  bg-dark text-white">
            <h5 className="card-header">{ CardHeading}</h5>
        <div className="card-body">
                <h5 className="card-title">{ CardSubHeading}</h5>
                <p className="card-text">{CardContent}</p>
                <a href="#" className="btn btn-primary">{ CardButton}</a>
        </div>
      </div>
    );
  };
  