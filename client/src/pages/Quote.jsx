import React, { useState } from 'react';
import { motion } from "framer-motion";
import quoteImg from '../img/quote.jpg'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Quote() {

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: '',
        note: '',
    });

    // ---- Reusable animation variants ----
    const fadeLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitting) return;

        if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.service) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setSubmitting(true);

        // Handle form submission logic here (e.g., send data to backend)
        // TODO: replace with a real API call once a quote endpoint exists, e.g.:
        // const { data } = await axios.post(backendUrl + '/api/quote', formData);
        setTimeout(() => {
            toast.success('Quote request submitted! We will be in touch shortly.');
            setSubmitting(false);
            setFormData({ name: '', email: '', mobile: '', service: '', note: '' });
            navigate('/');
        }, 600);
    };

    return (
        <>
            {/* Quote Start */}
            <div id="quote" className="w-full overflow-hidden py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-xl">

                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7 }}
                            className="relative min-h-[320px] lg:min-h-[480px]"
                        >
                            <img
                                src={quoteImg}
                                alt="Get Quote"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7 }}
                            className="py-12 px-6 lg:px-12 bg-white"
                        >
                            <h6 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Free Quote</h6>
                            <h1 className="text-3xl font-bold mb-4 text-gray-900">Get A Free Quote</h1>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                                sed stet lorem sit clita duo justo erat amet
                            </p>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                    className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Your Mobile"
                                    required
                                    className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-gray-700"
                                >
                                    <option value="" disabled>Select A Service</option>
                                    <option value="solar">Solar Panels</option>
                                    <option value="wind">Wind Turbines</option>
                                    <option value="hydro">Hydropower Plants</option>
                                </select>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Special Note"
                                    rows={4}
                                    className="col-span-1 sm:col-span-2 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                                />
                                <div className="col-span-1 sm:col-span-2">
                                    <motion.button
                                        type="submit"
                                        disabled={submitting}
                                        whileHover={{ scale: submitting ? 1 : 1.03 }}
                                        whileTap={{ scale: submitting ? 1 : 0.97 }}
                                        className="bg-blue-600 text-white rounded-full px-8 py-3 font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {submitting ? 'Submitting...' : 'Submit'}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </div>
            {/* Quote End */}
        </>
    );
}

export default Quote;