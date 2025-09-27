

// Type-only imports for schema types


type Newsletter = typeof selectNewsletterSchema._type;
type InsertNewsletter = typeof insertNewsletterSchema._type;
type User = typeof selectUserSchema._type;
type InsertUser = typeof insertUserSchema._type;
type PortfolioProject = typeof selectPortfolioSchema._type;
type InsertPortfolioProject = typeof insertPortfolioSchema._type;
type Testimonial = typeof selectTestimonialSchema._type;
type InsertTestimonial = typeof insertTestimonialSchema._type;
type Message = typeof selectMessageSchema._type;
type InsertMessage = typeof insertMessageSchema._type;

import {
  insertNewsletterSchema,
  selectNewsletterSchema,
  insertUserSchema,
  selectUserSchema,
  insertPortfolioSchema,
  selectPortfolioSchema,
  insertTestimonialSchema,
  selectTestimonialSchema,
  insertMessageSchema,
  selectMessageSchema
} from "@shared/schema";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

// Order type for dashboard
export type Order = {
  name: string;
  email: string;
  service: string;
  package: string;
  amount: number;
  whatsapp: string;
  createdAt: Date;
};

// --- Storage Interface ---



export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Portfolio Projects
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProject(id: string): Promise<PortfolioProject | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;

  // Messages
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Newsletter
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<boolean>;
  sendBulkNewsletter(subject: string, content: string): Promise<number>;
}

