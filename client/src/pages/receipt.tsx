import React, { useState } from "react";

export default function TestReceiptEmailPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/test-send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResult(data.message || (data.success ? "Success" : "Failed"));
    } catch (err) {
      setResult("Error sending test receipt email.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-12 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Test Receipt Email Endpoint</h2>
      <label className="block mb-2 font-medium">Recipient Email (optional):</label>
      <input
        type="email"
        placeholder="Enter email or leave blank for default"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700"
      >
        {loading ? "Sending..." : "Send Test Receipt Email"}
      </button>
      {result && (
        <div className={`mt-4 p-3 rounded ${result.includes("Success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {result}
        </div>
      )}
    </div>
  );
}
