import React, { useState, useEffect } from 'react';

const XState = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className='app-container'>
      <h1>Select Location</h1>
      <div className="dropdown-container">
        <div className="dropdown">
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">--Select Country--</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div className="dropdown">
          <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
            <option value="">--Select State--</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="">--Select City--</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCountry && selectedState && selectedCity && (
        <div>
          <p style={{fontSize:'20px'}}>
            <span style={{ fontWeight: 'bold' }}>You Selected </span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'black' }}>{selectedCity},</span>
            <span style={{ fontWeight:'600',color: 'grey' }}> {selectedState}, {selectedCountry}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default XState;
