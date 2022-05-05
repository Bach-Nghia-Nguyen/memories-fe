import * as api from "api";
import { AUTH } from "redux/constants/auth.constant";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData);

    if (data) {
      dispatch({ type: AUTH, data });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // sign up new user
    const { data } = await api.signUp(formData);

    if (data) {
      dispatch({ type: AUTH, data });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
