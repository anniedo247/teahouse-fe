import { toast } from "react-toastify";
import api from "../apiService";
import * as types from "../constants/order.constants";
import {CART_CLEAR_ITEMS} from "../constants/cart.constants";
import { type } from "os";

const getAllOrders = ({pageNum,limit,name}) => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
  console.log("nnn",name)
  try {
    let url = `/orders?page=${pageNum}&limit=${limit}`
    if (name) {
      url =url +`&name=${name}`;
    }
    const res = await api.get(url);
    if (res.data.success === true) {
      dispatch({ type: types.GET_ORDERS_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_ORDERS_FAILURE, payload: error });
  }
};
const getAllOnlineOrders = ({pageNum,limit}) => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
 
  try {
    let url = `/orders/online?page=${pageNum}&limit=${limit}`
    
    const res = await api.get(url);
    if (res.data.success === true) {
      dispatch({ type: types.GET_ORDERS_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_ORDERS_FAILURE, payload: error });
  }
};


const createOrder = (order) => async (dispatch) => {
  dispatch({ type: types.CREATE_ORDER_REQUEST, payload: null });
  try {
    const res = await api.post ("/orders",{order})
    if (res.data.success) {
      dispatch({type: types.CREATE_ORDER_SUCCESS,payload: res.data.data})
      dispatch({type: CART_CLEAR_ITEMS, payload: res.data.data})
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      toast.success("Order created")
    }
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error });

  }
}
const getMyOrders = (pageNum,limit) => async (dispatch) => {
  dispatch({ type: types.GET_MY_ORDERS_REQUEST, payload: null });
  try {
    const res = await api.get(`/orders/myorders?page=${pageNum}&limit=${limit}`);
    console.log("data",res.data.data.orders)
    if (res.data.success === true) {
      dispatch({ type: types.GET_MY_ORDERS_SUCCESS, payload: res.data.data });
      

    }
  } catch (error) {
    dispatch({ type: types.GET_MY_ORDERS_FAILURE, payload: error });
  }
};
const getSingleOrder = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_ORDER_REQUEST, payload: null });
  try {
    const res = await api.get(`/orders/${id}`);
    console.log("ress", res.data.data.order);
    if (res.data.success === true) {
      dispatch({
        type: types.GET_SINGLE_ORDER_SUCCESS,
        payload: res.data.data.order,
      });
    }
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_ORDER_FAILURE, payload: error });
  }
};
const updateOrderStatus = (id) => async (dispatch)=> {
  dispatch({type: types.UPDATE_ORDER_STATUS_REQUEST,payload:null})
  try {
   const res = await api.put(`/orders/${id}/delivery`)
   if (res.data.success) {
     dispatch({type: types.UPDATE_ORDER_STATUS_SUCCESS, payload: res.data.data.order})
     dispatch(getSingleOrder(id))
     dispatch(getMyOrders())
   }
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_STATUS_FAILURE, payload: error });
  }

}
const orderActions = {
  getAllOrders,
  getAllOnlineOrders,
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
}

export default orderActions;