import * as api from "api";
import { CREATE_COMMENT } from "redux/constants/comments.constant";

export const createComment = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.createComment(value, id);

    dispatch({ type: CREATE_COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
