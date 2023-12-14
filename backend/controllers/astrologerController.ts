import { Request, Response } from "express";
import Astrologer from "../models/astrologerModel";

// register astrologer
export const registerAstrologer = async (req: Request, res: Response) => {
  try {
    const { name, gender, email, languages, specialties } = req.body;
    // Register the astrologer
    const newAstrologer = new Astrologer({
      name,
      gender,
      email,
      languages,
      specialties,
    });

    // Save the astrologer to the database
    const createdAstrologer = await newAstrologer.save();

    res.status(201).json({
      success: true,
      astrologer: createdAstrologer,
    });
  } catch (error) {
    console.error("Error registering astrologer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all astrologers
export const getAllAstrologers = async (req: Request, res: Response) => {
  try {
    const astrologers = await Astrologer.find();
    res.json(astrologers);
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAstrologer = async (req: Request, res: Response) => {
  try {
    const astrologerId = req.params.id;

    // Find the astrologer by ID
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found",
      });
    }

    res.status(200).json(astrologer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// update the astrologer
export const updateAstrologer = async (req: Request, res: Response) => {
  try {
    const astrologerId = req.params.id;
    const { name, gender, email, languages, specialties } = req.body;

    // Find the subject by ID and update its fields
    const updatedAstrologer = await Astrologer.findByIdAndUpdate(
      astrologerId,
      {
        name,
        gender,
        email,
        languages,
        specialties,
      },
      { new: true }
    );

    if (!updatedAstrologer) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      astrologer: updatedAstrologer,
      message: "Subject successfully updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