// --- DB Storage ---
  private portfolioProjects = new Map<number, PortfolioProject>();
  private testimonials = new Map<number, Testimonial>();
  private users = new Map<number, User>();
  private messages = new Map<number, Message>();
  private newsletter = new Map<number, Newsletter>();
  private orders: Array<{
    name: string;
    email: string;
    service: string;
    package: string;
    amount: number;
    whatsapp: string;
    createdAt: Date;
  }> = [];
  // Orders
  logOrder(order: { name: string; email: string; service: string; package: string; amount: number; whatsapp: string; }): void {
    this.orders.push({ ...order, createdAt: new Date() });
  }

  getOrders(): Array<{ name: string; email: string; service: string; package: string; amount: number; whatsapp: string; createdAt: Date }> {
    return this.orders;
  }

  constructor() {
  // portifolo
      const projectsList: PortfolioProject[] = [
        {
          id: 1,
          title: "FinPay NG",
          description:
            "A modern fintech dashboard for Nigerian SMEs. Provides real-time analytics, payments integration, and automated invoicing.",
          techStack: ["Next.js", "TailwindCSS", "Node.js", "PostgreSQL"],
          imageUrl:
            "https://images.pexels.com/photos/6802040/pexels-photo-6802040.jpeg",
          liveUrl: "/FintechDashboard",
          githubUrl: "https://github.com/calebdevx/finpay-ng",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "QuickEats NG",
          description:
            "Food delivery platform designed for Nigerian restaurants. Features live order tracking, restaurant dashboards, and mobile-first design.",
          techStack: ["React Native", "Firebase", "Express.js"],
          imageUrl:
            "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
          liveUrl: "/FoodDelivery",
          githubUrl: "https://github.com/calebdevx/quickeats-ng",
          createdAt: new Date(),
        },
        {
          id: 3,
          title: "NaijaHomes",
          description:
            "A real estate platform with property listings, mortgage calculators, and virtual tours tailored for Nigerian buyers.",
          techStack: ["Next.js", "Supabase", "TailwindCSS"],
          imageUrl:
            "https://images.pexels.com/photos/7031409/pexels-photo-7031409.jpeg",
          liveUrl: "/RealEstate",
          githubUrl: "https://github.com/yourgithub/naijahomes",
          createdAt: new Date(),
        },
        {
          id: 4,
          title: "EduAfrica LMS",
          description:
            "An e-learning platform for African universities. Includes video streaming, quizzes, and student progress tracking.",
          techStack: ["Django", "React", "PostgreSQL"],
          imageUrl:
            "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
          liveUrl: "/eduafrica",
          githubUrl: "https://github.com/calebdevx/eduafrica",
          createdAt: new Date(),
        },
        {
          id: 5,
          title: "MarketHub NG",
          description:
            "An e-commerce marketplace that connects Nigerian vendors with nationwide customers. Features wallet, cart, and seller dashboards.",
          techStack: ["Vue.js", "Laravel", "MySQL"],
          imageUrl:
            "https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg",
          liveUrl: "/Marketplace",
          githubUrl: "https://github.com/calebdevx/markethub-ng",
          createdAt: new Date(),
        },
        {
          id: 6,
          title: "TravelNaija",
          description:
            "Tourism booking platform for Nigerian destinations. Provides flight deals, hotel booking, and local experiences.",
          techStack: ["Next.js", "GraphQL", "TailwindCSS"],
          imageUrl:
            "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
          liveUrl: "/travelnaija",
          githubUrl: "https://github.com/calebdevx/travelnaija",
          createdAt: new Date(),
        },
        {
          id: 7,
          title: "AgroConnect",
          description:
            "A digital marketplace connecting Nigerian farmers to buyers. Features crop tracking, pricing analytics, and secure payments.",
          techStack: ["React", "Node.js", "MongoDB"],
          imageUrl:
            "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
          liveUrl: "/AgroConnect",
          githubUrl: "https://github.com/calebdevx/agroconnect",
          createdAt: new Date(),
        },
        {
          id: 8,
          title: "HealthLink NG",
          description:
            "Telemedicine platform offering video consultations, prescriptions, and hospital integrations for Nigerian healthcare.",
          techStack: ["Flutter", "Firebase", "NestJS"],
          imageUrl:
            "https://images.pexels.com/photos/4266947/pexels-photo-4266947.jpeg",
          liveUrl: "/healthlink",
          githubUrl: "https://github.com/calebdevx/healthlink-ng",
          createdAt: new Date(),
        },
        {
          id: 9,
          title: "EventHub Africa",
          description:
            "Event ticketing and booking solution for concerts, conferences, and weddings across Nigeria.",
          techStack: ["Angular", "Express", "MongoDB"],
          imageUrl:
            "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          liveUrl: "/EventHub",
          githubUrl: "https://github.com/calebdevx/eventhubafrica",
          createdAt: new Date(),
        },
        {
          id: 10,
          title: "ShopSmart NG",
          description:
            "AI-powered price comparison platform for Nigerian online shoppers. Helps users find the best deals instantly.",
          techStack: ["Next.js", "AI API", "PostgreSQL"],
          imageUrl:
            "https://images.pexels.com/photos/5632393/pexels-photo-5632393.jpeg",
          liveUrl: "/shopsmart",
          githubUrl: "https://github.com/calebdevx/shopsmart-ng",
          createdAt: new Date(),
        },
      ];

      // ✅ Add projects to the in-memory Map
      projectsList.forEach((p) => {
        this.portfolioProjects.set(p.id, p);
      });


  // --- Sample Testimonials ---
      const testimonialsList: Testimonial[] = [
        {
          id: 1,
          clientName: "Elijah Omachoko",
          content:
            "Achek built us a world-class real estate website with seamless property listings. The design is modern and user-friendly, and our leads have doubled.",
          rating: 5,
          position: "Founder",
          company: "Achekinyo",
          imageUrl: "https://i.ibb.co/yFC1hZxP/elijah.jpg",
          createdAt: new Date(),
        },
        {
          id: 2,
          clientName: "Victoria Onuche",
          content:
            "Their developer portfolio platform was beyond my expectations. Clean, fast, and professional. It has helped me attract bigger clients.",
          rating: 5,
          position: "Software Developer",
          company: "Freelance",
          imageUrl: "https://i.ibb.co/q39dDm3p/victoria.jpg",
          createdAt: new Date(),
        },
        {
          id: 3,
          clientName: "Sarah Johnson",
          content:
            "Achek transformed our online presence completely. The team delivered a stunning website that not only looks amazing but also performs exceptionally well.",
          rating: 5,
          position: "CEO",
          company: "TechCorp",
          imageUrl:
            "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
          createdAt: new Date(),
        },
        {
          id: 4,
          clientName: "Michael Chen",
          content:
            "The mobile app they developed for us exceeded all expectations. The user experience is seamless, and our customers love the intuitive design.",
          rating: 5,
          position: "Founder",
          company: "FitLife",
          imageUrl:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
          createdAt: new Date(),
        },
        {
          id: 5,
          clientName: "Emily Rodriguez",
          content:
            "Working with Achek was a game-changer for our business. They understood our vision perfectly and delivered a solution that surpassed our expectations.",
          rating: 5,
          position: "Director",
          company: "GreenEarth",
          imageUrl:
            "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
          createdAt: new Date(),
        },
        {
          id: 6,
          clientName: "David Thompson",
          content:
            "Achek's digital marketing strategy helped us reach new heights. Our online visibility has improved dramatically with consistent growth in leads.",
          rating: 5,
          position: "Owner",
          company: "LocalBiz",
          imageUrl:
            "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
          createdAt: new Date(),
        },
        {
          id: 7,
          clientName: "Lisa Park",
          content:
            "The e-commerce platform Achek built for us is absolutely fantastic. The admin panel is intuitive, and our customers love the shopping experience.",
          rating: 5,
          position: "Founder",
          company: "StyleHub",
          imageUrl:
            "https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg",
          createdAt: new Date(),
        },
        {
          id: 8,
          clientName: "Robert Kim",
          content:
            "From concept to deployment, Achek handled everything professionally. Their cloud solutions made our operations more efficient and scalable.",
          rating: 5,
          position: "CTO",
          company: "InnovateTech",
          imageUrl:
            "https://images.pexels.com/photos/2422273/pexels-photo-2422273.jpeg",
          createdAt: new Date(),
        },
        {
          id: 9,
          clientName: "Chinedu Okafor",
          content:
            "Our fintech dashboard was delivered flawlessly. Real-time analytics, easy navigation, and a polished UI. Couldn’t have asked for better.",
          rating: 5,
          position: "Product Manager",
          company: "FinPay",
          imageUrl:
            "https://images.pexels.com/photos/936094/pexels-photo-936094.jpeg",
          createdAt: new Date(),
        },
        {
          id: 10,
          clientName: "Amara Nwosu",
          content:
            "Achek created a beautiful learning platform for us. Students love the experience and engagement has skyrocketed since launch.",
          rating: 5,
          position: "Director",
          company: "EduAfrica",
          imageUrl:
            "https://refinedng.com/wp-content/uploads/2024/03/Honey-Ogundeyi-CEO.png",
          createdAt: new Date(),
        },
        {
          id: 11,
          clientName: "Tunde Balogun",
          content:
            "Their food delivery solution for us was smooth, real-time, and scalable. Our restaurants and customers love the system.",
          rating: 5,
          position: "CEO",
          company: "QuickEats NG",
          imageUrl:
            "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
          createdAt: new Date(),
        },
        {
          id: 12,
          clientName: "Ngozi Adeyemi",
          content:
            "Achek’s real estate platform was exactly what we needed. Virtual tours and mortgage calculators set us apart from competitors.",
          rating: 5,
          position: "Manager",
          company: "Lagos Realty",
          imageUrl:
            "https://images.pexels.com/photos/1002061/pexels-photo-1002061.jpeg",
          createdAt: new Date(),
        },
      ];

      // ✅ Add testimonials to the in-memory Map
      testimonialsList.forEach((t) => {
        this.testimonials.set(t.id, t);
      });
    }


  // --- Users ---
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(Number(id));
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.users.size + 1;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // --- Portfolio (in-memory) ---
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values());
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(id);
  }

  // --- Testimonials (in-memory) ---
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  // --- Messages ---
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messages.size + 1;
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.set(id, message);
    // Optionally, send email notification here if needed
    return message;
  }

  // --- Newsletter ---
  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletter.values());
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check for duplicate
    for (const n of this.newsletter.values()) {
      if (n.email === insertNewsletter.email) {
        throw new Error("Already subscribed");
      }
    }
    const id = this.newsletter.size + 1;
    const newsletter: Newsletter = { ...insertNewsletter, id, isActive: true, createdAt: new Date() };
    this.newsletter.set(id, newsletter);
    return newsletter;
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
    let foundId: number | undefined = undefined;
    for (const [id, n] of this.newsletter.entries()) {
      if (n.email === email) {
        foundId = id;
        break;
      }
    }
    if (foundId !== undefined) {
      this.newsletter.delete(foundId);
      return true;
    }
    return false;
  }

  async sendBulkNewsletter(subject: string, content: string): Promise<number> {
    const subscribers = Array.from(this.newsletter.values()).map(n => n.email);
    if (!subscribers.length) return 0;
    // Optionally, send emails here if needed
    return subscribers.length;
  }
}

export const storage = new DBStorage();
