import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from 'store/productSlice'

const Products = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])
  const {data:product}=useSelector((state)=>state.product)
  console.log(product)

  const [selectItem,setSelectItem]=useState("all")
  const [selectDate,setSelectDate]=useState('')
  const [search,setSearch]=useState('')
  const filterProduct=product?.filter((Product)=>(selectDate===""||new Date(Product.createdAt).toLocaleDateString()===new Date(selectDate).toLocaleDateString()))
      .filter((product)=>(search===""||product._id.toLocaleLowerCase().includes(search.toLocaleLowerCase())||product.productName.toLowerCase().includes(search.toLocaleLowerCase())))
      // .filter((Product)=>(Product.productName.toLowerCase().includes(search.toLocaleLowerCase())))

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
                                <p className="whitespace-no-wrap text-gray-900">
                                {product?._id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p
                              className="whitespace-no-wrap text-blue-600"
                              style={{ textDecoration: "underline" }}
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
      </div>
    );
}
export default Products

