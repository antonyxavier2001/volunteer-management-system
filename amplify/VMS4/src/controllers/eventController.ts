import { Request, Response } from 'express';
import Event from '../models/eventModel';
import { v4 as uuidv4 } from 'uuid';

// @desc    Add a new event
// @route   POST /api/events
// @access  Private (Admin only)
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { name, address, state, city, date, time } = req.body;

    // Generate a unique eventId
    const eventId = uuidv4();

    const event = await Event.create({
      eventId,
      name,
      address,
      state,
      city,
      date,
      time,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Private (Admin only)
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};