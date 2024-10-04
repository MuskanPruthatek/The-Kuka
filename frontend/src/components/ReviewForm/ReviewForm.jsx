// import React, { useState } from 'react'
// import { Star } from 'lucide-react';

// const ReviewForm = () => {

//     const [formData, setFormData] = useState({stars: "", img1: "", img2: "", img3: "", img4: "", productName: "",review: "" })

//     const [img1, setImg1] = useState(null)
//     const [img2, setImg2] = useState(null)
//     const [img3, setImg3] = useState(null)
//     const [img4, setImg4] = useState(null)

//     const handleChange = (e) =>{
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: value});
        
//     }

//     const handleImageUpload1 = (e) =>{
//         const file = e.target.files[0];
//         if (file) {
//           const imageUrl = URL.createObjectURL(file);
//           setImage1(imageUrl);
//           setFormData({ ...formData, img1: imageUrl });
//         }
//     }

//     const handleImageUpload2 = (e) =>{
//         const file = e.target.files[0];
//         if (file) {
//           const imageUrl = URL.createObjectURL(file);
//           setImage2(imageUrl);
//           setFormData({ ...formData, img2: imageUrl });
//         }
//     }

//     const handleImageUpload3 = (e) =>{
//         const file = e.target.files[0];
//         if (file) {
//           const imageUrl = URL.createObjectURL(file);
//           setImage3(imageUrl);
//           setFormData({ ...formData, img3: imageUrl });
//         }
//     }

//     const handleImageUpload4 = (e) =>{
//         const file = e.target.files[0];
//         if (file) {
//           const imageUrl = URL.createObjectURL(file);
//           setImage4(imageUrl);
//           setFormData({ ...formData, img4: imageUrl });
//         }
//     }
    
//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         alert(JSON.stringify(formData))
//         setTimeout(()=>{
//             setFormData({stars: "", img1: "", img2: "", img3: "", img4: "", productName: "", review: "" }),
//             setImage1(null),setImage2(null), setImage3(null), setImage4(null)
//         }, 2000)
//     }


//      // STARS RATING
//      const fillStars = (rating) => {
//         const filledStars = [];
//         const numberOfStars = 5;
//         const roundedRating = Math.round(parseFloat(rating));
//         for (let i = 1; i <= numberOfStars; i++) {
//           if (i <= roundedRating) {
//             filledStars.push(
//               <Star key={i} size={34} className=" text-transparent fill-[#25304c]" />
//             );
//           } else {
//             filledStars.push(
//               <Star key={i} size={34} className=" text-transparent fill-[#D9D9D9]" />
//             );
//           }
//         }
//         return filledStars;
//       };
//       const options = [1,2,3,4,5]
//       const img = "/assets/imgUpload.svg"
//   return (
//     <div className='mt-20 flex flex-col items-center '>
//        <div className='flex flex-col justify-center items-center mb-12'>
//           <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Write a Review</h1>
//           <img src="/assets/design.svg"/>
//         </div>

//         <div className='xl:w-[70%] w-[90%] md:w-[95%]  h-fit py-10 bg-[#EAEDF3] rounded-[10px] flex md:flex-row flex-col md:items-center '>
//             <div className='md:w-[50%] w-full flex flex-col items-center '>
//                 <div className='flex gap-x-1 '>
//                 {fillStars(formData.stars)}
//                 <select name="stars" id="stars" value={formData.stars} onChange={handleChange} className='ml-4 w-[66px] h-[40px] rounded-[5px] '>
//               {options.map((option) => (
//               <option key={option} value={option}  >
//                {option}
//               </option>
//               ))}
//              </select>
//                 </div>
//                <p className='text-[20px] mt-10 font-semibold font-workSans text-[#25304C]'>Product images (Upto 4)</p>
//                 <div className='flex flex-row flex-wrap gap-x-2 mt-5'>
//                     <div className='w-[79px] h-[79px] rounded-[6px] bg-[#F5F5F5] flex justify-center items-center '>
//                         <input type='file' id='img1' style={{ display: "none" }} onChange={handleImageUpload1} />
//                         <label htmlFor='img1' >
//                         <img src={image1 || img} className={`w-[53px] h-[53px] ${image1 ? "grayscale-0" : "grayscale" }  `} />
//                         </label>    
//                     </div>

