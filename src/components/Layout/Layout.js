import React from "react";
import { withRouter } from "react-router-dom";
import s from "./Layout.module.css";

const Layout = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default withRouter(Layout);
