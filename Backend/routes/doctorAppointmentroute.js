const express = require('express');
const router = express.Router();
const Appointment = require('../routes/appointmentRoutes');
const auth = require('../middleware/auth');
// const Doctor = require('../dbSchema/doctorSchema');

// Get all appointments for a specific doctor
router.get('/getdoctorappointment', auth, async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(403).json({ message: 'Access denied. User is not a doctor.' });
        }

        const appointments = await Appointment.find({ doctor: doctorId })
            .populate({
                path: 'patient',
                select: 'name email phone'
            })
            .sort({ date: 1, time: 1 })
            .exec();

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        res.status(500).json({ message: 'Server error while fetching appointments' });
    }
});

// Get specific appointment details
router.get('/specificapp/:appointmentId', auth, async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { appointmentId } = req.params;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(403).json({ message: 'Access denied. User is not a doctor.' });
        }

        const appointment = await Appointment.findOne({
            _id: appointmentId,
            doctor: doctorId
        }).populate('patient', 'name email phone');
 
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        res.status(500).json({ message: 'Server error while fetching appointment details' });
    }
});

// Update appointment status
router.patch('/:appointmentId/status', auth, async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { appointmentId } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(403).json({ message: 'Access denied. User is not a doctor.' });
        }

        const appointment = await Appointment.findOneAndUpdate(
            {
                _id: appointmentId,
                doctor: doctorId
            },
            { status },
            { new: true }
        ).populate('patient', 'name email phone');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ message: 'Server error while updating appointment status' });
    }
});

// Get today's appointments for a doctor
router.get('/today', auth, async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(403).json({ message: 'Access denied. User is not a doctor.' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const appointments = await Appointment.find({
            doctor: doctorId,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        })
        .populate('patient', 'name email phone')
        .sort({ time: 1 })
        .exec();

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching today\'s appointments:', error);
        res.status(500).json({ message: 'Server error while fetching today\'s appointments' });
    }
});

module.exports = router;
