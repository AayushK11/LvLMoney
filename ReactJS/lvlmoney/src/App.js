import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './Components/Pages/Landing/Landing';
import FAQs from './Components/Pages/FAQs/FAQs';
import PrivacyPolicy from './Components/Pages/TermsOfUse/PrivacyPolicy';
import TermsAndConditions from './Components/Pages/TermsOfUse/TermsAndConditions';

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
           </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
