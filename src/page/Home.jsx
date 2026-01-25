import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

const Home = () => {
  const [products, setProducts] = useState([]);

  // ambil data dari Supabase
  const getProducts = async () => {
    const { data, error } = await supabase
      .from("product")
      .select("*");

    if (!error && data) {
      // 🔥 FIX UTAMA: pastikan stock angka & anti NaN
      const fixedData = data.map((item) => ({
        ...item,
        stock:
          item.stock === null ||
          item.stock === undefined ||
          item.stock === ""
            ? 0
            : Number(item.stok),
      }));

      setProducts(fixedData);
    }
  };

  useEffect(() => {
    getProducts();

    // realtime supabase
    const channel = supabase
      .channel("realtime-product")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "product",
        },
        () => {
          getProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // urutkan dari stok terbesar
  const sortedProducts = [...products].sort(
    (a, b) => b.stok - a.stok
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Stock Product</h2>

      {/* list text */}
      {sortedProducts.map((item) => (
        <p key={item.id}>
          {item.nama_sparepart} : {item.stok}
        </p>
      ))}

      {/* chart */}
      {sortedProducts.length > 0 && (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={sortedProducts}>
            <XAxis dataKey="nama_sparepart" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar
              dataKey="stok"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            >
              {/* 🔢 ANGKA STOK PASTI MUNCUL */}
              <LabelList
                dataKey="stok"
                position="top"
                formatter={(value) => value}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Home;
