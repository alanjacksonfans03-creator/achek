

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
import fs from "fs";
import path from "path";

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


class DBStorage implements IStorage {
  private portfolioProjects = new Map<number, PortfolioProject>();
  private testimonials = new Map<number, Testimonial>();
  private users = new Map<number, User>();
  private messages = new Map<number, Message>();
  private newsletter = new Map<number, Newsletter>();
  private newsletterFile = path.join(__dirname, "data", "newsletter-emails.txt");
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
    // Load newsletter emails from file if exists
    if (fs.existsSync(this.newsletterFile)) {
      const lines = fs.readFileSync(this.newsletterFile, "utf-8").split("\n").filter(Boolean);
      let id = 1;
      for (const email of lines) {
        this.newsletter.set(id, {
          id,
          email,
          isActive: true,
          createdAt: new Date(),
        } as Newsletter);
        id++;
      }
    }

    // --- Users ---
    async getUser(id: string): Promise<User | undefined> {
      return this.users.get(Number(id));
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
      for (const user of Array.from(this.users.values())) {
        if (user.email === email) return user;
      }
      return undefined;
    }

    async createUser(insertUser: InsertUser): Promise<User> {
      const id = this.users.size + 1;
      // Only assign properties that exist in User schema
      const user: User = { ...insertUser, id };
      this.users.set(id, user);
      return user;
    }

    // --- Portfolio (in-memory) ---
    async getPortfolioProjects(): Promise<PortfolioProject[]> {
      return Array.from(this.portfolioProjects.values());
    }

