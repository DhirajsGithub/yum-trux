import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   value: 0,
  userName: "Dhiraj Borse",
  previousOrders: [
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "2:57 PM, May 8",
      totalItems: 2,
      price: 100,
    },
    {
      truckImg:
        "https://bloximages.chicago2.vip.townnews.com/coastreportonline.com/content/tncms/assets/v3/editorial/8/e6/8e61752e-6b5d-11ed-96b3-6394712e84cf/637e680fdd7d9.image.png?resize=1200%2C890",
      nameOfTruck: "Chinese",
      orderDate: "2 PM, May 6",
      totalItems: 4,
      price: 150.23,
    },
    {
      truckImg:
        "https://t4.ftcdn.net/jpg/03/90/68/13/360_F_390681352_BsFsBsRqL4HzilaQDe7cxeq1pl7lreSs.jpg",
      nameOfTruck: "Japanese",
      orderDate: "10 AM, May 1",
      totalItems: 3,
      price: 50,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "2:57 PM, April 28",
      totalItems: 1,
      price: 500,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "2 PM, April 27",
      totalItems: 3,
      price: 340.23,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "1 PM, April 20",
      totalItems: 2,
      price: 288,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "10 AM, April 17",
      totalItems: 2,
      price: 322,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "8 AM, April 17",
      totalItems: 2,
      price: 100,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "2 PM, April 10",
      totalItems: 3,
      price: 300,
    },
    {
      truckImg:
        "https://media.istockphoto.com/id/1282829300/photo/satisfied-couple-taking-ordered-sandwiches-from-an-polite-and-friendly-employee.jpg?s=612x612&w=0&k=20&c=YL6oBYBfvbvrsGl5Tts1vLoy7Nptq4OECn5ho83xbmc=",
      nameOfTruck: "Mexican",
      orderDate: "1 PM, April 7",
      totalItems: 4,
      price: 359.34,
    },
  ],
  currentOrders: [],
};

export const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
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
  },
});

export const {
  addToCurrentOrder,
  addQuantity,
  removeQuantity,
  removeCurrentOrder,
} = userSlice.actions;

export default userSlice.reducer;
