import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCustomers } from "../apis";
import AddEdit from "../Components/AddEdit";
import Loader from "../Components/Loader";
import { OPERATIONS, STATUSES } from "../config";

const phoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="h-5 w-5"
    >
      <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );
};

const CustomersList = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [operation, setOperation] = useState();
  const [editData, setEditData] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomerData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openPopup = (operation) => {
    setOperation(operation);
    setPopupVisible(true);
  };

  const closePopup = (reload = false) => {
    setOperation();
    setPopupVisible(false);
    setEditData();
    if (reload) fetchData();
  };

  const showNotification = (res) => {
    if (res.type === STATUSES.SUCCESS) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {popupVisible && (
        <AddEdit
          closePopup={closePopup}
          operation={operation}
          editData={editData}
          showNotification={showNotification}
        />
      )}
      <div className="flex gap-5">
        <span className="text-xl mb-3">Customers</span>
        <button
          onClick={() => {
            openPopup(OPERATIONS.CREATE);
          }}
          className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Add Customer
        </button>
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-wrap mx-1 justify-center 2xl:justify-start xl:justify-start lg:justify-start sm:justify-center">
          {customerData.map((customer) => {
            return (
              <div
                key={customer.id}
                className="max-w-xs w-full rounded overflow-hidden shadow-lg"
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-lg">#{customer.id}</div>
                  <div className="font-bold text-xl mb-1">{customer.name}</div>
                  <p className="text-gray-700 text-lg">{customer.address}</p>
                  <p className="text-gray-700 text-base flex gap-1">
                    {phoneIcon()}
                    {customer.phone}
                  </p>
                </div>
                <div className="px-6 py-2">
                  <button
                    onClick={() => {
                      setEditData(customer);
                      openPopup(OPERATIONS.EDIT);
                    }}
                    className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    Edit
                  </button>
                  <button className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomersList;
