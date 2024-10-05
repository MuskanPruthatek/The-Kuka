import React, { useState, useEffect } from 'react'
import Hero from '../Hero/Hero'
import { Heart } from 'lucide-react'
import ShareIcon from '@mui/icons-material/Share';
import CustomiseProducts from '../CustomiseProducts/CustomiseProducts';
import axios from "axios";
import { useParams } from 'react-router-dom';
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const ProductDetails = () => {
    const [like, setLike] = useState(false)
    const [product, setProduct] = useState([]);

    const {id} = useParams()
    const boxes=[
        {
            img: "/assets/spiceBox.png",
            name: "Wooden Spice Box",
            desc: "Lorem ipsum dolor sit amet, amet, consectetur adipiscing elit."
        },
        {
            img: "/assets/dryFruitBox.png",
            name: "Wooden Dry Fruits Box",
            desc: "Lorem ipsum dolor sit amet, amet, consectetur adipiscing elit."
        },
        {
            img: "/assets/hexagonBox.png",
            name: "Dry Fruits Box Hexagonal",
            desc: "Lorem ipsum dolor sit amet, amet, consectetur adipiscing elit."
        },
    ]

    useEffect(() => {
      // Fetch data from API
      axios
        .get(`${VITE_APP_SERVER}/api/product/${id}`) // Replace with your API endpoint
        .then((response) => {
          // Assuming the response data is in response.data
       
          setProduct(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    }, []);

    const variants = product.variants;
    console.log(variants)
    if (variants && variants.length > 0) {
      // Access the first variant's details
      const firstVariant = variants[0];
    
      console.log(firstVariant.finishType); // "Matt"
      console.log(firstVariant.productPrice); // 1000
      console.log(firstVariant.productSize); // "5 x 5"
      console.log(firstVariant.productWoodType); // "Oak"
      console.log(firstVariant.variantName); // "Square Box"
    }
  return (
    <>
      <Hero/>
      <div className='w-full mt-14 flex flex-col items-center '>
        <div className='flex flex-col mb-14 justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Wooden Spice Box</h1>
          <img src="/assets/design.svg" />
        </div>

        <div className='container md:w-[90%] w-full xl:flex-row flex-col xl:items-start items-center  flex gap-x-10'>
          
          <div className='xl:w-[50%] w-[95%]'>
             <div className='images w-full h-full flex md:flex-row  flex-col-reverse  gap-x-5 '>
             <div className='flex md:flex-col flex-row gap-x-4 md:w-[88px] w-full mt-4 md:mt-0 gap-y-6'>
                <div className='w-full md:h-[88px] h-[66px] rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='w-full md:h-[88px] h-[66px] rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='w-full md:h-[88px] h-[66px] rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='w-full md:h-[88px] h-[66px] rounded-[6px] bg-[#D9D9D9] '></div>
             </div>

             <div className='md:w-[75%] w-full '>
                <div className='w-full md:h-[450px] h-[400px] relative'>
                <img src="/assets/hexagonBox.png" className='w-full h-full object-cover rounded-[8px]  '/>
                <div onClick={()=>setLike(!like)} className='absolute w-[55px] h-[55px] rounded-full bg-white flex justify-center items-center top-4  right-4 '>
                 {!like ? <Heart /> : <Heart color='red' fill='red' />}   
                </div>
                </div>
             </div>
             </div>

             <div className='md:w-[75%] w-full md:ml-[108px] flex gap-x-5 mt-5'>
                  <button className='w-[50%] h-[56px] rounded-[6px] border-[2px] flex justify-center items-center gap-x-4 border-[#25304C] text-[18px] font-medium text-[#25304C] font-workSans '><img src="/assets/addCart.svg"/>Add to Cart</button>
                  <button className='w-[50%] h-[56px] rounded-[6px] bg-[#25304C] text-white font-semibold font-workSans text-[18px] '>Buy Now</button>
             </div>

          </div>

          <div className='xl:w-[50%] w-[95%] mt-10 xl:mt-0  '>
           
           <div className='flex justify-between w-full'>
             <p className='xl:text-[40px] md:text-[34px] text-[30px] font-bangla font-normal text-[#25304C] '>{product.productName}</p>
             <ShareIcon />
           </div> 

           <p className='font-poppins text-[18px] font-normal text-[#6779A5] '>{product.detailedDescription}</p>
            
           <p className='text-[20px] font-poppins font-bold text-[#25304C] mt-5'>Size:&nbsp;&nbsp;<b className='text-[#6779A5] text-[18px] font-medium font-poppins '>{product.productSize}</b> </p>
           <p className='text-[20px] font-poppins font-bold text-[#25304C] mt-1.5'>Wood:&nbsp;&nbsp;<b className='text-[#6779A5] text-[18px] font-medium font-poppins '>{product.productWoodType}</b> </p>
           <p className='text-[20px] font-poppins font-bold text-[#25304C] mt-1.5'>Finish:&nbsp;&nbsp;<b className='text-[#6779A5] text-[18px] font-medium font-poppins '>{product.finishType}</b> </p>
          

           <p className='text-[#6779A5] font-semibold font-poppins text-[20px] mt-5 '>Select Variant</p>
             <div className='flex flex-row gap-x-4  w-full mt-4 gap-y-6'>
             <div>
      {product.variants && product.variants.length > 0 ? (
        product.variants.map((variant, index) => (
          <div key={index}>
            {variant.variantName}
          </div>
        ))
      ) : (
        <div>No variants available</div>
      )}
    </div>

                <div className='md:w-[88px] md:h-[88px] h-[66px] w-full rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='md:w-[88px] md:h-[88px] h-[66px] w-full rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='md:w-[88px] md:h-[88px] h-[66px] w-full rounded-[6px] bg-[#D9D9D9] '></div>
                <div className='md:w-[88px] md:h-[88px] h-[66px] w-full rounded-[6px] bg-[#D9D9D9] '></div>
             </div>

           <p className='xl:text-[35px] md:text-[30px] text-[24px] font-bangla font-normal text-[#25304C] tracking-wide mt-5 '>Price:&nbsp;&nbsp;<b className='xl:text-[35px]  md:text-[30px] text-[24px]  font-bangla font-normal text-[#CE916B] tracking-wide mt-5 '>{product.productPrice}</b></p>  
          </div>

        </div>


      </div>
      {/* Wooden boxes */}
      <section className='woodenBoxes w-full mb-10 lg:mb-16 lg:px-20 mt-20'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Recommended For You</h1>
          <img src="/assets/design.svg" />
        </div>
        <div className='w-full mt-12 flex justify-center items-center lg:flex-row flex-col gap-y-8 gap-x-6 '>
           {boxes.map((box,index)=>{
            return(
             <div className='card lg:w-[40%] md:w-[70%] w-[90%] h-[420px] rounded-[4px]  '>
               <img src={box.img} alt={box.name} className='w-full h-[70%] object-cover rounded-[4px]' />
               <p className='lg:text-[30px] text-[24px] font-normal font-bangla text-[rgba(16,16,16,1)] mt-5 '>{box.name}</p>
               <p className='text-[16px] font-poppins font-normal text-[rgba(103,121,165,1)] '>{box.desc}</p>
             </div>
            )
           })} 
        </div>       
      </section>
        {/* Wooden boxes end*/}
      <CustomiseProducts/>
    </>
  )
}

export default ProductDetails
