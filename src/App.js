import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout";
import Medicines from "./Components/Medicines/Medicines";
import Patients from "./Components/Patients/Patients";

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicines} />
          <Route path={"/patients"} exact component={Patients} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;