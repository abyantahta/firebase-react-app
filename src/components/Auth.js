import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Auth() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const signIn = async () =>{
        // console.log(auth?.currentUser.email)
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (err) {
            console.error(err)
        }
    }

    return (
    <div className="">
        <input type="email" placeholder="Email..." onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password..." onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in</button>
    </div>
    )
}

export default Auth