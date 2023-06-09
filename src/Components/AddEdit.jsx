import { useEffect, useState } from "react";
import { createCustomer, editCustomer } from "../apis";
import { OPERATIONS, STATUSES } from "../config";
import Loader from "./Loader";

// initial data for any customer
const initialData = {
  name: "",
  address: "",
  phone: "",
};

const AddEdit = (props) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  /**
   * When component loads first it will check if its edit operation and if its containing data for editing,
   * if so then we will store that data to our state
   */
  useEffect(() => {
    if (props.operation === OPERATIONS.EDIT && props.editData) {
      setData(props.editData);
    }
  }, [props.editData]);

  // Whenever user change any data from name/address/phone fields we will update that data to our state variable also using this function
  const handleChange = (e) => {
    const tempData = { ...data };
    tempData[e.target.id] = e.target.value;
    setData(tempData);
  };

  /**
   * When user done with his updates and click on submit button it will call handle submit function
   * It first checks if operation was create or edit if it was create then it will create new customer or else it will update existing customer data.
   */
  const handleSubmit = async () => {
    setLoading(true);
    if (props.operation === OPERATIONS.CREATE) {
      const response = await createCustomer(data);
      if (response.type === STATUSES.SUCCESS) {
        props.closePopup(true);
      }
      props.showNotification(response);
    } else if (props.operation === OPERATIONS.EDIT) {
      const response = await editCustomer(data);
      if (response.type === STATUSES.SUCCESS) {
        props.closePopup(true);
      }
      props.showNotification(response);
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-200 bg-opacity-50 grid place-items-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {loading && <Loader />}
          {!loading && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Address"
                  onChange={handleChange}
                  value={data.address}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={data.phone}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  {props.operation === OPERATIONS.CREATE ? "Add" : "Edit"}{" "}
                  Customer
                </button>
                <button
                  onClick={() => {
                    props.closePopup();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
