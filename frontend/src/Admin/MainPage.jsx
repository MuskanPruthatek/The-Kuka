import React, { useState } from "react";
import AdminHome from "./AdminHome";
import AdminProducts from "./ProductsPage/AdminProducts";
import Slider from "./Slider";
import Customers from "./Customers";
import MobileMainPage from "./MobileMainPage";
import Reviews from "./Reviews";

const MainPage = () => {
  const [active, setActive] = useState("Home");
  return (
    <>
     <div className="w-full relative h-full xl:flex justify-center xl:justify-start hidden gap-x-3 bg-[#F9F9F9] font-workSans ">
      <div className="sideBar fixed z-50 xl:w-[20%] w-[90%] md:w-[80%] xl:flex flex-col hidden py-6 items-center bg-white h-screen ">
        <img src="/assets/KUKAlogo.svg" />

        <div className="w-full flex flex-col items-center gap-y-4 mt-44 ">
          <div
            onClick={() => setActive("Home")}
            className={`w-[96%] ${
              active === "Home"
                ? "bg-[#6779A533] border-l-[#25304C] text-[#25304C]  font-bold"
                : "text-black font-normal border-l-transparent "
            }  h-[50px] cursor-pointer flex items-center  rounded-[4px] border-l-[6px]   text-[18px]`}
          >
            <p className="pl-10 ">Home</p>
          </div>
          <div
            onClick={() => setActive("Products")}
            className={`w-[96%] ${
              active === "Products"
                ? "bg-[#6779A533] border-l-[#25304C] text-[#25304C]  font-bold"
                : "text-black font-normal border-l-transparent "
            }  cursor-pointer h-[50px] flex items-center  rounded-[4px] border-l-[6px]   text-[18px]`}
          >
            <p className="pl-10 ">Products</p>
          </div>
          <div
            onClick={() => setActive("Slider")}
            className={`w-[96%] ${
              active === "Slider"
                ? "bg-[#6779A533] border-l-[#25304C] text-[#25304C]  font-bold"
                : "text-black font-normal border-l-transparent "
            }  cursor-pointer h-[50px] flex items-center  rounded-[4px] border-l-[6px]   text-[18px]`}
          >
            <p className="pl-10 ">Slider</p>
          </div>
          <div
            onClick={() => setActive("Customers")}
            className={`w-[96%] ${
              active === "Customers"
                ? "bg-[#6779A533] border-l-[#25304C] text-[#25304C]  font-bold"
                : "text-black font-normal border-l-transparent "
            }  cursor-pointer h-[50px] flex items-center  rounded-[4px] border-l-[6px]   text-[18px]`}
          >
            <p className="pl-10 ">Customers</p>
          </div>
          <div
            onClick={() => setActive("Reviews")}
            className={`w-[96%] ${
              active === "Reviews"
                ? "bg-[#6779A533] border-l-[#25304C] text-[#25304C]  font-bold"
                : "text-black font-normal border-l-transparent "
            }  cursor-pointer h-[50px] flex items-center  rounded-[4px] border-l-[6px]   text-[18px]`}
          >
            <p className="pl-10 ">Reviews</p>
          </div>
        </div>
      </div>

      <div className="mainContent xl:ml-[21%] xl:w-[80%] w-full bg-[#F9F9F9]">
        {active === "Home" && <AdminHome />}
        {active === "Products" && <AdminProducts />}
        {active === "Slider" && <Slider />}
        {active === "Customers" && <Customers/>}
        {active === "Reviews" && <Reviews/>}
      </div>
    </div>

    <div className="flex xl:hidden w-full  ">
    <MobileMainPage/>
    </div>
   
    </>
   
  );
};

export default MainPage;
