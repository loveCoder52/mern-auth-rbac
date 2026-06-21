import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const COMPANY_PHONE = "919999999999";
const COMPANY_EMAIL = "sales@yourcompany.com";

function ContactToBuyModal({ product, onClose }) {
    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const modalRef = useRef(null);
    const firstInputRef = useRef(null);

    const whatsappMessage = encodeURIComponent(
        `Hello, I am interested in "${product.title}". Please provide more details.`
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (submitting) return;

        if (!form.customerName.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!form.phone.trim()) {
            toast.error("Please enter your phone number");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post("/api/inquiries", {
                ...form,
                product: product._id,
            });
            toast.success("Inquiry submitted successfully!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to submit inquiry. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Focus the first field on open, close on Escape, and trap focus inside the modal
    useEffect(() => {
        firstInputRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "Tab" && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={handleBackdropClick}
                className="fixed inset-0 z-[9999] bg-black/50 flex justify-center items-center p-4"
            >
                <motion.div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Contact to buy"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-6 rounded-xl w-full max-w-[420px] relative shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-3 right-3 text-xl text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        ✕
                    </button>

                    <h2 className="text-xl font-bold mb-1 text-gray-900">
                        Contact To Buy
                    </h2>
                    <p className="text-gray-500 mb-5 text-sm">
                        {product.title}
                    </p>

                    {/* Quick contact options */}
                    <div className="space-y-3 mb-6">
                        <a
                            href={`https://wa.me/${COMPANY_PHONE}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                            💬 Contact on WhatsApp
                        </a>

                        <a
                            href={`tel:+${COMPANY_PHONE}`}
                            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                            📞 Call Our Team
                        </a>

                        <a
                            href={`mailto:${COMPANY_EMAIL}?subject=Product Inquiry - ${product.title}`}
                            className="flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                            📧 Send Email
                        </a>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <span className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Or request a callback</span>
                        <span className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Inquiry form */}
                    <form onSubmit={submitHandler} className="space-y-3">
                        <input
                            ref={firstInputRef}
                            name="customerName"
                            placeholder="Your Name"
                            value={form.customerName}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />

                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />

                        <textarea
                            name="message"
                            placeholder="Message (optional)"
                            value={form.message}
                            onChange={handleChange}
                            rows={3}
                            className="border border-gray-200 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                        />

                        <motion.button
                            type="submit"
                            disabled={submitting}
                            whileHover={{ scale: submitting ? 1 : 1.02 }}
                            whileTap={{ scale: submitting ? 1 : 0.98 }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                            {submitting ? "Submitting..." : "Request a Callback"}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ContactToBuyModal;