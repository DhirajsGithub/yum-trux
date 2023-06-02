import { baseUrl } from "../constants/baseUrl";

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
};
