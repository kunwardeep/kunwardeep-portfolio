"use client";

import React from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";

const AppContainer = ({
  children,
  showBreadCrumbs,
}: {
  showBreadCrumbs?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="container mx-auto">
      <Header />
      {showBreadCrumbs && <Breadcrumbs />}
      {children}
    </div>
  );
};

export default AppContainer;
