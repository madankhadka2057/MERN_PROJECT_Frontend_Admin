import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { deleteProduct } from 'store/productSlice'
import { fetchProduct } from 'store/productSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { STATUSES } from 'globals/misc/Statuses'
import { setStatus } from 'store/authSlice'
import { setMessage } from 'store/productSlice'

const Products = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])
  const {data:product,message,checkStatus}=useSelector((state)=>state.product)//fetch data form product Store
  const [selectItem,setSelectItem]=useState("all")
  const [selectDate,setSelectDate]=useState('')
  const [search,setSearch]=useState('')

  //search produt through input and data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const filterProduct=product?.filter((Product)=>(selectDate===""||new Date(Product.createdAt).toLocaleDateString()===new Date(selectDate).toLocaleDateString()))
      .filter((product)=>(search===""||product._id.toLocaleLowerCase().includes(search.toLocaleLowerCase())||product.productName.toLowerCase().includes(search.toLocaleLowerCase())))
      // .filter((Product)=>(Product.productName.toLowerCase().includes(search.toLocaleLowerCase())))

  //delete product By ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleDelete=(id)=>{
      dispatch(deleteProduct(id))
    }
  
  useEffect(()=>{
    if(checkStatus===STATUSES.SUCCESS)
    {
      toast(message,{autoClose: 3000,});
      dispatch(setStatus(null))
      dispatch(setMessage(null))
    }
  },[checkStatus,message])
  return (
      <div className="container mx-auto mt-0 items-center px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight  dark:text-white dark:hover:text-white">Orders</h2>
          </div>
  
          <div class="my-2 flex flex-col items-center px-4 py-4 rounded-lg bg-gray-100 p-2 sm:flex-row sm:p-4 w-full sm:w-auto">
    <div class="relative ml-1 mb-2 sm:mb-0 sm:mr-2">
        <select onchange="setSelectItem(event.target.value)" class="block w-full rounded-full border border-gray-400 bg-white py-2 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none sm:w-48">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="ontheway">On the way</option>
            <option value="cancelled">Cancelled</option>
            <option value="preparation">Preparation</option>
        </select>
    </div>
    <div class="relative block ml-1 mb-2 sm:mb-0 sm:mr-2">
        <span class="absolute inset-y-0 left-0 flex h-full items-center pl-2">
            <svg viewBox="0 0 24 24" class="fill-current h-4 w-4 text-gray-500">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
        </span>
        <input onchange="setSearch(event.target.value)" placeholder="Search" class="block w-full rounded-full border border-gray-400 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" />
    </div>
</div>

  
          <div className="-mx-4 overflow-x-auto px-4 py-4 rounded-lg bg-gray-100 p-2 sm:flex-row sm:p-4 w-full sm:w-auto">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      ID
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Product Name
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                     Product Price
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Product Status
                    </th>
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Product Stock
                    </th>
                    
                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                     Created Date
                    </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterProduct&&filterProduct.length>0&&filterProduct?.map((product) => {
                    return (
                      <>
                        <tr key={product?._id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-full w-full rounded-full"
                                  src={product?.productImage}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                              {/* <Link to={`/admin/products/${product?._id}`}> */}
                                <p onClick={()=>navigate(`/admin/products/${product?._id}`)} className="whitespace-no-wrap text-gray-900"style={{ textDecoration: "underline" }}>
                                  {product?._id}
                                </p>
                              {/* </Link>   */}
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p
                              className="whitespace-no-wrap text-blue-600"
                              
                            >
                              {product?.productName}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                             {product?.productPrice}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                                ></span>
                              <span className="relative">
                                {product?.productStatus}
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
                                {product?.productStockQty}
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
                              {new Date(product?.createdAt).toLocaleDateString()}
                              </span>
                            </span>
                          </td>
                          <td className="border-b ml-0 border-gray-200 bg-white px-1 py-5 text-sm">
                        <button
                          onClick={()=>{handleDelete(product?._id)}}
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
              <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5">
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
        <ToastContainer />
      </div>
    );
}
export default Products

