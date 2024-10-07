import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ChevronLeft, LayoutGrid, List, Star } from 'lucide-react';
import axios from "axios";
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Reviews = () => {
    // const data = [
    //     {
    //         date: "15/07/2024",
    //         name: "Wooden Mug",
    //         email: "abcd2@gmail.com",
    //         img: "/assets/beerMug.png",
    //         num: 9999999999,
    //         total: "₹22,000",
    //         customer: "Priya Mehta",
    //         items: "2 Spice Boxes",
    //         stars: 4.5,
    //         review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla"
    //     },
    //     {
    //         date: "15/07/2024",
    //         name: "Wooden Tea Mug",
    //         email: "abcd2@gmail.com",
    //         num: 9999999999,
    //         total: "₹22,000",
    //         img: "/assets/beerMug.png",
    //         customer: "Priyank Mehta",
    //         items: "2 Spice Boxes",
    //         stars: 3.5,
    //         review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla"
    //     },
    //     {
    //         date: "15/07/2024",
    //         name: "Wooden  Mug",
    //         email: "abcd2@gmail.com",
    //         num: 9999999999,
    //         total: "₹22,000",
    //         img: "/assets/beerMug.png",
    //         customer: "Taarak Mehta",
    //         items: "2 Spice Boxes",
    //         stars: 2,
    //         review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla"
    //     },
    // ]
    const [deleteId, setDeleteId] = useState();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [displayOnProductPage, setDisplayOnProductPage] = useState(false);
  
    const openDeleteBox = (id) => {
      setDeleteId(id);
      setDeleteOpen(true);
    };

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

      const deleteReview = async (reviewId) => {
        try {
          const response = await axios.delete(
            `${VITE_APP_SERVER}/api/products/review/${reviewId}`
          );
          if (response.status === 204 || response.status === 200) {
            alert("Review Deleted Successfully");
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
            setDeleteOpen(false);
          } else {
            alert("Failed to delete review");
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert("Review not found");
          } else {
            alert("An error occurred while deleting the review");
          }
          console.error("Error deleting review:", error);
        }
      };

      const handleDisplayToggle = async (reviewId) => {
        try {
          const response = await axios.patch(`${VITE_APP_SERVER}/api/products/review/${reviewId}/display`, {
            displayOnProductPage: !displayOnProductPage,
          });
          setDisplayOnProductPage(response.data.review.displayOnProductPage);
          alert('Review display status updated');
        } catch (error) {
          console.error('Error updating display status:', error);
          alert('Failed to update review display status');
        }
      };


    const [search, setSearch] = useState("");

    // const filteredItems = data.filter((item) =>
    //     item.name.toLowerCase().includes(search.toLowerCase()) || 
    //     item.email.toString().toLowerCase().includes(search.toLowerCase()) ||
    //     item.date.toString().toLowerCase().includes(search.toLowerCase())
    // );

    const [view, setView] = useState("List")

            // STARS RATING
            const fillStars = (rating) => {
                const filledStars = [];
                const numberOfStars = 5;
                const roundedRating = Math.round(parseFloat(rating));
                for (let i = 1; i <= numberOfStars; i++) {
                  if (i <= roundedRating) {
                    filledStars.push(
                      <Star key={i} className="h-5 w-5 text-transparent fill-[#25304c]" />
                    );
                  } else {
                    filledStars.push(
                      <Star key={i} className="h-5 w-5 text-transparent fill-[#D9D9D9]" />
                    );
                  }
                }
                return filledStars;
              };

  
  return (
    <div className='w-full bg-white rounded-[9px] mt-2 p-3.5 relative '>
         {deleteOpen && (
            <div className="fixed z-40 top-0 left-0 right-0 bottom-0  flex justify-center">
              <div className="md:w-[450px] w-[300px] h-[276px] bg-white rounded-[20px] shadow-xl mt-10 flex flex-col justify-center items-center">
                <p className="md:text-[18px] text-[14px] font-medium text-[#25304C] ">
                  Are you sure you want to Delete the Review?
                </p>
                <div
                  onClick={() => deleteReview(deleteId)}
                  className="w-[200px] h-[40px] border border-[#25304C] rounded-[20px] text-[#25304C] mt-[46px] text-[16px] font-medium flex justify-center items-center "
                >
                  Delete
                </div>
                <div
                  onClick={() => setDeleteOpen(false)}
                  className="w-[200px] cursor-pointer h-[40px] bg-[#25304C] rounded-[20px] text-white flex justify-center items-center mt-[10px] text-[16px] font-medium "
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
         <Link to="/admin" className='flex xl:hidden items-center gap-x-1 my-2 mb-4'>
          <ChevronLeft color="#25304c" />
          <p className='text-[#25304C] text-[16px] font-medium font-workSans '>Back</p>
      </Link>

    <div className='w-full flex xl:flex-row xl:flex-wrap flex-col gap-y-5  xl:justify-between xl:items-center '>
       <p className='text-[#25304C] font-semibold text-[18px] '>Customer Reviews</p>

       <div className='flex md:flex-row flex-col gap-x-5 gap-y-5 '>
        <div className='w-[170px] h-[45px] cursor-pointer rounded-[6px] bg-[#25304C] flex justify-center items-center '>
           <p className='text-white font-medium text-[16px] font-euclid '>Download Excel</p>
        </div>


        <div className='flex flex-row gap-4 items-center  '>
          <div className='md:w-[170px] w-[40%] h-[45px] rounded-[6px] bg-[#EAEDF3] flex justify-center items-center gap-x-2 md:gap-x-4 '>
            <img src="/assets/Calendar.svg"/>
            <p className='text-[#25304C] font-medium text-[16px] font-euclid '>01/07/2024</p>
          </div>

          <p className='text-[#25304C] font-medium text-[18px] font-euclid '>to</p>

          <div className='md:w-[170px] w-[40%] h-[45px] rounded-[6px] bg-[#EAEDF3] flex justify-center items-center gap-x-2 md:gap-x-4'>
            <img src="/assets/Calendar.svg"/>
            <p className='text-[#25304C] font-medium text-[16px] font-euclid '>01/07/2024</p>
          </div>
        </div>

        <div className='md:w-[270px] w-[95%] rounded-[6px] bg-[#EAEDF3] h-[45px] relative  '>
            <input placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search} className='placeholder:text-[16px] w-[80%] h-full bg-transparent px-3 placeholder:text-[#211F3B] placeholder:font-inter placeholder:font-medium ' />
            <img src="/assets/Icon.svg" className='absolute top-3.5 right-3 '/>
        </div>
       </div>

    </div>
    
    <div className='w-full mt-12'>
        <div className='flex md:justify-end justify-start gap-x-2 pr-5 '>
            <div onClick={()=>setView("List")} className={`w-[50px] h-[50px] flex justify-center items-center cursor-pointer rounded-[10px] ${view === "List" ? "bg-white border-[#25304c] border-[2px]" : "border-[2px] border-transparent bg-[#f1f1f1]"}  text-[#25304c] `}>
              <List />
            </div>
            <div onClick={()=>setView("Grid")} className={`w-[50px] h-[50px] flex justify-center items-center cursor-pointer rounded-[10px] ${view === "Grid" ? "bg-white border-[#25304c] border-[2px]" : "border-[2px] border-transparent bg-[#f1f1f1]"}  text-[#25304c] `}>
             <LayoutGrid />
            </div>          
        </div>

        {view === "List" && 
        <div className='flex flex-col gap-y-4 mt-10 md:px-5 '>
        {reviews.map((item,index)=>{
            return(
                <div className='xl:w-[80%] w-full md:h-[240px] h-fit py-5 md:py-0  flex md:flex-row flex-col gap-y-5 gap-x-5'>
                    <div className='md:w-[35%] w-full h-full'>
                       <div className='flex gap-x-2.5 items-center '>
                         <img src="/assets/account.svg" className='w-[24px] h-[24px] ' />
                         <p className='text-[18px] font-medium font-poppins text-black '>
                          {/* {item.customer} */}
                          Priya Mehta
                          </p>
                       </div>
                       <img src={`${VITE_APP_SERVER}/${item.images[0].replace(/\\/g, '/')}`} className='w-full h-[200px] mt-4 rounded-[4px] '/>
                    </div>

                    <div className='md:mt-11 mt-5 md:w-[65%] w-full '>
                        <p className='font-bangla text-[22px] text-[#101010] ' >{item.product.productName}</p>
                        <div className='flex gap-x-1.5 items-center '>
                        {fillStars(item.stars)}

                          <div className='w-[42px] h-[25px] rounded-[5px] ml-3 bg-[#6779A54D] flex justify-center items-center '>
                            <p className='text-[14px] font-semibold font-inter text-[#25304C] '>{item.stars}</p>
                          </div>
                        </div>

                        <p className='text-[16px] font-semibold font-workSans text-[#6779A5] mt-4'>{item.reviewDescription}</p>

                        <div className='flex md:flex-row flex-col gap-2 mt-5'>
                           <button onClick={()=>handleDisplayToggle(item._id)} className='text-[#25304C] border border-[#25304C] rounded-[6px] md:w-[347px] w-full h-[45px]  font-semibold text-[16px] font-workSans '>
                           {item.displayOnProductPage ? 'Added on Product Page' : 'Display on Product Page'}
                           </button>

                           <button onClick={()=>openDeleteBox(item._id)} className='md:w-[140px] w-full h-[45px] rounded-[6px] border border-[#FF4242] text-[#FF4242] font-semibold text-[16px] font-workSans '>
                             Remove
                           </button>

                        </div>
                    </div>

                </div>
            )
        })}
        </div>
        }

        {view === "Grid" && 
        <div className='flex flex-row flex-wrap md:gap-12 gap-8 mt-10 px-5 '>
        {reviews.map((item,index)=>{
            return(
                <div className='w-[181px]  h-fit py-5   flex  flex-col gap-y-5 '>
                    <div className=' w-full h-full'>
                       <div className='flex gap-x-2.5 items-center '>
                         <img src="/assets/account.svg" className='w-[24px] h-[24px] ' />
                         <p className='text-[18px] font-medium font-poppins text-black '>{item.customer}</p>
                       </div>
                       <img src={item.img} className='w-full h-[134px] mt-4 rounded-[4px] '/>
                    </div>

                    <div className=' mt-2 w-full '>
                        <p className='font-bangla text-[14px] text-[#101010] ' >{item.product.productName}</p>
                        <div className='flex gap-x-1.5 items-center '>
                        {fillStars(item.stars)}

                          <div className='w-[36px] h-[20px] rounded-[5px] ml-3 bg-[#6779A54D] flex justify-center items-center '>
                            <p className='text-[12px] font-semibold font-inter text-[#25304C] '>{item.stars}</p>
                          </div>
                        </div>

                        <p className='text-[12px] font-semibold font-workSans text-[#6779A5] mt-4'>{item.reviewDescription}</p>

                        <div className='flex flex-col gap-3 mt-5'>
                           <button className='text-[#25304C] border border-[#25304C] rounded-[6px] w-full h-[30px]  font-semibold text-[12px] font-workSans '>
                           Display on Product Page
                           </button>

                           <button className=' w-full h-[30px] rounded-[6px] border border-[#FF4242] text-[#FF4242] font-semibold text-[12px] font-workSans '>
                             Remove
                           </button>

                        </div>
                    </div>

                </div>
            )
        })}
        </div>
        }
    </div>

  </div>
  )
}

export default Reviews
