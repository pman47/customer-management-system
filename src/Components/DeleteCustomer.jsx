import React, { useState } from "react";
import { removeCustomer } from "../apis";
import { STATUSES } from "../config";
import Loader from "./Loader";

const DeleteCustomer = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // For handling delete operation of customer when user click on delete button from popup.
  const handleDelete = async () => {
    setLoading(true);
    if (props.id) {
      const response = await removeCustomer(props.id);
      if (response.type === STATUSES.SUCCESS) {
        props.closePopup(true);
      }
      props.showNotification(response);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
        className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        Delete
      </button>
      {visible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-200 bg-opacity-50 grid place-items-center">
          <div className="w-full max-w-xs">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {loading && <Loader />}
              {!loading && (
                <>
                  <h1 className="text-2xl font-bold mb-4">Are you sure?</h1>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setVisible(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteCustomer;
