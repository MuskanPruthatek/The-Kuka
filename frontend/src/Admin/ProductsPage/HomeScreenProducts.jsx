import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Menu } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import { Height } from '@mui/icons-material';
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;
const HomeScreenProducts = () => {

    const [boxClickOrder, setBoxClickOrder] = useState([]);
    const [mugClickOrder, setMugClickOrder] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const boxes = [
        {
            num: 1
        },
        {
            num: 2
        },
        {
            num: 3
        },
    ]

    const mugs = [
        {
            num: 1
        },
        {
            num: 2
        },
        {
            num: 3
        },
    ]

    useEffect(() => {
      // Fetch data from API
      axios
        .get(`${VITE_APP_SERVER}/api/product`) // Replace with your API endpoint
        .then((response) => {
          // Assuming the response data is in response.data
          const filteredProducts = response.data.filter(
            (product) => !product.isRemoved
          ).filter((product) => product.displayOnHomePage )
          setProducts(filteredProducts);
          console.log(filteredProducts);
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    }, []);

    const handleBoxClick = (index) => {
        if (boxClickOrder.includes(index)) {
          setBoxClickOrder(boxClickOrder.filter((i) => i !== index));
        } else {
          setBoxClickOrder([...boxClickOrder, index]);
        }
      };
    
      const handleMugClick = (index) => {
        if (mugClickOrder.includes(index)) {
          setMugClickOrder(mugClickOrder.filter((i) => i !== index));
        } else {
          setMugClickOrder([...mugClickOrder, index]);
        }
      };
    
      const getBoxOrder = (index) => {
        const orderIndex = boxClickOrder.indexOf(index);
        return orderIndex >= 0 ? orderIndex + 1 : null;
      };
    
      const getMugOrder = (index) => {
        const orderIndex = mugClickOrder.indexOf(index);
        return orderIndex >= 0 ? orderIndex + 1 : null;
      };

      const options = [1,2,3]

        // Filter products based on selected category and search value
  const filteredProducts = products.filter((product) => {
    return (
      (searchValue === "" ||
        product.productName.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  return (
    <div className='w-full bg-white font-workSans'>
        <div className='flex md:justify-end justify-center '>
          <div className='md:w-[270px] w-[95%] rounded-[6px] bg-[#EAEDF3] h-[45px] relative  '>
                <input placeholder='Search' type="text" value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} className='placeholder:text-[16px] w-[80%] h-full bg-transparent px-3 placeholder:text-[#211F3B] placeholder:font-inter placeholder:font-medium ' />
                <img src="/assets/Icon.svg" className='absolute top-3.5 right-3 '/>
            </div>
        </div>

       {filteredProducts.map((product,index)=>{
        return (
          <div className='w-full md:h-[199px] h-fit rounded-[10px] bg-[#EAEDF3] mt-5 relative md:pl-20 pl-3 py-4 md:py-0 '>
          <select name="qty" id="qty" className='absolute top-3 right-3 w-[50px] h-[30px] rounded-[5px] '>
           {options.map((option) => (
           <option key={option} value={option}>
            {option}
           </option>
           ))}
          </select>

         <p className='text-[#101010] font-bangla md:text-[32px] text-[28px] md:pt-6 w-[200px] md:w-fit '>{product.productName}</p>
         <div className='flex flex-row flex-wrap mt-3 gap-3'>
             {product.images.map((img, index)=>{
                 return (
             <div onClick={() => handleBoxClick(index)} className='w-[68px] h-[68px] md:w-[88px] md:h-[88px] cursor-pointer rounded-[6px] flex justify-center items-center bg-[#D9D9D9] border-[2px] border-[#25304C] '>
              {getBoxOrder(index)  !== null && <div className='w-[31px] h-[31px] md:w-[41px] md:h-[41px] rounded-full bg-[#25304C] flex justify-center items-center text-white text-[20px] md:text-[22px] font-workSans '>
                <p>{getBoxOrder(index)} </p> 
               </div>  } 
               <img src={img}/>
             </div>
                 )
             })}

         </div>

     </div>
        )
       })}


        {/* <div className='w-full md:h-[199px] h-fit rounded-[10px] bg-[#EAEDF3] mt-5 relative md:pl-20 pl-3 py-4 md:py-0 '>
             <select name="qty" id="qty" className='absolute top-3 right-3 w-[50px] h-[30px] rounded-[5px] '>
              {options.map((option) => (
              <option key={option} value={option}>
               {option}
              </option>
              ))}
             </select>

            <p className='text-[#101010] font-bangla md:text-[32px] text-[28px] md:pt-6 w-[200px] md:w-fit '>Wooden Mugs</p>
            <div className='flex flex-row flex-wrap mt-3 gap-3'>
                {mugs.map((mug, index)=>{
                    return (
                <div onClick={() => handleMugClick(index)} className='w-[68px] h-[68px] md:w-[88px] md:h-[88px] cursor-pointer  rounded-[6px] flex justify-center items-center bg-[#D9D9D9] border-[2px] border-[#25304C] '>
                 {getMugOrder(index) !== null && <div className='w-[31px] h-[31px] md:w-[41px] md:h-[41px] rounded-full bg-[#25304C] flex justify-center items-center text-white text-[20px] md:text-[22px] font-workSans '>
                   <p>{getMugOrder(index)}</p> 
                  </div>  } 
                </div>
                    )
                })}

            </div>

        </div> */}

          
      
    </div>
  )
}

export default HomeScreenProducts
