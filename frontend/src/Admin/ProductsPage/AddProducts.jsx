import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    code: "",
    smallDesc: "",
    detailedDesc: "",
    size: "",
    type: "",
    finish: "",
    price: "",
  });
  
  const [imageFiles, setImageFiles] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]); 
  
  const [mainProductName, setMainProductName] = useState()
  const [productName, setProductName] = useState()
  const [openVariant, setOpenVariant] = useState(false);
  const [openShowVariant, setOpenShowVariant] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit image selection to 4 images
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
  
    setImageFiles(files); // Store the actual files
  
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    console.log(imagePreviews)
  };
  
  const [variantData, setVariantData] = useState({variantName: "", productSize: "", productWoodType: "", finishType: "", productPrice: "" });
  const [imageFiles2, setImageFiles2] = useState([]); 
  const [imagePreviews2, setImagePreviews2] = useState([]); 
  
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setVariantData({ ...variantData, [name]: value });
  };
  const handleImageUpload2 = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit image selection to 4 images
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
  
    setImageFiles2(files); // Store the actual files
  
    const previews2 = files.map((file) => URL.createObjectURL(file));
    setImagePreviews2(previews2);
    console.log(imagePreviews2)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.name);
    formDataToSend.append("productCategory", formData.category);
    formDataToSend.append("productCode", formData.code);
    formDataToSend.append("smallDescription", formData.smallDesc);
    formDataToSend.append("detailedDescription", formData.detailedDesc);
    formDataToSend.append("productSize", formData.size);
    formDataToSend.append("productWoodType", formData.type);
    formDataToSend.append("finishType", formData.finish);
    formDataToSend.append("productPrice", formData.price);
  
    // Append the actual File objects
    imageFiles.forEach((file, index) => {
      formDataToSend.append(`images`, file); // Append as an array of images
    });
  
    try {
      const response = await axios.post(
        `${VITE_APP_SERVER}/api/product`, // Ensure you're accessing the environment variable correctly
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Product added:", response.data);
      setMainProductName(formData.name)
      setProductName(formData.name)
      
      // Reset form fields
      setFormData({
        name: "",
        category: "",
        code: "",
        smallDesc: "",
        detailedDesc: "",
        size: "",
        type: "",
        finish: "",
        price: "",
      });
  
      // Reset images
      setImageFiles([]);
      setImagePreviews([]);
  
      // Clear file input
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmitVariant = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("variantName", variantData.variantName);
    formDataToSend.append("productSize", variantData.productSize);
    formDataToSend.append("productWoodType", variantData.productWoodType);
    formDataToSend.append("finishType", variantData.finishType);
    formDataToSend.append("productPrice", variantData.productPrice);
  
    // Append the actual File objects
    imageFiles2.forEach((file, index) => {
      formDataToSend.append(`images`, file); // Append as an array of images
    });
  
    try {
      const response = await axios.post(
        `${VITE_APP_SERVER}/api/product/${mainProductName}/variant`, // Ensure you're accessing the environment variable correctly
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Variant added:", response.data);
      
      setVariantData({variantName: "", productSize: "", productWoodType: "", finishType: "", productPrice: "" })
  
      // Reset images
      setImageFiles2([]);
      setImagePreviews2([]);
  
      // Clear file input
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  console.log(mainProductName)

  const [variants, setVariants] = useState([])

  const [loading, setLoading] = useState(false); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    console.log("Updated Variants: ", JSON.stringify(variants, null, 2));
  }, [variants]);

  const showVariant = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error before fetching
    axios.get(`${VITE_APP_SERVER}/api/product/${productName}/variants`) // Ensure productName is the correct identifier
      .then((response) => {
        if (response.data && response.data.variants) {
          setVariants(response.data.mainProduct.variants); // Set the variants array
          console.log("Variants received:", response.data.mainProduct.variants);
          setOpenShowVariant(true)
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Failed to load variants.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the variants!", error);
        setError("Failed to load variants."); // Set error message
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  
  return (
    <div className="relative w-full bg-white font-workSans">
      <form
        className="w-full flex flex-col md:gap-y-8 gap-y-4"
        onSubmit={handleSubmit}
      >
        {/* Variant Modal */}
        {openVariant && (
          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <div className="md:w-[590px]  w-[90%] h-fit drop-shadow-2xl rounded-[10px] bg-white">
              <div className="flex justify-between pl-20 pr-2">
                <p className="font-semibold text-[24px] text-[#25304C] pt-7">
                  Create Variant
                </p>
                <X
                  onClick={() => setOpenVariant(false)}
                  color="#AEAEB2"
                  className="mt-4 cursor-pointer"
                />
              </div>
              <div  className="flex flex-col items-center justify-center mt-5 gap-y-3.5">
                <input
                  type="text"
                  name="variantName"
                  value={variantData.variantName}
                  onChange={handleChange2}
                  placeholder="Variant Name"
                  className="md:w-[444px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                <div className="flex md:flex-row flex-col gap-4 ">
                <input
                  type="text"
                  name="productSize"
                  value={variantData.productSize}
                  onChange={handleChange2}
                  placeholder="Size"
                  className="md:w-[218px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                <input
                  type="text"
                  name="productWoodType"
                  value={variantData.productWoodType}
                  onChange={handleChange2}
                  placeholder="Wood type"
                  className="md:w-[218px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                </div>

                <div className="flex md:flex-row flex-col gap-4 ">
                <input
                  type="text"
                  name="finishType"
                  value={variantData.finishType}
                  onChange={handleChange2}
                  placeholder="Finish type"
                  className="md:w-[218px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                <input
                  type="text"
                  name="productPrice"
                  value={variantData.productPrice}
                  onChange={handleChange2}
                  placeholder="Price"
                  className="md:w-[218px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                />
                </div>

                <div className="w-full flex flex-col items-center gap-y-2">
                <label className="font-semibold text-[#25304C] text-[14px]">
                 Product Images
                 </label>
                <input type="file" multiple  onChange={handleImageUpload2} className="inputField  "/>
                 <div className="flex gap-2 mt-2">
                  {imagePreviews2.map((image, index) => (
                   <img key={index} src={image} alt="Product Preview" className="w-24 h-24 object-cover rounded-md"/> ))}
                  </div>
                 </div>

                <button onClick={handleSubmitVariant} className="md:w-[444px] mt-2 w-[90%] h-[50px] rounded-[10px] bg-[#25304C] text-white text-[20px] font-semibold">
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

         {openShowVariant && ( 
          <div className="absolute flex justify-center items-center w-full h-full z-50">
          <div className="md:w-[590px]  w-[90%] h-fit drop-shadow-2xl rounded-[10px] bg-white p-5 ">
            <div className="flex justify-between ">
            <p className="text-[24px] font-semibold text-[#25304C]">Variants of {productName}</p>

            <X onClick={()=>setOpenShowVariant(false)} className="cursor-pointer "/>
            </div>
            
            <div className="flex flex-row flex-wrap gap-8 ">
             {variants.map((variant, index)=>{
               return (
                <div className="mt-5 ">
                  <div className="w-[150px] h-[150px] bg-[#25304C]/50 ">
                    <p>{variant.variantName}</p>
                  </div>
                  <p className="text-[14px] font-semibold text-[#25304C] ">{variant.variantName}</p>
              
                </div>
              ) 
              })} 
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
              name="name"
              onChange={handleChange}
              value={formData.name}
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
              name="category"
              onChange={handleChange}
              value={formData.category}
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
              name="code"
              onChange={handleChange}
              value={formData.code}
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
              name="smallDesc"
              onChange={handleChange}
              value={formData.smallDesc}
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
              name="detailedDesc"
              onChange={handleChange}
              value={formData.detailedDesc}
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
              name="size"
              onChange={handleChange}
              value={formData.size}
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
              name="type"
              onChange={handleChange}
              value={formData.type}
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
              name="finish"
              onChange={handleChange}
              value={formData.finish}
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
              name="price"
              onChange={handleChange}
              value={formData.price}
              placeholder="Enter Product Price"
              className="inputField w-full h-[45px] bg-[#EAEDF3] px-6"
            />
          </div>
        </div>


        {/* Images Upload */}
       <div className="w-full flex flex-col gap-y-2">
       <p className="font-semibold text-[#25304C] text-[14px]">
        Product Images (Upto 4 Images)
       </p>
       <label htmlFor="image" className="font-semibold w-[226px] h-[100px] bg-[#EAEDF3] flex gap-x-2 justify-center items-center rounded-[10px] text-[#25304C] text-[16px]">
        Upload Images 
        <img src="/assets/Image.png"/>
       </label>
        <input type="file" name="image" id="image" onChange={handleImageUpload} multiple  style={{ display: "none" }} className="inputField w-full h-[45px] bg-[#EAEDF3]"/>
        <div className="flex gap-2 mt-2">
        {imagePreviews.map((image, index) => (
        <img key={index} src={image} alt="Product Preview" className="w-24 h-24 object-cover rounded-md" /> ))}
        </div>
       </div>


        <div className='flex w-full md:flex-row gap-4 flex-col items-center'>

                <div onClick={()=>setOpenVariant(true)} className='w-[90%] cursor-pointer md:w-[216px] h-[45px] flex justify-center items-center rounded-[10px] bg-[#25304C] md:mt-7 md:ml-2 text-white text-[16px] font-semibold '>Create Variant</div>
                <div onClick={()=>showVariant()} className='w-[90%] md:w-[216px] h-[45px] cursor-pointer flex justify-center items-center rounded-[10px] bg-[#25304C] md:mt-7 md:-ml-1.5 text-white text-[16px] font-semibold '>Show Variant</div>
                {loading && <p>Loading variants...</p>}
                {error && <p className="text-red-500">{error}</p>}
            
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

export default AddProducts;
