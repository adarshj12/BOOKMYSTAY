import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "./firebase";
import axios from '../utils/axios'
import { otpLogin } from "../utils/API";
import jwtDecode from "jwt-decode";

const data ={
    currentUser:null,
    value:null
}

export const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response);
      },
      defaultCountry: "IN"
    }, authentication);
  }

 export const requestOTP = async(mobile) => {
    const data ={
        mobile
    }
    console.log(data);
    const phoneNumber = '+91' + mobile
    await axios.get(`${otpLogin}/${mobile}`, { headers: { "Content-Type": "application/json" } })
    .then((res)=>{
        console.log(`backend OTP response = ${res}`);
        console.log(`backend OTP response = ${JSON.stringify(res)}`);
        if(res.status===202){
            const decode = jwtDecode(res.data.token)
            data.currentUser= decode;
            console.log(`DATA is ${data}`);
        }
    })
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // console.log(`confirmation of otp => ${JSON.stringify(confirmationResult)}`);
        // ...
      }).catch((error) => {
        console.log(`error=> ${error.message}`);
      });
  }
export  const verifyOTP = (otp) => {
    console.log(otp);
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otp).then((result) => {
      console.log(result);
      console.log(JSON.stringify(result));
      const user = result.user;
      // console.log(`signed in successfully as ${JSON.stringify(user)}`);
       data.value =true;
    }).catch((error) => {
      console.log(`error=> ${error.message}`);
      data.value = false;
    });
  }
