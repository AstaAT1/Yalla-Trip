export const initialPosts = [
    {
        id: 1,
        user: {
            username: "travel_dreams",
            avatar: "https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
        },
        location: "Chefchaouen, Morocco 🇲🇦",
        image: "https://africa.iclei.org/wp-content/uploads/2023/09/Chefchaouen-1-scaled.jpg",
        caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum aliquid deserunt enim consequuntur autem saepe animi ab? Magni similique molestias sit, corporis eligendi at nobis?",
        upvotes: 154,
        hasUpvoted: false,
        commentsList: [
            { id: 1, username: "wanderlust99", text: "Amazing view! Need to visit there soon." },
            { id: 2, username: "nomad_life", text: "Great shot!" }
        ],
        bookmarks: 18
    },
    {
        id: 2,
        user: {
            username: "explorer_john",
            avatar: "https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
        },
        location: "Kyoto, Japan 🇯🇵",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Beautiful temples and gardens. A must visit!",
        upvotes: 89,
        hasUpvoted: false,
        commentsList: [],
        bookmarks: 5
    }
];