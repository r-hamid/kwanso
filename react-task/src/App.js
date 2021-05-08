import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Header, LinksParent, CustomLink, Img } from "./components/styledCompStyles";
import ListTasks from "./components/tasks/list";
import NewTask from "./components/tasks/new";
import BulkDeleteTasks from "./components/tasks/bulkDelete";
import logo from './logo.svg';
import './App.css';

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
