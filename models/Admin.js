import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

const conn = await connectDB("ezmart-admin");

const adminSchema = new mongoose.Schema({
  name:{type:String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // other admin fields
});

const Admin = conn.models.Admin || conn.model("Admin", adminSchema);
export default Admin;