import { Images } from "../constants/Images";

export const destinationsData = [
  {
    id: 1,
    title: "Chefchaouen",
    image: Images.trajet1,
    rating: 4.7,
    price: 120,
    category: "City Tours",
    location: "North Morocco",
    duration: "2 Days / 1 Night",
    description:
      "Chefchaouen, known as the Blue Pearl of Morocco, is famous for its calm atmosphere, blue-painted streets, and breathtaking views of the Rif Mountains.",
    highlights: [
      "Blue Medina",
      "Ras El Ma Waterfall",
      "Spanish Mosque viewpoint",
    ],
    places: [
      {
        image: Images.Trip1,
        name: "Blue Medina",
        description: "Famous blue-painted streets perfect for photography.",
      },
      {
        image: Images.Trip2,
        name: "Ras El Ma",
        description: "Fresh mountain water source near the medina.",
      },
      {
        image: Images.Trip3,
        name: "Spanish Mosque",
        description: "Best panoramic sunset view over Chefchaouen.",
      },
    ],
  },

  {
    id: 2,
    title: "Marrakech",
    image: Images.trajetkech,
    rating: 4.9,
    price: 95,
    category: "City Tours",
    location: "Central Morocco",
    duration: "3 Days / 2 Nights",
    description:
      "Marrakech is a vibrant city full of history, colors, souks, palaces, and lively nightlife.",
    highlights: ["Jamaa El Fna", "Majorelle Garden", "Souks & Palaces"],
    places: [
      {
        image: Images.trajet10,
        name: "Jamaa El Fna",
        description: "The heart of Marrakech full of street performers.",
      },
      {
        image: Images.trajet11,
        name: "Majorelle Garden",
        description: "Iconic blue botanical garden.",
      },
      {
        image: Images.trajet12,
        name: "Bahia Palace",
        description: "Beautiful historical palace with stunning architecture.",
      },
    ],
  },

  {
    id: 3,
    title: "Merzouga",
    image: Images.homemerzouga,
    rating: 4.8,
    price: 150,
    category: "Desert Safari",
    location: "Sahara Desert",
    duration: "3 Days / 2 Nights",
    description:
      "Merzouga offers an authentic Sahara experience with camel trekking and desert camps.",
    highlights: ["Camel Ride", "Erg Chebbi Dunes", "Desert Camp"],
    places: [
      {
        image: Images.Trip6,
        name: "Erg Chebbi",
        description: "Golden sand dunes perfect for sunrise and sunset.",
      },
      {
        image: Images.Trip7,
        name: "Desert Camp",
        description: "Traditional nomadic tents under the stars.",
      },
      {
        image: Images.Trip8,
        name: "Camel Trekking",
        description: "Ride camels across the Sahara dunes.",
      },
    ],
  },

  {
    id: 4,
    title: "Fes",
    image: Images.trajetfes,
    rating: 4.6,
    price: 90,
    category: "City Tours",
    location: "Middle Atlas Region",
    duration: "2 Days / 1 Night",
    description:
      "Fes is Morocco’s cultural capital, rich in history and traditional craftsmanship.",
    highlights: [
      "Fes Medina",
      "Al Quaraouiyine University",
      "Traditional Tanneries",
    ],
    places: [
      {
        image: Images.trajet14,
        name: "Fes Medina",
        description: "One of the world’s oldest medinas.",
      },
      {
        image: Images.trajet15,
        name: "Chouara Tannery",
        description: "Traditional leather dyeing workshops.",
      },
      {
        image: Images.trajet16,
        name: "Al Quaraouiyine",
        description: "Oldest existing university in the world.",
      },
    ],
  },

  {
    id: 5,
    title: "Zagora",
    image: Images.trajetzagora,
    rating: 4.5,
    price: 110,
    category: "Desert Safari",
    location: "Draa Valley",
    duration: "2 Days / 1 Night",
    description:
      "Zagora is known as the gateway to the desert with palm groves and kasbahs.",
    highlights: ["Draa Valley", "Palm Oasis", "Desert Sunset"],
    places: [
      {
        image: Images.trajet5,
        name: "Draa Valley",
        description: "Scenic valley with palm groves.",
      },
      {
        image: Images.trajet6,
        name: "Kasbahs",
        description: "Traditional mud-brick fortresses.",
      },
      {
        image: Images.trajet7,
        name: "Desert Sunset",
        description: "Beautiful sunset over the dunes.",
      },
    ],
  },

  {
    id: 6,
    title: "Mhamid El Ghizlane",
    image: Images.trajetmhamid,
    rating: 4.7,
    price: 130,
    category: "Desert Safari",
    location: "Southern Sahara",
    duration: "3 Days / 2 Nights",
    description:
      "A remote desert destination perfect for silence and adventure.",
    highlights: ["Remote Dunes", "Nomadic Culture", "Silence & Stars"],
    places: [
      {
        image: Images.Trip7,
        name: "Nomad Camps",
        description: "Authentic nomadic desert life experience.",
      },
      {
        image: Images.Trip8,
        name: "Golden Dunes",
        description: "Untouched desert landscapes.",
      },
      {
        image: Images.Trip9,
        name: "Stargazing",
        description: "Clear skies perfect for night photography.",
      },
    ],
  },

  {
    id: 7,
    title: "Tibouda Beach",
    image: Images.trajettibouda,
    rating: 4.8,
    price: 100,
    category: "Beach Escapes",
    location: "Atlantic Coast",
    duration: "1 Day",
    description:
      "A hidden beach paradise ideal for surfers and nature lovers.",
    highlights: ["Wild Beach", "Surf Spot", "Ocean Views"],
    places: [
      {
        image: Images.aboutmemo1,
        name: "Surf Spot",
        description: "Perfect waves for surfing.",
      },
      {
        image: Images.aboutmemo2,
        name: "Cliff View",
        description: "Stunning ocean viewpoints.",
      },
      {
        image: Images.aboutmemo3,
        name: "Golden Sand",
        description: "Peaceful sandy beach.",
      },
    ],
  },

  {

    id: 8,
    title: "Imsouane",
    image: Images.trajetimsouane,
    rating: 4.6,
    price: 150,
    category: "Beach Escapes",
    location: "Essaouira Region",
    duration: "2 Days / 1 Night",
    description:
      "A peaceful coastal village famous for long surf waves.",
    highlights: ["Surf Bay", "Fishing Port", "Sunset Views"],
    places: [
      {
        image: Images.Trip1,
        name: "Surf Bay",
        description: "One of the longest waves in Africa.",
      },
      {
        image: Images.trajet11,
        name: "Fishing Port",
        description: "Fresh seafood experience.",
      },
      {
        image: Images.Trip6,
        name: "Sunset Cliff",
        description: "Amazing sunset ocean views.",
      },
    ],
  },

  {
    id: 9,
    title: "Akchour",
    image: Images.trajet10,
    rating: 4.3,
    price: 110,
    category: "Adventure",
    location: "Rif Mountains",
    duration: "1 Day",
    description:
      "A natural paradise known for waterfalls and hiking trails.",
    highlights: ["Waterfalls", "Hiking Trails", "Natural Pools"],
    places: [
      {
        image: Images.trajet15,
        name: "Akchour Waterfalls",
        description: "Beautiful waterfalls surrounded by mountains.",
      },
      {
        image: Images.homepost1,
        name: "Blue Bridge",
        description: "Natural rock arch formation.",
      },
      {
        image: Images.about1,
        name: "Mountain Trails",
        description: "Scenic hiking routes.",
      },
    ],
  },
];
