import React, { useState, useEffect } from "react";
import axios from "axios";
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Testimonial = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        // Fetch data from API
        axios
          .get(`${VITE_APP_SERVER}/api/products/reviews`) // Replace with your API endpoint
          .then((response) => {
            setReviews(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error("There was an error fetching the products!", error);
          });
      }, []);



//    const testimonials = [
//     {
//         img: "/assets/two.png",
//         text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit ”",
//         name: "Mayank Mandal"
//     },
//     {
//         img: "/assets/three.png",
//         text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit ”",
//         name: "Shah Rukh"
//     },
//     {
//         img: "/assets/one.png",
//         text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit ”",
//         name: "Mayank Mandal"
//     },
//     {
//         img: "/assets/four.png",
//         text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit ”",
//         name: "Mayank Mandal"
//     },
//    ]

  return (
    <div className='flex flex-col  mt-10 lg:mt-16'>
      
        <div className='flex flex-col justify-center items-center mb-12'>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>What Our Customers Say</h1>
          <img src="/assets/design.svg"/>
        </div>

        <div className='flex flex-wrap gap-x-5 w-full justify-center gap-y-5'>
           {reviews.map((testimonial, index)=>{
            return(
                <div className='md:w-[303px] w-[85%] h-[416px] flex flex-col items-center bg-[rgba(234,237,243,1)] rounded-[10px] '>
                   <img src={testimonial.img} alt={testimonial.name} className='md:w-[290px] w-[95.70%] rounded-t-[5px] mt-[7.5px] h-[200px] ' />
                   <p className='text-[16px] font-normal font-bangla text-[#25304C] px-[12px] mt-4 '>{testimonial.reviewDescription}</p>
                  
                   {/* <p className='w-full text-end text-[16px] pr-[12px] font-bold font-poppins text-[#25304C] mt-4 '>-{testimonial.name}</p> */}
                 
                   
               
                </div>
            )
           })}
        </div>

    </div>
  )
}

export default Testimonial
