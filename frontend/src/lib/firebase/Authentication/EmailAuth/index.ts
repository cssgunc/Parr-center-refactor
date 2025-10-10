import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {auth} from "@/lib/firebase/firebaseConfig"


export const registerUser = async (name: string, email: string, password: string) => {
    try{
    console.log(name);
    console.log(email);
    console.log(password);

    //Create User
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    const results = userCredential.user
    console.log(results)

    //Send verifcation email to the user
    await sendEmailVerification(results)
    alert(`A verifcation email has been sent to your email address ${name}`);

    } catch (error){
        console.log(error) 

    } finally{

    }
   
}