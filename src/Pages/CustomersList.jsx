// Importing all required packages, api's and variables
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCustomers } from "../apis";
import AddEdit from "../Components/AddEdit";
import DeleteCustomer from "../Components/DeleteCustomer";
import Loader from "../Components/Loader";
import { OPERATIONS, STATUSES } from "../config";

// Its to add phone icon we can use another library for it,
// but for now i have used whole svg as icon
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

// The home/main component
const CustomersList = () => {
  const [customerData, setCustomerData] = useState([]); // to store all customer data that we had fetched
  const [loading, setLoading] = useState(true); // to store loading information when we call any api
  const [popupVisible, setPopupVisible] = useState(false); // to store value based on it we are showing add/edit popup
  const [operation, setOperation] = useState(); // to store which operation is performed add/edit
  const [editData, setEditData] = useState(); // If edit operation is performed then we will store its current data to this variable

  const fetchData = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomerData(data.data);
    setLoading(false);
  };

  // When component loads we will fetch all customers data and store it in our state
  useEffect(() => {
    fetchData();
  }, []);

  // For opening add/edit popup
  const openPopup = (operation) => {
    setOperation(operation);
    setPopupVisible(true);
  };

  // For closing add/edit popup
  const closePopup = (reload = false) => {
    setOperation();
    setPopupVisible(false);
    setEditData();
    if (reload) fetchData();
  };

  // For Showing Notification on the top-right of the screen when any operation is performed
  const showNotification = (res) => {
    if (res.type === STATUSES.SUCCESS) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      {/* Notification Container - We are using toastify library for showing notifications */}
      <ToastContainer />

      {/* Add/Edit popup we are showing based on visible variable value which we are changing on button press. */}
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
            // Showing add/edit popup for add operation when this button clicks
            openPopup(OPERATIONS.CREATE);
          }}
          className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Add Customer
        </button>
      </div>
      {/* When data is loading we are showing this loader */}
      {loading && <Loader />}

      {/* When data is loaded completely we will show actual data to the user on card format. */}
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
                      // Here we are showing add/edit component for editing customer data.
                      setEditData(customer);
                      openPopup(OPERATIONS.EDIT);
                    }}
                    className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    Edit
                  </button>
                  {/* Here we are rendering Delete Customer component which contains Delete button by clicking on it it will open popup */}
                  <DeleteCustomer
                    id={customer.id}
                    closePopup={closePopup}
                    showNotification={showNotification}
                  />
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
