export interface Salon {
  id: string
  name: string
  tagline: string
  rating: number
  reviewCount: number
  address: string
  city: string
  image: string
  services: SalonService[]
  reviews: Review[]
}

export interface SalonService {
  id: string
  name: string
  category: "haircut" | "spa" | "facial" | "bridal"
  description: string
  price: number
  duration: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  text: string
  date: string
}

export const salons: Salon[] = [
  {
    id: "lumiere-nyc",
    name: "Lumiere New York",
    tagline: "Where elegance meets expertise",
    rating: 4.9,
    reviewCount: 247,
    address: "123 Beauty Lane, Suite 100",
    city: "New York",
    image: "/images/hero-salon.jpg",
    services: [
      {
        id: "s1",
        name: "Precision Haircut",
        category: "haircut",
        description: "Expert cut tailored to your face shape and lifestyle",
        price: 45,
        duration: "45 min",
      },
      {
        id: "s2",
        name: "Color & Highlights",
        category: "haircut",
        description: "Full color transformation or natural-looking highlights",
        price: 120,
        duration: "2 hrs",
      },
      {
        id: "s3",
        name: "Deep Tissue Massage",
        category: "spa",
        description: "Therapeutic massage targeting chronic muscle tension",
        price: 95,
        duration: "60 min",
      },
      {
        id: "s4",
        name: "Aromatherapy Spa",
        category: "spa",
        description: "Full body treatment with essential oils and hot stones",
        price: 130,
        duration: "90 min",
      },
      {
        id: "s5",
        name: "Hydrating Facial",
        category: "facial",
        description: "Deep hydration treatment for dry and dull skin",
        price: 75,
        duration: "60 min",
      },
      {
        id: "s6",
        name: "Anti-Aging Facial",
        category: "facial",
        description: "Premium treatment to reduce fine lines and restore glow",
        price: 110,
        duration: "75 min",
      },
      {
        id: "s7",
        name: "Bridal Makeup & Hair",
        category: "bridal",
        description: "Complete bridal look including trial session",
        price: 350,
        duration: "3 hrs",
      },
      {
        id: "s8",
        name: "Bridal Party Package",
        category: "bridal",
        description: "Makeup and styling for up to 4 bridesmaids",
        price: 600,
        duration: "4 hrs",
      },
    ],
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Amelia Grant",
        rating: 5,
        text: "Absolutely magical bridal experience. Could not recommend more highly.",
        date: "2025-12-15",
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah Mitchell",
        rating: 5,
        text: "Two years coming here and every visit is outstanding. My happy place.",
        date: "2025-11-20",
      },
      {
        id: "r3",
        userId: "u3",
        userName: "David Chen",
        rating: 4,
        text: "World-class spa treatments. The ambiance alone is worth the visit.",
        date: "2025-10-08",
      },
    ],
  },
  {
    id: "belle-la",
    name: "Belle Studio LA",
    tagline: "California beauty, perfected",
    rating: 4.8,
    reviewCount: 189,
    address: "456 Sunset Blvd, Suite 200",
    city: "Los Angeles",
    image: "/images/service-spa.jpg",
    services: [
      {
        id: "bs1",
        name: "Celebrity Blowout",
        category: "haircut",
        description: "Red carpet-ready hair styling",
        price: 65,
        duration: "45 min",
      },
      {
        id: "bs2",
        name: "Balayage",
        category: "haircut",
        description: "Hand-painted highlights for a natural sun-kissed look",
        price: 180,
        duration: "3 hrs",
      },
      {
        id: "bs3",
        name: "CBD Relaxation Massage",
        category: "spa",
        description: "Calming full-body massage with premium CBD oils",
        price: 110,
        duration: "75 min",
      },
      {
        id: "bs4",
        name: "Vitamin C Facial",
        category: "facial",
        description: "Brightening treatment for a radiant complexion",
        price: 85,
        duration: "60 min",
      },
    ],
    reviews: [
      {
        id: "br1",
        userId: "u4",
        userName: "Jessica Tran",
        rating: 5,
        text: "Best balayage I have ever had. Everyone asks where I get my hair done.",
        date: "2025-11-10",
      },
      {
        id: "br2",
        userId: "u5",
        userName: "Marcus Webb",
        rating: 4,
        text: "Great atmosphere and talented stylists. A bit pricey but worth it.",
        date: "2025-09-22",
      },
    ],
  },
  {
    id: "aurora-chi",
    name: "Aurora Hair House",
    tagline: "Transformative beauty in the heart of the city",
    rating: 4.7,
    reviewCount: 134,
    address: "789 Michigan Ave",
    city: "Chicago",
    image: "/images/service-haircut.jpg",
    services: [
      {
        id: "as1",
        name: "Classic Cut & Style",
        category: "haircut",
        description: "Timeless haircuts with a modern twist",
        price: 40,
        duration: "40 min",
      },
      {
        id: "as2",
        name: "Keratin Treatment",
        category: "haircut",
        description: "Smoothing treatment for frizz-free, silky hair",
        price: 200,
        duration: "2.5 hrs",
      },
      {
        id: "as3",
        name: "Swedish Massage",
        category: "spa",
        description: "Classic relaxation massage with gentle techniques",
        price: 80,
        duration: "60 min",
      },
      {
        id: "as4",
        name: "Collagen Facial",
        category: "facial",
        description: "Firming treatment that boosts skin elasticity",
        price: 90,
        duration: "60 min",
      },
    ],
    reviews: [
      {
        id: "ar1",
        userId: "u6",
        userName: "Linda Park",
        rating: 5,
        text: "The keratin treatment changed my life. My hair has never been this smooth.",
        date: "2025-12-01",
      },
    ],
  },
]
