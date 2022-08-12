import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout";
import Medicines from "./Components/Medicines/Medicines";
import Patients from "./Components/Patients/Patients";
import PromiseExample from "./container/Example/PromiseExample";
import Counter from './Counter/Counter'

import { configurestore } from "./Redux/Store";

function App() {

  let store = configurestore()

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={"/Medicines"} exact component={Medicines} />
            <Route path={"/Patients"} exact component={Patients} />
            <Route path={"/Counter"} exact component={Counter} />
            <Route path={"/PromiseExample"} exact component={PromiseExample} /> 
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;