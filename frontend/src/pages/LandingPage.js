import NavbarDefault from "../components/Navbar";
import ContactSection from "../components/Contact";
import { useNavigate } from 'react-router-dom';

export default function LandingPage(){
    const navigate = useNavigate();

    const handleBacGPTClick = () => {
      navigate('/Signup');
    };
  
    const handleDawaratClick = () => {
      navigate('/Courses');
    };
  
   return( 
    <div>
   <div className="bg-[#FFF3E4] rounded-b-[60px] lg:rounded-b-[120px]">
    <NavbarDefault/>
    <div id="BacGPT">
        <div className="text-center text-2xl font-bold mt-10 lg:text-5xl lg:mt-16 font-Poppins">
            <span className="text-[#2F327D]">Wsh houwa </span>
            <span className="text-[#F48C06]">BacGPT</span>
        </div>
        <div className="flex justify-center text-center">
        <p className="w-[70%] lg:w-[50%] mt-6 text-[#696984] font-Poppins break-words">Bac GPT est une plateforme en ligne tkhelik tahder m3a un robot ye9der yrepondi 3la kamel les questions li 3endek 3la l BAC, ou te9der tani tel9a dawrat en ligne fi kamel el mawad</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-64 justify-center">
      <div className="flex flex-col items-center justify-center mt-8">
        <img
          src="./Robot.png"
          alt="Robot"
          className="w-48 h-auto mt-8 mr-6 object-cover "
        />
        <button onClick={handleBacGPTClick} className="px-12 py-2 text-[#000000] mt-2 lg:mb-6 bg-transparent border border-black text-brown-dark rounded-full font-Poppins">Ahdar m3a GptBac</button>
      </div>
      <div className="flex flex-col mt-8 items-center justify-center">
        <img
          src="./Elearn.png"
          alt="Elearn"
          className="w-48 h-48 mt-12 object-cover"
        />
         <button onClick={handleDawaratClick} className="px-12 py-2 text-[#000000] mt-2 mb-4 lg:mb-0 bg-transparent border border-black text-brown-dark rounded-full font-Poppins">El9a dawarat</button>
      </div>
    </div>
    </div>
    </div>
    <div className="flex flex-col gap-12 lg:gap-24">
    <div id="Robot" className="lg:bg-white flex flex-col lg:flex-row justify-between w-[75%] items-center  mx-auto">
     <div className="flex flex-col mt-16 lg:mt-32 lg:ml-16 w-[75%] lg:w-[30%] font-Poppins font-bold">
        <div className="text-2xl text-center font-Poppins font-bold lg:text-4xl">
            <span className="text-[#F48C06]">Kifach</span>
            <span className="text-[#2F327D]"> yfidek le robot</span>
        </div>
       <p className="break-words pt-4 text-lg font-Poppins text-center lg:text-lg"> Rah ykoun l'assistant ta3ek pendant l3am ta3 el bac, khessouk des livres te9ra menhoum ? rahou hna, des profs ? rahou hna !</p>
     </div>
     <div>
        <img src="./RobotMouse.png" className="h-auto w-auto mt-12 object-cover hidden lg:flex"></img>
     </div>
    </div>
    <div id="Dawarat" className="lg:bg-white flex flex-col lg:flex-row items-center justify-between w-[75%] mb-16 mx-auto">
    <div>
        <img src="./RobotTab.png" alt="RobotTableau" className="h-auto w-auto mt-12 object-cover hidden lg:flex"></img>
     </div>
     <div className="flex flex-col mt-16 lg:mt-32 lg:ml-16 w-[75%] lg:w-[30%] font-Poppins font-bold">
        <div className="text-2xl text-center font-Poppins font-bold lg:text-4xl">
            <span className="text-[#F48C06]">Mal9itch</span>
            <span className="text-[#2F327D]"> dawarat en ligne</span>
        </div>
       <p className="break-words pt-4 text-lg font-Poppins text-center lg:text-lg"> 3endna un catalogue ta3 les cours en ligne li rahoum jayin, ghir m3a des profs 3endhoum khibra , il suffit berk t3aytoulhoum bach treserviw plassetkoum</p>
     </div>
    
    </div>
    </div>
    <ContactSection/>
    
    
    </div>)
}