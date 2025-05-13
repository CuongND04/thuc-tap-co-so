import {create} from "zustand";

export const store = create((set)=>({
    currentUser:null,
    isLoading:true,
    getUser:async(uid)=>{
        if(!uid) return set({currentUser:null, isLoading:false});

    //accessing db thingy here later

    try {
        //if user exist, set currentUser, isLoading:false
        //else same return
    } catch (error) {
        console.log('getUserError', error);
        return set({currentUser:null, isLoading:false});
    }

    },
    isLoading:false,
}));
