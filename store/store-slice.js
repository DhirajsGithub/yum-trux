import { createSlice } from "@reduxjs/toolkit";
import { prvOrders } from "../data/user";
import date from "date-and-time";

const initialState = {
  //   value: 0,
  userDetails: {},
  allOrders: [], // fetch them from database
  currentOrders: [],
  routeName: "",
};

export const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    addToCurrentOrder: (state, action) => {
      state.currentOrders = [...state.currentOrders, action.payload];
      // state.previousOrders = [...state.currentOrders, state.previousOrders];
    },
    removeCurrentOrder: (state) => {
      state.currentOrders = [];
    },
    addQuantity: (state, action) => {
      const findOne = state.currentOrders?.find((item) => {
        return item.itemId === action.payload;
      });
      state.currentOrders = [...state.currentOrders, findOne];
    },
    removeQuantity: (state, action) => {
      let removeIndex = -1;
      for (let index in state.currentOrders) {
        if (state.currentOrders[index].itemId === action.payload) {
          removeIndex = index;
          break;
        }
      }
      if (removeIndex > -1) {
        state.currentOrders?.splice(removeIndex, 1);
      }
    },
    addToAllOrders: (state) => {
      const tempDate = new Date();
      let tim = date.format(tempDate, "hh:mm A");
      let dat = date.format(tempDate, "MMM D");
      const reqDate = tim + ", " + dat;
      // must be in format as truckName will be mention and if identical item their quantity will be present
      // we now different trucks items can't be there in current order
      if (state.currentOrders.length > 0) {
        let totalPrice = 0;
        for (let item of state.currentOrders) {
          totalPrice = totalPrice + item.itemPrice;
        }
        const tempOrder = {
          truckName: state.currentOrders[0].truckName,
          orderOn: reqDate,
          totalPrice,
          items: state.currentOrders,
          id: Math.random(),
          truckId: state.currentOrders[0].truckId,
          truckImg: state.currentOrders[0].truckImg,
        };
        state.allOrders = [tempOrder, ...state.allOrders];
      }
      // no need of current order now
      state.currentOrders = [];
    },

    setUserDetails: (state, action) => {
      // payload is expected object with userId, email and token
      state.userDetails = action.payload;
    },
    setAllOrderHistoryProper: (state, action) => {
      state.allOrders = [...action.payload];
    },
    setRouteName: (state, action) => {
      state.routeName = action.payload;
    },
  },
});

export const {
  addToCurrentOrder,
  addQuantity,
  removeQuantity,
  removeCurrentOrder,
  addToAllOrders,
  setUserDetails,
  setAllOrderHistoryProper,
} = userSlice.actions;

export default userSlice.reducer;
