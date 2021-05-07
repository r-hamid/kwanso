import React, { Fragment, useState } from "react";
import Styled from "styled-components";
import store from "store";
import uuid from "react-uuid";

const FormParent = Styled.div`
  display: flex;
  justify-content: center;
`;

const Title = Styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  color: #282c34;
`;

const Form = Styled.form`
  padding: 40px 20px;
  width: 25%;
`;

const FormGroup = Styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const Label = Styled.label`
  display: block;
  text-align: left;
  font-size: 0.9rem;
  padding: 15px 0;
`;

const Input = Styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #505050;
  border-radius: 5px;
  font-size: 1.1rem;
  margin-bottom: 0;
  &:focus {
    border-radius: 5px;
    border: 1px solid #00B8BF;
  }
`;

const Error = Styled.p`
  font-size: 0.7rem;
  color: #FF0005;
  margin-bottom: 0;
  text-align: left;
`;

const Button = Styled.button`
  margin-top: 12px;
  padding: 10px 15px 9px;
  border: 1px solid transparent;
  border-radius: 7px;
  background-color: #282c34;
  font-size: 1rem;
  color: #FFF;
  &:hover {
    cursor: pointer;
  }
`;

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