import Tour from "../models/Tour.js";
import dotenv from "dotenv";

dotenv.config();

const getTours = async (req, res) => {
  const tours = await Tour.find({user: req.user.id}).populate(
    "user",
    "-password"
);
  return res.json({
    success: true,
    message: "Fetched tours successfully",
    data: tours,
  });
};

const postTour = async (req, res) => {
  const { title, description, cities, startDate, endDate, photos, userId } = req.body;

  const newTour = new Tour({
    title,
    description,
    cities,
    startDate,
    endDate,
    photos,
    user: req.user.id,
  });

  try {
    const savedTour = await newTour.save();

    return res.json({
      success: true,
      message: "tour created successfully",
      data: savedTour,
    });
  }
  catch (error) {
     return res.json({
      success: false,
      message: "tour creation failed",
      error: error.message
    });
  }
};

export { getTours, postTour };