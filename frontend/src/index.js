// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";

// import App from "./App";
// import { store } from "./store/store";

// import "./App.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );


// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import productReducer from './slices/productSlice';
// import ticketReducer from './slices/ticketSlice';
// import reviewReducer from './slices/reviewSlice';
// import insightReducer from './slices/insightSlice';
// import userReducer from './slices/userSlice';
// import notificationReducer from './slices/notificationSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     products: productReducer,
//     tickets: ticketReducer,
//     reviews: reviewReducer,
//     insights: insightReducer,
//     users: userReducer,
//     notifications: notificationReducer,
//   },
// });

// export default store;


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import store from "./store/store";
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store/store";

import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);