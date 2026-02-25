import React from 'react';

const products = [
    { id: 1, name: "Adventure Backpack", price: 59, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ie62pMEfFnoL-MziNVaCHo8LPHu_DvNmnw&s", rating: 4.5, reviews: 76 },
    { id: 2, name: "Packing Cubes", price: 32, image: "https://www.smartcamper.com.au/wp-content/uploads/2023/03/jayclair_Camping_Essentials_6233b2db-0a90-4f1a-93df-51b9dd43f864-1024x676.jpeg", rating: 4.2, reviews: 58 },
    { id: 3, name: "Travel Guidebook", price: 19, image: "https://www.outdoorlife.com/wp-content/uploads/2022/04/28/BestCampingUtensils_Feature.jpg?quality=85", rating: 4.8, reviews: 85 },
    { id: 4, name: "Insulated Bottle", price: 25, image: "https://www.knivesillustrated.com/wp-content/uploads/2020/10/KI_2012_SWISS_06_jac.jpg", rating: 4.7, reviews: 48 },
    { id: 5, name: "Travel Backpack", price: 45, image: "https://cdn.thewirecutter.com/wp-content/media/2024/04/carryontravelbackpacks-2048px-0187.jpg?auto=webp&quality=75&width=1024", rating: 4.7, reviews: 48 },
    { id: 4, name: "Insulated Bottle", price: 25, image: "https://img.kwcdn.com/product/fancy/9dae97d6-7afd-4f87-8d5f-5016cf02e6f9.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp", rating: 4.7, reviews: 48 },
    // Add more products as needed...
];

const ProductsSection = () => {
    const categories = ["All", "Backpacks", "Travel Accessories", "Guides & Maps", "Campsite Gear", "Souvenirs"];

    return (
        <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen font-sans">

            {/* 1. Category Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((cat, index) => (
                    <button
                        key={cat}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 2. Heading Section */}
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Products</h2>

            {/* 3. Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

                        {/* Image Container */}
                        <div className="relative h-64 bg-gray-100 flex items-center justify-center text-6xl">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-blue-500 hover:bg-blue-50 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                        </div>

                        {/* Content Container */}
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">Yalla Trip {product.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">Durable and spacious for all your travels.</p>

                            {/* Rating & Action Buttons */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-orange-400">★★★★☆</span>
                                    <span className="text-xs text-gray-400 font-semibold">{product.reviews}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                    {product.reviews}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-3 text-xl font-bold text-slate-900">
                                ${product.price.toFixed(2)}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsSection;