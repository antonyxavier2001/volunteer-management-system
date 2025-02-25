// import mongoose, { Document, Schema, Model } from "mongoose";

// // Define an interface for the event schema
// interface IEvent extends Document {
//   eventId: string;
//   name: string;
//   address: string;
//   state: string;
//   city: string;
//   date: Date;
//   time: string;
// }

// // Define the schema
// const eventSchema = new Schema<IEvent>(
//   {
//     eventId: { type: String, required: true, unique: true, trim: true },
//     name: { type: String, required: true, trim: true },
//     address: { type: String, required: true, trim: true },
//     state: { type: String, required: true, trim: true },
//     city: { type: String, required: true, trim: true },
//     date: { type: Date, required: true },
//     time: { type: String, required: true, trim: true },
//   },
//   { timestamps: true }
// );

// // Create and export the model
// const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

// export default Event;

// import mongoose, { Schema, Document } from 'mongoose';
// export interface IEvent {
//   eventId: string;
//   name: string;
//   address: string;
//   state: string;
//   city: string;
//   date: Date;
//   time: string;
// }

// export interface IEventDocument extends IEvent, Document {}

// const EventSchema: Schema = new Schema({
//   eventId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   state: { type: String, required: true },
//   city: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true }
// }, {
//   timestamps: false
// });

// export default mongoose.model<IEventDocument>('Event', EventSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent {
  eventId: string;
  name: string;
  address: string;
  state: string;
  city: string;
  date: Date;
  time: string;
}

export interface IEventDocument extends IEvent, Document {}

const EventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
}, {
  timestamps: true  // Changed to true to automatically add createdAt and updatedAt fields
});

// Create index for faster queries
EventSchema.index({ eventId: 1 });

const Event = mongoose.model<IEventDocument>('Event', EventSchema);

export default Event;