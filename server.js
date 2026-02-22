const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON
app.use(express.json());

// Serve static files from public folder
app.use(express.static("public"));

// Sample shipment database
const shipments = [
  {
    trackingNumber: "VEX-PL2026-847392615",
    status: "In Transit",
    location: "Warsaw, Poland",
    estimatedDelivery: "February 28, 2026"
  },
  {
    trackingNumber: "VEX-PL2026-123456789",
    status: "Delivered",
    location: "Mysłowice, Poland",
    estimatedDelivery: "Delivered February 20, 2026"
  }
];

// Tracking route
app.get("/track/:trackingNumber", (req, res) => {
  const trackingNumber = req.params.trackingNumber;

  const shipment = shipments.find(
    item => item.trackingNumber === trackingNumber
  );

  if (!shipment) {
    return res.status(404).json({
      success: false,
      message: "Tracking number not found"
    });
  }

  res.json({
    success: true,
    data: shipment
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Tracking server running on port ${PORT}`);
});
