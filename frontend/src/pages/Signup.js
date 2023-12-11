import { useRef } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from 'react-router-dom';

export default function Signup() {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const { Error, Signup, Lauding } = useSignup();
  const handleSignup = async () => {
    const res = await Signup(name.current.value, email.current.value, password.current.value);
  };
  return (
    <div className="h-screen w-screen ">
      <div className="h-full w-full gap-12 flex flex-col justify-center items-center ">
        <div className="mr-8 lg:mr-12">
          <img src="./Group 2215.svg" className="h-32 w-32"></img>
        </div>
        <div className="flex flex-col justify-evenly items-center lg:w-[25%] h-[50%] bg-gray-lightest/60 rounded-lg  ">
          <h1 className=" font-custom  text-brown-dark text-2xl">S'inscrire</h1>
          <form
            className="h-3/5 w-3/4 flex flex-col items-center justify-evenly "
            onSubmit={(e) => {
              e.preventDefault();
              console.log(" i am here")
              handleSignup();
            }}
          >
            <input
              type="text"
              ref={name}
              placeholder="Nom d'utilisateur"
              className="w-full h-12 px-4 bg-pink-light bg-opacity-70 shadow-md py-2 my-4 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              ref={email}
              placeholder="Email"
              className="w-full h-12 px-4 bg-pink-light bg-opacity-70 shadow-md py-2 my-4 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              ref={password}
              placeholder="Mot de passe"
              className="w-full h-12 px-4 bg-pink-light bg-opacity-70 shadow-md py-2 my-4 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {!Lauding && (
              <button
                className="btn mt-2 w-full text-lg font-bold text-white bg-green-mid shadow-md rounded-lg focus:outline-none  hover:scale-105 transition-all"
                type="submit"
              >
                S'inscrire
              </button>
            )}
            {Lauding && (
              <button className="btn w-full flex justify-center items-center text-lg font-bold text-white shadow-md rounded-lg focus:outline-none hover:scale-105 transition-all outline-1 outline-green-mid bg-green-lightest">
                {" "}
                <span className="loading loading-spinner">Chargement</span>
              </button>
            )}
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
        <p>3endek compte ? </p>
        <Link to="/Login" className="text-green-mid hover:cursor-pointer">Se connecter</Link>
        </div>
      </div>
      {Error && (
        <div className=" transition-all absolute top-40  sm:top-20 sm:w-1/2 sm:absolute bg-red-300/40 border-2 rounded-md w-3/4 h-10 flex justify-center items-center text-lg font-Parr text-red-400 border-red-500 ">
          {Error.error}
        </div>
      )}
    </div>
  );
}