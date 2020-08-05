import React, { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { default as Toggle } from "react-switch";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import PostAd from "./components/PostAd";
import PostList from "./components/PostList";
import PostItem from "./components/PostItem";
import store from "./store";
import Alert from "./components/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [darkMode, setdarkMode] = useState(false);
  const [blackAndWhite, setblackAndWhite] = useState(false);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const themeButton = (
    <Fragment>
      <div className="text-right">
        <button onClick={() => setTheme(!theme)} className="btn btn-info">
          Themes
        </button>
      </div>

      <div className={theme ? "text-right mt-3" : "d-none"}>
        <label className="mr-3">
          <span style={{ fontSize: "18px", marginRight: "10px" }}>
            Dark Mode
          </span>
          <Toggle onChange={() => setdarkMode(!darkMode)} checked={darkMode} />
        </label>
        <label>
          <span style={{ fontSize: "18px", marginRight: "10px" }}>
            Black and White
          </span>
          <Toggle
            onChange={() => setblackAndWhite(!blackAndWhite)}
            checked={blackAndWhite}
          />
        </label>
      </div>
    </Fragment>
  );

  return (
    <Provider store={store}>
      <Router>
        <div className={
              darkMode
                ? "bg-dark"
                : "bg-light"
            }>
          <Header darkMode={darkMode} blackAndWhite={blackAndWhite} />

          <section className={
              darkMode
                ? "content-wrap  bg-dark text-light"
                : "content-wrap  bg-light text-dark"
            }>
            <Alert />

            <Switch>
              <Route exact path="/">
                {themeButton}
                <Landing />
              </Route>
              <Route exact path="/postList">
                <PostList darkMode={darkMode} />
              </Route>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/postAd" component={PostAd} />
              <Route exact path="/profile">
                {themeButton}
                <Profile />
              </Route>
              <Route exact path="/postItem" component={PostItem} />
              <Route path="*" component={NotFound} />
            </Switch>
          </section>

          <Footer darkMode={darkMode} blackAndWhite={blackAndWhite} />
        </div>
      </Router> 
    </Provider>
  );
}

export default App;
