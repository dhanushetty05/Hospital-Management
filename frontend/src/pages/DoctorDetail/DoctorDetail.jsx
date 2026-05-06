import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarCheck,
  MapPin,
  BadgeInfo,
  GraduationCap,
  Award,
  Clock,
  Star,
  Heart,
  Zap,
  Shield,
  Users,
  Phone,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Clerk client hooks
import { useAuth, useUser } from "@clerk/clerk-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getScheduleDates(schedule) {
  if (!schedule) return [];

  const keys =
    typeof schedule === "object" && !Array.isArray(schedule)
      ? Object.keys(schedule)
      : [];

  // Parse keys into Date objects (supporting YYYY-MM-DD and ISO)
  const parsed = keys
    .map((k) => {
      const d = new Date(k);
      if (!isNaN(d)) return { key: k, date: d };

      // fallback: try splitting YYYY-MM-DD
      const parts = k.split("-").map((n) => Number(n));
      if (parts.length >= 3) {
        const [y, m, day] = parts;
        const dd = new Date(y, m - 1, day);
        if (!isNaN(dd)) return { key: k, date: dd };
      }
      return null;
    })
    .filter(Boolean);

  // Normalize compare by date-only (use UTC to avoid timezone time-of-day issues)
  const dateOnlyValue = (d) =>
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

  const today = new Date();
  const todayVal = dateOnlyValue(today);

  const past = parsed
    .filter((p) => dateOnlyValue(p.date) < todayVal)
    .sort(
      (a, b) =>
        // most recent past first (descending)
        dateOnlyValue(b.date) - dateOnlyValue(a.date),
    );

  const future = parsed
    .filter((p) => dateOnlyValue(p.date) >= todayVal)
    .sort(
      (a, b) =>
        // earliest first (ascending)
        dateOnlyValue(a.date) - dateOnlyValue(b.date),
    );

  // Return array of Date objects in desired order
  return [...past, ...future].map((p) => p.date);
}

/**
 * Normalize phone string: remove non-digits and return up to last 10 digits.
 * Returns empty string if no digits.
 */
function normalizePhoneTo10(phone) {
  if (!phone) return "";
  const digits = ("" + phone).replace(/\D/g, "");
  if (!digits) return "";
  // prefer last 10 digits (common when country code present)
  return digits.length <= 10 ? digits : digits.slice(-10);
}

