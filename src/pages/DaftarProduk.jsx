import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UseFetch from "../hook/UseFetch";

function DaftarProduk() {
    // const produk = UseFetch("https://fakestoreapi.com/products");
    const [kategori, setKategori] = useState("semua");
    const navigate = useNavigate();

    const {
        data: produk,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["produk"],
        queryFn: () =>
            fetch("https://dummyjson.com/products").then(res => res.json())
    });

    const filterProduk =
        kategori === "semua"
            ? produk?.products
            : produk?.products?.filter(item => item.category === kategori);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Gagal ambil data!</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Daftar Produk</h1>
            <div style={{ marginBottom: "16px" }} className="space-x-2">
                <button
                    onClick={() => setKategori("semua")}
                    className={`${kategori === "semua" ? "text-white" : ""}`}
                >
                    Semua
                </button>
                <button
                    onClick={() => setKategori("beauty")}
                    className={`${
                        kategori === "beauty" ? "text-white" : ""
                    }`}
                >
                    beauty
                </button>
                <button
                    onClick={() => setKategori("fragrances")}
                    className={`${kategori === "fragrances" ? "text-white" : ""}`}
                >
                    fragrances
                </button>
                <button
                    onClick={() => setKategori("furniture")}
                    className={`${
                        kategori === "furniture" ? "text-white" : ""
                    }`}
                >
                    furniture
                </button>
                <button
                    onClick={() => setKategori("groceries")}
                    className={`${
                        kategori === "groceries" ? "text-white" : ""
                    }`}
                >
                    groceries
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    gap: "16px"
                }}
            >
                {filterProduk.map(item => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/produk/${item.id}`)}
                        style={{
                            border: "1px solid #ccc",
                            padding: "16px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        <h3>{item.title}</h3>
                        <p>Harga: ${item.price}</p>
                        <p>Kategori: {item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DaftarProduk;
