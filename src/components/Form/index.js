import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "redux/actions/posts.action";
import useStyles from "./styles";

const initialPostData = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(initialPostData);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((item) => item._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialPostData);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            const { name, value } = e.target;
            setPostData((prev) => ({ ...prev, [name]: value }));
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          minRows={4}
          fullWidth
          value={postData.message}
          onChange={(e) => {
            const { name, value } = e.target;
            setPostData((prev) => ({ ...prev, [name]: value }));
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            const { name, value } = e.target;
            setPostData((prev) => ({ ...prev, [name]: value.split(",") }));
          }}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData((prev) => ({ ...prev, selectedFile: base64 }));
            }}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
