import express from "express";
import axios from "axios";

const router = express.Router();

// POST /api/payment-status
router.post("/api/payment-status", async (req, res) => {
  const { transactionId } = req.body;
  if (!transactionId) {
    return res.status(400).json({ success: false, message: "Missing transactionId" });
  }
  try {
    const FLUTTERWAVE_API_KEY = process.env.FLUTTERWAVE_API_KEY;
    if (!FLUTTERWAVE_API_KEY) {
      return res.status(500).json({ success: false, message: "Flutterwave API key not set" });
    }
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_API_KEY}`,
        },
      }
    );
    const { status, data } = response.data;
    if (status === "success") {
      return res.json({ success: true, paymentStatus: data.status, data });
    } else {
      return res.status(400).json({ success: false, message: data.message || "Verification failed" });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.response?.data?.message || error.message || "Error verifying payment" });
  }
});

export default router;
