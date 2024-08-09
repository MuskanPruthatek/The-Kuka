import React from 'react'

const ProductsList = ({products, filterState}) => {
//    console.log(filterState.category)
  return (
    <div className='xl:w-[70%] w-full mt-5 xl:mt-0'>
        {filterState.category === "" && 
        <>
         {/* Wooden boxes */}
         {products.filter(product => product.product === "Wooden Boxes") &&  <section className='woodenBoxes w-full mb-10 lg:mb-16'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Wooden Boxes</h1>
          <img src="/assets/design.svg" />
        </div>
        <div className='w-full mt-12 flex flex-wrap xl:justify-start justify-center items-center lg:flex-row flex-col gap-y-8 gap-x-6 '>
        {products.filter(product => product.product === 'Wooden Boxes').map((product, index) => (
      <div key={index} className='card lg:w-[30%] md:w-[50%] w-[90%] h-[310px] rounded-[4px]'>
        <img src={product.img} alt={product.name} className='w-full h-[65%] object-cover rounded-[4px]' />
        <p className='lg:text-[22px] text-[20px] font-normal font-bangla text-[rgba(16,16,16,1)] mt-5'>{product.name}</p>
        <p className='text-[15px] font-poppins font-normal text-[rgba(103,121,165,1)]'>{product.desc}</p>
      </div>
    ))}
        </div>       
        </section>}     
        {/* Wooden boxes end*/}

        {/* Wooden Mugs */}
        {products.filter(product => product.product === "Wooden Mugs") &&  <section className='woodenMugs w-full mb-10 lg:mb-16'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Wooden Mugs</h1>
          <img src="/assets/design.svg" />
        </div>
        <div className='w-full mt-12 flex flex-wrap xl:justify-start justify-center items-center lg:flex-row flex-col gap-y-8 gap-x-6 '>
        {products.filter(product => product.product === 'Wooden Mugs').map((product, index) => (
      <div key={index} className='card lg:w-[30%] md:w-[50%] w-[90%] h-[310px] rounded-[4px]'>
        <img src={product.img} alt={product.name} className='w-full h-[65%] object-cover rounded-[4px]' />
        <p className='lg:text-[22px] text-[20px] font-normal font-bangla text-[rgba(16,16,16,1)] mt-5'>{product.name}</p>
        <p className='text-[15px] font-poppins font-normal text-[rgba(103,121,165,1)]'>{product.desc}</p>
      </div>
    ))}
        </div>       
        </section>}    
        {/* Wooden Mugs end*/}

        {/* Wooden Trays */}
        {products.filter(product => product.product === "Wooden Trays") &&  <section className='woodenTrays w-full mb-10 lg:mb-16'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>Wooden Trays</h1>
          <img src="/assets/design.svg" />
        </div>
        <div className='w-full mt-12 flex flex-wrap xl:justify-start justify-center items-center lg:flex-row flex-col gap-y-8 gap-x-6 '>
        {products.filter(product => product.product === 'Wooden Trays').map((product, index) => (
      <div key={index} className='card lg:w-[30%] md:w-[50%] w-[90%] h-[310px] rounded-[4px]'>
        <img src={product.img} alt={product.name} className='w-full h-[65%] object-cover rounded-[4px]' />
        <p className='lg:text-[22px] text-[20px] font-normal font-bangla text-[rgba(16,16,16,1)] mt-5'>{product.name}</p>
        <p className='text-[15px] font-poppins font-normal text-[rgba(103,121,165,1)]'>{product.desc}</p>
      </div>
    ))}
        </div>       
        </section>}    
        {/* Wooden Trays end*/}   
        </>}
       
       {filterState.category !== "" && 
       <>
       {products.filter(product => product.product === filterState.category) &&  <section className=' w-full mb-10 lg:mb-16'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-[30px] font-normal font-bangla text-[#25304C] '>{filterState.category}</h1>
          <img src="/assets/design.svg" />
        </div>
        <div className='w-full mt-12 flex flex-wrap justify-start items-center lg:flex-row flex-col gap-y-8 gap-x-6 '>
        {products.filter(product => product.product === filterState.category).map((product, index) => (
      <div key={index} className='card lg:w-[30%] md:w-[50%] w-[90%] h-[310px] rounded-[4px]'>
        <img src={product.img} alt={product.name} className='w-full h-[65%] object-cover rounded-[4px]' />
        <p className='lg:text-[22px] text-[20px] font-normal font-bangla text-[rgba(16,16,16,1)] mt-5'>{product.name}</p>
        <p className='text-[15px] font-poppins font-normal text-[rgba(103,121,165,1)]'>{product.desc}</p>
      </div>
    ))}
        </div>       
        </section>}    
       
       </>
       
       }


    </div>
  )
}

export default ProductsList
