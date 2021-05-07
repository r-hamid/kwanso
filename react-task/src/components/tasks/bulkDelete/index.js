import React, { Fragment, useState, useEffect } from "react";
import store from "store";
import Styled from "styled-components";

import SingleTask from "./SingleTask";

const Title = Styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  color: #282c34;
`;

const Paragraph = Styled.p`
  height: 40vh;
  font-size: 1.0rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskListParent = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = Styled.button`
  margin-top: 12px;
  padding: 10px 15px 9px;
  border: 1px solid transparent;
  border-radius: 7px;
  background-color: #FF0005;
  font-size: 1rem;
  color: #FFF;
  &:hover {
    cursor: pointer;
  }
`;

const BulkDeleteTasks = (props) => {

  const [taskList, getTaskList] = useState(null);
  const [selectedTasksId, addSelectedTaskId] = useState([]);

  useEffect(() => {
    getTaskList(store.get("tasks"));
  }, []);

  const onAddSelectedTaskId = (id) => {
    let selectedTasks = [ ...selectedTasksId ];
    selectedTasks.push(id);
    addSelectedTaskId(selectedTasks);
  }

  const performDeletion = () => {
    const localTaskList = [ ...taskList ];
    if(selectedTasksId.length > 0) {
      for (let i = 0; i < selectedTasksId.length; i++) {
        localTaskList.splice(selectedTasksId[i], 1);
      }
    }
    getTaskList(localTaskList);
    store.set("tasks", localTaskList);
  }

  return (
    <Fragment>
      <Title> List of Tasks </Title>
      {
        (taskList) ?
          (
            (
              <Fragment>
                <TaskListParent>
                  {taskList.map((task, index) => (
                    <SingleTask key={task.id} task={task} taskIndex={index} selectTask={onAddSelectedTaskId} />
                  ))}
                </TaskListParent>
                <Button onClick={performDeletion}> Confirm Delete </Button>
              </Fragment>
            )
          ): (
            <Paragraph> No Tasks have added yet! </Paragraph>
          )
      }
    </Fragment>
  );
}

export default BulkDeleteTasks;