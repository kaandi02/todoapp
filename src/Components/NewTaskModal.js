import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase.js";

const TaskInput = styled.input`
  width: 100%;
  line-height: 3;
  border: none;
  border-bottom: 2px solid lightgray;
  outline: none;
  margin-top: 20px;
  font-family: "Urbanist", sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1.5px;
  word-spacing: 2px;
`;

const NewTaskModal = ({ Info }) => {
  const [open, setOpen] = useState(false);
  const task = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CreateTask = async (e) => {
    if (task.current.value !== "") {
      const TaskData = {
        email: Info.email,
        id: Math.floor(Math.random() * 1000000 + 1),
        taskname: task.current.value,
        user: Info.userName,
        timeStamp: serverTimestamp(),
        checked: 0
      };
      handleClose();
      task.current.value = "";
      await addDoc(collection(db, "todolist"), TaskData);
    }
  };
  return (
    <div style={{ marginTop: "25px" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        add new task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD TASK</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Your to-do today task and get it organize.
          </DialogContentText>
          <TaskInput placeholder="Message" ref={task} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => CreateTask()}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewTaskModal;
