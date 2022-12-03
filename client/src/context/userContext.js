import React from "react";
import axios from "../customAxios";


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.tokens.access.token}`;
      return { ...state, isAuthenticated: true,...action.payload.user};
    case "SIGN_OUT_SUCCESS":  
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("access_token"),
    name: localStorage.getItem('name'),
    image: localStorage.getItem('image'),
    id:localStorage.getItem('id'),
    email:localStorage.getItem('email')
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  signOutWithoutDispatcher,
};



function loginUser(dispatch, email, password, setIsLoading, setError) {
  setIsLoading(true);
  const body = {
    email: `${email}`,
    password: `${password}`,
  };
  if (!!email && !!password) {
    axios
      .post("http://localhost:8080/v1/auth/login", body, {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.tokens.access.token);
        localStorage.setItem("access_token_expire", response.data.tokens.access.expires);
        localStorage.setItem('email',response.data.user.email)
        localStorage.setItem('id',response.data.user.id)
        localStorage.setItem('image',response.data.user.image)
        localStorage.setItem('name',response.data.user.name)
        setIsLoading(false);
        dispatch({ type: "LOGIN_SUCCESS",'payload':response.data});
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setError(`${error.response.data.message}`);
        setIsLoading(false);
        dispatch({ type: "LOGIN_FAILURE",'payload':error });
      });
  } else {
    setError("please fill the form login and password");
    setIsLoading(false);
  }
}

function signOut(dispatch) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_token_expire");
  localStorage.removeItem('email')
  localStorage.removeItem('id')
  localStorage.removeItem('image')
  localStorage.removeItem('name')
  dispatch({ type: "SIGN_OUT_SUCCESS" });
}

function signOutWithoutDispatcher() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_token_expire");
  localStorage.removeItem('email')
  localStorage.removeItem('id')
  localStorage.removeItem('image')
  localStorage.removeItem('name')
}