import * as api from "api";
import { END_LOADING, START_LOADING } from "redux/constants/loading.constant";
import {
  CLEAR_SINGLE_POST,
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_SINGLE_POST,
  LIKE,
  UPDATE,
} from "redux/constants/posts.constant";

// Actions Creators
export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: FETCH_SINGLE_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const clearSinglePostData = () => (dispatch) => {
  dispatch({ type: CLEAR_SINGLE_POST });
};

export const createPost = (post, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.createPost(post);

    if (data) {
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
      navigate(`/posts/${data._id}`);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  // dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updatePost(id, post);

    if (data) {
      dispatch({ type: UPDATE, payload: data });
      // dispatch({ type: END_LOADING });
    }
  } catch (error) {
    console.log(error);
    // dispatch({ type: END_LOADING });
  }
};

export const deletePost = (id) => async (dispatch) => {
  // dispatch({ type: START_LOADING });
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    // dispatch({ type: END_LOADING });
  }
};

export const likePost = (id) => async (dispatch) => {
  // dispatch({ type: START_LOADING });
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    // dispatch({ type: END_LOADING });
  }
};
