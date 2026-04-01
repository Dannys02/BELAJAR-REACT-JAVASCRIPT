import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailProduk from "./pages/DetailProduk";
import DaftarProduk from "./pages/DaftarProduk";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/produk" element={<DaftarProduk />} />
            <Route path="/produk/:id" element={<DetailProduk />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
