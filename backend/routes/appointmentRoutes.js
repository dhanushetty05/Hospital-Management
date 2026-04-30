import express from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getStats,
  getAppointmentsByDoctor,
  getAppointmentById,
  confirmPayment
} from '../controllers/appointmentController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAppointments);
router.post('/', optionalAuth, createAppointment);
router.get('/stats', getStats);
router.get('/confirm-payment', confirmPayment);
router.get('/doctor/:doctorId', getAppointmentsByDoctor);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
