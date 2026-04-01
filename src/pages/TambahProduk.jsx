import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function TambahProduk() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        price: "",
        category: "",
    });

    const tambah = useMutation({
        mutationFn: () => {
            fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }).then((res) => res.json()),
                onSuccess: () => {
                    queryClient.invalidateQueries(["produk"]);
                    alert("Produk berhasil ditambahkan");
                    navigate("/produk");
                },
        });

    return (
        <div style={{ padding: "20px" }}>
            <h1>Tambah Produk</h1>
            <p>Fitur ini masih dalam pengembangan. Mohon bersabar ya!</p>
        </div>
    );
}

export default TambahProduk;