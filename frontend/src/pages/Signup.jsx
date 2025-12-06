import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { registerUser } from "../authsllice";
import { useNavigate } from "react-router";


const signupschema =  z.object({

    firstname:z.string().min(2 , " name required") ,
   emailID: z.string().email({ message: "Invalid email address" }), 
    password: z.string().min(6 , { message:"password  must be  6  digit  long "  }) 

})
 



function Signup() {
  const {
    register,handleSubmit,formState: { errors },} = useForm( {resolver:zodResolver(signupschema)});

 // const submittedData =(data) => {
   // console.log(data);
// };
 
const dispatch =  useDispatch();
 const navigate = useNavigate();
const {isAuthenticated} =  useSelector((state)=>state.auth)


useEffect(()=>{
  if(isAuthenticated)
    navigate("/")
},[isAuthenticated])

const  onSubmit = (data)=>{
    dispatch(registerUser(data))
    console.log(data)
}

  return (
    <div className="signup min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            {...register("firstname", { required: "Name is required" })}
            placeholder="Enter Your Name"
            className="input input-bordered w-full bg-indigo-300"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}

          {/* Email */}
          <input
            {...register("emailID", { required: "Email is required" })}
            placeholder="Enter Your Email"
            className="input input-bordered w-full bg-indigo-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="Password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter Your Password"
            className="input input-bordered w-full bg-indigo-300 "
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full  bg-pink-200 ">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;