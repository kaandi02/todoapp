import React, { useState, useEffect } from "react";
import Login from "../Components/Login";
import ToDoList from "../Components/ToDoList";
import { auth } from "../firebase.js";
import styled, { keyframes } from "styled-components";
import { mobile, mobileland } from "../responsive";
import NewTaskModal from "../Components/NewTaskModal";

const spin = keyframes`
	0%{
    transform: translateX(0);
   }
   25%{
    transform: translateX(15px);
   }
   50%{
    transform: translateX(-15px);
   }
   100%{
    transform: translateX(0);
   }
`;
const Container = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  font-family: "Urbanist", sans-serif;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Loader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loading = styled.span`
  font-size: 32px;
  height: auto;
  margin: 10px;
  ${mobile({
    fontSize: "20px"
  })}
  ${mobileland({
    fontSize: "20px"
  })}
`;
const LoadingDot = styled.span`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #5a2396;
  animation: ${spin} 1s linear infinite;
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }
  ${mobile({
    height: "5px",
    width: "5px"
  })}
  ${mobileland({
    height: "15px",
    width: "15px"
  })}
`;
const Home = () => {
  const [User, setUser] = useState(false);
  const [UserInfo, setUserInfo] = useState({});
  const [Status, setStatus] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
        setUserInfo({
          userName: user.displayName,
          email: user.email,
          imgURL: user.photoURL
        });
      }
      setInterval(() => setStatus(false), 2500);
    });
  }, []);
  return (
    <Container>
      {Status ? (
        <Wrapper>
          <Loading>Checking Status</Loading>
          <Loader>
            <LoadingDot></LoadingDot>
            <LoadingDot></LoadingDot>
            <LoadingDot></LoadingDot>
            <LoadingDot></LoadingDot>
            <LoadingDot></LoadingDot>
          </Loader>
        </Wrapper>
      ) : User ? (
        <>
          <ToDoList Info={UserInfo} />
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default Home;
