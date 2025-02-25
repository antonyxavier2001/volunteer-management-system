// import express, { Request, Response } from "express";
// import Event from "../models/eventModel";
// import EventRegistration from "../models/userRegister";

// const router = express.Router();

// // 🟢 GET: View All Events
// router.get("/", async (_req: Request, res: Response) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (error: any) {
//         console.error("❌ Error fetching events:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// //🟢 POST: Register for an Event
// router.post("/:eventId/register", async (req: Request, res: Response) => {
//     try {
//         const { eventId } = req.params;
//         const { volunteerId } = req.body; // Volunteer ID should be sent in request body

//         // Check if event exists
// //         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//         }

//         // Check if volunteer is already registered
//         const existingRegistration = await EventRegistration.findOne({ volunteer: volunteerId, event: eventId });
//         if (existingRegistration) {
//              res.status(400).json({ error: "Volunteer already registered for this event" });
//              return;
//         }

//         //Register the volunteer
//         const newRegistration = new EventRegistration({ volunteer: volunteerId, event: eventId });
//         await newRegistration.save();

//         res.status(201).json({ message: "Volunteer registered successfully" });
//     } catch (error: any) {
//         console.error("❌ Error registering for event:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// export default router;

// routes/volunteerRoutes.ts
// import express, { Request, Response, Router } from "express";
// import Event from "../models/eventModel";
// import User from "../models/userRegister";

// const router: Router = express.Router();

// // API for a volunteer to register for an event
// router.post("/:eventId/register", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { eventId } = req.params;
//     const { userId } = req.body; // Volunteer's user ID

//     // Check if the event exists
//     const event = await Event.findOne({ eventId });
//     if (!event) {
//       res.status(404).json({ error: "Event not found" });
//       return;
//     }

//     // Check if the user exists
//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }

//     // Check if the user is already registered for the event
//     if (event.registeredVolunteers.includes(userId)) {
//       res.status(400).json({ error: "User is already registered for this event" });
//       return;
//     }

//     // Add the user to the event's registeredVolunteers array
//     event.registeredVolunteers.push(userId);
//     await event.save();

//     console.log("✅ User registered for event successfully:", event);
//     res.status(200).json({ message: "User registered for event successfully", event });
//   } catch (error: any) {
//     console.error("❌ Error registering for event:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // API for a volunteer to view event details
// router.get("/:eventId", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { eventId } = req.params;

//     // Find the event by eventId
//     const event = await Event.findOne({ eventId });
//     if (!event) {
//       res.status(404).json({ error: "Event not found" });
//       return;
//     }

//     console.log("✅ Event details fetched successfully:", event);
//     res.status(200).json(event);
//   } catch (error: any) {
//     console.error("❌ Error fetching event details:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

import express, { Request, Response } from "express";
import Event from "../models/eventModel";
import EventRegistration from "../models/userRegister";

const router = express.Router();

// 🟢 GET: View All Events
router.get("/", async (_req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error: any) {
        console.error("❌ Error fetching events:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🟢 POST: Register for an Event
router.post("/:eventId/register", async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const { volunteerId } = req.body; // Volunteer ID should be sent in request body

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }

        // Check if volunteer is already registered
        const existingRegistration = await EventRegistration.findOne({ volunteer: volunteerId, event: eventId });
        if (existingRegistration) {
            res.status(400).json({ error: "Volunteer already registered for this event" });
            return;
        }

        // Register the volunteer
        const newRegistration = new EventRegistration({ volunteer: volunteerId, event: eventId });
        await newRegistration.save();

        res.status(201).json({ message: "Volunteer registered successfully" });
    } catch (error: any) {
        console.error("❌ Error registering for event:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;