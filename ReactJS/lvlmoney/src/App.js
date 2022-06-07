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
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Blog1 from './Components/Pages/blogs/blog_1';
import Blog2 from './Components/Pages/blogs/blog_2';
import Blog3 from './Components/Pages/blogs/blog_3';

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

        <Route
              exact
              path={"/dashboard"}
              render={(props) => <Dashboard {...props} />}
          />  
          <Route
              exact
              path={"/blog_1"}
              render={(props) => <  Blog1 {...props} />}
          />  
           <Route
              exact
              path={"/blog_2"}
              render={(props) => <  Blog2 {...props} />}
          />  
           <Route
              exact
              path={"/blog_3"}
              render={(props) => <  Blog3 {...props} />}
          /> 
        </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
