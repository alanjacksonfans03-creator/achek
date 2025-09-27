import { apiRequest } from "./queryClient";
import type {
  Portfolio,
  Testimonial,
  Message,
  Newsletter,
  InsertMessage,
  InsertNewsletter,
} from "@shared/schema";

// Portfolio API
export const portfolioApi = {
  getAll: async (): Promise<Portfolio[]> => {
    const response = await apiRequest("GET", "/api/portfolio");
    return response.json();
  },

  getById: async (id: string): Promise<Portfolio> => {
    const response = await apiRequest("GET", `/api/portfolio/${id}`);
    return response.json();
  },
};

// Testimonials API
export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiRequest("GET", "/api/testimonials");
    return response.json();
  },
};

// Messages API
export const messagesApi = {
  create: async (message: InsertMessage): Promise<Message> => {
    const response = await apiRequest("POST", "/api/messages", message);
    return response.json();
  },
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (newsletter: InsertNewsletter): Promise<Newsletter> => {
    const response = await apiRequest("POST", "/api/newsletter", newsletter);
    return response.json();
  },
};
