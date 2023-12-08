import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import Select from 'react-select';

function HeatMap() {

    const [loading, setLoading] = useState(false);

    const [day, setDay] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const [district, setDistrict] = useState([]);
    const [category, setCategory] = useState([]);
    const [mapHtml, setMapHtml] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const dayOptions = [
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' },
      { value: 'Saturday', label: 'Saturday' },
      { value: 'Sunday', label: 'Sunday' }
    ];

    const monthOptions = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
    ];
    
    const yearOptions = [
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' }
    ];
    
    const districtOptions = [
        { value: 'Arevalo', label: 'Arevalo' },
        { value: 'Mandurriao', label: 'Mandurriao' },
        { value: 'Jaro', label: 'Jaro' },
        { value: 'Molo', label: 'Molo' },
        { value: 'City Proper', label: 'City Proper' },
        { value: 'Lapaz', label: 'Lapaz' }
    ];
    
    const categoryOptions = [
        { value: 'Crimes Against Personal Liberty And Security', label: 'Crimes Against Personal Liberty And Security' },
        { value: 'Crimes Against Persons', label: 'Crimes Against Persons' },
        { value: 'Crimes Against Property', label: 'Crimes Against Property' },
        { value: 'Final Provisions', label: 'Final Provisions' },
        { value: 'Crimes Against Honor', label: 'Crimes Against Honor' },
        { value: 'Crimes Committed By Public Officers', label: 'Crimes Committed By Public Officers' },
        { value: 'Quasi-Offenses', label: 'Quasi-Offenses' },
        { value: 'Crimes Against National Security & The Law Of The Nations', label: 'Crimes Against National Security & The Law Of The Nations' },
        { value: 'Crimes Against Public Order', label: 'Crimes Against Public Order' },
        { value: 'Crimes Against The Civil Status Of Persons', label: 'Crimes Against The Civil Status Of Persons' },
        { value: 'Crimes Against Popular Representation', label: 'Crimes Against Popular Representation' },
        { value: 'Crimes Against Public Interest', label: 'Crimes Against Public Interest' },
        { value: 'Presedential Decree', label: 'Presedential Decree' },
        { value: 'Crimes Against The Fundamental Laws Of The State', label: 'Crimes Against The Fundamental Laws Of The State' },
        { value: 'Crimes Against Chastity', label: 'Crimes Against Chastity' },
        { value: 'Crimes Against Public Morals', label: 'Crimes Against Public Morals' }
    ];

    // State to control visibility
    const [initialContentVisible, setInitialContentVisible] = useState(true);

    const handleButtonClick2 = () => {
      setInitialContentVisible(!initialContentVisible);
    };

    const [isVisible, setIsVisible] = useState(false); // State to control visibility

    const handleButtonClick = () => {
        setIsVisible(!isVisible); // Toggle the visibility
    };


    const [isVisibleMobile, setIsVisibleMobile] = useState(true);

    const handleStartFiltering = () => {
      // Toggle visibility when the button is clicked
      setIsVisibleMobile(!isVisibleMobile);
    };
  

    useEffect(() => {
      const map = L.map('map').setView([10.706512, 122.581742], 12);

      const mapboxToken = 'sk.eyJ1Ijoiam5ibGxkIiwiYSI6ImNsbmg2amx6MzFibDQycnFwdnpiZHd6eGUifQ.zpQQzIAwESP9M_HVwQ02Vw'; // Replace with your Mapbox access token
       
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
      }).addTo(map);
    
      
      // Move zoom control to upper right corner
      map.zoomControl.remove();
  
    
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true); // Set loading to true when submitting
    
        const data = {
            day: day,
            month: month,
            year: year,
            district: district,
            category: category
        };

        console.log(data)
        
        try {
            const response = await axios.post('https://thesis-backend-41ta.onrender.com/heatmap', data);
            console.log(response.data);
            setMapHtml(response.data.html);
            setSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
        } finally{
          setLoading(false); // Set loading to true when submitting

        }
        
    };
  
    return (
        <>
      <div className='position-relative'>
        <div className='w-100 m-0 vh-100'>
          {!submitted && (
            <div id="map" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}></div>
          )}
          <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
        </div>

    {initialContentVisible ? (
        <div className="desc d-lg-flex shadow border rounded d-md-flex py-3 px-3 d-sm-flex d-none flex-column gap-2 col-lg-4 col-md-5 col-sm-6 col-12" style={{  backgroundColor: 'white', position: 'absolute', top: '10px', left: '10px', zIndex: 999, fontSize: '16px'}}>  
            <div className=' text-start'>
            <h4 className=''>
                <b>
                  Crime Pattern Analysis

                </b>
              </h4>
                <p>
                Please use the dropdowns to select your preferences and visualize credible crime data in heatmaps for Iloilo City. This data is sourced from the local police, ensuring reliability and accuracy. Your selections will help generate visual representations of crime patterns, providing valuable insights into the city's safety and security.

                </p>
                <div className='d-flex gap-2'>
                <button className='desc btn btn-primary' style={{fontSize: '16px'}} onClick={handleButtonClick2}>Start filtering</button>
                <button className='desc btn btn-outline-primary' style={{fontSize: '16px'}}>Learn more</button>

                </div>
            </div>
        </div>
    ) : (
      <div className="desc d-lg-flex shadow border rounded d-md-flex py-4 px-3 d-sm-flex d-none flex-column gap-2 col-lg-4 col-md-5 col-sm-6 col-12" style={{  backgroundColor: 'white', position: 'absolute', top: '10px', left: '10px', zIndex: 999, fontSize: '16px'}}>

       <form onSubmit={handleSubmit} className=' text-start d-flex flex-column'>
       <p className='p-0 m-2 text-light-emphasis ' style={{fontWeight: ''}}> FILTER DATA </p>
            <div className=' gap-2 d-flex'>
            <Select
              placeholder="All Days (Default)..."
              className='w-100'
              isMulti
              options={dayOptions}
              onChange={selectedOptions => setDay(selectedOptions.map(option => option.value))}
            />
           </div>

            <div className=' gap-2 d-flex mt-2'>
            <Select
              placeholder="All Months (Default)..."
              className='w-100'
              isMulti
              options={monthOptions}
              onChange={selectedOptions => setMonth(selectedOptions.map(option => option.value))}
            />
           </div>
           
           <div className=' gap-2 d-flex mt-2'>
            <Select
              placeholder="All Years (Default)..."
              className='w-100'
              isMulti
              options={yearOptions}
              onChange={selectedOptions => setYear(selectedOptions.map(option => option.value))}
            />
           </div>


           <div className=' gap-2 d-flex mt-2'>
           <Select
           placeholder="All Districts (Default)..."
            className='w-100'
            isMulti
            options={districtOptions}
            onChange={selectedOptions => setDistrict(selectedOptions.map(option => option.value))}
          />
           </div>


           <div className=' gap-2 d-flex mt-2'>
           <Select
           placeholder="All Categories (Default)..."
            className='w-100'
            isMulti
            options={categoryOptions}
            onChange={selectedOptions => setCategory(selectedOptions.map(option => option.value))}
          />
           </div>


           <div className='d-flex justify-content-end mt-4'>
           <input style={{fontSize: '16px'}} className='btn btn-primary px-3 py-1 desc' type="submit" value="➡️ Apply Filters" />
           </div>
       </form>

     </div>
        )}




