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
      const res = await fetch("http://127.0.0.1:5000/generate_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: qst.current.value })
      })
      const jawab = await res.json()

      response.json().then((res) => {
        console.log(res);
        navigate(`/Chat/${res._id}`);

        const gptMessg = {
          chatId: res._id,
          content: jawab.response,
          sender: 'GPT'
        }
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
          fetch("http://localhost:3000/api/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(gptMessg),
          })
        });
        setChats([res, ...chats]);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="hidden md:w-3/4 md:h-screen md:flex md:flex-col bg-white">
      <div className="h-[10%] flex justify-start items-center px-4 gap-3 border-b-2 border-b-brown-dark/20 cursor-pointer font-bold " onClick={()=>{
        navigate('/')
      }}>
        home
      </div>
      <div className="h-[90%] w-[3/4]   ">
        <div className="h-[90%] w-full flex flex-col justify-between pt-20 items-center">
          <h1 className="text-6xl font-custom font-bold text-brown-dark ">
            <img src="logoGPT.svg" className="  w-40 mr-4" />
          </h1>
          <div className="w-full h-[60%]  flex items-center justify-between px-16 ">
            <div className="h-[45%] w-[30%]  rounded-2xl bg-gray-lightest "></div>
            <div className="h-[45%] w-[30%]  rounded-2xl bg-gray-lightest"></div>
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
