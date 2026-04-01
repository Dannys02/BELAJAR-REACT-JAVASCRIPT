import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function DaftarProduk() {
    // const produk = useFetch("https://fakestoreapi.com/products");
    const [kategori, setKategori] = useState("semua");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // tampilkan data dari API https://dummyjson.com/products
    const {
        data: produk,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["produk"],
        queryFn: () =>
            fetch("https://dummyjson.com/products").then(res => res.json())
    });

    // hapus data dari API https://dummyjson.com/products/{id}
    const hapus = useMutation({
        mutationFn: (id) =>
            fetch(`https://dummyjson.com/products/${id}`, {
                method: "DELETE",
            }).then((res) => res.json()),
        onSuccess: (data, id) => {
            queryClient.setQueryData(["produk"], (old) => ({
                ...old,
                products: old.products.filter((item) => item.id !== id),
            }));
            alert("Produk berhasil dihapus");
        },
        // Buat hapus data beneran di API asli
        // onSuccess: () => {
        // queryClient.invalidateQueries(["produk"]);
        // alert("Produk berhasil dihapus");
        // },
    });

    const filterProduk =
        kategori === "semua"
            ? produk?.products
            : produk?.products?.filter(item => item.category === kategori);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Gagal ambil data!</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1 className="mb-12">Daftar Produk</h1>
            <h3 className="text-white text-xl">Pilih kategori: </h3>
            <div style={{ marginBottom: "16px" }} className="space-x-2">
                <button
                    onClick={() => setKategori("semua")}
                    className={`${kategori === "semua" ? "text-white" : ""}`}
                >
                    Semua
                </button>
                <button
                    onClick={() => setKategori("beauty")}
                    className={`${kategori === "beauty" ? "text-white" : ""
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
                    className={`${kategori === "furniture" ? "text-white" : ""
                        }`}
                >
                    furniture
                </button>
                <button
                    onClick={() => setKategori("groceries")}
                    className={`${kategori === "groceries" ? "text-white" : ""
                        }`}
                >
                    groceries
                </button>
            </div>

            <div
                className="grid gap-2 grid-cols-2 md:grid-cols-3"
            >
                {filterProduk.map(item => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-center border border-white p-4 rounded-md cursor-pointer"
                    >
                        <div>
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-full h-48 object-cover mb-2"
                            />
                        </div>
                        <div className="text-start w-full">
                            <h3 className="truncate max-w-36 md:max-w-full">{item.title}</h3>
                            <p>Harga: ${item.price}</p>
                            <p>Kategori: {item.category}</p>
                        </div>
                        <div className="flex w-full justify-start items-center space-x-2 mt-6">
                            <button className="bg-blue-600 text-white px-4 py-1 rounded-md" onClick={() => navigate(`/produk/${item.id}`)}>Detail</button>
                            <button className="bg-yellow-600 text-black px-4 py-1 rounded-md" onClick={() => navigate(`/produk/${item.id}/edit`)}>Edit</button>
                            <button className="bg-red-600 text-white px-4 py-1 rounded-md" onClick={() => {
                                if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
                                    hapus.mutate(item.id);
                                }
                            }}>Hapus</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DaftarProduk;
