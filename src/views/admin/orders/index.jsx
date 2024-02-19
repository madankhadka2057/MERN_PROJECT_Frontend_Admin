import { AuthenticatedApi } from "http/Hello";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "store/orderSlice";
import { fetchOrder } from "store/orderSlice";

const Orders = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder());
  }, []);
  const { data } = useSelector((state) => state.order);

  const [selectItem,setSelectItem]=useState("all")
  const [selectDate,setSelectDate]=useState('')
  const [search,setSearch]=useState('')
const filterOrders=data?.filter((order)=>( selectItem==="all"||order.orderStatus.toLowerCase()===selectItem))
      .filter((order)=>(selectDate===""||new Date(order.createdAt).toLocaleDateString()===new Date(selectDate).toLocaleDateString()))
      .filter((order)=>(search===""||order?.items[0]?.product?.productName.toLowerCase().includes(search)))
  // console.log(filterOrders)
  // delete particular order by id
   const handleDelete=(id)=>{
    dispatch(deleteOrder(id))
   }
    
  return (
    <div className="container mx-auto mt-0 items-center px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight  dark:text-white dark:hover:text-white">Orders</h2>
        </div>

        <div className="my-2 flex flex-col items-center px-4 py-4 rounded-lg bg-gray-100 p-2 sm:flex-row sm:p-4 w-full sm:w-auto">
          <div className="relative ml-1 mb-2 sm:mb-0 sm:mr-2">
            <select onChange={(e)=>setSelectItem(e.target.value)} className="block w-full rounded-full border border-gray-400 bg-white py-2 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none sm:w-48">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="ontheway">On the way</option>
              <option value="cancelled">Cancelled</option>
              <option value="preparation">Preparation</option>
            </select>
          </div>
          <div className="relative block ml-1 mb-2 sm:mb-0 sm:mr-2">
            <span className="absolute inset-y-0 left-0 flex h-full items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="fill-current h-4 w-4 text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="block w-full rounded-full border border-gray-400 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div className="relative block ml-1 mb-2 sm:mb-0 sm:mr-2">
            <span className="absolute inset-y-0 left-0 flex h-full items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="fill-current h-4 w-4 text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              onChange={(e) => setSelectDate(e.target.value)}
              type="date"
              placeholder="Search"
              className="block w-full rounded-full border border-gray-400 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 py-4 rounded-lg bg-gray-100 p-2 sm:flex-row sm:p-4 w-full sm:w-auto">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Product Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Order Id
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Price[Quentity]
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Total Amt
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Payment Status
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Order Status
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Order At
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterOrders&&filterOrders.length>0&&filterOrders?.map((data) => {
                  return (
                    <>
                      <tr key={data?._id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-full w-full rounded-full"
                                src={data?.items[0]?.product?.productImage}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="whitespace-no-wrap text-gray-900">
                                {data?.items[0]?.product?.productName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p
                            onClick={()=>navigate(`/admin/orders/${data?._id}`)}
                            className="whitespace-no-wrap text-blue-600"
                            style={{ textDecoration: "underline",cursor:"pointer" }}
                          >
                            {data?._id}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {data?.items[0]?.product?.productPrice &&
                              `${data?.items[0]?.product?.productPrice}[${data?.items[0]?.quantity}]`}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap text-gray-900">
                            {data?.totalAmount}
                          </p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden
                              className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                            ></span>
                            <span className="relative">
                              {data?.paymentDetails.status}
                            </span>
                          </span>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden
                              className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                            ></span>
                            <span className="relative">
                              {data?.orderStatus}
                            </span>
                          </span>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <button
                          onClick={()=>{handleDelete(data?._id)}}
                          type="button"
                          class="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs bg-red-600 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                          Delete
                        </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5          ">
              <span className="xs:text-sm text-xs text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="xs:mt-0 mt-2 inline-flex">
                <button className="rounded-l bg-gray-300 py-2 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-400">
                  Prev
                </button>
                <button className="rounded-r bg-gray-300 py-2 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-400">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
