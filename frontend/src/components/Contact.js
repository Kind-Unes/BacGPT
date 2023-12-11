import React, { useState } from 'react';

const ContactSection = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Event handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic (you can customize this based on your requirements)
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If no errors, proceed with form submission (you can customize this part)
    console.log('Form data submitted:', formData);

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    // Reset form errors
    setFormErrors({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section id='Contact' className="bg-[#FFF3E4] rounded-tl-[100px] rounded-tr-[100px] py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-4xl font-Poppins font-bold text-[#2F327D] mb-8">Contactina</h2>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input p-2 rounded-[10px] w-full ${formErrors.name ? 'border-red-500' : ''}`}
              placeholder="Your Name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input w-full p-2 rounded-[10px] ${formErrors.email ? 'border-red-500' : ''}`}
              placeholder="Your Email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea w-full p-2 rounded-[10px] ${formErrors.message ? 'border-red-500' : ''}`}
              rows="4"
              placeholder="Your Message"
            ></textarea>
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mb-6 flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#2F327D] text-white py-2 px-4 rounded-[10px] hover:bg-black"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;