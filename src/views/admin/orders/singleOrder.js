
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeOrderStatus } from "store/orderSlice";
import { deleteOrder } from "store/orderSlice";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.order);
  const [newStatus,setOrderStatus]=useState('')
  const [filteredOrder] = data?.filter((order) => order._id === id);
  useEffect(()=>{
    setOrderStatus(filteredOrder?.orderStatus)
  },[])

  const orderStatuses = [
    "Pending",
    "Delivered",
    "Cancelled",
    "Ontheway",
    "Preparation",
  ];
  
  // };
  const handleOrderStatus=(e)=>{
      const orderStatus=e.target.value
      setOrderStatus(orderStatus)
      dispatch(changeOrderStatus(id,orderStatus))
  }

  const handleDelete = async () => {
    dispatch(deleteOrder(id));
    window.location.href = "/admin/orders";
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

            {filteredOrder &&
              filteredOrder.items.length > 0 &&
              filteredOrder.items.map((orderItems) => {
                return (
                  <>
                    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
                      <div className="w-full pb-4 md:w-40 md:pb-8">
                        <img
                          className="hidden w-full md:block"
                          src={orderItems?.product?.productImage}
                          alt="dress"
                        />
                        <img
                          className="w-full md:hidden"
                          src={orderItems.product.productImage}
                          alt="dress"
                        />
                      </div>
                      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
                        <div className="flex w-full flex-col items-start justify-start space-y-8">
                          <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white xl:text-2xl">
                            {orderItems.product.productName}
                          </h3>
                        </div>
                        <div className="flex w-full items-start justify-between space-x-8">
                          <p className="text-base leading-6 dark:text-white xl:text-lg">
                            Rs. {orderItems?.product?.productPrice}{" "}
                            <span className="text-red-300 line-through">
                              {" "}
                            </span>
                          </p>
                          <p className="text-base leading-6 text-gray-800 dark:text-white xl:text-lg">
                            Qty:{orderItems?.quantity}
                          </p>
                          <p className="text-base font-semibold leading-6 text-gray-800 dark:text-white xl:text-lg">
                            {orderItems?.product?.productPrice *
                              orderItems.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="flex w-full flex-col flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex w-full flex-col space-y-6 bg-gray-50 px-4 py-6 dark:bg-gray-800 md:p-6 xl:p-8">
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
            </div>
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
          className="flex w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 dark:bg-gray-800  md:p-6 xl:w-96 xl:p-8"
          style={{ height: "300px" }}
        >
          <h3
            className="text-xl font-semibold  leading-5 text-gray-800 dark:text-white"
            style={{ alignItems: "center" }}
          >
            Customer
          </h3>
          <div className="flex w-full flex-col justify-center md:flex-row md:items-start md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="mt-6 flex w-full flex-col md:w-1/2 xl:w-full">
              <div className="justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex flex-col items-center justify-center space-y-4 md:items-start">
                  <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-300 md:text-left">
                    Address: {filteredOrder?.shoppingAddress}
                  </p>
                  <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-300 md:text-left">
                    Phone: {filteredOrder?.phoneNumber}
                  </p>
                </div>
              </div>

              <div
                className="justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                style={{ justifyContent: "flex-start" }}
              >
                <div className="max-w-sm" style={{ width: "100%" }}>
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Change Order Status
                  </label>
                  <select onChange={(e)=>handleOrderStatus(e)}
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={newStatus}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="justify-left flex items-center">
                <button
                  onClick={handleDelete}
                  className="focus:shadow-outline rounded-md bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600 focus:outline-none"
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

export default SingleOrder;
