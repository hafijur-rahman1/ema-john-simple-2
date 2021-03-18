
// import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false,
    newUser: false
  })

  // *****context use******
   const [loggedInUser, setLoggedInUser] = useContext(userContext);
   const history = useHistory();
   const location = useLocation();
   let { from } = location.state || { from: { pathname: "/" } };


 
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSinIn = () => {

  //   firebase.auth().signInWithPopup(provider)
  //     .then(res => {

  //       const { email, displayName, photoURL } = res.user;
  //       const signInUser = {
  //         isSignIn: true,
  //         name: displayName,
  //         email: email,
  //         photo: photoURL
  //       }
  //       setUser(signInUser)
  //     })
  //     .catch(err => {
  //       console.log(err.masage);
  //     })
  // }
  // const handleSignOut = () => {
  //   firebase.auth().signOut()
  //     .then(res => {
  //       const singOutUser = {
  //         isSignIn: '',
  //         name: '',
  //         email: '',
  //         photo: ''
  //       }
  //       setUser(singOutUser)
  //     })
  }
  const handleBlur = (e) => {
    // console.log(e.target.name,e.target.value);
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === "password") {
      const isPasswordVailid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);


      isFormValid = (isPasswordVailid && passwordHasNumber);
    }
    if (isFormValid) {

      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
      
    }

  }
  const handleSubmit = (e) => {
    // console.log(user);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)


        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          
          
          // redirect to shipment Route (thats comes from privetRoute)
          history.replace(from);
          // console.log(res.user, 'sign in user');

        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
 
  return (
    <div className="App">

      {/* {
        user.isSignIn ? <p>Hello there</p> : <h1>You need to verify your Account</h1>
      }
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSinIn}>Sign In</button>
      }

      {
        user.isSignIn && <div>
          <h1>Welcome,{user.name}</h1>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
          <p>Your varification complite</p>
        </div>
      } */}
      {/* ************************ Validation with Email and Password ********************************************** */}
      <h1>Our Own Authenticatin</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="NewUser">New User Sign Up</label>

      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : "Log in"} />

      </form>

      { user.success ? <p style={{ color: 'green' }}> user {newUser ? 'created' : 'Log In '}successfully</p> : <p style={{ color: 'red' }}>{user.error}</p>}


    </div>
  );
}

export default Login;
