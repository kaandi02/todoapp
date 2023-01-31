import React, { useState } from "react";
import styled from "styled-components";
import { provider, auth } from "../firebase.js";
import GoogleIcon from "@mui/icons-material/Google";
import { mobile, mobileland, mmobile, landdis, pc, ld } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Urbanist", sans-serif;
  background-color: black;
  color: white;
  line-height: 2;
  ${mobileland({
    height: "600px !important"
  })}
`;
const Wrapper = styled.div`
  width:50%;
  padding-top:50px;
  padding-bottom:50px;
	display: flex;
	align-items:center;
	justify-content:center;
	flex-direction:column;
	border:1px solid white;
	${mobile({
    width: "90%"
  })}
  	${mobileland({
      width: "60% !important"
    })}
  	${mmobile({
      width: "80%"
    })}
  	${landdis({
      width: "60%"
    })}
  	${pc({
      width: "65%"
    })}
`;
const Form = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const Title = styled.span`
	margin:10px;
	${mobileland({
    fontSize: "14px !important"
  })}
	${mmobile({
    fontSize: "24px"
  })}
  	${pc({
      fontSize: "24px"
    })}
  	${ld({
      fontSize: "28px"
    })}
`;
const FormNotice = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const FormCheckBox = styled.input`
	width:15px;
	height:15px;
	background-color:black !important;
	${mobileland({
    width: "13px !important",
    height: "13px !important"
  })}
	${mmobile({
    width: "20px",
    height: "20px"
  })}
  	${landdis({
      width: "18px",
      height: "18px"
    })}
  	${pc({
      width: "20px",
      height: "20px"
    })}
`;
const FormNoticeText = styled.span`
	font-size:13px;
  width: 90%;
  line-height: 2;  
	${mobileland({
    fontSize: "12px !important"
  })}
	${mmobile({
    fontSize: "15px"
  })}
  	${landdis({
      fontSize: "14px"
    })}
  	${pc({
      fontSize: "14px"
    })}
`;
const FormButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 220px;
  height: 50px;
  background-color: #2ba5da;
  color: white;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  margin: 20px;
  &:hover {
    width: 230px;
    background: linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335);
    color: black;
  }
  ${mobile({
    background: "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
    color: "white",
    "&:hover": {
      color: "black"
    }
  })}
  ${mmobile({
    width: "230px",
    height: "50px",
    background: "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
    color: "white",
    "&:hover": {
      color: "black"
    }
  })}
`;
const FormButtonText = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
`;
const Login = () => {
  const Auth = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.info("Authenticated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [Checkbox, setCheckbox] = useState(true);
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN.</Title>
        <Form>
          <FormNotice>
            <FormCheckBox
              type="checkbox"
              onChange={(e) => setCheckbox(!Checkbox)}
            />
            <FormNoticeText>
              I accept all the Terms and Conditions*.
            </FormNoticeText>
          </FormNotice>
          {Checkbox ? (
            <FormButton type="button" disabled>
              <GoogleIcon />
              <FormButtonText>SIGN IN WITH GOOGLE</FormButtonText>
            </FormButton>
          ) : (
            <FormButton
              type="button"
              onClick={() => {
                Auth();
              }}
            >
              <GoogleIcon />
              <FormButtonText>SIGN IN WITH GOOGLE</FormButtonText>
            </FormButton>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
