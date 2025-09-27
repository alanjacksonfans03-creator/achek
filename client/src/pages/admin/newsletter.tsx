// admin/Newsletter.tsx
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import AdminLayout from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ReactQuill from "react-quill"; // Temporarily disabled due to compatibility issues


import { useRef } from "react";

const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
    handlers: {}, // Will be set in useEffect
  },
};

interface Subscriber {
  id: number;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export default function Newsletter() {
  const quillRef = useRef<any>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [logoUrl, setLogoUrl] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    fetchSubscribers();
    // Set custom image handler for ReactQuill
    if (quillRef.current && quillRef.current.getEditor) {
      const editor = quillRef.current.getEditor();
      editor.getModule("toolbar").addHandler("image", async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          if (!input.files || !input.files[0]) return;
          const formData = new FormData();
          formData.append("image", input.files[0]);
          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            if (data.url) {
              const range = editor.getSelection();
              editor.insertEmbed(range ? range.index : 0, "image", data.url);
            }
          } catch (err) {
            alert("Image upload failed");
          }
        };
      });
    }
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter");
      if (response.ok) {
        const data = await response.json();
        setSubscribers(
          data.map((email: string, idx: number) => ({
            id: idx + 1,
            email,
            isActive: true,
            createdAt: new Date().toISOString(),
          }))
        );
      } else {
        toast.error("Unable to load subscribers. Please try again later.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const sendNewsletter = async () => {
    if (!subject || !content) {
      toast.error("Please fill in both subject and content.");
      return;
    }
    if (selected.length === 0) {
      toast.error("Please select at least one subscriber.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          content: logoUrl ? `<img src='${logoUrl}' alt='Logo' style='max-width:120px;display:block;margin-bottom:16px;'/>` + content : content,
          recipients: selected,
          schedule: schedule || undefined,
        }),
      });
      if (response.ok) {
        toast.success("Newsletter scheduled!");
        setSubject("");
        setContent("");
        setSelected([]);
        setLogoUrl("");
        setSchedule("");
      } else {
        toast.error("Failed to send newsletter. Please check your details and try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 bg-gray-50 dark:bg-neutral-900 min-h-screen p-4 md:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-primary dark:text-blue-300 mb-2">Newsletter Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Send Newsletter */}
          <Card className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-xl">
            <CardHeader className="bg-primary/10 dark:bg-blue-900/30 rounded-t-xl">
              <CardTitle className="text-lg font-semibold text-primary dark:text-blue-200">Send Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Newsletter subject..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Logo/Image URL (optional)</label>
                <Input
                  value={logoUrl}
                  onChange={e => setLogoUrl(e.target.value)}
                  placeholder="Paste logo or ad image URL here"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">Embed your logo, ad, or affiliate image at the top of the newsletter.</span>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Content</label>
                <div className="mb-4">
                  {/* ReactQuill temporarily disabled due to compatibility issues */}
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter newsletter content..."
                    className="min-h-40"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Rich text editor temporarily disabled. You can still enter content in the text area.</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Schedule Send (optional)</label>
                <Input
                  type="datetime-local"
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">Pick a date and time to schedule the newsletter (leave blank to send now).</span>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Select Subscribers</label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    onClick={() => setSelected(subscribers.map((s) => s.email))}
                    disabled={subscribers.length === 0}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-gray-400 text-white text-xs font-semibold hover:bg-gray-500 transition"
                    onClick={() => setSelected([])}
                    disabled={selected.length === 0}
                  >
                    Deselect All
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600">
                  {subscribers.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No subscribers yet</p>
                  ) : (
                    subscribers.map((subscriber) => (
                      <div key={subscriber.id} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          checked={selected.includes(subscriber.email)}
                          onChange={e => {
                            if (e.target.checked) setSelected([...selected, subscriber.email]);
                            else setSelected(selected.filter(email => email !== subscriber.email));
                          }}
                          className="mr-2 accent-blue-600 dark:accent-blue-400"
                        />
                        <span className="text-sm text-gray-800 dark:text-gray-100">{subscriber.email}</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${subscriber.isActive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}>{subscriber.isActive ? "Active" : "Inactive"}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <Button 
                onClick={sendNewsletter} 
                disabled={loading}
                className="w-full bg-primary text-white font-semibold hover:bg-primary/90 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                {loading ? (schedule ? "Scheduling..." : "Sending...") : schedule ? `Schedule for ${schedule}` : `Send to ${selected.length} selected`}
              </Button>
            </CardContent>
          </Card>
          {/* Subscribers List */}
          <Card className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-xl">
            <CardHeader className="bg-primary/10 dark:bg-blue-900/30 rounded-t-xl">
              <CardTitle className="text-lg font-semibold text-primary dark:text-blue-200">Subscribers ({subscribers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {subscribers.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No subscribers yet</p>
                ) : (
                  subscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{subscriber.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          subscriber.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {subscriber.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </AdminLayout>
  );
}
