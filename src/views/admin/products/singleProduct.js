
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeProductStatus } from "store/productSlice";
import { deleteProduct } from "store/productSlice";
const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.product);
  console.log(data)
  const [filteredproduct] = data?.filter((product) => product._id === id);
  const [newStatus,setProductStatus]=useState(filteredproduct?.productStatus)
//   const [newPaymentStatus,setpaymentStatus]=useState(filteredproduct?.paymentDetails?.status)
  //i create a array of producttatuses for chenge product status
  const productStatuses = [
    "available",
    "unavailable",
  ];
//   const paymentStatuses = [
//     "Success",
//     "Paid",
//     "Failed",
//     "Pending",
//   ];
  
  const handleProductStatus=(e)=>{
      const productStatus=e.target.value
      setProductStatus(productStatus)
      dispatch(changeProductStatus(id,productStatus))
  }

//   const handlePaymentStatus=(e)=>{
//       const paymentStatus=e.target.value
//       setpaymentStatus(paymentStatus)
//       dispatch(changePaymentStatus(id,paymentStatus))
//       // dispatch(changeproductStatus(id,productStatus))
//   }
  // console.log(newPaymentStatus)
  const handleDelete = async () => {
    dispatch(deleteProduct(id));
    window.location.href = "/admin/products";
  };
  return (
    // <!-- component -->
    <div className="mt-5 py-14 px-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-20">
      <div className="item-start flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-semibold leading-7 text-gray-800 dark:text-white lg:text-4xl lg:leading-9">
          Order {id}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
          2080/10/17
        </p>
      </div>
      <div className="jusitfy-center mt-10 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 dark:bg-gray-800 md:p-6 md:py-6 xl:p-8">
            <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white md:text-xl xl:leading-5">
              My Orders
            </p>
                  <>
                    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
                      <div className="w-full pb-4 md:w-40 md:pb-8">
                        <img
                          className="hidden w-full md:block"
                          src={filteredproduct?.productImage}
                          alt="dress"
                        />
                        <img
                          className="w-full md:hidden"
                          src={filteredproduct?.productImage}
                          alt="dress"
                        />
                      </div>
                      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
                        <div className="flex w-full flex-col items-start justify-start space-y-8">
                          <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white xl:text-2xl">
                            {filteredproduct?.productName}
                          </h3>
                          <div className="flex w-full items-start justify-between space-x-8">
                          <p className="text-base leading-6 dark:text-white xl:text-lg">
                            Rs. {filteredproduct?.productPrice}
                            <span className="text-red-300 line-through">
                              {" "}
                            </span>
                          </p>
                          <p className="text-base leading-6 text-gray-800 dark:text-white xl:text-lg">
                            StockQty:{filteredproduct?.productStockQty}
                          </p>
                          <p className="text-base font-semibold leading-6 text-gray-800 dark:text-white xl:text-lg">
                            {filteredproduct.productPrice}
                          </p>
                        </div>
                        </div>
                       
                      </div>
                    </div>
                  </>
          </div>
          <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
            {/* <div className="flex w-full flex-col space-y-6 bg-gray-50 px-4 py-6 dark:bg-gray-800 md:p-6 xl:p-8">
              <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">
                Summary
              </h3>
              <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                <div className="flex w-full items-center justify-between">
                  <p className="text-base leading-4 text-gray-800 dark:text-white">
                    Payment Method
                  </p>
                  <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                    {filteredOrder?.paymentDetails?.method}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-base leading-4 text-gray-800 dark:text-white">
                    Payment Status
                  </p>
                  <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                    {filteredOrder?.paymentDetails?.status}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-base leading-4 text-gray-800 dark:text-white">
                    Order Status
                  </p>
                  <p className="text-base leading-4 text-gray-600 dark:text-gray-300">
                    {filteredOrder?.orderStatus}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-white">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-300">
                  {filteredOrder?.totalAmount}
                </p>
              </div>
            </div> */}
            <div className="flex w-full flex-col justify-center space-y-6 bg-gray-50 px-4 py-6 dark:bg-gray-800 md:p-6 xl:p-8">
              <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">
                Shipping
              </h3>
              <div className="flex w-full items-start justify-between">
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-8 w-8">
                    <img
                      className="h-full w-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white">
                      DPD Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-white">
                  Rs. 100
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col items-center justify-between bg-gray-50 px-4  dark:bg-gray-800  md:p-6 xl:w-96 xl:p-8"
          style={{ height: "350px" }}
        >
          <h3
            className="text-xl font-semibold  leading-5 text-gray-800 dark:text-white"
            style={{ alignItems: "center" }}
          >
            Product
          </h3>
          <div className="  justify-start max-w-sm flex flex-col items-center  md:flex-row md:space-y-0 md:space-x-4"style={{width:"100%"}}>
                <div className=" flex  flex-col items-center justify-center  md:items-start"style={{width: "100%" }}>
                  <p className="  text-lg leading-5 text-gray-600 dark:text-gray-300 md:text-left"style={{width:"100%"}}>
                    Product Status: {filteredproduct?.productStatus}
                  </p>
                  {/* <p className="text-left text-sm leading-5 text-gray-600 dark:text-gray-300 md:text-left" style={{width:"100%"}}>
                    Phone: {filteredproduct?.phoneNumber}
                  </p> */}
                </div>
              </div>
          <div className=" flex w-full flex-col justify-center md:flex-row md:items-start md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className=" flex w-full flex-col md:w-1/2 xl:w-full">
              

              <div
                className=" justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                style={{ justifyContent: "flex-start",display:"flex",flexDirection:"column"}}
              >
                <div className=" max-w-sm" style={{ width: "100%" }}>
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Change Order Status
                  </label>
                  <select onChange={(e)=>handleProductStatus(e)}
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={newStatus}
                  >
                    {productStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.toLocaleUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>

              <div className="justify-center flex items-center">
                <button
                  onClick={handleDelete}
                  className=" max-w-sm focus:shadow-outline rounded-md bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600 focus:outline-none"
                  style={{
                    backgroundColor: "red",
                    marginTop: "10px",
                    border: "none solid blue",
                    borderRadius: "6px",
                    width: "100%",
                    outline: "none",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
