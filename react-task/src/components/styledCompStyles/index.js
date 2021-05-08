import Styled from "styled-components";

export const Header = Styled.header`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #282c34;
  padding: 12px;
`;
export const Img = Styled.img`
  height: 3rem;
`;

export const LinksParent = Styled.div`
  width: 90%;
  text-align: left;
`;

export const CustomLink = Styled.a`
  padding: 0 12px;
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const FormParent = Styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = Styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  color: #282c34;
`;

export const SmallTitle = Styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #282c34;
`;

export const Paragraph = Styled.p`
  height: 40vh;
  font-size: 1.0rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = Styled.form`
  padding: 40px 20px;
  width: 25%;
`;

export const FormGroup = Styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

export const Label = Styled.label`
  display: block;
  text-align: left;
  font-size: 0.9rem;
  padding: 15px 0;
`;

export const Input = Styled.input`
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

export const Error = Styled.p`
  font-size: 0.7rem;
  color: #FF0005;
  margin-bottom: 0;
  text-align: left;
`;

export const Button = Styled.button`
  margin-top: 12px;
  padding: 10px 15px 9px;
  border: 1px solid transparent;
  border-radius: 7px;
  background-color: ${ (props) => props.danger ? "#FF0005" : "#282c34" };
  font-size: 1rem;
  color: #FFF;
  &:hover {
    cursor: pointer;
  }
`;

export const Card = Styled.div`
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

export const TaskListParent = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;