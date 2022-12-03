import React, { useState } from "react";
import Loader from "../../components/Loader";
import { useUserDispatch, loginUser } from "../../context/userContext";
import rasalogo from "../../Static/illustratos/main-rasa.png";

const login = (target, setIsLoading, setError, userDispatch) => {
  const email = target[0].value;
  const password = target[1].value;
  loginUser(userDispatch, email, password, setIsLoading, setError);
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const userDispatch = useUserDispatch();

  return (
    <>
      <div
        className={
          isLoading
            ? "absolute flex w-full h-full items-center justify-center bg-gray-100  bg-opacity-30"
            : "hidden"
        }
      >
        <Loader />
      </div>
      <div className="vh-100 flex flex-col md:flex-row  pr-bg h-screen items-center justify-center ">
        <form
          className="font-poppins shadow-xl rounded-lg bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target, setIsLoading, setError, userDispatch);
          }}
        >
          <div className="header mb-4 text-2xl text-center flex flex-col justify-center items-center">
            <img
              src={rasalogo}
              height="10px"
              width="50px"
              className="mb-4"
              alt="Logo"
            />{" "}
            Welcome To Rasa
          </div>
          {error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : null}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <button
            className=" w-full pr-red-bg hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit"
          >
            Login
          </button>
          <div className="text-center">
            <a
              className="text-right font-bold text-sm pr-blu-cg hover:text-blue-800"
              href="/signup"
            >
              Signup?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
