import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePopup } from '../comp/header/navbar';

const Login = ({ onClose }) => {

  const { setShowlogin } = usePopup();

  const handleClose = () => {
    setShowlogin(false);
  };


  const validation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validation,
    onSubmit: values => {
      console.log(values);
      onClose();
    },
  });

  return (
    <div className='px-10 py-10 shadow-transparent rounded-3xl w-1/2'>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
        <div className=' h-9 w-9  '><span className='text-3xl hover:text-red-700 font-bold' onClick={onClose}>&times;</span></div>
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
            <a className="text-blue-500 hover:text-blue-700 " href="#">Forgot Password?</a>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 w-full text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login In
        </button>
        <div className='border-t border-black mt-4 text-base pt-3'>Don't have an Account? <a className='p-2 hover:text-blue-400'>SignUp</a></div>
      </form>
    </div>
  );
}

export default Login;
