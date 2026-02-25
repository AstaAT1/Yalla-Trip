import React, { useState, useMemo } from "react";
import Navbar from "../../components/navbar";
import Header from "./partials/header";
import FilterSidebar from "./partials/FilterSidebar";
import ProductCard from "./partials/ProductCard";
import Footer from "../../components/footer";
import ProductModal from "./partials/ProductModal";
import SellItemModal from "./partials/SellItemModal";
import Images from "../../constants/Images";
import initialProducts from "../../data/products";

export default function MarketPlace() {
  const [products, setProducts] = useState(initialProducts);

  const [filters, setFilters] = useState({
    category: "All Items",
    priceRange: 500,
    minRating: 0,
    conditions: [],
  });

  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sell modal state
  const [openSellModal, setOpenSellModal] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory =
        filters.category === "All Items" ||
        product.category === filters.category;

      const matchPrice = product.price <= filters.priceRange;
      const matchRating = product.rating >= filters.minRating;

      const matchCondition =
        filters.conditions.length === 0 ||
        filters.conditions.includes(product.condition);

      const matchSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchCategory &&
        matchPrice &&
        matchRating &&
        matchCondition &&
        matchSearch
      );
    });

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters, sortBy, searchTerm, products]);

  return (
    <div className="min-h-screen bg-(--bg-main) flex flex-col transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 lg:p-10">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {/* TOP BAR */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 bg-(--bg-main) p-5 rounded-3xl border border-(--border-color) shadow-(--card-shadow)">
              <h2 className="text-2xl font-black text-(--text-primary)">
                Travel Gear{" "}
                <span className="text-(--text-secondary) font-medium text-lg ml-2">
                  ({filteredProducts.length} items found)
                </span>
              </h2>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-(--bg-main) border border-(--border-color) rounded-2xl px-5 py-2.5 text-sm font-bold text-(--text-primary) outline-none focus:ring-2 focus:ring-logo-sky/30 cursor-pointer"
                >
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>

                {/* SELL BUTTON */}
                <button
                  onClick={() => setOpenSellModal(true)}
                  className="bg-logo-sky text-white px-6 py-3 rounded-2xl font-black hover:bg-logo-dark transition-all shadow-lg shadow-logo-sky/20"
                >
                  + Sell an Item
                </button>
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-16">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-(--bg-main) rounded-[3rem] border border-dashed border-(--border-color)">
                <p className="text-(--text-secondary) text-xl font-bold">
                  No gear matches your search.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: "All Items",
                      priceRange: 500,
                      minRating: 0,
                      conditions: [],
                    });
                    setSearchTerm("");
                  }}
                  className="mt-6 text-logo-sky font-black hover:underline text-lg"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* SELL ITEM MODAL */}
      {openSellModal && (
        <SellItemModal
          onClose={() => setOpenSellModal(false)}
          onPost={(newProduct) =>
            setProducts((prevProducts) => [
              {
                ...newProduct,
              },
              ...prevProducts,
            ])
          }
        />
      )}
    </div>
  );
}
