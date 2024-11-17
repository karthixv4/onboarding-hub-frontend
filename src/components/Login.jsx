import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, responseState } from "../recoil/atom/atoms";
import { loginUser, registerUser } from "../services/api"; // Assuming this is your login function
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loggedInUser, roleAtom } from "../recoil/atom/user/userAtoms";
export default function Login({setIsAuthenticated}) {
  const [user, setUser] = useRecoilState(userState);
  const [response, setResponse] = useRecoilState(responseState);
  const setRole = useSetRecoilState(roleAtom)
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useRecoilState(loggedInUser);
  const [showToast, setShowToast] = useState(false); 
  useEffect(()=>{
    if(sessionUser && sessionUser.id ){
      sessionUser.role == 'manager' ? navigate('/dashboard') : 
      sessionUser.role == 'resource' ? navigate('/ud') : navigate('login');
      console.log("Step 7 : ", sessionUser);
    }
  },[sessionUser])
  // Update the user state when input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for login
  const handleSubmit = async (event) => {
    console.log("Step 1 ");
    event.preventDefault();
    try {
      console.log("Step 2");
      const payload = {
        email: user.email, 
        password: user.password
      }
      console.log("Step 3 ");
      const res = await loginUser(payload);
      if(res?.token){
        // setRole({...role, role: res.role})
        console.log("Step 4 ");
        Cookies.remove("todoToken");
        Cookies.set("todoToken", res.token, {
          path: '/', // Available in all paths
          sameSite: 'Lax', // Required for cross-origin
          secure: false // Send cookie only over HTTPS
      });
      console.log("Step 5 ");
      setSessionUser({
        id: res?.resourceId,
        role: res?.role,
        name: res?.name
      })

      console.log("Step 6 ");
      setIsAuthenticated(true);
  
      console.log("COOKIE: ", Cookies.get('todoToken'));
      if(res?.role == 'manager'){
        navigate("/dashboard")
      }else {
        navigate("/ud")
      }

      } // Call the API to log in the user
      setResponse(res); // Store the API response
    } catch (error) {
      setResponse({ error: error.message });
      setShowToast(true); // Show toast on API error
      setTimeout(() => setShowToast(false), 10000);
      setResponse({ error: error.message }); // Handle error response
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
        {showToast && (
        <div
          id="toast-danger"
          className="fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">Invalid credentials.</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => setShowToast(false)} // Close toast manually
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="mx-auto flex w-full items-stretch justify-between gap-10">
        <div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
          <div className="w-full">
            <h1 className="mb-2 text-5xl font-extrabold text-white">Log in</h1>
            <p className="text-xs text-slate-400">
              Before we start, please log into your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="my-14 flex w-full flex-col items-start justify-start gap-4">
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Email</label>
              <input
                name="email" // Ensure this matches the user object property
                onChange={handleChange}
                placeholder="Enter email"
                autoComplete="off"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Password</label>
              <input
                name="password" // Ensure this matches the user object property
                onChange={handleChange}
                placeholder="Enter a password..."
                autoComplete="off"
                type="password"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="inline-flex w-full items-center justify-between">
              <div className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 cursor-pointer"
                  name="rememberMe"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-white">Remember me</label>
              </div>
              <p className="cursor-pointer text-sm text-white hover:underline">Forgot password?</p>
            </div>
            <button type="submit" className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black transition-all duration-150 ease-in-out">
              Log in
            </button>
            <div className="mx-auto my-3 flex w-full max-w-md items-center justify-center gap-4 text-white">
              <hr className="w-full border-[0.1px] border-white" />
              <p className="text-sm">OR</p>
              <hr className="w-full border-[0.1px] border-white" />
            </div>
            <p className="text-sm font-light text-white" onClick={()=>navigate('/register')}>
              Don&#x27;t have an account?{" "}
              <span className="cursor-pointer font-bold hover:underline">Create an account</span>
            </p>
          </form>
        </div>
        <div className="fixed right-0 z-20 hidden h-screen w-1/2 md:block">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/8276607/pexels-photo-8276607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="register_image"
          />
        </div>
      </div>
    </div>
  );
}
