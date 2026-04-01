import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

function DetailProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: produk,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["produk", id],
        queryFn: () =>
            fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Gagal ambil data</p>;
    if (!produk) return <p>Produk tidak ditemukan.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <div className="w-full flex justify-start">
                <button onClick={() => navigate(-1)}>← Kembali</button>
            </div>

            <div className="max-w-2xl rounded-md p-4 mt-4 flex flex-col items-center mx-auto">

                <div className="w-full border border-white flex justify-center">
                    <img
                        src={produk.images[0]}
                        alt={produk.title}
                        className="h-64 aspect-square object-cover mb-4"
                    />
                </div>

                <div className="text-start w-full">
                    <h3>{produk.title}</h3>
                    <p>Harga: ${produk.price}</p>
                    <p>Kategori: {produk.category}</p>
                    <p>deskripsi: {produk.description}</p>
                    <p>stok: {produk.stock}</p>
                </div>

            </div>
        </div>
    );
}

export default DetailProduk;
