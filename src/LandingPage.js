import * as React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import {getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import App from './App.js';
import "./Landing.css"

const auth = getAuth()
const provider = new GoogleAuthProvider();
console.log(auth)

class LandingPage extends React.Component
{

    constructor() {
        super();
        const isLoading = sessionStorage.getItem('isLoading') === 'true' &&
            sessionStorage.getItem('authAttempted') === 'true';
        this.state =
        {
            userNow: [],
            correct: true,
            showContent: false,
            isLoading: isLoading
        }
    }
    componentDidMount() {
        this.handleAuthentication();

        setTimeout(() => {
            this.setState({ showContent: true });
        }, 1000);
    }

    signIn = () => {
        this.setState({ isLoading: true });
        sessionStorage.setItem('isLoading', 'true');
        sessionStorage.setItem('authAttempted', 'true');
        signInWithRedirect(auth, provider);
    }

    handleAuthentication()
    {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    // User has been redirected and signed in
                    const user = result.user;
                    this.setState(prevState => ({
                        userNow: [...prevState.userNow, user]
                    }));
                    this.setState({ isLoading: false });
                    sessionStorage.removeItem('isLoading');
                    sessionStorage.removeItem('authAttempted');
                } else {
                    console.log("No user has signed in via redirect yet");
                }
            }).catch((error) => {
            this.setState({ isLoading: false });
            sessionStorage.removeItem('isLoading');
            sessionStorage.removeItem('authAttempted');
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    render()
    {
        const contentClass = this.state.showContent ? 'fade-in' : 'hidden';
        if (this.state.isLoading) {
            return (
                <div className="loading-screen">
                    <p>Loading...</p>
                </div>
            );
        }
        if(this.state.userNow.length === 0)
        {
            return (
                <>
                    <div className="slide-in" id="slide-in-blue"></div>
                    <div className="slide-in" id="slide-in-orange"></div>
                    <div style={{
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center'
                    }} className={contentClass}>
                        <h1 style={{
                            color: "#FFFFFF", // Pure white for better contrast
                            fontSize: '9.5vh',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}>Mac GPT</h1>
                        <h2 style={{
                            color:"#FFFFFF", // Pure white for subheading
                            marginTop: '-3%', // Adjusted margin
                            fontSize: '3vh',
                            fontFamily: 'Newslab, georgia, Bakersville',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            fontWeight: 'bold'
                        }}>Please proceed below</h2>
                        <PrimaryButton text="Login" onClick={this.signIn} style={{ backgroundColor: '#EF6F27'}} allowDisabledFocus/>
                    </div>
                </>
            );
        }
        else
        {
            if(this.state.userNow[0].email.slice(this.state.userNow[0].email.length - 15) === "@macalester.edu")
            {
                return (
                    <App userNow={this.state.userNow}/>
                );
            }
            else
            {
                return (
                    <>
                        <div style={{textAlign: "center"}}>
                            <h1 style={{marginTop: '8%', fontSize: '9vh', fontFamily: 'Newslab, georgia, Bakersville'}}>Sorry, the page unavailable with your current account</h1>
                            <h1 style={{marginTop: '8%', fontSize: '6vh', fontFamily: 'Newslab, georgia, Bakersville'}}>Try Logging in with a <b>valid</b> Macalester Email</h1>
                        </div>
                    </>
                );
            }
        }
    }

}

export default LandingPage