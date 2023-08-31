import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

//create hotel
export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	const newRoom = new Room(req.body);
	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		next(error);
	}
};

//update hotel
export const updateRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (error) {
		next(error);
	}
};

//delete hotel
export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
		} catch (error) {
			next(error);
		}
		res.status(200).json('Room has been deleted succesfully.');
	} catch (error) {
		next(error);
	}
};

//get hotel
export const getRoom = async (req, res, next) => {
	try {
		const room = await Hotel.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		next(error);
	}
};

//get all hotels
export const getRooms = async (req, res, next) => {
	try {
		const rooms = await Hotel.find();
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};