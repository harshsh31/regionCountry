import { withRouter } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <Layout>
      <Main />
    </Layout>
  );
};

export default withRouter(App);
