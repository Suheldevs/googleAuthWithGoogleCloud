import React, { useEffect, useState } from 'react'

function GoogleAuth() {
    const [user,setUser] = useState({})
    const handlecallbackRes = (res)=>{
        const userObject = JSON.parse(atob(res.credential.split('.')[1]));
        setUser(userObject)
    }
    useEffect(()=>{
        //Load Google Api Script
        const google = window.google;
        google.accounts.id.initialize({
            client_id: '743009708683-tips8qoe77kmf15eovqvan2cnhtqq1ba.apps.googleusercontent.com',
            callback:handlecallbackRes,
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            {
                theme:'Outline',
                size:'large',
            }
        );
        //atomatice sign in previous user
        google.accounts.id.prompt()
    },[]);
  return (
    <div>
        <h1>Login/Signup</h1>
        <div id='googleSignInDiv'>

        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <img src={user.picture} alt={user.picture}/>
        </div>
    </div>
  )
}

export default GoogleAuth