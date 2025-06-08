import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';


const countryCityMap = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'San Francisco', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal']
};

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '',
    password: '', showPassword: false, phoneCode: '+91', phoneNumber: '',
    country: '', city: '', pan: '', aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    else if (!/^[A-Za-z]{2,}$/.test(formData.firstName)) newErrors.firstName = 'Only letters, min 2 chars';

    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    else if (!/^[A-Za-z]{2,}$/.test(formData.lastName)) newErrors.lastName = 'Only letters, min 2 chars';

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (!/^[a-zA-Z0-9]{4,}$/.test(formData.username)) newErrors.username = 'Alphanumeric, min 4 chars';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(formData.password)) {
      newErrors.password = 'Min 6 chars, 1 number, 1 special char';
    }

    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = '10-digit number only';

    if (!formData.country) newErrors.country = 'Country required';
    if (!formData.city) newErrors.city = 'City required';

    if (!formData.pan.trim()) newErrors.pan = 'PAN required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'Invalid PAN (ABCDE1234F)';

    if (!formData.aadhar.trim()) newErrors.aadhar = 'Aadhar required';
    else if (!/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = '12-digit Aadhar only';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsValid(validate());
    // eslint-disable-next-line
  }, [formData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: formData });
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {})
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Registration Form</h2>

      {['firstName', 'lastName', 'username', 'email'].map(field => (
        <div key={field}>
          <label>{field.replace(/^\w/, c => c.toUpperCase())}:</label><br />
          <input name={field} value={formData[field]} onChange={handleChange} />
          <div style={{ color: 'red' }}>{errors[field]}</div><br />
        </div>
      ))}

      <div>
        <label>Password:</label><br />
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() =>
          setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))
        }>
          {formData.showPassword ? 'Hide' : 'Show'}
        </button>
        <div style={{ color: 'red' }}>{errors.password}</div><br />
      </div>

      <div>
        <label>Phone No.:</label><br />
        <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <div style={{ color: 'red' }}>{errors.phoneNumber}</div><br />
      </div>

      <div>
        <label>Country:</label><br />
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select</option>
          {Object.keys(countryCityMap).map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ color: 'red' }}>{errors.country}</div><br />
      </div>

      <div>
        <label>City:</label><br />
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select</option>
          {formData.country &&
            countryCityMap[formData.country].map(city => <option key={city}>{city}</option>)}
        </select>
        <div style={{ color: 'red' }}>{errors.city}</div><br />
      </div>

      {['pan', 'aadhar'].map(field => (
        <div key={field}>
          <label>{field.toUpperCase()} No.:</label><br />
          <input name={field} value={formData[field]} onChange={handleChange} />
          <div style={{ color: 'red' }}>{errors[field]}</div><br />
        </div>
      ))}

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}
