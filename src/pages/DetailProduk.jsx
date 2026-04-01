import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseFetch from "../hook/UseFetch";

function DetailProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const produk = UseFetch(`https://dummyjson.com/products/${id}`);

    if (!produk?.products) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate(-1)}>← Kembali</button>
            <h3>{produk?.products?.title}</h3>
            <p>Harga: ${produk?.products?.price}</p>
            <p>Kategori: {produk?.products?.category}</p>
            <p>deskripsi: {produk?.products?.description}</p>
        </div>
    );
}

export default DetailProduk;
