import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse, TextField, Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { authLogout } from '../../redux/userRelated/userSlice';
import profilePic from '../../assets/defaultProfilePic.jpg'; // Import the default profile picture

const AdminProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit profile';

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState(currentUser.schoolName);

  const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, currentUser._id, "Admin"));
  };

  const deleteHandler = () => {
    try {
      dispatch(deleteUser(currentUser._id, "Students"));
      dispatch(deleteUser(currentUser._id, "Admin"));
      dispatch(authLogout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>Admin Profile</Typography>
      <Box sx={styles.infoContainer}>
        <Avatar alt="Profile Picture" src={profilePic} sx={styles.avatar} />
        <Box sx={styles.info}>
          <Typography variant="body1">Name: {currentUser.name}</Typography>
          <Typography variant="body1">Email: {currentUser.email}</Typography>
          <Typography variant="body1">School: {currentUser.schoolName}</Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="error" onClick={deleteHandler} sx={styles.deleteButton}>Delete</Button>
        <Button variant="contained" sx={styles.editButton} onClick={() => setShowTab(!showTab)}>
          {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
        </Button>
      </Box>
      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <Box component="form" sx={styles.form} onSubmit={submitHandler}>
          <Typography variant="h6" sx={styles.formTitle}>Edit Details</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="School"
            value={schoolName}
            onChange={(event) => setSchoolName(event.target.value)}
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
          <Button type="submit" variant="contained" sx={styles.submitButton}>Update</Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AdminProfile;

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '20px auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    color: '#2c2143',
    textAlign: 'center',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: '10px',
  },
  info: {
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  },
  editButton: {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    marginBottom: '20px',
    color: '#2c2143',
  },
  submitButton: {
    marginTop: '20px',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
};
