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

const Products = () => {
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
  }, [checkStatus, message]);

  const [productIdToDelete, setProductIdToDelete] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const showDeleteModal = (productId) => {
    setProductIdToDelete(productId);
    document.getElementById('popup-modal').classList.remove('hidden');

  };

  const hideDeleteModal = () => {
    setProductIdToDelete(null);
    document.getElementById('popup-modal').classList.add('hidden');
  };

  //delete product By ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    hideDeleteModal();
  };
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
                                  className="whitespace-no-wrap text-gray-900"
                                  style={{ textDecoration: "underline" }}
                                >
                                  {product?._id}
                                </p>
                                {/* </Link>   */}
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-blue-600">
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
                              class="bg-danger hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700 inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
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
      <div id="popup-modal" tabIndex="-1"  className="hidden w-80 h-80 m-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button  onClick={hideDeleteModal}type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span  className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button onClick={
                  () => {
                    // document.getElementById('popup-modal').classList.remove('hidden');
                    handleDelete(productIdToDelete)
                  }
                
                }data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button onClick={hideDeleteModal} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
        </div>
    </div>

</div>
    </div>
  );
};
export default Products;
