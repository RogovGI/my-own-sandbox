import React, { useState } from "react";

import { TopBar, Content, Footer } from "./components";

import "./App.css";

export const TABS = {
  HOMEPAGE: "Homepage",
  FIRST_TASK: "First task",
  SECOND_TASK: "Second task",
  THIRD_TASK: "Third task",
  FOURTH_TASK: "Fourth task",
  FIFTH_TASK: "Fifth task",
  SIXTH_TASK: "Sixth task",
};

export default function App() {
  const [activeTab, switchTab] = useState(TABS.HOMEPAGE);

  return (
    <div className="app">
      <TopBar switchTab={switchTab} activeTab={activeTab} />
      <Content activeTab={activeTab} />
      <Footer />
    </div>
  );
}
