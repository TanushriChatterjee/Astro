import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Astrologer document
interface IAstrologer extends Document {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

// Define the schema for the Astrologer collection
const astrologerSchema: Schema<IAstrologer> = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  specialties: {
    type: [String],
    default: [],
  },
});

// Create and export the Astrologer model
const Astrologer = mongoose.model<IAstrologer>('Astrologer', astrologerSchema);

export default Astrologer;