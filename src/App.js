
import './App.css';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {

  const [display, setDisplay] = useState({
    isSignedIn: false,
    name: '',
    email: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignedInBtn = () => {
      firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const {displayName, email} = res.user;
        const isSignedIn ={
          isSignedIn: true,
          name: displayName,
          email: email
        }
        setDisplay(isSignedIn)
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const handleSignedOutBtn = () => {
      firebase.auth().signOut() 
      .then(() => {
            const userSignedOut = {
              isSignedIn: false,
              name: '',
              email: ''
            }
            setDisplay(userSignedOut)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <div className="App">
      {
        display.isSignedIn && <div>
          <h3>Welcome {(display.name).toUpperCase()}</h3>
          <p>Email: {display.email}</p>
        </div>
      }

      {
        display.isSignedIn ? <button onClick={handleSignedOutBtn}>Sign Out</button> 
        : <button onClick={handleSignedInBtn}>Sign In</button> 
      }
    </div>
  );
}

export default App;
