// lib/api/messages.ts
export const messagesApi = {
  create: async (data: {
    name: string;
    email: string;
    phone?: string;
    whatsapp: string;
    projectType?: string;
    message: string;
  }) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send message");
    }

    return res.json();
  },
};
