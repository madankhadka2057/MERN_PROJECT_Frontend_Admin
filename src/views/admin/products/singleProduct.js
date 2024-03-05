import { AuthenticatedApi } from "http/Hello";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeProductQtyAndPrice } from "store/productSlice";
import { changeProductStatus } from "store/productSlice";
import { deleteProduct } from "store/productSlice";
const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { data } = useSelector((state) => state.product);
  // console.log(data)
  const [filteredproduct] = data?.filter((product) => product._id === id);
  const [newStatus, setProductStatus] = useState(
    filteredproduct?.productStatus
  );
  const [orders,setOrders]=useState()
  //   const [newPaymentStatus,setpaymentStatus]=useState(filteredproduct?.paymentDetails?.status)
  //i create a array of producttatuses for chenge product status
  const productStatuses = ["available", "unavailable"];
  //   const paymentStatuses = [
  //     "Success",
  //     "Paid",
  //     "Failed",
  //     "Pending",
  //   ];

  const handleProductStatus = (e) => {
    const productStatus = e.target.value;
    setProductStatus(productStatus);
    dispatch(changeProductStatus(id, productStatus));
  };

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

  const handleChange = (value, name) => {
    let data = {};
    if (name === "stockQty") {
      data.productQty = value;
    } else {
      data.productPrice = value;
    }
    dispatch(changeProductQtyAndPrice(id, data));
  };

  const fetchOrderOfProduct = async () => {
    const {data} = await AuthenticatedApi.get(`/products/orderOfProduct/${id}`);
    setOrders(data)
  };
  useEffect(() => {
    fetchOrderOfProduct();
  }, []);
  return (
    // <!-- component -->
    <div className="mt-5 py-14 px-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-20">
      {filteredproduct?(
        <div>
        <div className="item-start flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-semibold leading-7 text-gray-800 dark:text-white lg:text-4xl lg:leading-9">
            Order {id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
            2080/10/17
          </p>
        </div>
        <div className="jusitfy-between mt-10 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-col xl:justify-center xl:items-center xl:space-y-0">
          <div className="flex w-full mb-6 flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 dark:bg-gray-800 md:p-6 md:py-6 xl:p-8 ">
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
                          <span className="text-red-300 line-through"> </span>
                        </p>
                        <p className="text-base leading-6 text-gray-800 dark:text-white xl:text-lg">
                          StockQty:{filteredproduct?.productStockQty}
                        </p>
                          <p
                            className="  text-base leading-6 text-gray-800 dark:text-white xl:text-lg"
                          >
                            Product Status: {filteredproduct?.productStatus}
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            {/* <!-- responsive table--> */}
            <div className="jusitfy-center  mt-2 flex  w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-col ">
              <div className="m-0">
                <h1 className="dark:text-white">Product Order</h1>
              </div>
              {orders?.data?.length>0?(
              <div className=" xl:overflow-auto overflow-scroll">
                  <table className="m-auto w-full   table-auto ">
                <thead className="w-full justify-between text-center">
                  <tr className="bg-green-600 ">
                    
                    <th className=" py-5 ">
                      <span className="text-center font-semibold text-gray-100">
                        Shipping Address
                      </span>
                    </th>
                    <th className=" py-5 ">
                      <span className="text-center font-semibold text-gray-100">
                        Shipping Address
                      </span>
                    </th>
                    <th className=" py-5 ">
                      <span className="text-center font-semibold text-gray-100">
                        Shipping Address
                      </span>
                    </th>
                    <th className=" py-5 ">
                      <span className="text-center font-semibold text-gray-100">
                        Phone Number
                      </span>
                    </th>
  
                    <th class="text-center py-5">
                      <span className="text-center font-semibold text-gray-100">
                        Order Status
                      </span>
                    </th>
  
                    
                  </tr>
                </thead>
                <tbody className="w-full bg-gray-200">
                  {
                    
                    orders&&orders.data?.map((order)=>{
                      return(
                        
                        <tr key={order._id} className="border-b-2 border-gray-200 bg-white">
                    
                        <td className=" text-center">
                          <span className=" text-center font-semibold">
                          {order._id}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-center font-semibold">
                          {order.user.userName}
                          </span>
                        </td>
      
                        <td className="text-center py-2">
                          <span className="text-center">{order.shoppingAddress}</span>
                        </td>
                        <td className="text-center py-2">
                          <span className="text-center">{order.user.userPhoneNumber}</span>
                        </td>
                        <td className=" py-2 text-center">
                          <span className="text-center">{order.orderStatus}</span>
                        </td>
                      </tr>
  
                      )
                    })
                  }
                </tbody>
              </table>
              </div>
              ):(
                <div> <h1 className=" text-center text-red-500 font-bold text-lg">There is no Order of this product </h1> </div>
              )}
            </div>
            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
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
          <div className="flex my-10 w-full flex-col items-center justify-between bg-gray-50 px-4  dark:bg-gray-800  md:py-6 xl:w-full xl:py-8 "
            // style={{ height: "350px" }}
          >
            <h3
              className="text-3xl font-semibold mb-10 leading-5 text-gray-800 dark:text-white"
              style={{ alignItems: "center" }}
            >
              Update
            </h3>
            <div
              className="  flex max-w-sm flex-col items-center justify-start  md:flex-row md:space-y-0 md:space-x-4"
              style={{ width: "100%" }}
            >
              <div
                className=" flex  flex-col items-center justify-center  md:items-start"
                style={{ width: "100%" }}
              >
                <p
                  className="  text-lg leading-5 text-gray-600 dark:text-gray-300 md:text-left"
                  style={{ width: "100%", fontSize: "15px" }}
                >
                  Product Status: {filteredproduct?.productStatus}
                </p>
              </div>
            </div>
            <div className=" flex w-full flex-col justify-center md:flex-row md:items-start md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className=" flex w-full flex-col md:w-1/2 xl:w-full">
                <div
                  className=" justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                  style={{
                    justifyContent: "flex-start",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className=" max-w-sm" style={{ width: "100%" }}>
                    <label
                      htmlFor="countries"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Change Order Status
                    </label>
                    <select
                      onChange={(e) => handleProductStatus(e)}
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

                <div className=" justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                  style={{
                    justifyContent: "flex-start",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className=" max-w-sm" style={{ width: "100%" }}>
                    <label
                      htmlFor="countries"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Change StockQty
                    </label>
                    <input
                      onChange={(e) => handleChange(e.target.value, "stockQty")}
                      type="number"
                      className=" bg-gray-50"
                      placeholder="Enter stock quantity"
                      id="stockQty"
                      min={0}
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        paddingLeft: "5px",
                        outline: "none",
                        fontSize: "15px",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className=" justify-left flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                  style={{
                    justifyContent: "flex-start",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className=" max-w-sm" style={{ width: "100%" }}>
                    <label
                      htmlFor="countries"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Change Product Price
                    </label>
                    <input
                      onChange={(e) => handleChange(e.target.value, "price")}
                      type="number"
                      className=" bg-gray-50"
                      placeholder="Enter product price"
                      id="stockQty"
                      min={0}
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        paddingLeft: "5px",
                        outline: "none",
                        fontSize: "15px",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleDelete}
                    className=" focus:shadow-outline max-w-sm rounded-md bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600 focus:outline-none"
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
     ) :(navigate("/admin/products"))
    }
    </div>
  );
};

export default SingleProduct;
