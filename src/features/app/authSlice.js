import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from './../../firebase/firebase.config';



const initialState = {
    user: { email: "", role: "" },
    isLoading: true,
    isError: false,
    error: ""
}


export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }, thunkAPI) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})


export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`http://localhost:5000/user/${email}`);
    const data = await res.json();
    if (data.status) {
        return data;
    }
    return email;
})

export const userLogin = createAsyncThunk("auth/userLogin", async ({ email, password }, thunkAPI) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
})

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    return data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOutSuccess: (state, action) => {
            state.user = { email: "", role: "" };
        },
        setUser: (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";

        }).addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            state.user.email = action.payload;

        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.user.email = "";

        }).addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";

        }).addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            state.user.email = action.payload;

        }).addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.user.email = ""

        }).addCase(googleSignIn.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";

        }).addCase(googleSignIn.fulfilled, (state, { payload }) => {
            console.log(payload.user.email);
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            state.user.email = payload.user.email;

        }).addCase(googleSignIn.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;

        }).addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";

        }).addCase(getUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            if (payload.status) {
                state.user = payload.data;
            } else {
                state.user.email = payload;
            }

        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;

        });
    }
})

// Action creators are generated for each case reducer function
export const { logOutSuccess, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;