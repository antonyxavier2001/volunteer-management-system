import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from '../types';

export interface IEventDocument extends IEvent, Document {}

const EventSchema: Schema = new Schema({
  eventId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
}, {
  timestamps: false
});

export default mongoose.model<IEventDocument>('Event', EventSchema);