import { API_URL, COLLECTIONS, STATUSES } from "./config";
const { CUSTOMER } = COLLECTIONS;
const { SUCCESS, ERROR } = STATUSES;

export async function getCustomers(id) {
  let url = API_URL + CUSTOMER;
  if (id) {
    url += `/${id}`;
  }
  return await fetch(url)
    .then((res) => res.json())
    .then((response) => ({
      type: SUCCESS,
      message: "Successfully Fetched Customers",
      data: Array.isArray(response) ? response : [response],
    }))
    .catch((_) => ({ type: ERROR, message: "Could not Fetch Customers" }));
}

export async function createCustomer(data) {
  const { name, address, phone } = data;
  let url = API_URL + CUSTOMER;
  if (name && address && phone) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => ({
        type: SUCCESS,
        message: "Successfully Created Customer",
        data: response,
      }))
      .catch((_) => ({ type: ERROR, message: "Could not Create Customer" }));
  }
  return { type: ERROR, message: "Pls submit required data" };
}

export async function editCustomer(data) {
  if (data.id) {
    let url = API_URL + CUSTOMER + `/${data.id}`;

    data.name = data.name || "";
    data.address = data.address || "";
    data.phone = data.phone || "";

    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => ({
        type: SUCCESS,
        message: "Successfully Updated Customer",
        data: response,
      }))
      .catch((_) => ({ type: ERROR, message: "Could not Update Customer" }));
  }
  return { type: ERROR, message: "Pls submit required data" };
}

export async function removeCustomer(id) {
  if (id) {
    let url = API_URL + CUSTOMER + `/${id}`;
    return await fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => ({
        type: SUCCESS,
        message: "Successfully Removed Customer",
        data: response,
      }))
      .catch((_) => ({ type: ERROR, message: "Could not Remove Customer" }));
  }
  return { type: ERROR, message: "Pls submit required data" };
}
