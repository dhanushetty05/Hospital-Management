import Doctor from '../models/Doctor.js';

// Simple auth middleware for doctor routes
export const authenticateDoctor = async (req, res, next) => {
  try {
    // For now, we'll use a simple email-based auth
    // In production, use JWT tokens
    const { doctorEmail, doctorId } = req.headers;

    if (!doctorEmail && !doctorId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    let doctor;
    if (doctorId) {
      doctor = await Doctor.findById(doctorId);
    } else if (doctorEmail) {
      doctor = await Doctor.findOne({ email: doctorEmail.toLowerCase() });
    }

    if (!doctor) {
      return res.status(401).json({ success: false, message: 'Doctor not found' });
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, message: 'Authentication error' });
  }
};

// Optional auth - doesn't fail if no auth provided
export const optionalAuth = async (req, res, next) => {
  try {
    const { doctorEmail, doctorId } = req.headers;

    if (doctorEmail || doctorId) {
      let doctor;
      if (doctorId) {
        doctor = await Doctor.findById(doctorId);
      } else if (doctorEmail) {
        doctor = await Doctor.findOne({ email: doctorEmail.toLowerCase() });
      }

      if (doctor) {
        req.doctor = doctor;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next();
  }
};
