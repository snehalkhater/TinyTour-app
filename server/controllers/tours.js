import Tour from "../models/Tour.js";
import dotenv from "dotenv";
dotenv.config();

const getTours = async (req, res) => {
  const tours = await Tour.find({ user: req.user.id }).populate(
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

const putTours = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { id } = req.params;

  const tour = await Tour.findById(id);
  if (!tour) {
    return res.json({
      success: false,
      msg: 'tour not found',
      data: null
    })
  }
  if (tour.user.toString() !== userId) {
    return res.json({
      success: false,
      message: "unauothorized to update this tour",
      data: null
    })
  }
  const { title, description, startDate, endDate, photos, cites } = req.body;
  await Tour.updateOne({ _id: id }, {
    title,
    description,
    startDate,
    endDate,
    photos,
    cites
  });
  const updatedTour = await Tour.findById(id);

  return res.json({
    success: true,
    message: "tour updated succesfully",
    data: updatedTour,
  })

};

const getTourById = async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findById(id).populate("user", "-password");

  if (!tour) {
    return res.json({
      success: false,
      message: "Tour not found",
      data: null,
    });
  }

  return res.json({
    success: true,
    message: "Fetched tour successfully",
    data: tour,
  });
};
export { getTours, postTour, putTours, getTourById };