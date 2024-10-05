import React, { useState, useEffect } from 'react'
import axios from "axios";
const VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;

const CouponCode = () => {

  const [couponData, setCouponData] = useState({code: "", expiryDate: "", discountAmount: ""})
  const [couponCodes, setCouponCodes] = useState([])
  const [code, setCode] = useState("")
  const [searchedCoupon, setSearchedCoupon] = useState([])
  const [expiryDate, setExpiryDate] = useState(''); 
  const [isInvalid, setIsInvalid] = useState(false); 
  const [updatedCoupon, setUpdatedCoupon] = useState(null);
  const [deletedCoupon, setDeletedCoupon] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${VITE_APP_SERVER}/api/coupons`,
        couponData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Coupon added:", response.data);

      // Reset form fields
      setCouponData({ code: "", expiryDate: "", discountAmount: "" });
    } catch (error) {
      console.error(
        "Error adding coupon code:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`${VITE_APP_SERVER}/api/coupons`) // Replace with your API endpoint
      .then((response) => {
        setCouponCodes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the coupon codes!", error);
      });
  }, []);

  const handleSubmitSearchCode = async (e) =>{
    e.preventDefault();
    axios
    .get(`${VITE_APP_SERVER}/api/coupons/${code}`) // Replace with your API endpoint
    .then((response) => {
      setSearchedCoupon(response.data);
      console.log(response.data);

      setCode("")
    })
    .catch((error) => {
      console.error("There was an error fetching the coupon code!", error);
    });
  }

  const handleSubmitUpdateCoupon = async (e) => {
    e.preventDefault();

    // Prepare data to send in the request
    const updateData = {
      ...(expiryDate && { expiryDate }), // Only include expiryDate if it's set
      ...(isInvalid && { isValid: false }) // Mark coupon as invalid if checkbox is checked
    };

    try {
      const response = await axios.put(
        `${VITE_APP_SERVER}/api/coupons/${code}`, // PUT request to update coupon
        updateData
      );
      setUpdatedCoupon(response.data); // Store updated coupon data in state
      console.log('Coupon updated:', response.data);
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleSubmitDeleteCode = async (e) =>{
    e.preventDefault();
    axios
    .delete(`${VITE_APP_SERVER}/api/coupons/${code}`) // Replace with your API endpoint
    .then((response) => {
      setDeletedCoupon(response.data);
      console.log(response.data);

      setCode("")
    })
    .catch((error) => {
      console.error("There was an error fetching the coupon code!", error);
    });
  }

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen '>
    <form onSubmit={handleSubmit}>
      <input type='text' name='code' required placeholder='Enter Coupon Code' onChange={handleChange} value={couponData.code} />
      <input type='date' name='expiryDate' required placeholder='Enter Expiry Date' onChange={handleChange} value={couponData.expiryDate} />
      <input type='number' name='discountAmount' required placeholder='Enter Discount Amount' onChange={handleChange} value={couponData.discountAmount} />
      <button>Add Coupon</button>
    </form>

    {couponCodes.map((coupon,index)=>{
        return(
            <div className='mt-10 '>
              <p>{coupon.code}</p>
              <p>{coupon.expiryDate}</p>
              <p>{coupon.discountAmount}</p>
              <p>{coupon.isValid}</p>
              <button></button>
            </div>
        )
    })}

   {/* SEARCH COUPON BY CODE */}
    {/* <form onSubmit={handleSubmitSearchCode} className='mt-10 '>
       <input type='text' placeholder='search coupon by code' onChange={(e)=>setCode(e.target.value)} value={code}  />
       <button>Search Code</button>
    </form>

       <div className='mt-10 '>
              <p>{searchedCoupon.code}</p>
              <p>{searchedCoupon.expiryDate}</p>
              <p>{searchedCoupon.discountAmount}</p>
              <p>{searchedCoupon.isValid}</p>
       </div> */}

    {/* SEARCH COUPON BY CODE END */}

    {/* UPDATE COUPON BY CODE */}
       {/* <div>
      <form onSubmit={handleSubmitUpdateCoupon} className="mt-10">
      
        <input
          type="text"
          placeholder="Enter Coupon Code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          required
        />

        
        <input
          type="date"
          placeholder="Change Expiry Date"
          onChange={(e) => setExpiryDate(e.target.value)}
          value={expiryDate}
        />

        
        <label>
          <input
            type="checkbox"
            checked={isInvalid}
            onChange={(e) => setIsInvalid(e.target.checked)}
          />
          Mark as Invalid
        </label>

       
        <button type="submit">Update Coupon</button>
      </form>

      
      {updatedCoupon && (
        <div>
          <h3>Updated Coupon:</h3>
          <p>Code: {updatedCoupon.code}</p>
          <p>Discount: {updatedCoupon.discountAmount}</p>
          <p>Expiry Date: {updatedCoupon.expiryDate}</p>
          <p>Is Valid: {updatedCoupon.isValid ? 'Yes' : 'No'}</p>
        </div>
      )}
      </div> */}
    {/* UPDATE COUPON BY CODE */}

    {/* DELETE COUPON BY CODE */}
     <form onSubmit={handleSubmitDeleteCode} className='mt-10 '>
       <input type='text' placeholder='delete coupon by code' onChange={(e)=>setCode(e.target.value)} value={code}  />
       <button>Delete Code</button>
    </form>

    {/* DELETE COUPON BY CODE */}
    </div>
  )
}

export default CouponCode


