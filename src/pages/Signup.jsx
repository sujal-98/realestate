import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate()
  
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
    Repass: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      Name: '',
      Password: '',
      Repass: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('https://realestate-backend-i9x8.onrender.com/register', values);
        setSubmitting(false);
        alert("Signup Successful");
      } catch (error) {
        console.error('There was an error!', error);
        setSubmitting(false);
      }
    }
  });
  const navigateHome = () => {
    return navigate('/');
  };
  return (
    <div className='shadow-transparent rounded-3xl w-full h-full flex flex-row-reverse'>
      <div className='h-full'>
        <img src="./images/signup.jpg" alt="PHOTO"className='w-full  object-cover' style={{ height: '840px',width:'1000px' }}/>
      </div>
      <button
       
        className="absolute top-0 left-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"  onClick={navigateHome}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <form className="bg-white shadow-md rounded px-8 pt-10 " style={{ height: '840px',width:'600px' }} onSubmit={formik.handleSubmit}>
        <div className='h-9 w-9'>
        </div>
        <div className='py-1 font-bold text-3xl mb-7 text-center'>
          SIGNUP
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline h-12"
            id="Name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
          />
          {formik.errors.Name && formik.touched.Name && <p className="text-red-500 text-xs italic p-1 text-left px-2">{formik.errors.Name}</p>}
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline h-12"
            id="Password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
          />
          {formik.errors.Password && formik.touched.Password && <p className="text-red-500 text-xs italic p-1 text-left px-2">{formik.errors.Password}</p>}
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline h-12"
            id="Repass"
            type="password"
            placeholder="Re-enter Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Repass}
          />
          {formik.errors.Repass && formik.touched.Repass && <p className="text-red-500 text-xs italic p-1 text-left px-2">{formik.errors.Repass}</p>}
        </div>
        <div className="mb-6">
          <input
            className="appearance-none border border-gray-700 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:shadow-outline h-12"
            id="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs italic p-1 text-left px-2">{formik.errors.email}</p>}
        </div>
        <div className="flex items-center justify-between flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        <div className='py-3 px-3 '>
          Already Have an Account? <span><a  className="p-2 hover:underline text-blue-600 hover:text-blue-400" onClick={()=>{
            navigate('/login')
          }}>Login</a></span>
        </div>        </div>

        <div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
