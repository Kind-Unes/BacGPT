import React from "react";
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure, Transition } from "@headlessui/react";

const NavbarDefault = () => {
  return (
    <div className="w-full text-[#252641] rounded top-0 bg-BleuNuitS2EE z-[200] flex items-center px-8 pt-8 pb-4 content-between lg:flex-row xs:flex-col">
      <div className="flex items-center lg:w-fit w-full justify-between px-6">
        <div className="w-fit flex items-center gap-8">
            <img
              src="./Group 2215.svg"
              alt="BacGPT"
              className="cursor-pointer h-16 w-16"
            />
          </div>
        {/* SIDEBAR STARTS HERE */}
        <div className="flex flex-col">
          <Disclosure>
            <Disclosure.Button className="block lg:hidden outline outline-JauneS2EE hover:outline-dark rounded-lg p-2">
              <FontAwesomeIcon
                icon={faBars}
                className="text-4xl xs:text-3xl text-dark "
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel>
                <div className="absolute right-0 bg-BleuNuitS2EE p-4 rounded-lg  mt-2 z-[200] border-2 border-JauneS2EE w-max">
                  <div className=" flex flex-auto justify-end items-center flex-col lg:hidden">
                    <ul className=" flex gap-6 flex-col items-center pt-3 w-full">
                    <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="BacGPT"
                smooth={true}
                duration={500}
                >
                BacGPT
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Robot"
                smooth={true}
                duration={500}
                >
                Le robot
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Dawarat"
                smooth={true}
                duration={500}
                >
                Dawarat
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Contact"
                smooth={true}
                duration={500}
                >
                Contact
              </ScrollLink>
            </div>
          </li>
        </ul>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
        </div>
        {/* SIDEBAR ENDS HERE */}
      </div>
      <div className="hidden lg:flex flex-auto justify-end lg:items-center text-lg xs:z-auto xs:flex-col lg:flex-row">
        <ul className=" hidden lg:gap-16 gap-3 lg:pr-10 xs:flex-col  xs:items-center lg:flex-row pt-3 lg:pt-0 md:flex lg:items-center text-xl">
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="BacGPT"
                smooth={true}
                duration={500}
                >
                BacGPT
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Robot"
                smooth={true}
                duration={500}
                >
                Le robot
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Dawarat"
                smooth={true}
                duration={500}
                >
                Dawarat
              </ScrollLink>
            </div>
          </li>
          <li>
            <div className="nav-item font-Poppins hover:cursor-pointer">
              <ScrollLink
                to="Contact"
                smooth={true}
                duration={500}
                >
                Contact
              </ScrollLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarDefault;