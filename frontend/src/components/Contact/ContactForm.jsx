import React, { useState } from 'react';


function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);
        alert("Feedback Sent"); 
        // Optionally, you can reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        console.error('Failed to send data to the server.');
      }
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };
  

  return (
    <div className='bg-image'>
        <div className="Contact-container">
      <h1>Contact Us</h1> 
      <form onSubmit={handleSubmit}>
        <div className="contactForm-group">
          <label htmlFor="name">Name:</label>
          <input
            placeholder='John Doe'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contactForm-group">
          <label htmlFor="email">Email:</label>
          <input
            placeholder='johnDoe@example.com'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contactForm-group">
          <label htmlFor="subject">Subject:</label>
          <input
            placeholder='eg: Inquiry, Feedback, etc.'
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contactForm-group">
          <label htmlFor="message">Message:</label>
          <textarea
            placeholder='Discription of your issue or feedback'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default ContactForm;