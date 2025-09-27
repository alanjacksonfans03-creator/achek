
import { mysqlTable, varchar, text, timestamp, int, boolean } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const portfolio = mysqlTable("portfolio", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  technologies: text("technologies").notNull(),
  demoUrl: varchar("demo_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = mysqlTable("testimonials", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  testimonial: text("testimonial").notNull(),
  image: varchar("image", { length: 255 }),
  rating: int("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  whatsapp: varchar("whatsapp", { length: 20 }),
  projectType: varchar("project_type", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletter = mysqlTable("newsletter_subscribers", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertPortfolioSchema = createInsertSchema(portfolio);
export const selectPortfolioSchema = createSelectSchema(portfolio);

export const insertTestimonialSchema = createInsertSchema(testimonials);
export const selectTestimonialSchema = createSelectSchema(testimonials);

export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

export const insertNewsletterSchema = createInsertSchema(newsletter);
export const selectNewsletterSchema = createSelectSchema(newsletter);
