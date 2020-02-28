import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import NotFound from "./components/users/NotFound";
import NavBar from "./components/NavBar";
import PostBody from "./components/home/PostBody";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { BlogProvider } from "./components/blogContext/BlogProvider";
import { UserProvider } from "./components/userContext/UserProvider";
import Comments from "./components/home/Comments";

function App() {
  return (
    <Router>
      <UserProvider>
        <BlogProvider>
          <NavBar />
          <Switch>
            <PrivateRoute exact path='/' component={PostBody} />
            <PrivateRoute exact path='/comments/:commentId' component={Comments} />
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route to='/abc'>
              <NotFound />
            </Route>
          </Switch>
        </BlogProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
