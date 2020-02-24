import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";
import { Auth } from "aws-amplify";


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  //load user session on first page load
  useEffect(() => {
    onLoad();
  },[])

  async function onLoad(){
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user'){
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);

    props.history.push('/login');
  }

  //hold off rendering app until isAuthenticating is false
  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
}

export default withRouter(App);