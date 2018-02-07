// imports

// actions

// action creators

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
export default reducer;

// reducer export

