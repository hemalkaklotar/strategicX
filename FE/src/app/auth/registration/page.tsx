import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import  Link  from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="card p-2 md:p-4 lg:p-8 w-full max-w-lg bg-slate-50 rounded-sm">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <RegistrationForm />
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
