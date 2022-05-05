import { CREATE_COMMENT } from "redux/constants/comments.constant";
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

const initialStates = {
  isLoading: true,
  posts: [],
  post: null,
};

export default (state = initialStates, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case FETCH_SINGLE_POST:
      return { ...state, post: action.payload };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case CREATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // change the post that just received a comment...
          if (post.id === action.payload._id) {
            return action.payload;
          }
          // return all the other posts normally...
          return post;
        }),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case CLEAR_SINGLE_POST:
      return { ...state, post: null };

    default:
      return state;
  }
};
