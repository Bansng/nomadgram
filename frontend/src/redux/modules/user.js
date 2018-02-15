// imports

// actions

// action creators

// API actions

function facebookLogin(access_token){
  return dispatch => {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token: access_token
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));  
  };
}

// initial state
const initialState = {
  isLoggedIn: localStorage.getItem('jwt')? true : false
};


// reducer

function reducer(state = initialState, action){
  switch(action.type){
    default:
      return state
  }
}

// reducer functions

// exports

const actionCreators = {
  facebookLogin: facebookLogin
};

export { actionCreators };
// reducer export

export default reducer;
