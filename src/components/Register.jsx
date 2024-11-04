import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, responseState } from "../recoil/atom/atoms";
import { registerUser } from "../services/api"; // Assuming this is your registration function
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { roleAtom } from "../recoil/atom/user/userAtoms";
export default function Register({setIsAuthenticated}) {
  const [user, setUser] = useRecoilState(userState);
  const [response, setResponse] = useRecoilState(responseState);
  const navigate = useNavigate();
  const setRole = useSetRecoilState(roleAtom)
  // Update the user state when input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for registration
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await registerUser(user); // Call the API to register the user
     
      setResponse(res); // Store the API response
      if (res?.user) {
        setRole(res.role)
        Cookies.remove("todoToken");
        Cookies.set("todoToken", res.token, {
          path: '/', // Available in all paths
          sameSite: 'None', // Required for cross-origin
          secure: false // Send cookie only over HTTPS
      });
        setIsAuthenticated(true);

        if(res?.role == 'manager'){
          navigate("/dashboard")
        }else {
          navigate("/ud")
        }// Redirect to dashboard or another route
      }
    } catch (error) {
      setResponse({ error: error.message }); // Handle error response
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="mx-auto flex w-full items-stretch justify-between gap-10">
        <div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
          <div className="w-full">
            <h1 className="mb-2 text-5xl font-extrabold text-white">Create an Account</h1>
            <p className="text-xs text-slate-400">
              Please fill in the information below to register
            </p>
          </div>
          <form onSubmit={handleSubmit} className="my-14 flex w-full flex-col items-start justify-start gap-4">
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Name</label>
              <input
                name="name" // New field for user name
                onChange={handleChange}
                placeholder="Enter your name..."
                autoComplete="off"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Email</label>
              <input
                name="email" // Ensure this matches the user object property
                onChange={handleChange}
                placeholder="Enter your email"
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
              Register
            </button>
            <div className="mx-auto my-3 flex w-full max-w-md items-center justify-center gap-4 text-white">
              <hr className="w-full border-[0.1px] border-white" />
              <p className="text-sm">OR</p>
              <hr className="w-full border-[0.1px] border-white" />
            </div>
            <p className=" text-sm font-light text-white" onClick={()=>navigate('/login')}>
              Already have an account?{" "}
              <span className="cursor-pointer font-bold hover:underline">Log in</span>
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
