import React from "react";
import Styled from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ListTasks from "./components/tasks/list";
import NewTask from "./components/tasks/new";
import BulkDeleteTasks from "./components/tasks/bulkDelete";
import logo from './logo.svg';
import './App.css';

const Header = Styled.header`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #282c34;
  padding: 12px;
`;
const Img = Styled.img`
  height: 3rem;
`;

const LinksParent = Styled.div`
  width: 90%;
  text-align: left;
`;

const CustomLink = Styled.a`
  padding: 0 12px;
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Img src={logo} alt="logo" />
          <LinksParent>
            <CustomLink href="/list-tasks"> All Tasks </CustomLink>
            <CustomLink href="/create-task"> Create Task </CustomLink>
            <CustomLink href="/bulk-delete"> Bulk Delete Task </CustomLink>
          </LinksParent>
        </Header>
        <Switch>
          <Route exact path="/">
            <Redirect to="/list-tasks" />
          </Route>
          <Route path="/list-tasks">
            <ListTasks />
          </Route>
          <Route path="/create-task">
            <NewTask />
          </Route>
          <Route path="/bulk-delete">
            <BulkDeleteTasks />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
