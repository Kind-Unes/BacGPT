import React from "react";
import useAuth from "../hooks/useAuth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function FirstMessage() {
  const { user, setChats, chats } = useAuth();
  const navigate = useNavigate();
  const qst = useRef(null);
  const handleCreate = async () => {
    if (qst.current.value.length == 0) {
      return console.log("empty message");
    }
    const token = user.token;
    const wordsArray = qst.current.value.split(" ");
    const firstThreeWords = wordsArray.slice(0, 3).join(" ");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ChatName: firstThreeWords }),
      });
      response.json().then((res) => {
        console.log(res);
        navigate(`/Chat/${res._id}`);
        fetch("http://localhost:3000/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                chatId: res._id,
                content: qst.current.value,
            }),
            }).then((res) => res.json()).then((res) => {
            console.log(res);
            });
            setChats([res,...chats]);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <div className="h-[10%] flex justify-start items-center px-4 gap-3 border-b-2 border-b-brown-dark/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-brown-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </div>
      <div className="h-[90%] w-[3/4]   ">
        <div className="h-[90%] w-full flex flex-col justify-between pt-20 items-center">
          <h1 className="text-6xl font-custom font-bold text-brown-dark ">
            <img src="logoGPT.svg" className="  w-40 mr-4" />
          </h1>
          <div className="w-full h-[60%]  flex flex-col items-center justify-evenly px-16 ">
            <div className="h-[30%] w-[70%]  rounded-2xl bg-gray-lightest "></div>
            <div className="h-[30%] w-[70%]  rounded-2xl bg-gray-lightest"></div>
          </div>
        </div>
        <div className="w-full h-[10%] flex justify-center items-center">
          <form
            className="h-full w-[80%] relative "
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <input
              type="text"
              className="w-full h-[90%] rounded-2xl bg-gray-lightest px-10"
              placeholder="Send your message"
              ref={qst}
            />
            <button className="w-10 h-10 rounded-full flex justify-center items-center bg-green-mid  absolute top-3 right-5 ">
              <img src="46-arrow-curved-bottom-right.svg" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
