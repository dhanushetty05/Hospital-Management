import express from 'express';
import {
  getServiceAppointments,
  createServiceAppointment,
  updateServiceAppointment,
  deleteServiceAppointment,
  getServiceAppointmentById
} from '../controllers/serviceAppointmentController.js';

const router = express.Router();

router.get('/', getServiceAppointments);
router.post('/', createServiceAppointment);
router.get('/:id', getServiceAppointmentById);
router.put('/:id', updateServiceAppointment);
router.delete('/:id', deleteServiceAppointment);

export default router;
