import ServiceAppointment from '../models/serviceAppointment.js';
import Service from '../models/Service.js';

// Get All Service Appointments
export const getServiceAppointments = async (req, res) => {
  try {
    const { serviceId, mobile, status, search = "", limit: limitRaw = 50, page: pageRaw = 1 } = req.query;
    const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
    const page = Math.max(1, parseInt(pageRaw, 10) || 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (serviceId) filter.serviceId = serviceId;
    if (mobile) filter.mobile = mobile;
    if (status) filter.status = status;
    if (search) {
      const re = new RegExp(search, "i");
      filter.$or = [{ patientName: re }, { mobile: re }, { serviceName: re }];
    }

    const appointments = await ServiceAppointment.find(filter)
      .populate('serviceId', 'name price imageUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ServiceAppointment.countDocuments(filter);

    return res.json({ success: true, data: appointments, appointments, meta: { page, limit, total } });
  } catch (err) {
    console.error("getServiceAppointments error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create Service Appointment
export const createServiceAppointment = async (req, res) => {
  try {
    const {
      serviceId,
      patientName,
      mobile,
      age,
      gender = "",
      date,
      hour,
      minute,
      ampm,
      paymentMethod = "Cash",
      notes = "",
    } = req.body || {};

    if (!serviceId || !patientName || !mobile || !date || hour === undefined || minute === undefined || !ampm) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const appointment = new ServiceAppointment({
      patientName: String(patientName).trim(),
      mobile: String(mobile).trim(),
      age: age ? Number(age) : undefined,
      gender,
      serviceId,
      serviceName: service.name,
      serviceImage: {
        url: service.imageUrl || "",
        publicId: service.imagePublicId || "",
      },
      fees: service.price,
      date,
      hour: Number(hour),
      minute: Number(minute),
      ampm,
      status: paymentMethod === "Cash" ? "Pending" : "Pending",
      payment: {
        method: paymentMethod,
        status: paymentMethod === "Cash" ? "Pending" : "Pending",
        amount: service.price,
      },
      notes,
    });

    await appointment.save();

    // Update service stats
    service.totalAppointments = (service.totalAppointments || 0) + 1;
    await service.save();

    return res.status(201).json({ success: true, data: appointment, appointment });
  } catch (err) {
    console.error("createServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Service Appointment
export const updateServiceAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const appointment = await ServiceAppointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Service appointment not found" });
    }

    const terminal = appointment.status === "Completed" || appointment.status === "Canceled";
    if (terminal && body.status && body.status !== appointment.status) {
      return res.status(400).json({ success: false, message: "Cannot change status of a completed/canceled appointment" });
    }

    const update = {};
    if (body.status) update.status = body.status;
    if (body.notes !== undefined) update.notes = body.notes;

    if (body.date && body.hour !== undefined && body.minute !== undefined && body.ampm) {
      if (appointment.status === "Completed" || appointment.status === "Canceled") {
        return res.status(400).json({ success: false, message: "Cannot reschedule completed/canceled appointment" });
      }
      update.date = body.date;
      update.hour = body.hour;
      update.minute = body.minute;
      update.ampm = body.ampm;
      update.status = "Rescheduled";
      update.rescheduledTo = { date: body.date, hour: body.hour, minute: body.minute, ampm: body.ampm };
    }

    const updated = await ServiceAppointment.findByIdAndUpdate(id, update, { new: true });
    return res.json({ success: true, data: updated, appointment: updated });
  } catch (err) {
    console.error("updateServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Service Appointment
export const deleteServiceAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await ServiceAppointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Service appointment not found" });
    }

    return res.json({ success: true, message: "Service appointment deleted successfully" });
  } catch (err) {
    console.error("deleteServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Service Appointment by ID
export const getServiceAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await ServiceAppointment.findById(id).populate('serviceId', 'name price imageUrl');

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Service appointment not found" });
    }

    return res.json({ success: true, data: appointment, appointment });
  } catch (err) {
    console.error("getServiceAppointmentById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
