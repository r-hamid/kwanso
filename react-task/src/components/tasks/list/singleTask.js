import React from "react";

import { Card, SmallTitle } from "../../styledCompStyles";

const SingleTask = (props) => {
  return (
    <Card>
      <SmallTitle> {props.taskName} </SmallTitle>
    </Card>
  );
}

export default SingleTask;