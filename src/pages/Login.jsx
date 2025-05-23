import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ onChildClick }) => {
  
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const handleSubmit=async (e) => {
    try{
    e.preventDefault();
    setIsSubmitting(true)
    const response=await axios.post('http://localhost:3000/forgot-password',{email},{
      method:"Post",
      header:{
        'Content-Type': 'application/json',
      }
    })
    if(response.data.success){
      setSubmissionStatus('success')
    }
    setIsSubmitting(false)
    }catch(error){
      setIsSubmitting(false)
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://localhost:3000/login', values, {
          withCredentials: true
        });
        console.log(response)
        setUserId(response.data.userId);
        onChildClick(response.data.userId); 
        setSubmitting(false);
        alert("Login Successful! Click here to continue");
        setRedirect(true);
      } catch (error) {
        console.error('There was an error!', error);
        setRedirect(false);
        setSubmitting(false);
      }
    }
  });



  if (redirect) {
    return <Navigate to={`/profile/:${userId}`} />;
  }

  const navigateHome = () => {
    return navigate('/');
  };
  return (
    <div className='shadow-transparent rounded-3xl w-full h-full flex flex-row-reverse'>
      <div className='h-full'>
        <img src="./images/login.jpg" alt="PHOTO" className='w-full  object-cover' style={{ height: '840px', width: '1000px' }} />
      </div>
      <button
       
        className="absolute top-0 left-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"  onClick={navigateHome}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <form className="bg-white shadow-md rounded px-7 pt-6 " style={{ height: '840px', width: '600px' }} onSubmit={formik.handleSubmit}>
        <div className='h-9 w-9'>
        </div>
        <div className='py-1 font-bold text-3xl mb-4 text-center'>Login</div>
        <div className="mb-4">
          <input
            className={`appearance-none border ${formik.errors.email ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs italic">{formik.errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            className={`appearance-none border ${formik.errors.password ? 'border-red-500' : 'border-gray-700'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && <p className="text-red-500 text-xs italic">{formik.errors.password}</p>}
        </div>
        <div className="flex items-center justify-between flex-col">
          <div className="text-base" onClick={()=>{
            setSubmissionStatus(null)
            setOpen(true)}}>
            <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Forgot Password?</a>
          </div>
       
        <button
          className="bg-blue-500 hover:bg-blue-700 w-full text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
        <div className='border-t border-black mt-4 text-base pt-3' style={{width:'15rem'}}>
          Don't have an Account? <a className='p-2 text-blue-600 hover:text-blue-400' onClick={()=>{
            navigate('/register')
          }} >SignUp</a>
        </div> </div>
      </form>

      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        slotProps={{
          paper: {
            component: 'form',
        }}}
      >
        <DialogTitle>Account Recovery</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>{setOpen(false)}}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            '&:hover': {
              color: 'red',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {submissionStatus===null && (
        <>
        <DialogContent>
          <DialogContentText>
            Please Enter the Email Id of you Account to get the recovery Email.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Link'}
        </Button>
        </DialogActions>
        </>
)}    
 {submissionStatus === 'success' && (
          <DialogContent>
            <DialogContentText sx={{ color: 'green' }}>
              ✅ Recovery link sent successfully!
            </DialogContentText>
            <DialogActions>
              <Button onClick={()=>{setOpen(false)}}>Close</Button>
            </DialogActions>
          </DialogContent>
        )}

        {submissionStatus === 'error' && (
          <DialogContent>
            <DialogContentText sx={{ color: 'red' }}>
              ❌ Failed to send recovery link. Please retry.
            </DialogContentText>
            <DialogActions>
              <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
              <Button type="submit" onClick={() => {setSubmissionStatus(null)}}>Retry</Button>
            </DialogActions>
          </DialogContent>
        )}
 </Dialog>
    </div>
  )}

export default Login;
