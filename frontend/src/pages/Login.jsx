import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { loginUser } from "../authsllice";



const loginschema =  z.object({

   
    emailID: z.string().email({ message: "Invalid email address" }), 
    password: z.string().min(6,{ message:"password  must be  6  digit  long " }) 

})


function Login() {
  const {
    register, handleSubmit,formState: { errors },} =useForm( {resolver:zodResolver(loginschema)});
     
    const dispatch =  useDispatch();
    const  navigate =  useNavigate();
    const {isAuthenticated} = useSelector( (state)=>state.auth);

    useEffect(()=>{
   if (isAuthenticated)
    navigate("/")
    },[isAuthenticated])
    
    const onSubmit= (data)=>{
        dispatch(loginUser(data))
        console.log(data)
    };


  return (
    <div className="login min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <input
            {...register("emailID", { required: "Email is required" })}
            placeholder="Enter Your Email"
            className="input input-bordered w-full"
          />
          {errors.emailID && (
            <p className="text-red-500 text-sm">{errors.emailID.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: "password is required" })}
            placeholder="Enter Your Password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;