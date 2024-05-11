import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Signup = ({ toggleL,close }) => {
  
  const validation = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
    Repass: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number')
  });
  
  
  const formik = useFormik({
    initialValues: {
      Name: '',
      Password: '',
      Repass: '',
      email: '',
      phone: ''
    },
    validationSchema: validation,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='z-3 fixed top-2 left-80 px-10 py-10 shadow-transparent rounded-3xl w-full '>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-50" onSubmit={formik.handleSubmit}>
        <div className=' h-9 w-9  '><span className='text-3xl hover:text-red-700 font-bold' onClick={close}>&times;</span></div>
        <div className='py-1 font-bold text-3xl mb-4 text-center'>
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
          {formik.errors.Email && formik.touched.Email && <p className="text-red-500 text-xs italic p-1 text-left px-2">{formik.errors.Email}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
        <div className='py-3 px-3 w-full '>
          Already Have an Account? <span><a onClick={toggleL} className="p-2 hover:underline text-blue-400">Login</a></span>
        </div>
        <div className='border-b border-black'>Or</div>
        <div>
        </div>
      </form>
    </div>
  )
}

export default Signup;
