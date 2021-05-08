import React, { Fragment, useState, useEffect } from "react";
import store from "store";

import SingleTask from "./SingleTask";
import { Title, TaskListParent, Button, Paragraph } from "../../styledCompStyles";

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
                <Button danger onClick={performDeletion}> Confirm Delete </Button>
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