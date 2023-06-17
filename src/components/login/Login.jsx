import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase.info';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef()

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const email = event. target.email.value
        const password = event. target.password.value
        console.log(email,password)

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add using two uppercase')
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please special digit add')
            return;
        }
        else if(password.lenght < 6) {
            setError('Please ad using 6 characters')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const loggedUser = result.user;
         console.log(loggedUser)
         if(loggedUser.emailVerified){
            
         }
          setSuccess('login in success')
          setError('')
        })
        .catch(error => {
          setError(error.message)
        })

    }
   
    const handlePasswordEmail = event => {
        const email = emailRef.current.value
        if(!email){
            alert('Please provide your email address to reset password.')
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please cheak your email')
        })
        .catch(error => {
           console.log(error)
           setError(error.message)
        })
    }
   
    return (
        <div className='w-50 mx-auto'>
            <h1>login page</h1>
    <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    <p><small>Forget Password? Please<button onClick={handlePasswordEmail} className='btn btn-link'> Resent password</button></small></p>
    <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login; 

