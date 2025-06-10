import React from 'react'

import LoginForm from "./components/LoginForm";
import  Link  from "next/link";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="card p-2 md:p-4 lg:p-8 w-full max-w-lg bg-slate-50 rounded-sm">
        <h1 className="text-3xl font-bold mb-4 text-center">Login </h1>
        <LoginForm />
        <p className="text-sm text-gray-500 mt-4">
          Dont have an account?
          <Link href="/auth/registration" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login
