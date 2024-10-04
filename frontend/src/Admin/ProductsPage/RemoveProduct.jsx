import { ChevronDown, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;
import axios from "axios";
import { Link } from "react-router-dom";
const RemoveProduct = () => {
  // const [products, setProducts] = useState([
  //   {
  //     title: "Wooden Spices Box",
  //     description: "This is product 1",
  //     image: "/assets/spiceBox.png",
  //     price: "1199",
  //     display_on_home: true,
  //     category: "Spices",
  //   },
  //   {
  //     title: "Product 2",
  //     description: "This is product 2",
  //     image: "/assets/spiceBox.png",
  //     price: "1199",
  //     display_on_home: false,
  //     category: "Spices",
  //   },
  //   {
  //     title: "Product 3",
  //     description: "This is product 3",
  //     image: "/assets/spiceBox.png",
  //     price: "1199",
  //     display_on_home: true,
  //     category: "Dry Fruit",
  //   },
  // ]);

  const [products, setProducts] = useState([])

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`${VITE_APP_SERVER}/api/product/removed`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products); 
          console.log(response.data.products);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);

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

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${VITE_APP_SERVER}/api/product/${productId}/delete`
      );
      if (response.status === 204 || response.status === 200) {
        alert("Product Deleted Successfully");
        
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
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

  const [restoreId, setRestoreId] = useState();
  const [restoreOpen, setRestoreOpen] = useState(false);

  const openRestoreBox = (id) => {
    setRestoreId(id);
    setRestoreOpen(true);
  };

  const restoreProduct = async (productId) => {
    try {
      const response = await axios.put(
        `${VITE_APP_SERVER}/api/product/${productId}/restore`
      );
      if (response.status === 204 || response.status === 200) {
        alert("Product Restored Successfully");
        
        setProducts((prevProducts) =>
          prevProducts.filter((product) => !product.isRemoved)
        );
        
        setRestoreOpen(false);
      } else {
        alert("Failed to restore product");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Product not found");
      } else {
        alert("An error occurred while restoring the product");
      }
      console.error("Error restoring product:", error);
    }
  };
  return (
    <div className="relative ">
          {deleteOpen && (
            <div className="fixed z-40 top-0 left-0 right-0 bottom-0  flex justify-center">
              <div className="md:w-[450px] w-[300px] h-[276px] bg-white rounded-[20px] shadow-xl mt-10 flex flex-col justify-center items-center">
                <p className="md:text-[18px] text-[14px] font-medium text-[#25304C] ">
                  Are you sure you want to Delete the product?
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

          {restoreOpen && (
            <div className="fixed z-40 top-0 left-0 right-0 bottom-0  flex justify-center">
              <div className="md:w-[450px] w-[300px] h-[276px] bg-white rounded-[20px] shadow-xl mt-10 flex flex-col justify-center items-center">
                <p className="md:text-[18px] text-[14px] font-medium text-[#25304C] ">
                  Are you sure you want to Restore the product?
                </p>
                <div
                  onClick={() => restoreProduct(restoreId)}
                  className="w-[200px] h-[40px] border border-[#25304C] rounded-[20px] text-[#25304C] mt-[46px] text-[16px] font-medium flex justify-center items-center "
                >
                  Restore
                </div>
                <div
                  onClick={() => setRestoreOpen(false)}
                  className="w-[200px] cursor-pointer h-[40px] bg-[#25304C] rounded-[20px] text-white flex justify-center items-center mt-[10px] text-[16px] font-medium "
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
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
                .map((product, index) => product.productCategory)
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
                src={product.images[0]}
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
                    <span className="text-[#CE916B]">{product.productPrice}</span>
                  </p>
                  <div className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.display_on_home}
                      onChange={() => handleCheckboxChange(index)}
                      className="accent-[#25304C]"
                      id={product.title}
                    />
                    <label
                      htmlFor={product.title}
                      className="text-[#25304C] text-xs font-semibold"
                    >
                      Display on Home
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <button onClick={()=>openRestoreBox(product._id)} className="text-[#25304C] border border-[#25304C] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Put Back
                </button>
                <Link to={`/admin/editproduct/${product._id}`}>
                <button className="text-[#25304C] border border-[#25304C] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Edit
                </button>
                </Link>
                <button onClick={()=>openDeleteBox(product._id)} className="text-[#FF4242] border border-[#FF4242] py-[5.5px] px-[7.8px] rounded-[6px] font-semibold">
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveProduct;
