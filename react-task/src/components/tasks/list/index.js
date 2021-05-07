import React, { Fragment, useState, useEffect } from "react";
import store from "store";
import Styled from "styled-components";

import SingleTask from "./singleTask";

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

const ListTasks = (props) => {

  const [taskList, getTaskList] = useState(null);

  useEffect(() => {
    getTaskList(store.get("tasks"));
  }, []);

  return (
    <Fragment>
      <Title> List of Tasks </Title>
      {
        (taskList) ?
          (
            (
              <TaskListParent>
                {taskList.map(task => (
                  <SingleTask key={task.id} taskName={task.name} />
                ))}
              </TaskListParent>
            )
          ): (
            <Paragraph> No Tasks have added yet! </Paragraph>
          )
      }
    </Fragment>
  );
}

export default ListTasks;