import React, { useState } from "react";
import { authService } from "fbase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount) {
                // create account
                const data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // log in 
                const data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async(event) => {
        const {
            target:{name},
        } = event;
        let provider;
        const auth = getAuth();
        if(name === 'google') {
            provider = new GoogleAuthProvider();
        } else if(name === 'github') {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}></input>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log in " : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth