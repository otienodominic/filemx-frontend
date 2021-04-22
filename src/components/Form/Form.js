import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({ patientNumber: '', patientName: '', phoneNumber: '',age: '', gender: '', viralLoad: '', selectedFile: '', appointmentDate: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({patientNumber: '', patientName: '', phoneNumber: '',age: '', gender: '', viralLoad: '', selectedFile: '', appointmentDate: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
// patientNumber, patientName, phoneNumber,age, gender, viralLoad, creator, selectedFile, appointmentDate
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.patientName}"` : 'Register Patient'}</Typography>
        <TextField name="patientNumber" variant="outlined" label="Patient Number" fullWidth value={postData.patientNumber} onChange={(e) => setPostData({ ...postData, patientNumber: e.target.value })} />
        <TextField name="patientName" variant="outlined" label="Patient Name" fullWidth  value={postData.patientName} onChange={(e) => setPostData({ ...postData, patientName: e.target.value })} />
        <TextField name="phoneNumber" variant="outlined" label="Phone Number" fullWidth value={postData.phoneNumber} onChange={(e) => setPostData({ ...postData, phoneNumber: e.target.value })} />
        <TextField name="age" variant="outlined" label="Age" fullWidth value={postData.age} onChange={(e) => setPostData({ ...postData, age: e.target.value })} />
        <TextField name="gender" variant="outlined" label="Gender" fullWidth value={postData.gender} onChange={(e) => setPostData({ ...postData, gender: e.target.value })} />
        <TextField name="viralLoad" variant="outlined" label="Batch Number" fullWidth value={postData.viralLoad} onChange={(e) => setPostData({ ...postData, viralLoad: e.target.value })} />
        <TextField name="appointmentDate" type="date" variant="outlined" label="Appointment Date" fullWidth value={postData.appointmentDate} onChange={(e) => setPostData({ ...postData, appointmentDate: e.target.value })} />
        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
