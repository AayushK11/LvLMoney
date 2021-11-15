import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './Components/Pages/Landing/Landing';
import FAQs from './Components/Pages/FAQs/FAQs';
import PrivacyPolicy from './Components/Pages/TermsOfUse/PrivacyPolicy';
import TermsAndConditions from './Components/Pages/TermsOfUse/TermsAndConditions';
import ContactUs from './Components/Pages/ContactUs/ContactUs';
import About from './Components/Pages/About/About';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import Twofa from './Components/Pages/TwoFa/Twofa';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword/ResetPassword';

function App() {
  return (
    <>
     <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => <Landing {...props} />}
          />
            <Route
              exact
              path={"/faq"}
              render={(props) => <FAQs {...props} />}
          />
            <Route
              exact
              path={"/privacypolicy"}
              render={(props) => <PrivacyPolicy {...props} />}
          />
            <Route
              exact
              path={"/termsandconditions"}
              render={(props) => <TermsAndConditions {...props} />}
          />
           <Route
              exact
              path={"/contactus"}
              render={(props) => <ContactUs {...props} />}
          />
           <Route
              exact
              path={"/about"}
              render={(props) => <About {...props} />}
          />
          <Route
              exact
              path={"/register"}
              render={(props) => <Register {...props} />}
          />
          <Route
              exact
              path={"/login"}
              render={(props) => <Login {...props} />}
          />
           <Route
              exact
              path={"/2FA"}
              render={(props) => <Twofa {...props} />}
          />
          
          <Route
              exact
              path={"/forgotpassword"}
              render={(props) => <ForgotPassword {...props} />}
          />
          
          <Route
              exact
              path={"/resetpassword"}
              render={(props) => <ResetPassword {...props} />}
          />  
        </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
