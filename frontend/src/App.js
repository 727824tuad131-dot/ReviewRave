import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import App1 from "./App1";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Main Application */}
        <Route
          path="/"
          element={<App1 />}
        />

        {/* Unknown Routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;