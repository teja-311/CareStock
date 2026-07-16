import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ReceiveStock from "./pages/ReceiveStock";
import IssueStock from "./pages/IssueStock";
import TransactionHistory from "./pages/TransactionHistory";
import Forecast from "./pages/Forecast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receive-stock"
          element={
            <ProtectedRoute>
              <ReceiveStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue-stock"
          element={
            <ProtectedRoute>
              <IssueStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction-history"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forecast"
          element={
            <ProtectedRoute>
              <Forecast />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;