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
import { connection as pool } from "./db";

type Newsletter = typeof selectNewsletterSchema._type;
type InsertNewsletter = typeof insertNewsletterSchema._type;
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { connection  } from "./db";

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

type User = typeof selectUserSchema._type;
type InsertUser = typeof insertUserSchema._type;
type PortfolioProject = typeof selectPortfolioSchema._type;
type InsertPortfolioProject = typeof insertPortfolioSchema._type;
type Testimonial = typeof selectTestimonialSchema._type;
type InsertTestimonial = typeof insertTestimonialSchema._type;
type Message = typeof selectMessageSchema._type;
type InsertMessage = typeof insertMessageSchema._type;

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
export class DBStorage implements IStorage {
  private portfolioProjects = new Map<string, PortfolioProject>();
  private testimonials = new Map<string, Testimonial>();
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
    const [rows]: any = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    await pool.query("INSERT INTO users SET ?", user);
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
    const [rows]: any = await pool.query("SELECT * FROM messages ORDER BY createdAt DESC");
    return rows;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { ...insertMessage, id, createdAt: new Date() };

    await pool.query("INSERT INTO messages SET ?", message);

    // ✅ Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
          user: process.env.MAIL_USER_HELLO,
          pass: process.env.MAIL_PASS_HELLO,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM_HELLO,
        to: process.env.MAIL_USER_HELLO,
        subject: "📩 New Contact Form Submission",
        text: `
Name: ${message.name}
Email: ${message.email}
Phone: ${message.phone || "N/A"}
WhatsApp: ${message.whatsapp || "N/A"}
Project Type: ${message.projectType || "N/A"}

Message:
${message.message}
        `,
      });
    } catch (error) {
      console.error("❌ Failed to send contact email:", error);
    }

    return message;
  }

  // --- Newsletter ---
  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    const [rows]: any = await pool.query(
      "SELECT * FROM newsletter_subscribers ORDER BY created_at DESC"
    );
    return rows;
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Only send email field, let MySQL handle id, isActive, created_at
    let insertResult;
    try {
      insertResult = await pool.query("INSERT INTO newsletter_subscribers SET ?", { email: insertNewsletter.email });
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new Error("Already subscribed");
      }
      throw err;
    }
    // Fetch the actual inserted row
    const [rows]: any = await pool.query("SELECT * FROM newsletter_subscribers WHERE email = ?", [insertNewsletter.email]);
    return rows[0];
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
  const [result]: any = await pool.query("DELETE FROM newsletter_subscribers WHERE email = ?", [email]);
  return result.affectedRows > 0;
  }

  async sendBulkNewsletter(subject: string, content: string): Promise<number> {
  const [rows]: any = await pool.query("SELECT email FROM newsletter_subscribers");
    const subscribers = rows.map((r: any) => r.email);

    if (!subscribers.length) return 0;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER_NEWS,
        pass: process.env.MAIL_PASS_NEWS,
      },
    });

    await Promise.all(
      subscribers.map((email: string) =>
        transporter.sendMail({
          from: process.env.MAIL_FROM_NEWS,
          to: email,
          subject,
          html: `
            <div>
              ${content}
              <br><br>
              <a href="${process.env.BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(
                email
              )}">Unsubscribe</a>
            </div>
          `,
        })
      )
    );

    return subscribers.length;
  }
}

export const storage = new DBStorage();