{isVisibleMobile && (
        <div className="d-lg-none desc d-md-none py-4 px-4 d-sm-none d-flex flex-column gap-2 col-lg-4 col-md-5 col-sm-6 col-12" style={{ backgroundColor: 'white', position: 'absolute', top: '0', left: '0', zIndex: 9999, fontSize: '16px' }}>
          <div className='text-start'>
            <h4>
              <b>
                Crime Pattern Analysis
              </b>
            </h4>
            <p>
              Please use the dropdowns to select your preferences and visualize credible crime data in heatmaps for Iloilo City. This data is sourced from the local police, ensuring reliability and accuracy. Your selections will help generate visual representations of crime patterns, providing valuable insights into the city's safety and security.
            </p>
            <div className='d-flex gap-2'>
              <button className='btn btn-primary desc' style={{fontSize: '16px'}} onClick={handleStartFiltering}>Start filtering</button>
              <button className='btn btn-outline-primary desc' style={{fontSize: '16px'}}>Learn more</button>
            </div>
          </div>
        </div>
      )}


    <button
        className="bi-stack btn btn-primary d-lg-none d-md-none d-sm-none d-block desc"
        style={{
            borderRadius: '10px',
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 999,
            fontSize: '16px',
        }}
        onClick={handleButtonClick} // Add an onClick handler to toggle visibility
    >
       &nbsp; Heatmap 
    </button>

    {isVisible && ( // Conditionally render the second form based on isVisible state

      <div className="d-lg-none desc d-md-none py-4 px-3 d-sm-none d-flex flex-column gap-2 col-3 col-md-4 col-sm-5 col-12" style={{  backgroundColor: 'white', position: 'absolute', top: '0', left: '0', zIndex: 999, fontSize: '16px'}}>
   <form onSubmit={handleSubmit} className=' text-start d-flex flex-column'>
       <p className='p-0 fw-bold '>MAIN FILTER</p>
            <div className=' gap-2 d-flex'>
            <Select
              placeholder="All Days (Default)..."
              className='w-100'
              isMulti
              options={dayOptions}
              onChange={selectedOptions => setDay(selectedOptions.map(option => option.value))}
            />
           </div>

            <div className=' gap-2 d-flex mt-2'>
            <Select
            placeholder="All Months (Default)..."
                className='w-100'
                isMulti
                options={monthOptions}
                onChange={selectedOptions => setMonth(selectedOptions.map(option => option.value))}
            />
           </div>
           
           <div className=' gap-2 d-flex mt-2'>
           <Select
           placeholder="All Years (Default)..."
                className='w-100'
                isMulti
                options={yearOptions}
                onChange={selectedOptions => setYear(selectedOptions.map(option => option.value))}
            />
           </div>


           <div className=' gap-2 d-flex mt-2'>
           <Select
           placeholder="All Districts (Default)..."
              className='w-100'
              isMulti
              options={districtOptions}
              onChange={selectedOptions => setDistrict(selectedOptions.map(option => option.value))}
          />
           </div>


           <div className=' gap-2 d-flex mt-2'>
           <Select
           placeholder="All Categories (Default)..."
              className='w-100'
              isMulti
              options={categoryOptions}
              onChange={selectedOptions => setCategory(selectedOptions.map(option => option.value))}
          />
           </div>


           <div className='px-3 d-flex justify-content-end mt-2 gap-2'>
           <button className="btn btn-outline-primary  d-flex gap-1" onClick={handleButtonClick}>
   <i className='desc bi-arrow-left m-0'></i> <p className='m-0' style={{fontSize: '16px'}}>  Back </p>
  </button>

           <input style={{fontSize: '16px'}} className='btn btn-primary px-3 py-1 desc' type="submit" value="➡️ Apply Filters" />
           </div>
       </form>
      </div>
    )}

      </div>


{/** LOADING SCHEME AFTER PRESSING APPLY FILTERS */}
{loading && (
  <div className="loading-overlay">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div>
      <p className='mt-2'> Generating heatmap...</p>
    </div>
  </div>
)}

        </>
        
    );
}

export default HeatMap;
