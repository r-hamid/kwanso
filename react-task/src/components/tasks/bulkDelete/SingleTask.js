import React from "react";

import { Card, SmallTitle, Input } from "../../styledCompStyles";

const SingleTask = (props) => {
  return (
    <Card>
      <Input type="checkbox" onChange={() => props.selectTask(props.taskIndex)} />
      <SmallTitle> {props.task.name} </SmallTitle>
    </Card>
  );
}

export default SingleTask;