export default function DoctorDetail() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    gender: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clerk hooks
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Prefill the form fields quietly if user is available (no UI markup change)
  useEffect(() => {
    if (!userLoaded) return;
    if (user) {
      const fullName =
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "";
      const rawPhone =
        user.primaryPhone ||
        (user.phoneNumbers && user.phoneNumbers.length > 0
          ? user.phoneNumbers[0]
          : "") ||
        "";
      const phone = normalizePhoneTo10(rawPhone);
      const email =
        (user.emailAddresses && user.emailAddresses[0]?.emailAddress) ||
        user.primaryEmailAddress ||
        "";

      setFormData((prev) => ({
        ...prev,
        name: prev.name || fullName,
        mobile: prev.mobile || phone,
        email: prev.email || email,
      }));
    }
  }, [userLoaded, user]);

  useEffect(() => {
    let mounted = true;
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/doctors/${id}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            body.message || `Failed to fetch (status ${res.status})`,
          );
        }
        const payload = await res.json();
        const doc = payload?.data || null;
        if (mounted) setDoctor(doc);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch doctor");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchDoctor();
    return () => {
      mounted = false;
    };
  }, [id]);

  const next7 = useMemo(() => getScheduleDates(doctor?.schedule), [doctor]);
  const fee = Number(doctor?.fee ?? doctor?.fees ?? 0);

  const slots = useMemo(() => {
    if (!selectedDate || !doctor?.schedule) return [];
    const key = selectedDate.toISOString().split("T")[0];
    return doctor.schedule && doctor.schedule[key] ? doctor.schedule[key] : [];
  }, [selectedDate, doctor]);

  // Mobile input handlers: only digits, max 10
  const handleMobileChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: digits }));
  };

  const handleMobilePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: digits }));
  };

  const handleBooking = async () => {
    if (isSubmitting) return;

    // Validate patient details
    if (
      !formData.name ||
      !formData.age ||
      !formData.mobile ||
      !formData.gender
    ) {
      toast.error("Please fill all patient details!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Mobile must be exactly 10 digits
    const mobileDigits = (formData.mobile || "").replace(/\D/g, "");
    if (mobileDigits.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits.", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!authLoaded || !userLoaded) {
      toast.error("Authentication not ready. Please try again in a moment.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!isSignedIn) {
      toast.error("You must sign in to create an appointment.", {
        position: "top-center",
        autoClose: 2200,
      });
      return;
    }

    setIsSubmitting(true);

    const dateISO = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD

    // prefer fields from doctor object (this is only sent as a hint; backend will use DB)
    const doctorNameValue = doctor?.name || "";
    const specialityValue =
      doctor?.specialization ||
      doctor?.speciality ||
      doctor?.specialityName ||
      "";

    // optional owner from doctor object (backend will prefer doctor.owner)
    const ownerValue = doctor?.owner || undefined;

    const payload = {
      doctorId: doctor._id || doctor.id,
      doctorName: doctorNameValue,
      speciality: specialityValue,
      owner: ownerValue,
      // NEW: send image hints (optional — backend prefers DB but accepts these)
      doctorImageUrl: doctor?.imageUrl || doctor?.image || "",
      doctorImagePublicId:
        doctor?.imagePublicId || doctor?.image?.publicId || "",
      patientName: formData.name,
      mobile: mobileDigits,
      age: formData.age,
      gender: formData.gender,
      date: dateISO,
      time: selectedSlot,
      fee: fee,
      fees: fee,
      paymentMethod: paymentMethod || "Online",
      email: formData.email || undefined,
    };

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to obtain authentication token.");
      }

      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          body?.message || body?.error || `Booking failed (${res.status})`;
        toast.error(message, { position: "top-center" });
        setIsSubmitting(false);
        return;
      }

      // If checkoutUrl is returned -> redirect to Stripe Checkout
      if (body.checkoutUrl) {
        // redirect user to Stripe Checkout
        window.location.href = body.checkoutUrl;
        return;
      }

      // Booking created (Cash or free)
      toast.success("Booking successful", {
        position: "top-center",
        autoClose: 1500,
      });

      // navigate to appointments list (you can change this path)
      setTimeout(() => {
        window.location.href = "/appointments?payment_status=Pending";
      }, 700);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(
        err?.message || "Network error - booking failed (auth or server issue)",
        { position: "top-center" },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: 'linear-gradient(to bottom, #e6f7f5 0%, #f0fdf9 50%, #ffffff 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <div className="text-teal-800 font-semibold">Loading doctor...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: 'linear-gradient(to bottom, #e6f7f5 0%, #f0fdf9 50%, #ffffff 100%)' }}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-200">
            <div className="text-5xl mb-4">⚠️</div>
            <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
            <div className="text-gray-600 mb-6">{error}</div>
            <Link to="/doctors" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold">
              <ArrowLeft size={20} />
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    );

  if (!doctor)
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: 'linear-gradient(to bottom, #e6f7f5 0%, #f0fdf9 50%, #ffffff 100%)' }}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-teal-200">
            <div className="text-6xl mb-4">😷</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor Not Found</h1>
            <Link to="/doctors" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold">
              <ArrowLeft size={20} />
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, #e6f7f5 0%, #f0fdf9 50%, #ffffff 100%)' }}>
      <ToastContainer />
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <Link to="/doctors" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <h1 className="text-3xl font-bold text-teal-800">Doctor Profile</h1>

          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
            <Star className="text-yellow-500 fill-yellow-500" size={18} />
            <span className="font-bold text-gray-900">{doctor.rating}</span>
          </div>
        </div>
      </div>
      <div className={`w-full max-w-7xl mx-auto px-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* profile card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-teal-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 rounded-full blur-2xl opacity-30"></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500 shadow-xl">
                  <img
                    src={doctor.imageUrl || doctor.image || "/placeholder-doctor.jpg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-red-50 rounded-2xl p-3 text-center">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{doctor.success}%</div>
                  <div className="text-xs text-gray-600">Success</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-3 text-center">
                  <Award className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{doctor.experience} Years</div>
                  <div className="text-xs text-gray-600">Experience</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-3 text-center">
                  <Users className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{doctor.patients}</div>
                  <div className="text-xs text-gray-600">Patients</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{doctor.name}</h1>
                <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold">
                  <Zap className="w-4 h-4" />
                  {doctor.specialization || doctor.speciality}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-teal-600 mt-1" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Qualifications</div>
                      <div className="text-sm font-semibold text-gray-900">{doctor.qualifications}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Location</div>
                      <div className="text-sm font-semibold text-gray-900">{doctor.location}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal-600 mt-1" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Consultation Fee</div>
                      <div className="text-lg font-bold text-red-600">₹{fee}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-teal-600 mt-1" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Availability</div>
                      <div className="text-sm font-semibold text-green-600">
                        {doctor.availability === "Available" || doctor.available ? "Available" : "Available Soon"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-2xl p-5 border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeInfo className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-teal-800">About Doctor</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{doctor.about || doctor.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* APPOINTMENT */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100">
          <div className="flex items-center gap-3 mb-8">
            <CalendarCheck className="w-7 h-7 text-teal-600" />
            <h2 className="text-2xl font-bold text-teal-800">Book Your Appointment</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                  <CalendarCheck className="w-5 h-5 text-teal-600" />
                  Select Date
                </h3>

                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-3 min-w-max">
                    {next7.map((date) => {
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center px-5 py-3 rounded-2xl border-2 transition-all min-w-[80px] ${
                            isSelected
                              ? 'bg-teal-500 border-teal-500 text-white shadow-lg'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300'
                          }`}
                        >
                          <div className={`text-xs font-medium mb-1 ${isSelected ? 'text-teal-100' : 'text-gray-500'}`}>
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-2xl font-bold mb-1">{date.getDate()}</div>
                          <div className={`text-xs ${isSelected ? 'text-teal-100' : 'text-gray-500'}`}>
                            {date.toLocaleDateString("en-US", { month: "short" })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Available Time Slots
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {slots.length === 0 && (
                    <p className="col-span-3 text-center text-gray-500 py-4">No time slots for this date.</p>
                  )}

                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${
                        selectedSlot === slot
                          ? 'bg-teal-500 border-teal-500 text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PATIENT FORM */}
              <div className="bg-teal-50 rounded-2xl p-5 border border-teal-200">
                <h3 className="text-lg font-bold text-teal-800 mb-4">Patient Details</h3>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-2.5 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <input
                    type="number"
                    placeholder="Age"
                    className="px-4 py-2.5 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />

                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d{10}"
                    maxLength={10}
                    placeholder="Mobile Number (10 digits)"
                    className="px-4 py-2.5 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    value={formData.mobile}
                    onChange={(e) => handleMobileChange(e.target.value)}
                    onPaste={handleMobilePaste}
                  />

                  <select
                    className="px-4 py-2.5 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm bg-white"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="email"
                    placeholder="Email (optional - for receipts)"
                    className="col-span-2 px-4 py-2.5 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - SUMMARY */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border-2 border-teal-200 sticky top-24">
                <h3 className="text-lg font-bold text-teal-800 mb-4">Booking Summary</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Selected Doctor:</span>
                    <span className="font-semibold text-gray-900">{doctor?.name || "—"}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Doctor Speciality:</span>
                    <span className="font-semibold text-gray-900">{doctor?.specialization || doctor?.speciality || "—"}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Selected Date:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Selected Time:</span>
                    <span className="font-semibold text-gray-900">{selectedSlot || "Not selected"}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t-2 border-teal-200">
                    <span className="text-gray-600 font-medium">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-red-600">₹{fee}</span>
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTOR */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment:</label>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "Cash"
                        ? 'bg-teal-500 border-teal-500 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-teal-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Cash"
                        checked={paymentMethod === "Cash"}
                        onChange={() => setPaymentMethod("Cash")}
                        className="hidden"
                      />
                      Cash
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "Online"
                        ? 'bg-teal-500 border-teal-500 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-teal-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="Online"
                        checked={paymentMethod === "Online"}
                        onChange={() => setPaymentMethod("Online")}
                        className="hidden"
                      />
                      Online
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedSlot || isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all ${
                    !selectedDate || !selectedSlot || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span>{isSubmitting ? "Booking..." : "Confirm Booking"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
