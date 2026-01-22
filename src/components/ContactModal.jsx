import { useState } from "react";
import { X } from "lucide-react";
import tabd from "../assets/tabl.svg";
import tabl from "../assets/tabd.svg";
import toast, { Toaster } from "react-hot-toast";
const trackEvent = (name, params = {}) => {
  if (window.gtag) {
    window.gtag("event", name, params);
  }
};
const initialState = {
  name: "",
  email: "",
  message: "",
};

const ContactModal = ({ open, onClose }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    }

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Enter a valid email address";
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      setForm(initialState);
      onClose();
      toast.success("Enquiry Request Submitted");
      trackEvent("contact_form_submitted", {
        has_name: !!form.name,
        has_email: !!form.email,
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialState);
    setErrors({});
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className=" fixed inset-0 z-9999 flex items-center justify-center  backdrop-blur-sm">
      <div className="w-[80%] h-auto md:h-[88vh] relative rounded-xl bg-[#f9f9f9] dark:bg-[#070d17] shadow-lg  flex ">
        <button
          onClick={handleClose}
          className="absolute -right-4.5 -top-4 bg-gray-200 p-1 shadow-2xl rounded-full cursor-pointer"
        >
          <X />
        </button>

        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center h-full ">
          <div className="md:w-[80%] p-6">
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Get in touch
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Let's chat about how our expert team can help
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 dark:text-white
placeholder-gray-400 dark:placeholder-gray-400 

                      ${errors.name ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-1 focus:ring-blue-600
                      dark:bg-[#0f172a] dark:border-zinc-700`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 dark:text-white
placeholder-gray-400 dark:placeholder-gray-400

                      ${errors.email ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-1 focus:ring-blue-600
                      dark:bg-[#0f172a] dark:border-zinc-700`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter message"
                  className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm resize-none text-gray-900 dark:text-white
placeholder-gray-400 dark:placeholder-gray-400

                      ${errors.message ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-1 focus:ring-blue-600
                      dark:bg-[#0f172a] dark:border-zinc-700`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg gradient text-white py-2 text-sm font-semibold cursor-pointer"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-[50%]  items-center justify-center h-full">
          <img
            src={tabl}
            alt="Contact illustration"
            className=" block dark:hidden"
          />
          <img
            src={tabd}
            alt="Contact illustration"
            className=" hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