    async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
      return this.portfolioProjects.get(Number(id));
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
      // Fill missing nullable fields with null if not provided
      const message: Message = {
        id,
        name: insertMessage.name,
        email: insertMessage.email,
        message: insertMessage.message,
        phone: insertMessage.phone ?? null,
        whatsapp: insertMessage.whatsapp ?? null,
        projectType: insertMessage.projectType ?? null,
        createdAt: new Date(),
      };
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
      for (const n of Array.from(this.newsletter.values())) {
        if (n.email === insertNewsletter.email) {
          throw new Error("Already subscribed");
        }
      }
      const id = this.newsletter.size + 1;
      const newsletter: Newsletter = { ...insertNewsletter, id, isActive: true, createdAt: new Date() };
      this.newsletter.set(id, newsletter);
      // Save to file
      fs.appendFileSync(this.newsletterFile, `${insertNewsletter.email}\n`);
      return newsletter;
    }

    async unsubscribeNewsletter(email: string): Promise<boolean> {
      let foundId: number | undefined = undefined;
      for (const [id, n] of Array.from(this.newsletter.entries())) {
        if (n.email === email) {
          foundId = id;
          break;
        }
      }
      if (foundId !== undefined) {
        this.newsletter.delete(foundId);
        // Rewrite file with remaining emails
        const emails = Array.from(this.newsletter.values()).map(n => n.email).join("\n");
        fs.writeFileSync(this.newsletterFile, emails + (emails ? "\n" : ""));
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
  // portifolo
      const projectsList: PortfolioProject[] = [
        {
          id: 1,
          title: "FinPay NG",
          description: "A modern fintech dashboard for Nigerian SMEs. Provides real-time analytics, payments integration, and automated invoicing.",
          technologies: "Next.js, TailwindCSS, Node.js, PostgreSQL",
          image: "https://images.pexels.com/photos/6802040/pexels-photo-6802040.jpeg",
          demoUrl: "/FintechDashboard",
          githubUrl: "https://github.com/calebdevx/finpay-ng",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "QuickEats NG",
          description: "Food delivery platform designed for Nigerian restaurants. Features live order tracking, restaurant dashboards, and mobile-first design.",
          technologies: "React Native, Firebase, Express.js",
          image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
          demoUrl: "/FoodDelivery",
          githubUrl: "https://github.com/calebdevx/quickeats-ng",
          createdAt: new Date(),
        },
        {
          id: 3,
          title: "NaijaHomes",
          description: "A real estate platform with property listings, mortgage calculators, and virtual tours tailored for Nigerian buyers.",
          technologies: "Next.js, Supabase, TailwindCSS",
          image: "https://images.pexels.com/photos/7031409/pexels-photo-7031409.jpeg",
          demoUrl: "/RealEstate",
          githubUrl: "https://github.com/yourgithub/naijahomes",
          createdAt: new Date(),
        },
        {
          id: 4,
          title: "EduAfrica LMS",
          description: "An e-learning platform for African universities. Includes video streaming, quizzes, and student progress tracking.",
          technologies: "Django, React, PostgreSQL",
          image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
          demoUrl: "/eduafrica",
          githubUrl: "https://github.com/calebdevx/eduafrica",
          createdAt: new Date(),
        },
        {
          id: 5,
          title: "MarketHub NG",
          description: "An e-commerce marketplace that connects Nigerian vendors with nationwide customers. Features wallet, cart, and seller dashboards.",
          technologies: "Vue.js, Laravel, MySQL",
          image: "https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg",
          demoUrl: "/Marketplace",
          githubUrl: "https://github.com/calebdevx/markethub-ng",
          createdAt: new Date(),
        },
        {
          id: 6,
          title: "TravelNaija",
          description: "Tourism booking platform for Nigerian destinations. Provides flight deals, hotel booking, and local experiences.",
          technologies: "Next.js, GraphQL, TailwindCSS",
          image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
          demoUrl: "/travelnaija",
          githubUrl: "https://github.com/calebdevx/travelnaija",
          createdAt: new Date(),
        },
        {
          id: 7,
          title: "AgroConnect",
          description: "A digital marketplace connecting Nigerian farmers to buyers. Features crop tracking, pricing analytics, and secure payments.",
          technologies: "React, Node.js, MongoDB",
          image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
          demoUrl: "/AgroConnect",
          githubUrl: "https://github.com/calebdevx/agroconnect",
          createdAt: new Date(),
        },
        {
          id: 8,
          title: "HealthLink NG",
          description: "Telemedicine platform offering video consultations, prescriptions, and hospital integrations for Nigerian healthcare.",
          technologies: "Flutter, Firebase, NestJS",
          image: "https://images.pexels.com/photos/4266947/pexels-photo-4266947.jpeg",
          demoUrl: "/healthlink",
          githubUrl: "https://github.com/calebdevx/healthlink-ng",
          createdAt: new Date(),
        },
        {
          id: 9,
          title: "EventHub Africa",
          description: "Event ticketing and booking solution for concerts, conferences, and weddings across Nigeria.",
          technologies: "Angular, Express, MongoDB",
          image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          demoUrl: "/EventHub",
          githubUrl: "https://github.com/calebdevx/eventhubafrica",
          createdAt: new Date(),
        },
        {
          id: 10,
          title: "ShopSmart NG",
          description: "AI-powered price comparison platform for Nigerian online shoppers. Helps users find the best deals instantly.",
          technologies: "Next.js, AI API, PostgreSQL",
          image: "https://images.pexels.com/photos/5632393/pexels-photo-5632393.jpeg",
          demoUrl: "/shopsmart",
          githubUrl: "https://github.com/calebdevx/shopsmart-ng",
          createdAt: new Date(),
        },
  ];

      // ✅ Add projects to the in-memory Map
      projectsList.forEach((p) => {
        this.portfolioProjects.set(p.id, p);
      const testimonialsList: Testimonial[] = [
        {
          id: 1,
          name: "Elijah Omachoko",
          testimonial: "Achek built us a world-class real estate website with seamless property listings. The design is modern and user-friendly, and our leads have doubled.",
          rating: 5,
          role: "Founder",
          company: "Achekinyo",
          image: "https://i.ibb.co/yFC1hZxP/elijah.jpg",
          createdAt: new Date(),
        },
        {
          id: 2,
          name: "Victoria Onuche",
          testimonial: "Their developer portfolio platform was beyond my expectations. Clean, fast, and professional. It has helped me attract bigger clients.",
          rating: 5,
          role: "Software Developer",
          company: "Freelance",
          image: "https://i.ibb.co/q39dDm3p/victoria.jpg",
          createdAt: new Date(),
        },
        {
          id: 3,
          name: "Sarah Johnson",
          testimonial: "Achek transformed our online presence completely. The team delivered a stunning website that not only looks amazing but also performs exceptionally well.",
          rating: 5,
          role: "CEO",
          company: "TechCorp",
          image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
          createdAt: new Date(),
        },
        {
          id: 4,
          name: "Michael Chen",
          testimonial: "The mobile app they developed for us exceeded all expectations. The user experience is seamless, and our customers love the intuitive design.",
          rating: 5,
          role: "Founder",
          company: "FitLife",
          image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
          createdAt: new Date(),
        },
        {
          id: 5,
          name: "Emily Rodriguez",
          testimonial: "Working with Achek was a game-changer for our business. They understood our vision perfectly and delivered a solution that surpassed our expectations.",
          rating: 5,
          role: "Director",
          company: "GreenEarth",
          image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
          createdAt: new Date(),
        },
        {
          id: 6,
          name: "David Thompson",
          testimonial: "Achek's digital marketing strategy helped us reach new heights. Our online visibility has improved dramatically with consistent growth in leads.",
          rating: 5,
          role: "Owner",
          company: "LocalBiz",
          image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
          createdAt: new Date(),
        },
        {
          id: 7,
          name: "Lisa Park",
          testimonial: "The e-commerce platform Achek built for us is absolutely fantastic. The admin panel is intuitive, and our customers love the shopping experience.",
          rating: 5,
          role: "Founder",
          company: "StyleHub",
          image: "https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg",
          createdAt: new Date(),
        },
        {
          id: 8,
          name: "Robert Kim",
          testimonial: "From concept to deployment, Achek handled everything professionally. Their cloud solutions made our operations more efficient and scalable.",
          rating: 5,
          role: "CTO",
          company: "InnovateTech",
          image: "https://images.pexels.com/photos/2422273/pexels-photo-2422273.jpeg",
          createdAt: new Date(),
        },
        {
          id: 9,
          name: "Chinedu Okafor",
          testimonial: "Our fintech dashboard was delivered flawlessly. Real-time analytics, easy navigation, and a polished UI. Couldn’t have asked for better.",
          rating: 5,
          role: "Product Manager",
          company: "FinPay",
          image: "https://images.pexels.com/photos/936094/pexels-photo-936094.jpeg",
          createdAt: new Date(),
        },
        {
          id: 10,
          name: "Amara Nwosu",
          testimonial: "Achek created a beautiful learning platform for us. Students love the experience and engagement has skyrocketed since launch.",
          rating: 5,
          role: "Director",
          company: "EduAfrica",
          image: "https://refinedng.com/wp-content/uploads/2024/03/Honey-Ogundeyi-CEO.png",
          createdAt: new Date(),
        },
        {
          id: 11,
          name: "Tunde Balogun",
          testimonial: "Their food delivery solution for us was smooth, real-time, and scalable. Our restaurants and customers love the system.",
          rating: 5,
          role: "CEO",
          company: "QuickEats NG",
          image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
          createdAt: new Date(),
        },
        {
          id: 12,
          name: "Ngozi Adeyemi",
          testimonial: "Achek’s real estate platform was exactly what we needed. Virtual tours and mortgage calculators set us apart from competitors.",
          rating: 5,
          role: "Manager",
          company: "Lagos Realty",
          image: "https://images.pexels.com/photos/1002061/pexels-photo-1002061.jpeg",
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
    for (const user of Array.from(this.users.values())) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.users.size + 1;
    // Only assign properties that exist in User schema
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // --- Portfolio (in-memory) ---
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values());
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(Number(id));
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
    // Fill missing nullable fields with null if not provided
    const message: Message = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      message: insertMessage.message,
      phone: insertMessage.phone ?? null,
      whatsapp: insertMessage.whatsapp ?? null,
      projectType: insertMessage.projectType ?? null,
      createdAt: new Date(),
    };
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
    for (const n of Array.from(this.newsletter.values())) {
      if (n.email === insertNewsletter.email) {
        throw new Error("Already subscribed");
      }
    }
    const id = this.newsletter.size + 1;
    const newsletter: Newsletter = { ...insertNewsletter, id, isActive: true, createdAt: new Date() };
    this.newsletter.set(id, newsletter);
    // Save to file
    fs.appendFileSync(this.newsletterFile, `${insertNewsletter.email}\n`);
    return newsletter;
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
    let foundId: number | undefined = undefined;
    for (const [id, n] of Array.from(this.newsletter.entries())) {
      if (n.email === email) {
        foundId = id;
        break;
      }
    }
    if (foundId !== undefined) {
      this.newsletter.delete(foundId);
      // Rewrite file with remaining emails
      const emails = Array.from(this.newsletter.values()).map(n => n.email).join("\n");
      fs.writeFileSync(this.newsletterFile, emails + (emails ? "\n" : ""));
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
