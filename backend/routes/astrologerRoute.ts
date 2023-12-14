import express from "express";
const router = express.Router();

import {
  registerAstrologer,
  getAllAstrologers,
  getAstrologer,
  updateAstrologer,
} from "../controllers/astrologerController";

router.get("/astrologers", getAllAstrologers);
router.get("/astrologers/:id", getAstrologer);
router.post("/astrologers/register", registerAstrologer);
router.put("/astrologers/:id", updateAstrologer);

export default router;