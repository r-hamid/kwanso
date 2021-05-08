import React, { Fragment, useState } from "react";
import store from "store";
import uuid from "react-uuid";

import { Title, FormParent, FormGroup, Form, Label, Input, Button, Error } from "../../styledCompStyles";

const NewTask = (props) => {

  const [taskName, changeTaskName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const saveNewTask = (event) => {
    event.preventDefault();
    if(taskName.length <= 0) {
      setErrorMessage("Task Name is required");
    } else {
      let allTasks = store.get("tasks");
      if(typeof allTasks === "undefined")
        allTasks = [];
      allTasks.push({
        name: taskName,
        id: uuid()
      });
      store.set("tasks", allTasks);
    }
  }

  const onChangeTaskName = (event) => {
    if(errorMessage.length > 0) setErrorMessage("");
    changeTaskName(event.target.value);
  }

  return (
    <Fragment>
      <Title> New Task Creation </Title>
      <FormParent>
        <Form onSubmit={saveNewTask}>
          <FormGroup>
            <Label htmlFor="taskName"> TaskName* </Label>
            <Input type="text" name="taskName" onChange={onChangeTaskName} required />
            {
              (errorMessage) ?
                (<Error> {errorMessage} </Error>)
                :""
            }
          </FormGroup>
          <FormGroup>
            <Button type="submit"> Save Task </Button>
          </FormGroup>
        </Form>
      </FormParent>
    </Fragment>
  )
}

export default NewTask;