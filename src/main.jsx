import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-7xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);
