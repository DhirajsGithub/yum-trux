import { baseUrl, payPalBaseUrl } from "../constants/baseUrl";
import base64 from "react-native-base64";

const loginUserHttp = async ({ email, password }) => {
  let res = await fetch(baseUrl + "signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  res = await res.json();
  return res;
};

const signupUserHttp = async ({ email, password, username }) => {
  let res = await fetch(baseUrl + "signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });
  res = await res.json();
  return res;
};

const getUserDetailsHttp = async (userId) => {
  let res = await fetch(baseUrl + "userDetails/" + userId);
  res = await res.json();
  return res;
};

const updateUserHttp = async (userId, { fullName, phoneNo, address }) => {
  let res = await fetch(baseUrl + "updateUser/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, phoneNo, address }),
  });
  res = await res.json();
  return res;
};

const addOrderHistoryHttp = async (userId, { order }) => {
  let res = await fetch(baseUrl + "orderHistory/" + userId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
  res = await res.json();
  return res;
};

const truckListDetailHttp = async () => {
  let res = await fetch(baseUrl + "truckListDetail/");
  res = await res.json();
  return res;
};

const updateFavTruckHttp = async (userId, truckId) => {
  let res = await fetch(baseUrl + "favouriteTrucks/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ truckId }),
  });
  res = await res.json();
  return res;
};

const removeFromFavTruckHttp = async (userId, truckId) => {
  let res = await fetch(baseUrl + "favouriteTruckRemove/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ truckId }),
  });
  res = await res.json();
  return res;
};

const addToAllOrdersHttp = async (userId, data) => {
  let res = await fetch(baseUrl + "orderHistory/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: data }),
  });
  res = await res.json();
  return res;
};

const addRatingToTruck = async (truckId, rating) => {
  let res = await fetch(baseUrl + "updateRating/" + truckId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  });
  res = await res.json();
  return res;
};

const deleteProfileImg = async (userId) => {
  let res = await fetch(baseUrl + "deleteProfileImg/" + userId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  res = await res.json();
  return res;
};

const uploadProfileImg = async (userId, imgUrl) => {
  let res = await fetch(baseUrl + "uploadProfileImgMogogDB/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgUrl }),
  });
  res = await res.json();
  return res;
};

const createPaymentIntent = async (data) => {
  let res = await fetch(baseUrl + "payments/intents/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  res = await res.json();
  return res;
};

const createPaypalOrder = async (access_token, data) => {
  let url = payPalBaseUrl + "v2/checkout/orders";
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + access_token);
  headers.append("Connection", "keep-alive");
  const reqOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    let res = await fetch(url, reqOptions);
    res = await res.json();
    console.log(res);
    return res;
  } catch (error) {
    return error.message;
  }
};

const capturePaypalPayment = async (access_token, orderId) => {
  const url = payPalBaseUrl + `v2/checkout/orders/${orderId}/capture`;
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + access_token);
  headers.append("Connection", "keep-alive");
  const reqOptions = {
    method: "POST",
    headers: headers,
  };
  try {
    let res = await fetch(url, reqOptions);
    res = await res.json();
    return res;
  } catch (error) {
    return error.message;
  }
};

const generatePaypalAccessToken = async () => {
  let res = await fetch(baseUrl + "payments/generatePaypalAccessToken/");
  res = await res.json();
  return res;
};

const addOrderToTruck = async (truckId, order) => {
  let res = await fetch(baseUrl + "truck/addOrderToTruck/" + truckId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });
  res = await res.json();
  return res;
};

const sendOtp = async (email) => {
  let res = await fetch(baseUrl + "generalRoutes/sendEmailForPasswordReset/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      userOrTruck: "user",
    }),
  });
  res = await res.json();
  return res;
};

const passwordReset = async (otp, email, newPassword) => {
  let res = await fetch(baseUrl + "generalRoutes/passwordReset/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      inputOtp: otp,
      newPassword: newPassword,
      userOrTruck: "user",
    }),
  });
  res = await res.json();
  return res;
};

const categoryListHttp = async () => {
  let res = await fetch(baseUrl + "admin/getCategories/");
  res = await res.json();
  return res;
};

const getUserStatus = async (userId) => {
  let res = await fetch(baseUrl + "userStatus/" + userId);
  res = await res.json();
  return res;
};

export {
  loginUserHttp,
  signupUserHttp,
  getUserDetailsHttp,
  updateUserHttp,
  addOrderHistoryHttp,
  truckListDetailHttp,
  updateFavTruckHttp,
  removeFromFavTruckHttp,
  addToAllOrdersHttp,
  addRatingToTruck,
  deleteProfileImg,
  uploadProfileImg,
  createPaymentIntent,
  // generatePaypalToken,
  createPaypalOrder,
  capturePaypalPayment,
  generatePaypalAccessToken,
  addOrderToTruck,
  sendOtp,
  passwordReset,
  categoryListHttp,
  getUserStatus,
};
