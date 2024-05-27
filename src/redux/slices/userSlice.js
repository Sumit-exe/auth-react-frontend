import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: '',
        loggedInUserData: {},
        workLocation: ''
    },
    reducers: {
        setToken: (state, action) => {
            console.log("Set Token " + action.payload);
            state.token = action.payload;
            console.log("Set Token " + state.token);
        },
        setLoggedInUserData: (state, action) => {
            console.log("Set loggedInUserData");
            state.loggedInUserData = action.payload;
            console.log(state.loggedInUserData);
        },
        setWorkLocation: (state, action) => {
            console.log("setWorkLocation" + action.payload);
            state.workLocation = action.payload;
            console.log("setWorkLocation" + state.workLocation);
        },
        clearUserData: (state) => {
            console.log("Clearing user data");
            state.token = '';
            state.loggedInUserData = {};
            state.workLocation = '';
            console.log("User data cleared");
        }
    }
});

export default userSlice.reducer;

export const { setToken, setLoggedInUserData, setWorkLocation, clearUserData } = userSlice.actions;


// import { createSlice } from "@reduxjs/toolkit";


// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         token:'',
//         loggedInUserData:{},
//         workLocation:''
//     },
//     reducers:{
//         setToken:(state,action)=>{
//             console.log("Set Token "+action.payload)
//             state.token = action.payload;
//             console.log("Set Token "+state.token )
//         },
//         setLoggedInUserData:(state,action)=>{
//             console.log("Set loggedInUserData")
//             state.loggedInUserData = action.payload;
//             console.log(state.loggedInUserData);
//         },
//         setWorkLocation:(state,action)=>{
//             console.log("setWorkLocation" + action.payload)
//             state.workLocation = action.payload
//             console.log("setWorkLocation" +state.workLocation)
//         }
        
//     }
// })

// export default userSlice.reducer;

// export const {setToken,setLoggedInUserData,setWorkLocation} = userSlice.actions;