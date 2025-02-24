import express, { Request, Response } from "express";
import Event from "../models/eventRegister";
import mongoose from "mongoose";

const router = express.Router();

// POST: Add New Event
router.post("/", async (req: Request, res: Response) => {
    try {
        const {
            eventId,
            name,
            address,
            state,
            city,
            date,
            time
        } = req.body;

        // Validate required fields
        if (!eventId || !name || !address || !state || !city || !date || !time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if event with same ID already exists
        const existingEvent = await Event.findOne({ eventId });
        if (existingEvent) {
            return res.status(409).json({ error: "Event ID already exists" });
        }

        // Create new event
        const newEvent = new Event({
            eventId,
            name,
            address,
            state,
            city,
            date: new Date(date),
            time
        });

        await newEvent.save();

        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });
    } catch (error: any) {
        console.error("Error creating event:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET: View All Events (Admin View with Additional Details)
router.get("/admin/events", async (_req: Request, res: Response) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 }) // Sort by date ascending
            .populate({
                path: 'registrations',
                select: 'volunteer -_id',
                populate: {
                    path: 'volunteer',
                    select: 'name email phone -_id'
                }
            });

        res.status(200).json({
            count: events.length,
            events: events
        });
    } catch (error: any) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET: View Single Event Details
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid event ID" });
        }

        const event = await Event.findById(id)
            .populate({
                path: 'registrations',
                select: 'volunteer -_id',
                populate: {
                    path: 'volunteer',
                    select: 'name email phone -_id'
                }
            });

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error: any) {
        console.error("Error fetching event:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//DELETE: Remove Event
// router.delete("/:id", async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid event ID" });
//         }

//         const event = await Event.findByIdAndDelete(id);

//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//         }

//         res.status(200).json({ message: "Event deleted successfully" });
//     } catch (error: any) {
//         console.error("Error deleting event:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

export default router;