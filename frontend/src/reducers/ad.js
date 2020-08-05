import {
  POST_AD_SUCCESS,
  POST_AD_ERROR,
  GET_AD,
  GET_AD_FAILED,
  GET_AD_BY_ID,
  GET_AD_BY_ID_FAILED,
  LOGOUT,
  CLEAR_AD,
  DELETE_AD
} from "../actions/types";

const initialState = {
  post: [],
  loading: true,
  posts: [],
  deleted : false,
  pages : 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_AD_SUCCESS:
    case GET_AD:
      return {
        ...state,
        posts: payload.posts,
        pages: payload.pages,
        loading: false
      };

    case POST_AD_ERROR:
    case GET_AD_FAILED:
    case LOGOUT:
      return {
        ...state,
        loading: false
      };

      case DELETE_AD:
        return {
          ...state,
          loading: false,
          deleted : true
        };

    case CLEAR_AD:
      return {
        ...state,
        loading: false,
        posts: [],
        post: []
      };

    case GET_AD_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false
      };

    case GET_AD_BY_ID_FAILED:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
