import Service from '../models/Service.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// Get All Services
export const getServices = async (req, res) => {
  try {
    const { q = "", limit: limitRaw = 100, page: pageRaw = 1 } = req.query;
    const limit = Math.min(500, Math.max(1, parseInt(limitRaw, 10) || 100));
    const page = Math.max(1, parseInt(pageRaw, 10) || 1);
    const skip = (page - 1) * limit;

    const match = {};
    if (q && typeof q === "string" && q.trim()) {
      const re = new RegExp(q.trim(), "i");
      match.$or = [{ name: re }, { about: re }, { shortDescription: re }];
    }

    const services = await Service.find(match)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(match);

    return res.json({ success: true, data: services, services, meta: { page, limit, total } });
  } catch (err) {
    console.error("getServices error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    return res.json({ success: true, data: service, service });
  } catch (err) {
    console.error("getServiceById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create Service
export const createService = async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.name) {
      return res.status(400).json({ success: false, message: "Service name is required" });
    }

    let imageUrl = body.imageUrl || null;
    let imagePublicId = body.imagePublicId || null;

    if (req.file?.path) {
      const uploaded = await uploadToCloudinary(req.file.path, "services");
      if (uploaded) {
        imageUrl = uploaded.secure_url || uploaded.url;
        imagePublicId = uploaded.public_id || uploaded.publicId;
      }
    }

    // Parse slots if it's a string
    let slots = body.slots || {};
    if (typeof slots === 'string') {
      try {
        slots = JSON.parse(slots);
      } catch (e) {
        slots = {};
      }
    }

    // Parse instructions if it's a string
    let instructions = body.instructions || [];
    if (typeof instructions === 'string') {
      try {
        instructions = JSON.parse(instructions);
      } catch (e) {
        instructions = instructions.split(',').map(i => i.trim());
      }
    }

    // Parse dates if it's a string
    let dates = body.dates || [];
    if (typeof dates === 'string') {
      try {
        dates = JSON.parse(dates);
      } catch (e) {
        dates = dates.split(',').map(d => d.trim());
      }
    }

    const service = new Service({
      name: body.name,
      about: body.about || "",
      shortDescription: body.shortDescription || "",
      price: body.price !== undefined ? Number(body.price) : 0,
      available: body.available !== undefined ? body.available : true,
      imageUrl,
      imagePublicId,
      dates,
      slots,
      instructions,
      owner: body.owner || "",
    });

    await service.save();

    return res.status(201).json({ success: true, data: service, service });
  } catch (err) {
    console.error("createService error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    if (req.file?.path) {
      const uploaded = await uploadToCloudinary(req.file.path, "services");
      if (uploaded) {
        const previousPublicId = service.imagePublicId;
        service.imageUrl = uploaded.secure_url || uploaded.url || service.imageUrl;
        service.imagePublicId = uploaded.public_id || uploaded.publicId || service.imagePublicId;
        if (previousPublicId && previousPublicId !== service.imagePublicId) {
          deleteFromCloudinary(previousPublicId).catch((e) => console.warn("deleteFromCloudinary warning:", e?.message || e));
        }
      }
    } else if (body.imageUrl) {
      service.imageUrl = body.imageUrl;
    }

    // Update fields
    const updatable = ["name", "about", "shortDescription", "price", "available"];
    updatable.forEach((k) => {
      if (body[k] !== undefined) service[k] = body[k];
    });

    // Handle slots
    if (body.slots) {
      let slots = body.slots;
      if (typeof slots === 'string') {
        try {
          slots = JSON.parse(slots);
        } catch (e) {
          slots = {};
        }
      }
      service.slots = slots;
    }

    // Handle instructions
    if (body.instructions) {
      let instructions = body.instructions;
      if (typeof instructions === 'string') {
        try {
          instructions = JSON.parse(instructions);
        } catch (e) {
          instructions = instructions.split(',').map(i => i.trim());
        }
      }
      service.instructions = instructions;
    }

    // Handle dates
    if (body.dates) {
      let dates = body.dates;
      if (typeof dates === 'string') {
        try {
          dates = JSON.parse(dates);
        } catch (e) {
          dates = dates.split(',').map(d => d.trim());
        }
      }
      service.dates = dates;
    }

    await service.save();

    return res.json({ success: true, data: service, service });
  } catch (err) {
    console.error("updateService error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // Delete image from cloudinary if exists
    if (service.imagePublicId) {
      await deleteFromCloudinary(service.imagePublicId).catch(e => console.warn("Cloudinary delete warning:", e));
    }

    await Service.findByIdAndDelete(id);

    return res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    console.error("deleteService error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
