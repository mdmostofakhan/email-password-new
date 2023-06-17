import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../firebase.info';



const auth = getAuth(app)

const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess('')
       
        const email = event.target.email.value;
        const password = event.target. password.value
        console.log(email, password)
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please ass two digits')
            return;
        }
        else if (password.length<6){
            setError('Please add lease 6 characters')
            return;
        }


        // creat user in fb;
        createUserWithEmailAndPassword(auth, email, password)
        .then( result => {
            const loggedUser = result.user
            console.log(loggedUser)
            setError('');
            event.target.reset()
           setSuccess('use has been created successfully')
        })
        .catch(error => {
            console.log(error.message)
            setError(error.message)
        })
    }

   const handleEmailChangs = (event) => {
      console.log(event.target.value)
    //   setEmail(event.target.value)
   }

   const handlePasswordBlur = (event) => {
     console.log(event.target.value)
   }

    return (
        <div className='w-50 mx-auto'>
            <h4>Please register</h4>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChangs} className='w-50 mb-4' type="email" name="email" 
                 id="email" placeholder='Your Email' required />
                <br />
                <input onBlur={handlePasswordBlur} className='w-50 mb-4' type="password" name="password"  
                id="password" placeholder='Your Password' required />
                <br />
               
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
            <p className='text-primary'>{success}</p>
        </div>
    );
};

export default Register;