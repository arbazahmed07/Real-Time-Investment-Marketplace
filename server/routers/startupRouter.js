const express = require("express");
const router = express.Router();

const startupModel = require("../models/startupModel");

router.get("/fetchAll", async (req, res) => {
  var startup = await startupModel.find();
  console.log("startup", startup);
  return res.status(200).json({
    startup: startup,
  });
});

router.get("/:id", async (req, res) => {
  id = req.params.id;
  const result = await startupModel.find({ _id: id });
  if (!result) {
    return res.status(404).json({
      feedbacks: "Not Found",
    });
  } else {
    return res.status(200).json({
      startup: result[0],
    });
  }
});

// Add a new route to create a startup
router.post("/add", async (req, res) => {
  try {
    const { name, website, photo, description, industries, locations, amountRaised, fundedOver } = req.body;
    
    // Check if startup with same website already exists
    const existingStartup = await startupModel.findOne({ website });
    if (existingStartup) {
      return res.status(400).json({
        message: "Startup with this website already exists",
      });
    }
    
    // Create new startup
    const newStartup = await startupModel.create({
      name,
      website,
      photo,
      description,
      industries,
      locations,
      amountRaised,
      fundedOver,
    });
    
    return res.status(200).json({
      message: "Startup created successfully",
      startup: newStartup,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
