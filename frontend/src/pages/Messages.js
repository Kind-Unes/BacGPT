import React from "react";
import useAuth from "../hooks/useAuth";
import MessegingRoom from "../components/MessegingRoom";
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function Messages() {
  const { chats, loadingChats, user, setChats } = useAuth();
  const [renaming, setRenaming] = useState(false);
  const [chatNamed, setChatNamed] = useState("");
  const chatId = useParams();
  const navigate = useNavigate();
  const nameChat = useRef(null);
  const currentName = useRef(null);
  const handleDelete = async (id) => {
    const token = user.token;
    if (id.length == 0) return console.log("empty id");
    if (token == null) return console.log("no token");
    try {
      const response = await fetch(`http://localhost:3000/api/chat/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId: id }),
      });
      response.json().then((res) => {
        setChats(chats.filter((chat) => chat._id != id));
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleNameChange = async (chatId, name) => {
    const token = user.token;
    if (name.length == 0) return console.log("empty name");
    try {
      const response = await fetch(`http://localhost:3000/api/chat/rename`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, chatId }),
      });
      response.json().then((res) => {
        setRenaming(false);
        setChatNamed("");
        setChats(
          chats.map((chat) => {
            console.log(chat._id==null);
            if (chat._id == chatId) {
              chat.name = name;
            }
            return chat;
          })
        );
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="hidden md:w-1/4 md:h-screen md:block bg-gray-lightest">
        <div className=" h-[10%] flex justify-start items-center px-4 gap-3">
          <img src="../32-chat-double.svg" />
          <h1 className=" font-custom text-4xl  text-brown-dark font-bold">
            Chats
          </h1>
        </div>
        {loadingChats && (
          <div className="h-[80%] w-[90%] flex justify-center items-center ">
            <span className="loading loading-spinner  text-brown-dark">
              Loading
            </span>
          </div>
        )}
        {chats.length !== 0 && (
          <ul className="chats h-[80%] w-[90%] mx-auto py-2 px-2 ">
            {chats.length !== 0 &&
              chats.map((chat, index) => {
                const rename = renaming && chatNamed == chat._id;
                return (
                  <>
                    {" "}
                    {chatId.id !== chat._id && (
                      <li
                        className="border-b-2  border-opacity-20  border-brown-dark  w-full h-20 py-8  justify-start flex items-center font-custom"
                        key={index}
                      >
                        <div className="px-6 py-9 flex flex-col gap-1 ">
                          {!rename && (
                            <h1
                              className=" font-custom font-bold text-2xl text-brown-dark hover:cursor-pointer"
                              onClick={() => {
                                navigate(`/Chat/${chat._id}`);
                              }}
                            >
                              {chat.name}
                            </h1>
                          )}
                          {rename && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleNameChange(
                                  chat._id,
                                  nameChat.current.value
                                );
                              }}
                            >
                              <input
                                type="text"
                                ref={nameChat}
                                className="w-full font-custom font-bold text-2xl text-brown-dark  border-b-2 bg-transparent ring-0 border-0 "
                              />
                            </form>
                          )}
                          <div className="flex gap-3 text-xs text-brown-mid text-opacity-80 ">
                            <div
                              className="flex  gap-1 font-custom group"
                              onClick={() => {
                                setRenaming(true);
                                setChatNamed(chat._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 group-hover:cursor-pointer "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>

                              <span className="group-hover:cursor-pointer">
                                rename
                              </span>
                            </div>

                            <div className="flex gap-1 group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 group-hover:cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              <span
                                className=" font-custom group-hover:cursor-pointer"
                                onClick={() => {
                                  handleDelete(chat._id);
                                }}
                              >
                                delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {chatId.id === chat._id && (
                      <li
                        className="border-b-2  border-opacity-20  border-r-4 bg-green-lightest  border-green-dark  w-full h-20 py-8  justify-start flex items-center font-custom"
                        key={index}
                      >
                        <div className="px-6 py-9 flex flex-col gap-1 ">
                          {!rename && (
                            <h1
                              className="  font-custom font-bold text-2xl text-green-dark hover:cursor-pointer"
                              onClick={() => {
                                navigate(`/Chat/${chat._id}`);
                              }}
                            >
                              {chat.name}
                            </h1>
                          )}
                          {rename && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleNameChange(
                                  chat._id,
                                  currentName.current.value
                                );
                              }}
                            >
                              <input
                                type="text"
                                ref={currentName}
                                className="w-full font-custom font-bold text-2xl text-brown-dark  border-b-2 bg-transparent ring-0 border-0 "
                              />
                            </form>
                          )}
                          <div className="flex gap-3 text-xs text-green-mid text-opacity-80 ">
                            <div
                              className="flex  gap-1 font-custom group"
                              onClick={() => {
                                setRenaming(true);
                                setChatNamed(chat._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 group-hover:cursor-pointer "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>

                              <span className="group-hover:cursor-pointer">
                                rename
                              </span>
                            </div>
                            <div
                              className="flex gap-1 group"
                              onClick={() => {
                                handleDelete(chat._id);
                                navigate("/Chat");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 group-hover:cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              <span className=" font-custom group-hover:cursor-pointer">
                                delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </>
                );
              })}
          </ul>
        )}
      </div>
      <MessegingRoom chatId={chatId} />
    </div>
  );
}
