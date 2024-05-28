import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

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
        setSubmitting(false);
        alert("Login Successfull ! Click here to continue");
        <Navigate to="/profile" />
      } catch (error) {
        console.error('There was an error!', error);
        setSubmitting(false);
      }
    }
  });

  return (
    <div className='shadow-transparent rounded-3xl w-full h-full flex flex-row-reverse' >
      <div className='h-full'>
        <img src="./images/login.jpg" alt="PHOTO"className='w-full  object-cover' style={{ height: '840px',width:'1000px' }}/>
      </div>
      <form className="bg-white shadow-md rounded px-7 pt-6  " style={{ height: '840px' ,width:'600px'}} onSubmit={formik.handleSubmit}>
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
        <div className="flex items-center justify-between">
          <div className="text-base">
            <a className="text-blue-500 hover:text-blue-700" href="#">Forgot Password?</a>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 w-full text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
        <div className='border-t border-black mt-4 text-base pt-3'>
          Don't have an Account? <a  className='p-2 hover:text-blue-400'>SignUp</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
