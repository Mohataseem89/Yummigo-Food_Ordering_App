import React, { useState } from 'react';
//just UI for a contact components its not fully functional
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        priority: 'medium'
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const contactReasons = [
        { value: 'general', label: 'General Inquiry', icon: '💬' },
        { value: 'order', label: 'Order Issue', icon: '📦' },
        { value: 'delivery', label: 'Delivery Problem', icon: '🚚' },
        { value: 'payment', label: 'Payment Issue', icon: '💳' },
        { value: 'restaurant', label: 'Restaurant Partner', icon: '🏪' },
        { value: 'feedback', label: 'Feedback', icon: '⭐' }
    ];

    const contactMethods = [
        {
            type: 'Customer Support',
            icon: '📞',
            value: '+91 98765 43210',
            description: 'Available 24/7 for all your queries',
            color: 'from-blue-500 to-blue-600'
        },
        {
            type: 'Email Support',
            icon: '✉️',
            value: 'support@yummigo.com',
            description: 'We respond within 2 hours',
            color: 'from-green-500 to-green-600'
        },
        {
            type: 'WhatsApp',
            icon: '💬',
            value: '+91 98765 43211',
            description: 'Quick support via WhatsApp',
            color: 'from-emerald-500 to-emerald-600'
        },
        {
            type: 'Live Chat',
            icon: '💭',
            value: 'Available in App',
            description: 'Instant chat support in our app',
            color: 'from-purple-500 to-purple-600'
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message should be at least 10 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: 'general',
                message: '',
                priority: 'medium'
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch 📞</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Need help? Have feedback? We're here for you 24/7! Reach out to us through any of the channels below.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Quick Contact Methods */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto`}>
                                {method.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">{method.type}</h3>
                            <p className="text-lg font-semibold text-orange-600 mb-2">{method.value}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                                    📝
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                                    <p className="text-gray-600">We'll get back to you within 2 hours</p>
                                </div>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-green-500 text-2xl">✅</div>
                                        <div>
                                            <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                                            <p className="text-green-600 text-sm">We'll get back to you soon. Check your email for confirmation.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-red-500 text-2xl">❌</div>
                                        <div>
                                            <h4 className="font-semibold text-red-800">Something went wrong!</h4>
                                            <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Email Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 ${
                                                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 ${
                                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Phone and Subject Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 ${
                                                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-500'
                                            }`}
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
                                        >
                                            {contactReasons.map((reason) => (
                                                <option key={reason.value} value={reason.value}>
                                                    {reason.icon} {reason.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
                                    <div className="flex space-x-4">
                                        {[
                                            { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
                                            { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                                            { value: 'high', label: 'High', color: 'bg-red-100 text-red-800 border-red-200' }
                                        ].map((priority) => (
                                            <label key={priority.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="priority"
                                                    value={priority.value}
                                                    checked={formData.priority === priority.value}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className={`px-4 py-2 rounded-full border-2 transition-colors duration-300 ${
                                                    formData.priority === priority.value 
                                                        ? priority.color 
                                                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                                                }`}>
                                                    {priority.label}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="Tell us about your query, feedback, or how we can help you..."
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 resize-none ${
                                            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-500'
                                        }`}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                    <p className="mt-1 text-sm text-gray-500">
                                        {formData.message.length}/500 characters
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending Message...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>Send Message</span>
                                            <span>📨</span>
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                <span>❓</span>
                                <span>Quick Help</span>
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { q: "How do I track my order?", a: "Use the tracking link sent to your phone/email" },
                                    { q: "How to cancel an order?", a: "Cancel within 1 minute of placing the order" },
                                    { q: "Refund policy?", a: "Refunds processed within 5-7 business days" },
                                    { q: "Delivery charges?", a: "Free delivery on orders above ₹199" }
                                ].map((faq, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-sm text-gray-800 mb-1">{faq.q}</p>
                                        <p className="text-xs text-gray-600">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center space-x-2">
                                <span>🚨</span>
                                <span>Emergency Support</span>
                            </h3>
                            <p className="text-red-100 mb-4 text-sm">
                                For urgent order issues or food safety concerns
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span>📞</span>
                                    <span className="font-semibold">+91 98765 00000</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>⏰</span>
                                    <span className="text-sm">Available 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-500' },
                                    { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-500' },
                                    { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700' },
                                    { name: 'YouTube', icon: '📹', color: 'from-red-500 to-red-600' }
                                ].map((social, index) => (
                                    <button
                                        key={index}
                                        className={`bg-gradient-to-r ${social.color} text-white p-3 rounded-xl hover:shadow-lg transition-shadow duration-300 text-center`}
                                    >
                                        <div className="text-xl mb-1">{social.icon}</div>
                                        <div className="text-xs font-semibold">{social.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;