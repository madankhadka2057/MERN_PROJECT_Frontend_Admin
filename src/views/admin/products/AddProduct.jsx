import { STATUSES } from "globals/misc/Statuses";
import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddProducts } from "store/productSlice";
const AddProduct = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {status}=useSelector((state)=>state.product)
    const {register,handleSubmit,formState}=useForm()
    const [personImage, setPersonImage] = useState(null);
    const handleSubmitData=async(data)=>{
        
        data={...data,productImage:data.productImage[0]}
        dispatch(AddProducts(data))
        if(status===STATUSES.SUCCESS){
            navigate("/admin/products")
        }
    }
  return (
    <div classNameName="">
      <section className="mx-auto mt-15 max-w-2xl  rounded-md bg-indigo-700 p-6 shadow-md dark:bg-gray-800">
        <h1 className="text-xl text-center font-bold capitalize text-white dark:text-white">
          Add Product
        </h1>
        <form onSubmit={handleSubmit(handleSubmitData)} encType="multimultipart/form-data" >
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div>
              <label className="text-white dark:text-gray-200" for="username">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                name="productName"
                {...register("productName",{required:"Product name is required field"})}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              />
             <p className="text-red-400 text-xl">{formState.errors.productName&&formState.errors.productName.message}</p>

            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                for="productPrice"
              >
                Product Price
              </label>
              <input
                id="productPrice"
                name="productPrice"
                type="number"
                {...register("productPrice",{required:"Product Price is required field"},)}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              />
               <p className="text-red-400 text-xl">{formState.errors.productPrice&&formState.errors.productPrice.message}</p>
            </div>

            <div>
              <label className="text-white dark:text-gray-200" for="password">
                Product Stock Quantity
              </label>
              <input
                id="productStockQty"
                name="productStockQty"
                type="number"
                {...register("productStockQty",{required:"Product Stock Qty is required Fild"})}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              />
              <p className="text-red-400 text-xl">{formState.errors.productStockQty&&formState.errors.productStockQty.message}</p>
            </div>

            
            <div>
              <label
                className="text-white dark:text-gray-200"
                for="passwordConfirmation"
              >
                Product Status
              </label>
              <select {...register("productStatus",{required:"Product Status is required field"})} className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500">
                <option value="available">Available</option>
                <option value="unavailable" >Unavailable</option>
              </select>
              <p className="text-red-400 text-xl">{formState.errors.productStatus&&formState.errors.productStatus.message}</p>
            </div>

           
            <div>
              <label
                className="text-white dark:text-gray-200"
                for="productDescription"
              >
               Product Description
              </label>
              <textarea
                id="productDescription"
                type="textarea"
                {...register("productDescription",{required:"Product description is required field"})}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              ></textarea>
              <p className="text-red-400 text-xl">{formState.errors.productDescription&&formState.errors.productDescription.message}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-white">
                Product Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span class="">Upload a file</span>
                      <input id="file-upload"onChange={(event)=>setPersonImage(event)} name="productImage" type="file" class="sr-only" {...register("productImage",{required:"Image is required field"})}/>
                    </label>
                    <p class="pl-1 text-white"> or drag and drop</p>
                  </div>
                  <p class="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
                <p className="text-red-400 text-xl">{formState.errors.productImage&&formState.errors.productImage.message}</p>
            </div>
            
          </div>

          <div className="mt-6 flex justify-end">
            <button className="transform rounded-md bg-pink-500 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-pink-700 focus:bg-gray-600 focus:outline-none">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
