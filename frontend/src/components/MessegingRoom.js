import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MessegingRoom({ chatId }) {
  const { user } = useAuth();
  const [messages, setmessages] = useState([]);
  const qst = useRef(null);
  const navigate = useNavigate();
  const scrolll = useRef(null);
  console.log("this is chatId : ", chatId);
  useEffect(() => {
    setmessages([]);
    const token = user.token;
    if (token == null) return console.log("no token");
    try {
      fetch(`http://localhost:3000/api/message/${chatId.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          
          setmessages(res);
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, [chatId.id]);
  const handleSendMessage =async() => {
    if (qst.current.value.length == 0) {
      return console.log("empty message");
    }
    const token = user.token;
    const res=await fetch("http://127.0.0.1:5000/generate_response",{
    method:"POST" , 
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({text:qst.current.value})
    })
    const jawab= await res.json()
    console.log(jawab);
    const gptMessg={
     chatId: chatId.id,
     content:jawab.response,
     sender:'GPT'
    }
    fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chatId: chatId.id,
        content: qst.current.value,
        
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetch("http://localhost:3000/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(gptMessg),
        }).then((rrr)=>{
          rrr.json().then((rrrrr)=>{
            setmessages([...messages, res,rrrrr]);
          })
        })
        qst.current.value = "";
      });
  };
  useEffect(() => {
    console.log(messages)

    if (scrolll.current !== null) {
      scrolll.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className=" h-screen w-screen  md:w-3/4 bg-white">
      <div className="Navbar h-[10%] border-b-2 border-brown-mid/20">
        <div className="flex justify-between items-center px-5 h-16">
          <div className="flex justify-center  hover:cursor-pointer items-baseline" onClick={()=>{
            navigate("/Chat");
          }}>
            <img
              src="../logoGPT.svg"
              alt=""
              className="w-8 mt-1 text-brown-dark"
            />
            <h1 className="text-3xl font-bold text-brown-dark font-custom">
              acGpt
            </h1>
          </div>
          <div className="flex hover:cursor-pointer" onClick={()=>{
            navigate("/");
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="messages h-[80%] w-full bg-white">
        <div className="w-full h-full overflow-y-scroll">
          {messages.map((message) => {
            return (
              <div
              ref={scrolll}
                key={message._id}
                className={`chat   ${
                  message.sender !== "GPT"
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div
                  className={`max-w-[50%]  bg-gray-lightest rounded-2xl px-3 py-4 break-words ${
                    message.sender !== "GPT" 
                      ? "bg-green-mid text-white"
                      : " bg-brown-mid/40 text-black"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[10%] flex w-full justify-center items-center">
        <form
          className="h-full w-[80%] relative "
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="w-full h-[90%] rounded-2xl bg-gray-lightest px-10"
            placeholder="Send your message"
            ref={qst}
          />
          <button className="w-10 h-10 rounded-full flex justify-center items-center bg-green-mid  absolute top-3 right-5 ">
            <img src="../46-arrow-curved-bottom-right.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
