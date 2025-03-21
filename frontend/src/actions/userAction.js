import { NOTE_LIST_RESET } from "../constants/noteContstant";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userContstant";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
      `${API_BASE_URL}/api/users/login`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT });
  
    // Clear Notes when logging out
    dispatch({ type: NOTE_LIST_RESET });
  
    document.location.href = "/";
  };
  

  export const register = (name, email, password, pic) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users`,
        { name, pic, email, password },
        config
      );
  
      dispatch({ type: REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`${API_BASE_URL}/api/users/profile`, user, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  