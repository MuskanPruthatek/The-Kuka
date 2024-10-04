import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const EditProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productCode: "",
    smallDescription: "",
    detailedDescription: "",
    productSize: "",
    productWoodType: "",
    finishType: "",
    productPrice: "",
  });
 
  const [images, setImages] = useState([]);
  const [existingProduct, setExistingProduct] = useState([])

  const {id}= useParams()
  console.log(id)

useEffect(() => {
    // Define a function to fetch user details
    const fetchProductDetails = async () => {
      try {
        // Make GET request to backend endpoint
        const response = await axios.get(
          VITE_APP_SERVER +
          `/api/product/${id}`
        )
        if (response.status === 200) {
            const existingProductData = response.data;
            setExistingProduct(existingProductData);
            console.log(existingProductData)
            // Prefill form with existing profile data
            setFormData(existingProductData);
            
          }
      } catch (error) {
        // Set error state if request fails
        console.error(error.message);
      }
    };

    // Call the fetchUserDetails function when component mounts
    fetchProductDetails();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []); 


  const [openVariant, setOpenVariant] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("productName", formData.name);
//     formDataToSend.append("productCategory", formData.category);
//     formDataToSend.append("productCode", formData.code);
//     formDataToSend.append("smallDescription", formData.smallDesc);
//     formDataToSend.append("detailedDescription", formData.detailedDesc);
//     formDataToSend.append("productSize", formData.size);
//     formDataToSend.append("productWoodType", formData.type);
//     formDataToSend.append("finishType", formData.finish);
//     formDataToSend.append("productPrice", formData.price);

//     images.forEach((image) => {
//       formDataToSend.append("images", image);
//     });

//     try {
//       const response = await axios.post(
//        `${VITE_APP_SERVER}/api/product`, formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Product added:", response.data);

//       // Reset form fields
//       setFormData({
//         name: "",
//         category: "",
//         code: "",
//         smallDesc: "",
//         detailedDesc: "",
//         size: "",
//         type: "",
//         finish: "",
//         price: "",
//       });

//       // Reset images
//       setImages([]);
//       // Clear file input
//       document.querySelector('input[type="file"]').value = null;
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        // Create a copy of the formValues
        const editedData = { ...formData };

        // Compare with existing profile data and remove unchanged fields
        for (const key in existingProduct) {
            if (existingProduct.hasOwnProperty(key) && editedData[key] === existingProduct[key]) {
                delete editedData[key];
            }
        }
        
    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("productCategory", formData.productCategory);
    formDataToSend.append("productCode", formData.productCode);
    formDataToSend.append("smallDescription", formData.smallDescription);
    formDataToSend.append("detailedDescription", formData.detailedDescription);
    formDataToSend.append("productSize", formData.productSize);
    formDataToSend.append("productWoodType", formData.productWoodType);
    formDataToSend.append("finishType", formData.finishType);
    formDataToSend.append("productPrice", formData.productPrice);

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });
      
        const response = await axios.put(`${VITE_APP_SERVER}/api/product/${id}/edit`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
            },
        });

        console.log(response.data);
        if (response.data.msg === "Success") {
          alert("Product edited!")
        }
         // Handle success response
    } catch (error) {
        console.error('Error:', error); // Handle error
    }
};
  return (
    <div className="relative w-full p-20 bg-white font-workSans">
      <form
        className="w-full flex flex-col md:gap-y-8 gap-y-4"
        onSubmit={handleSubmit}
      >
        {/* Variant Modal */}
        {openVariant && (
          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <div className="md:w-[590px] md:h-[292px] w-[90%] h-fit drop-shadow-2xl rounded-[10px] bg-white">
              <div className="flex justify-between pl-20 pr-2">
                <p className="font-semibold text-[24px] text-[#25304C] mt-7">
                  Create Variant
                </p>
                <X
                  onClick={() => setOpenVariant(false)}
                  color="#AEAEB2"
                  className="mt-4 cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center justify-center mt-5 gap-y-3.5">
                <input
                  type="text"
                  name="variant"
                  placeholder="Variant Name"
                  className="md:w-[444px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                <button className="md:w-[444px] mt-2 w-[90%] h-[50px] rounded-[10px] bg-[#25304C] text-white text-[20px] font-semibold">
                  Create
                </button>
                <button
                  onClick={() => setOpenVariant(false)}
                  className="md:w-[444px] w-[90%] h-[50px] rounded-[10px] bg-transparent text-[#25304C] text-[18px] font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Form */}
        <div className="flex w-full md:flex-row gap-4 flex-col items-center md:items-start">
          {/* Product Name */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              onChange={handleChange}
              value={formData.productName}
              placeholder="Enter Product Name"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>

          {/* Product Category */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Product Category
            </label>
            <input
              type="text"
              name="productCategory"
              onChange={handleChange}
              value={formData.productCategory}
              placeholder="Enter Product Category"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>

          {/* Product Code */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Product Code
            </label>
            <input
              type="text"
              name="productCode"
              onChange={handleChange}
              value={formData.productCode}
              placeholder="Enter Product Code"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>
        </div>

        <div className="flex w-full md:flex-row gap-4 flex-col items-center md:items-start">
          {/* Small Description */}
          <div className="md:w-[32.5%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Small Description for overview
            </label>
            <textarea
              name="smallDescription"
              onChange={handleChange}
              value={formData.smallDescription}
              placeholder="Enter Small Description Of Product"
              className="inputField w-full h-[160px] bg-[#EAEDF3] px-6 py-3"
            />
          </div>

          {/* Detailed Description */}
          <div className="md:w-[67.5%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Detailed Description of Product
            </label>
            <textarea
              name="detailedDescription"
              onChange={handleChange}
              value={formData.detailedDescription}
              placeholder="Enter Detailed Description Of Product"
              className="inputField w-full h-[160px] bg-[#EAEDF3] px-6 py-3"
            />
          </div>
        </div>

        <div className="flex w-full md:flex-row gap-4 flex-col items-center md:items-start">
          {/* Product Size */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Product Size
            </label>
            <input
              type="text"
              name="productSize"
              onChange={handleChange}
              value={formData.productSize}
              placeholder="Enter Product Size"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>

          {/* Product Wood Type */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Product Wood Type
            </label>
            <input
              type="text"
              name="productWoodType"
              onChange={handleChange}
              value={formData.productWoodType}
              placeholder="Enter Product Wood Type"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>

          {/* Finish Type */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Finish type (Ex: Polish, Matt, etc)
            </label>
            <input
              type="text"
              name="finishType"
              onChange={handleChange}
              value={formData.finishType}
              placeholder="Enter Finish Type"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>

          {/* Price */}
          <div className="md:w-[50%] w-[90%] flex flex-col gap-y-2">
            <label className="font-semibold text-[#25304C] text-[14px]">
              Price (₹)
            </label>
            <input
              type="number"
              name="productPrice"
              onChange={handleChange}
              value={formData.productPrice}
              placeholder="Enter Product Price"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>
        </div>

        {/* Images Upload */}
        <div className="w-full flex flex-col gap-y-2">
          <label className="font-semibold text-[#25304C] text-[14px]">
            Product Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="inputField w-full h-[45px] bg-[#EAEDF3]"
          />
          <div className="flex gap-2 mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product Preview"
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        <div className='flex w-full md:flex-row gap-4 flex-col items-center'>

                <div onClick={()=>setOpenVariant(true)} className='w-[90%] cursor-pointer md:w-[216px] h-[45px] flex justify-center items-center rounded-[10px] bg-[#25304C] md:mt-7 md:ml-2 text-white text-[16px] font-semibold '>Create Variant</div>
                <button className='w-[90%] md:w-[216px] h-[45px] rounded-[10px] bg-[#25304C] md:mt-7 md:-ml-1.5 text-white text-[16px] font-semibold '>Show Variant</button>
            </div>

    <div className="w-full flex md:gap-x-5 gap-x-2 justify-end ">
    <button
          className="md:w-[216px] w-full h-[45px] rounded-[10px] border border-[#25304C] text-[#25304c] text-[16px] font-semibold mt-6"
        >
         Cancel
        </button>

        <button
          type="submit"
          className="md:w-[216px] w-full h-[45px] rounded-[10px] bg-[#25304C] text-white text-[16px] font-semibold mt-6"
        >
          Add Product
        </button>
    </div>


      </form>
    </div>
  );
};

export default EditProduct;
