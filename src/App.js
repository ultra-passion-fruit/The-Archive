import React from "react";
import { Route, Routes } from "react-router-dom";
import View from './react-components/app-site/view-page/View.tsx'
import Herbarium from "./react-components/app-site/herbarium-page/Herbarium.tsx";
import Account from "./react-components/app-site/account-page/Account.tsx";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
            <Route path="/"/>
            <Route path="contact"/>
            <Route path="login"/>
            <Route path="/app">
                <Route path="herbarium" element={<Herbarium/>}/>
                <Route path="view" element={<View/>}/>
                <Route path="account" element={<Account/>}/>
            </Route>
            <Route path="*"/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