//                     <div className='w-[79px] h-[79px] rounded-[6px] bg-[#F5F5F5] flex justify-center items-center '>
//                         <input type='file' id='img2' style={{ display: "none" }} onChange={handleImageUpload2} />
//                         <label htmlFor='img2' >
//                         <img src={image2 || img} className={`w-[53px] h-[53px] ${image2 ? "grayscale-0" : "grayscale" }  `} />
//                         </label>    
//                     </div>

//                     <div className='w-[79px] h-[79px] rounded-[6px] bg-[#F5F5F5] flex justify-center items-center '>
//                         <input type='file' id='img3' style={{ display: "none" }} onChange={handleImageUpload3} />
//                         <label htmlFor='img3' >
//                         <img src={image3 || img} className={`w-[53px] h-[53px] ${image3 ? "grayscale-0" : "grayscale" }  `} />
//                         </label>    
//                     </div>

//                     <div className='w-[79px] h-[79px] rounded-[6px] bg-[#F5F5F5] flex justify-center items-center '>
//                         <input type='file' id='img4' style={{ display: "none" }} onChange={handleImageUpload4} />
//                         <label htmlFor='img4' >
//                         <img src={image4 || img} className={`w-[53px] h-[53px] ${image4 ? "grayscale-0" : "grayscale" }  `} />
//                         </label>    
//                     </div>
//                 </div>

//             </div>

//             <img src="/assets/reviewLine.svg" className='md:block hidden '/>

//             <div className='md:w-[50%] w-full  '>
//                 <p className='text-[22px] font-semibold font-workSans text-[#25304C] xl:pl-16 pl-5 pt-7 md:pt-0 ' >Write Review</p>
//                 <div className='w-full  flex flex-col items-center mt-4 '>
//                 <input placeholder='Product Name' name='productName' onChange={handleChange} value={formData.productName} className='xl:w-[80%] w-[90%] h-[40px] px-4 mb-2 rounded-[10px] bg-white placeholder:text-[#535353] placeholder:text-[13px] placeholder:font-normal placeholder:font-workSans '/>
//                 <textarea placeholder='Write Review' name='review' onChange={handleChange} value={formData.review}  className='xl:w-[80%] w-[90%] h-[232px] p-4 rounded-[10px] bg-white placeholder:text-[#535353] placeholder:text-[13px] placeholder:font-normal placeholder:font-workSans ' />
//                 <button onClick={handleSubmit} className='xl:w-[80%] w-[90%] md:mt-11 mt-8 h-[47px] rounded-[30px] bg-black text-white font-poppins text-[18px] font-semibold ' >Submit</button>
//                 </div>
                

//             </div>
//         </div>
//     </div>
//   )
// }

