import  React, {useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Sign Up
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            variant: "outlined",
            marginTop: 58,
            marginLeft: 200,
            backgroundColor: "secondary.main",
            width: 200,
          }}
        >
          <IconButton>
            <CloseIcon></CloseIcon>
          </IconButton>
          <h2 id="child-modal-title">Create Account</h2>
          <p id="child-modal-description">
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </p>
          <Button onClick={handleClose} variant="outlined">
            Sign Up
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [loginInput, changeLoginInput] = useState({
    username: "",
    password: "",
  });

  const handleOnUserNameChange = (event) => {
    // update state with event.target.value
    const userInputState = { ...loginInput };
    userInputState.username = event.target.value;
    changeLoginInput(userInputState);
    
  };

  const handleOnPasswordChange = (event) => {
    // update state with event.target.value
    const userInputState = { ...loginInput };
    userInputState.password = event.target.value;
    changeLoginInput(userInputState);
    
  };

  const onSubmit = (event) => {

  }

  return (
    <div className="svg_icons">
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 20,
          height: 20,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          marginTop: 2,
          borderColor: "#FF1616",
          borderWidth: 10,
          backgroundColor: "secondary.main",
        }}
      >
        <AccountCircle />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "secondary.main",
            marginLeft: 20,
            width: 400,
            marginTop: 20,
            maxHeight: 300,
          }}
        >
          <IconButton>
            <CloseIcon></CloseIcon>
          </IconButton>
          <h2 id="parent-modal-title">Login</h2>
          <p id="parent-modal-description">
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={handleOnUserNameChange}
            />
            <TextField
              sx={{ backgroundColor: "common.main" }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={handleOnPasswordChange}
            />
            <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            <p>
              <b> Not a member? Sign up below</b>
            </p>
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
