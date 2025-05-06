import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import SubmitButton from '../../Components/Report-Incident/SubmitButton';
import CancelButton from '../../Components/Report-Incident/CancelButton';
import styles from './ReportIncidentPage.module.css';

interface FormData {
  title: string;
  description: string;
  location: string;
  category: string;
  photos: FileList | null;
}

const ReportIncidentPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    location: '',
    category: '',
    photos: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('incidentData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //ls
    // localStorage.setItem('incidentData', JSON.stringify(formData));
    // console.log('Submitted data stored in localStorage:', formData);

    try {
      const response = await fetch('http://localhost:3000/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successfully submitted data to backend:', data);
      } else {
        console.error('Failed to submit data to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      title: '',
      description: '',
      location: '',
      category: '',
      photos: null,
    });
    // Clear localStorage
    localStorage.removeItem('incidentData');
  };

  // Using free API just for now to auto-fetch location data
  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            // Extract city and state from the returned address object
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.hamlet ||
              "";
            const state = data.address.state || "";
            const displayLocation =
              city && state ? `${city}, ${state}` : `${latitude}, ${longitude}`;
            setFormData((prevData) => ({
              ...prevData,
              location: displayLocation,
            }));
          } catch (error) {
            console.error('Error during reverse geocoding:', error);
            setFormData((prevData) => ({
              ...prevData,
              location: `Lat: ${latitude}, Lon: ${longitude}`,
            }));
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className={styles.reportIncidentPage}>
      <h1>Report Incident</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter incident title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the incident"
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
          {/* Button to auto-fill location using geolocation */}
          <button type="button" onClick={handleLocationFetch}>
            Use Current Location
          </button>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>
        <div>
          <label htmlFor="photos">Photos:</label>
          <input
            type="file"
            id="photos"
            name="photos"
            onChange={handleChange}
            multiple
          />
        </div>
        <div className={styles.buttonGroup}>
          <SubmitButton>Submit</SubmitButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </div>
      </form>
    </div>
  );
};

export default ReportIncidentPage;
