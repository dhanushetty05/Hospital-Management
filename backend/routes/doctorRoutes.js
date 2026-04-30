import express from 'express';
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  loginDoctor
} from '../controllers/doctorController.js';
import { authenticateDoctor, optionalAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.post('/login', loginDoctor);
router.post('/', upload.single('image'), createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.put('/:id', authenticateDoctor, upload.single('image'), updateDoctor);
router.delete('/:id', authenticateDoctor, deleteDoctor);

export default router;
