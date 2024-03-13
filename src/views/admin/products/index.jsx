import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "store/productSlice";
import { fetchProduct } from "store/productSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUSES } from "globals/misc/Statuses";
import { setStatus } from "store/authSlice";
import { setMessage } from "store/productSlice";
import {useForm} from 'react-hook-form'
import { updateProduct } from "store/productSlice";
const Products = () => {
  /* eslint-disable */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  const {
    data: product,
    message,
    checkStatus,
  } = useSelector((state) => state.product); //fetch data form product Store
  /* eslint-disable */
  const [selectItem, setSelectItem] = useState("all");
  const [selectDate, setSelectDate] = useState("");
  const [search, setSearch] = useState("");

  //search produt through input and data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const filterProduct = product
    ?.filter(
      (Product) =>
        selectDate === "" ||
        new Date(Product.createdAt).toLocaleDateString() ===
          new Date(selectDate).toLocaleDateString()
    )
    .filter(
      (product) =>
        search === "" ||
        product._id.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        product.productName.toLowerCase().includes(search.toLocaleLowerCase())
    );
  // .filter((Product)=>(Product.productName.toLowerCase().includes(search.toLocaleLowerCase())))

  useEffect(() => {
    if (checkStatus === STATUSES.SUCCESS) {
      toast(message, { autoClose: 1500 });
      dispatch(setStatus(null));
      dispatch(setMessage(null));
    }
    /* eslint-disable */
  }, [checkStatus, message]);

  // delete model!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const showDeleteModal = (productId) => {
    setProductIdToDelete(productId);
    document.getElementById("popup-modal").classList.remove("hidden");
  };

  const hideDeleteModal = () => {
    setProductIdToDelete(null);
    document.getElementById("popup-modal").classList.add("hidden");
  };

  //delete product By ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    hideDeleteModal();
  };

  const [showModal, setShowModal] = useState(false);
  const [productId,setProductId]=useState('')
  const [productForUpdate,setproductForUpdate]=useState()

 

 const {register,handleSubmit,formState:{errors}, reset}=useForm()
