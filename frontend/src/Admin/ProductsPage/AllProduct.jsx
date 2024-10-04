import { ChevronDown, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`${VITE_APP_SERVER}/api/product`) // Replace with your API endpoint
      .then((response) => {
        // Assuming the response data is in response.data
        const filteredProducts = response.data.filter(
          (product) => !product.isRemoved
        );
        setProducts(filteredProducts);
        console.log(filteredProducts);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  

    // Optional: Log products whenever they change
    useEffect(() => {
      console.log("Updated Products State:", products);
    }, [products]);

  // Filter products based on selected category and search value
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "" || product.productCategory === selectedCategory) &&
      (searchValue === "" ||
        product.productName.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  const handleCheckboxChange = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].display_on_home =
      !updatedProducts[index].display_on_home;
    setProducts(updatedProducts);
  };

  const [deleteId, setDeleteId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteBox = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const [productId, setProductId] = useState();
  const [openDiscount, setOpenDiscount] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState()

  const openDiscountBox = (id) => {
    setProductId(id);
    setOpenDiscount(true);
  };


const handleSubmitDiscount = async (e) => {
  e.preventDefault();

  try {
    // Send a PATCH request instead of POST
    const response = await axios.patch(
      `${VITE_APP_SERVER}/api/product/${productId}/discount`,
      { discountPercentage }, // Sending JSON data
      {
        headers: {
          "Content-Type": "application/json", // Setting the correct content-type
        },
      }
    );

    console.log("Discount applied:", response.data);

    // Clear the discount percentage input after successful submission
    setDiscountPercentage('');
    setOpenDiscount(false); // Close the discount modal if necessary
  } catch (error) {
    console.error("Error applying discount:", error.response?.data || error.message);
  }
};


  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${VITE_APP_SERVER}/api/product/${productId}/remove`
      );
      if (response.status === 204 || response.status === 200) {
        alert("Product Removed Successfully");
        
        setProducts((prevProducts) =>
          prevProducts.filter((product) => !product.isRemoved)
        );
        
        setDeleteOpen(false);
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Product not found");
      } else {
        alert("An error occurred while deleting the product");
      }
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="relative ">
          {deleteOpen && (
            <div className="fixed z-40 top-0 left-0 right-0 bottom-0  flex justify-center">
              <div className="md:w-[450px] w-[300px] h-[276px] bg-white rounded-[20px] shadow-xl mt-10 flex flex-col justify-center items-center">
                <p className="md:text-[18px] text-[14px] font-medium text-[#25304C] ">
                  Are you sure you want to Remove the product?
                </p>
                <div
                  onClick={() => deleteProduct(deleteId)}
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

         {filteredProducts.map((product,index)=>{
          return (
            <>
            {openDiscount && product._id === productId && (
            <div className="absolute flex justify-center items-center w-full h-full z-50">
              <div className="md:w-[590px] md:h-[292px] w-[90%] h-fit drop-shadow-2xl rounded-[10px] bg-white">
                <div className="flex justify-between pl-20 pr-2">
                  <p className="font-semibold text-[24px] text-[#25304C] pt-7">
                    Add Discount for 
                  </p>
                  <X
                    onClick={() => setOpenDiscount(false)}
                    color="#AEAEB2"
                    className="mt-4 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col items-center justify-center mt-5 gap-y-3.5">
                  <input
                    type="text"
                    name="discount"
                    onChange={(e)=>setDiscountPercentage(e.target.value)}
                    value={discountPercentage}
                    placeholder="Discount percent"
                    className="md:w-[444px] w-[90%] h-[50px] rounded-[10px] px-4 bg-[#EAEAEB80] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#535353]"
                  />
                  <button onClick={handleSubmitDiscount} className="md:w-[444px] mt-2 w-[90%] h-[50px] rounded-[10px] bg-[#25304C] text-white text-[20px] font-semibold">
                    Add
                  </button>
                  <button
                    onClick={() => setOpenDiscount(false)}
                    className="md:w-[444px] w-[90%] h-[50px] rounded-[10px] bg-transparent text-[#25304C] text-[18px] font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
            </>
          )

         })} 

      <div className="flex items-center justify-between">
        <div className="relative">
          <div
            className="bg-[#EAEDF3] p-3 rounded-md flex items-center gap-x-3 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <p className="text-[#211F3B] font-inter font-medium">
              {selectedCategory || "All Categories"}
            </p>
            <ChevronDown className="text-[#211F3B]" />
          </div>
          <div
            className={`absolute top-full left-0 bg-[#EAEDF3] w-full max-h-60 overflow-y-auto rounded-b-md z-50 ${
              open ? "block" : "hidden"
            } z-10`}
          >
            <ul>
              {products
                .map((product) => product.productCategory)
                .filter(
                  (category, index, self) => self.indexOf(category) === index
                ) // Remove duplicates
                .map((category, index) => (
                  <li
                    key={index}
                    className="text-[#211F3B] font-inter font-medium p-2 hover:bg-[#E0E0E0] cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpen(false); // Close dropdown after selection
                    }}
                  >
                    {category}
                  </li>
                ))}
              <li
                className="text-[#211F3B] font-inter font-medium p-2 hover:bg-[#E0E0E0] cursor-pointer"
                onClick={() => {
                  setSelectedCategory("");
                  setOpen(false); // Close dropdown after selection
                }}
              >
                All Categories
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-x-5 bg-[#EAEDF3] rounded-md px-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-3 rounded-md outline-none bg-transparent text-[#211F3B] font-inter font-medium placeholder:text-[#211F3B] placeholder:font-medium"
            placeholder="Search"
          />
          <Search />
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-4 mt-5">
        {filteredProducts.map((product, index) => (
          <div key={index} className="flex items-center gap-x-5 h-fit">
            <div className="w-52 h-52 rounded-md">
              <img
                className="w-full h-full object-cover rounded-md"
                src={`${VITE_APP_SERVER}/${product.images[0]}`}
                alt={product.productName}
              />
            </div>
            <div className="flex flex-col items-start justify-between h-full">
              <div className="flex flex-col items-start justify-between h-full gap-y-5">
                <h2 className="text-[22px] font-normal text-[#101010] font-bangla">
                  {product.productName} 
                </h2>
                <p className="text-[#6779A5] font-poppins text-sm">
                  {product.smallDescription}
                </p>
                <div className="flex items-center gap-x-5">
                  <p className="text-[#25304C] font-bangla text-2xl">
                    Price:{" "}
                    <span className="text-[#CE916B] font-bangla">
                      ₹{product.productPrice}
                    </span>
                  </p>
                  <div className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.display_on_home}
                      onChange={() => handleCheckboxChange(index)}
                      className="accent-[#25304C]"
                      id={product.productName}
                    />
                    <label
                      htmlFor={product.productName}
                      className="text-[#25304C] text-xs font-semibold"
                    >
                      Display on Home
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <button onClick={()=>openDiscountBox(product._id)} className="text-[#25304C] border border-[#25304C] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Give Discount
                </button>
                <Link to={`/admin/editproduct/${product._id}`} >              
                <button className="text-[#25304C] border border-[#25304C] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Edit
                </button>
                </Link>
                <button onClick={()=>openDeleteBox(product._id)} className="text-[#FF4242] border border-[#FF4242] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
