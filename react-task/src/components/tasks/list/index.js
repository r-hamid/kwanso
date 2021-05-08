import React, { Fragment, useState, useEffect } from "react";
import store from "store";

import SingleTask from "./singleTask";
import { TaskListParent, Title, Paragraph } from "../../styledCompStyles";

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