const  handleUpdate=(data)=>{
  data={...data,productImage:data.productImage[0]}
  // console.log(data)
  dispatch(updateProduct(productId,data))
  setShowModal(false)
 }
  return (
    <div className="container mx-auto mt-0 items-center px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight  dark:text-white dark:hover:text-white">
            Orders
          </h2>
        </div>

        <div class="my-2 flex w-full flex-col items-center rounded-lg bg-gray-100 p-2 px-4 py-4 sm:w-auto sm:flex-row sm:p-4">
          <div class="relative ml-1 mb-2 sm:mb-0 sm:mr-2">
            <select
              onchange="setSelectItem(event.target.value)"
              class="block w-full rounded-full border border-gray-400 bg-white py-2 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none sm:w-48"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="ontheway">On the way</option>
              <option value="cancelled">Cancelled</option>
              <option value="preparation">Preparation</option>
            </select>
          </div>
          <div class="relative ml-1 mb-2 block sm:mb-0 sm:mr-2">
            <span class="absolute inset-y-0 left-0 flex h-full items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                class="fill-current h-4 w-4 text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              onchange="setSearch(event.target.value)"
              placeholder="Search"
              class="block w-full rounded-full border border-gray-400 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="-mx-4 w-full overflow-x-auto rounded-lg bg-gray-100 p-2 px-4 py-4 sm:w-auto sm:flex-row sm:p-4">
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
                {filterProduct &&
                  filterProduct.length > 0 &&
                  filterProduct?.map((product) => {
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
                                <p
                                  onClick={() =>
                                    navigate(`/admin/products/${product?._id}`)
                                  }
                                  // onClick={()=>{
                                  //   reset(product)
                                  //   setProductId(product?._id)
                                  //   setShowModal(true)}}
                                  className="whitespace-no-wrap text-blue-700"
                                  style={{ textDecoration: "underline" }}
                                >
                                  {product?._id}
                                </p>
                               
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap  text-green-900">
                              {product?.productName}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap  text-green-900">
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
                                {new Date(
                                  product?.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </span>
                          </td>
                          <td className="ml-0 border-b border-gray-200 bg-white px-1 py-5 text-sm">
                            <button
                              data-modal-target="popup-modal"
                              data-modal-toggle="popup-modal"
                              onClick={() => showDeleteModal(product._id)}
                              type="button"
                              class="bg-danger w-full hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700 inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                              Delete
                            </button>
                            <button
                              onClick={()=>{
                                reset(product)
                                setProductId(product?._id)
                                setShowModal(true)}
                              }
                              type="button"
                              class="bg-green w-full my-1 hover:bg-danger-600 focus:bg-green-600 active:bg-green-700 inline-block rounded-full bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                              Edit
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
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 hidden bg-gray-200 bg-opacity-80 flex justify-center items-center right-0 left-0 z-50 m-auto  h-[calc(100%-1rem)] max-h-full  w-full  overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              onClick={hideDeleteModal}
              type="button"
              className="bg-transparent absolute top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 ms-auto end-2.5 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 text-center md:p-5">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                onClick={() => {
                  // document.getElementById('popup-modal').classList.remove('hidden');
                  handleDelete(productIdToDelete);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={hideDeleteModal}
                data-modal-hide="popup-modal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 ms-3 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
     {/* Edit Model!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed bg-gray-200 bg-opacity-80 top-0 right-0 left-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center flex justify-center overflow-y-auto overflow-x-hidden md:inset-0 ${showModal ? '' : 'hidden'}`}        type="button"
      >
        <div className="relative max-h-full w-full max-w-md p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                onClick={()=>setShowModal(false)}
                type="button"
                className="bg-transparent inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 ms-auto hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(handleUpdate)} className="p-4 md:p-5">
              <div className="mb-4 grid grid-cols-2 gap-4">
                
                <div className="col-span-2">
                  <label
                    for="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    // value={productForUpdate ? productForUpdate?.productName : ''}
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Type product name"
                    // required=""
                    {...register("productName",{required:"Required"})}
                  />
                   {/* <input {...register("productName", { required: true })} /> */}
                  {errors.productName&&<h1 className="text-red-700">{errors?.productName?.message}</h1>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    name="productPrice"
                    id="productPrice"
                    value={productForUpdate&&productForUpdate[0]?.productPrice}
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Rs.2999"
                    required=""
                    {...register("productPrice",{required:"Required"})}
                  />
                   {errors.productPrice&&<h1 className="text-red-700">{errors?.productPrice?.message}</h1>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Status
                  </label>
                  <select
                    {...register("productStatus",{required:"Required"})}
                      name="productStatus"
                    id="category"
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  >
                    <option selected="">Select category</option>
                    <option value="available">Available</option>
                    <option value="unavailable" >Unavailable</option>
                    
                  </select>
                  {errors.productStatus&&<h1 className="text-red-700">{errors.productStatus.message}</h1>}
                </div>
              </div>
              <div className="col-span-2">
                  <label
                    for="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product StockQty
                  </label>
                  <input
                    type="text"
                    name="productStockQty"
                    id="productStockQty"
                    // value={productForUpdate ? productForUpdate?.productName : ''}
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Type product name"
                    // required=""
                    {...register("productStockQty",{required:"Required"})}
                  />
                   {/* <input {...register("productName", { required: true })} /> */}
                  {errors.productStockQty&&<h1 className="text-red-700">{errors?.productStockQty?.message}</h1>}
                </div>
                <div className="col-span-2">
                  <label
                    for="productDescription"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea  {...register("productDescription",{required:"Required"})} name="productDescription" id="productDescription" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                   {errors.productDescription&&<h1 className="text-red-700">{errors.productDescription?.message}</h1>}
                </div>
                  <div className="mt-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="small_size">Product Image</label>
                  <input 
                      className="hidden " 
                      id="small_size" 
                      type="file" 
                      {...register("productImage",{required:"Required"})}
                  />
                  <label 
                      htmlFor="small_size" 
                      className=" flex justify-start h-10 items-center w-full mb-5 text-sm font-bold text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                  >
                      Choose Image
                  </label>
                  {errors.productImage&&<h1 className="text-red-700">{errors.productImage?.message}</h1>}
                  </div>
              <button
                
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="h-5 w-5 -ms-1 me-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Update product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    </div>
    
  );
};
export default Products;
