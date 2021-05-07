import React from "react";
import Styled from "styled-components";

const Card = Styled.div`
  width: 10%;
  padding: 15px;
  margin-left: 8px;
  margin-right: 8px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const SmallTitle = Styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #282c34;
`;

const SingleTask = (props) => {
  return (
    <Card>
      <input type="checkbox" onChange={() => props.selectTask(props.taskIndex)} />
      <SmallTitle> {props.task.name} </SmallTitle>
    </Card>
  );
}

export default SingleTask;