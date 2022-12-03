import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import Loader from "../../components/Loader";
import rasalogo from "../../Static/illustratos/main-rasa.png";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();


  const postSignup = (target) => {
    setIsLoading(true);

    const email = target[1].value;
    const password = target[2].value;
    const name = target[0].value;

    const body = {
      name: name,
      email: email,
      password: password,
    };
    console.log(body)

    axios
      .post("http://localhost:8080/v1/auth/register", body)
      .then((data) => {
        setIsLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);

        setError(err.response.data.message);
      });
  };

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
            postSignup(e.target);
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
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="username"
            />
          </div>
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
            Signup
          </button>
          <div className="text-center">
            <a
              className="text-right font-bold text-sm pr-blu-cg hover:text-blue-800"
              href="/login"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
