import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSucess } from "./userSlice"

export const login=async(dispatch,user)=>{
    dispatch(loginStart());

    try {
        const res=await publicRequest.post("/auth/login",user)
        dispatch(loginSucess(res.data))
    } catch (error) {
        dispatch(loginFailure(error))
    }
}