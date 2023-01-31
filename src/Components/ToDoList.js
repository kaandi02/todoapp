import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { db } from "../firebase.js";
import { mobile, mobileland } from "../responsive";
import NewTaskModal from "./NewTaskModal";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Navbar = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const UserName = styled.span`
  height: auto;
  padding: 10px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  color: white;
  font-weight: 600;
  ${mobile({
    fontSize: "10px"
  })}
  ${mobileland({
    fontSize: "10px"
  })}
`;
const UserImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
  border: 0.1px solid black;
  background-color: white;
  font-size: 10px;
  ${mobile({
    width: "35px",
    height: "35px"
  })}
  ${mobileland({
    width: "35px",
    height: "35px"
  })}
`;
const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;
const InfoTitle = styled.h1`
  width: 165px;
  font-family: Urbanist, sans-serif;
  font-size: 28px;
  font-weight: 800;
  border-bottom: 2px solid whitesmoke;
  color: white;
`;
const PageContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 30px;
`;
const CalInfo = styled.div`
  width: 28%;
  height: 498px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 0.4;
  font-family: Montserrat, sans-serif !important;
  color: black;
`;
const ListContainer = styled.div`
  width: 72%;
  height: 500px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 0.6;
`;
const ToDoLists = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const DoList = styled.div`
  width: 93%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 25px 25px 0px 25px;
  padding: 20px 0px 10px 10px;
`;
const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;
const TaskTitle = styled.span`
  font-family: "Lato", sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-left: 5px;
  letter-spacing: 1px;
  word-spacing: 4px;
  color: white;
  text-decoration: ${(props) => (props.strike ? "line-through" : "none")};
`;
const NewToDo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogOutButton = styled.div`
  width: 90px;
  height: 30px;
  margin-left: 10px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border: 0.2px solid white;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    width: 100px;
    height: 40px;
    border: none;
    background-color: #27af27;
  }
  ${mobile({
    fontSize: "8px",
    width: "80px",
    height: "35px",
    border: "none",
    backgroundColor: "#27af27",
    color: "white"
  })}
  ${mobileland({
    fontSize: "10px"
  })}
`;

const ToDoList = ({ Info }) => {
  const [value, onChange] = useState(new Date());
  const [Data, setData] = useState([]);
  const [Strike, setStrike] = useState(false);

  useEffect(() => {
    async function getData() {
      const que = query(
        collection(db, "todolist"),
        where("email", "==", `${Info.email}`)
      );
      await onSnapshot(que, (snapShot) => {
        setData(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
    }
    getData();
  }, []);

  const CheckUpdate = async (DocData) => {
    const docRef = doc(db, "todolist", `${DocData.id}`);
    updateDoc(docRef, {
      checked: !DocData.data.checked
    })
      .then(() => {
        console.log(docRef);
      })
      .catch((error) => {
        console.log(error);
      });
    /*docSnap
      .update({
        checked: `"${!DocData.data.checked}"`
        // ... add any other fields to update
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });*/
    console.log(docRef);
  };
  const logout = async () => {
    await signOut(getAuth());
    window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <Navbar>
          <UserName>Hi, {Info.userName}</UserName>
          <UserImg src={Info.imgURL} alt={Info.userName} />
          <LogOutButton onClick={() => logout()}>
            <LogoutIcon fontSize="small" /> Logout
          </LogOutButton>
        </Navbar>
        <TitleDiv>
          <InfoTitle>TO-DO LIST.</InfoTitle>
        </TitleDiv>
        <PageContent>
          <CalInfo>
            <Calendar onChange={onChange} value={value} />
          </CalInfo>
          <ListContainer>
            <ToDoLists>
              {Data.map((datum) => {
                return (
                  <DoList key={datum.id}>
                    <CheckBox
                      type="checkbox"
                      strike={datum.data.checked}
                      onChange={() => {
                        setStrike(!Strike);
                        CheckUpdate(datum);
                      }}
                    />
                    <TaskTitle strike={datum.data.checked}>
                      &nbsp;{datum.data.taskname}&nbsp;
                    </TaskTitle>
                  </DoList>
                );
              })}
              <NewToDo>
                <NewTaskModal Info={Info} />
              </NewToDo>
            </ToDoLists>
          </ListContainer>
        </PageContent>
      </Wrapper>
    </Container>
  );
};

export default ToDoList;
