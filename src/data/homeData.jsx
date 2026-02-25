import Images from "../constants/Images";

export const trendingDestinations = [
  {
    id: 1,
    name: "Chefchaouen",
    rating: 4.9,
    image: Images.trajet15,
  },
  {
    id: 2,
    name: "Marrakech",
    rating: 4.8,
    image: Images.trajetkech,
  },
];

export const activeCommunities = [
  {
    id: 1,
    name: "Backpackers Morocco",
    members: "12.8 k members",
    image: "https://i.pravatar.cc/150?u=backpackers",
  },
];

export const initialPosts = [
  {
    id: 1,
    user: {
      name: "travel_dreams",
      handle: "@travel_dreams",
      avatar: "https://i.pravatar.cc/150?u=travel_dreams",
      location: "Chefchaouen, Morocco",
    },
    content:
      "Exploring the blue streets of Chefchaouen! One of the most magical places I've ever visited.",
    image: Images.trajet15,
    likes: 124,
    comments: [
      {
        id: 1,
        user: "nomad_life",
        text: "So beautiful! Adding this to my bucket list.",
      },
      { id: 2, user: "adventure_seeker", text: "Great shot!" },
    ],
    timestamp: "2h ago",
  },
  {
    id: 2,
    user: {
      name: "yalla_explorer",
      handle: "@yalla_explorer",
      avatar: "https://i.pravatar.cc/150?u=yalla_explorer",
      location: "Paris, France",
    },
    content:
      "Finally made it to the summit of the Atlas Mountains! The view is absolutely breathtaking.",
    image: Images.trajet5,
    likes: 342,
    comments: [],
    timestamp: "5h ago",
  },
];
