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
            <button onClick={() => navigate(-1)}>← Kembali</button>
            <h3>{produk.title}</h3>
            <p>Harga: ${produk.price}</p>
            <p>Kategori: {produk.category}</p>
            <p>deskripsi: {produk.description}</p>
            <p>stok: {produk.stock}</p>
        </div>
    );
}

export default DetailProduk;