// export default ReviewForm

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const ReviewForm = () => {
  // State to manage review data
  const [formData, setFormData] = useState({
    stars: "",
    name: "",
    reviewDescription: ""
  });

  useEffect(()=>{
    setProductName(formData.name)
    console.log(productName)
  })

  const [productName, setProductName] = useState()
  
  // State to manage image files
  const [images, setImages] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null
  });

  // State to manage image previews
  const [previews, setPreviews] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null
  });

  const [message, setMessage] = useState('');

  // Handle text and select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Generic handler for image uploads
  const handleImageUpload = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviews(prevPreviews => ({
        ...prevPreviews,
        [imageKey]: imageUrl
      }));
      setImages(prevImages => ({
        ...prevImages,
        [imageKey]: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.stars || !formData.name || !formData.reviewDescription) {
      setMessage('Please fill in all required fields.');
      return;
    }

    // Create FormData object
    const data = new FormData();
    data.append('stars', formData.stars);
    data.append('reviewDescription', formData.reviewDescription);

    // Append images if they exist
    if (images.img1) data.append('img1', images.img1);
    if (images.img2) data.append('img2', images.img2);
    if (images.img3) data.append('img3', images.img3);
    if (images.img4) data.append('img4', images.img4);

    try {
      // Replace with your actual backend URL
      const response = await axios.post(
        `${VITE_APP_SERVER}/api/product/${productName}/review`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message);

      // Reset form after successful submission
      setFormData({
        stars: "",
        name: "",
        reviewDescription: ""
      });
      setImages({
        img1: null,
        img2: null,
        img3: null,
        img4: null
      });
      setPreviews({
        img1: null,
        img2: null,
        img3: null,
        img4: null
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting review');
      console.error(error);
    }
  };

  // STARS RATING
  const fillStars = (rating) => {
    const filledStars = [];
    const numberOfStars = 5;
    const roundedRating = Math.round(parseFloat(rating));
    for (let i = 1; i <= numberOfStars; i++) {
      filledStars.push(
        <Star 
          key={i} 
          size={34} 
          className={`text-transparent ${i <= roundedRating ? 'fill-[#25304c]' : 'fill-[#D9D9D9]'}`} 
        />
      );
    }
    return filledStars;
  };

  const options = [1, 2, 3, 4, 5];
  const imgPlaceholder = "/assets/imgUpload.svg";

  return (
    <div className='mt-20 flex flex-col items-center'>
      <div className='flex flex-col justify-center items-center mb-12'>
        <h1 className='text-[30px] font-normal font-bangla text-[#25304C]'>Write a Review</h1>
        <img src="/assets/design.svg" alt="Design" />
      </div>

      <div className='xl:w-[70%] w-[90%] md:w-[95%] h-fit py-10 bg-[#EAEDF3] rounded-[10px] flex md:flex-row flex-col md:items-center'>
        {/* Left Section: Stars and Image Uploads */}
        <div className='md:w-[50%] w-full flex flex-col items-center'>
          {/* Stars Rating */}
          <div className='flex gap-x-1'>
            {fillStars(formData.stars)}
            <select 
              name="stars" 
              id="stars" 
              value={formData.stars} 
              onChange={handleChange} 
              className='ml-4 w-[66px] h-[40px] rounded-[5px]'
              required
            >
              <option value="" disabled>Select</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Image Uploads */}
          <p className='text-[20px] mt-10 font-semibold font-workSans text-[#25304C]'>Product images (Up to 4)</p>
          <div className='flex flex-row flex-wrap gap-x-2 mt-5'>
            {['img1', 'img2', 'img3', 'img4'].map((imgKey, index) => (
              <div key={index} className='w-[79px] h-[79px] rounded-[6px] bg-[#F5F5F5] flex justify-center items-center'>
                <input 
                  type='file' 
                  id={imgKey} 
                  style={{ display: "none" }} 
                  // accept="image/*" 
                  onChange={(e) => handleImageUpload(e, imgKey)} 
                />
                <label htmlFor={imgKey}>
                  <img 
                    src={previews[imgKey] || imgPlaceholder} 
                    alt={`Upload ${index + 1}`} 
                    className={`w-[53px] h-[53px] ${previews[imgKey] ? "grayscale-0" : "grayscale"}`} 
                  />
                </label>    
              </div>
            ))}
          </div>
        </div>

        {/* Divider Image */}
        <img src="/assets/reviewLine.svg" alt="Divider" className='md:block hidden' />

        {/* Right Section: Review Details */}
        <div className='md:w-[50%] w-full'>
          <p className='text-[22px] font-semibold font-workSans text-[#25304C] xl:pl-16 pl-5 pt-7 md:pt-0'>Write Review</p>
          <div className='w-full flex flex-col items-center mt-4'>
            {/* Product Name Input */}
            <input 
              type="text"
              placeholder='Product Name' 
              name='name' 
              onChange={handleChange} 
              value={formData.name} 
              className='xl:w-[80%] w-[90%] h-[40px] px-4 mb-2 rounded-[10px] bg-white placeholder:text-[#535353] placeholder:text-[13px] placeholder:font-normal placeholder:font-workSans'
              required
            />

            {/* Review Description Textarea */}
            <textarea 
              placeholder='Write Review' 
              name='reviewDescription' 
              onChange={handleChange} 
              value={formData.reviewDescription}  
              className='xl:w-[80%] w-[90%] h-[232px] p-4 rounded-[10px] bg-white placeholder:text-[#535353] placeholder:text-[13px] placeholder:font-normal placeholder:font-workSans' 
              required
            />

            {/* Submit Button */}
            <button 
              type='submit' 
              onClick={handleSubmit} 
              className='xl:w-[80%] w-[90%] md:mt-11 mt-8 h-[47px] rounded-[30px] bg-black text-white font-poppins text-[18px] font-semibold'
            >
              Submit
            </button>

            {/* Message Display */}
            {message && <p className='mt-4 text-center text-red-500'>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
