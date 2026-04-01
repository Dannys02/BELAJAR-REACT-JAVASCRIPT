import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function DaftarProduk() {
    // const produk = useFetch("https://fakestoreapi.com/products");
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
            <h1 className="mb-6">Daftar Produk</h1>
            <p>Pilih kategori: </p>
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
              className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                {filterProduk.map(item => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/produk/${item.id}`)}
                        className="flex flex-col items-start border border-white p-4 rounded-md cursor-pointer"
                    >
                        <h3 className="truncate max-w-36">{item.title}</h3>
                        <p>Harga: ${item.price}</p>
                        <p>Kategori: {item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DaftarProduk;
