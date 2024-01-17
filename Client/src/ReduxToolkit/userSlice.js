import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE ={
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching : false,
    error: false
}

const userSlice =  createSlice({
    name:"userSlice",
    initialState:INITIAL_STATE,
    reducers: {
    loginStart: (state)=>{
        state.user=null;
        state.isFetching =true;
        state.error = false;
    } ,
    loginSuccess: (state, action)=>{
        state.user=action.payload;
        state.isFetching =false;
        state.error = false;
        try {
            console.log("inside set item")
            localStorage.setItem("user", JSON.stringify(action.payload));
        } catch (error) {
            console.error('Error saving user data to local storage:', error);
        }
    } ,
    loginFailure: (state)=>{
        state.user=null ;
        state.isFetching =false ;
        state.error = true;
    },
    logout:()=>{
        localStorage.clear();
    },
    
    updateStart:(state )=> {
        state.isFetching=true;
        state.error=false
    },
    updateSuccess:(state, action )=> {
        state.user = action.payload;
        state.isFetching= false;
        state.error=false;
        try {
            console.log("inside set item")
            localStorage.clear()
            localStorage.setItem("user", JSON.stringify(action.payload));
            window.location.reload();
        } catch (error) {
            console.error('Error saving user data to local storage:', error);
        }
    },
    updateFailure:(state )=> {
          
        state.isFetching = false;
        state.error=true ;
    }
    ,
    logout:(state)=>{
    state.user=null;
    state.isFetching=false;
    state.error=false;
    // localStorage.removeItem("user"); 

    }

    }
})


// Why do we export like this
// What is the meaning of this
export  const {
   loginStart ,
   loginSuccess,
loginFailure,
logout,
updateStart,
updateSuccess,
updateFailure
} = userSlice.actions;


 

export default userSlice.reducer;