import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from './firebase';
import store from '../redux/store'
import { login } from "../redux/userSlice";

export const signInWithGoogle = ()=>{
    console.log('google auth');
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
    .then((res)=>{
      console.log(res);
      console.log(JSON.stringify(res));
       store.dispatch(login({
        user: res.user.displayName,
        token: res.user.accessToken
       }))
       window.location.href = "/"
    })
    .catch((err=>{
      console.log(`error=> ${err.message}`);
    }))
  }