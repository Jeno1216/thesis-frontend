import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Function to get item and check its expiry
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
      return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
  }
  return item.value;
}

function Dashboard() {
  
  const navigate = useNavigate()
  const key = 'officer_name';
  const officer_name = getWithExpiry(key);
  console.log(officer_name)

  useEffect(() => {
    const key = 'token';
    const token = getWithExpiry(key);
    console.log(token)

    if (token === null){
    toast.error('Please Login First.', {
      position: toast.POSITION.BOTTOM_CENTER // Change position here
    });  
    navigate('/login');
  }

  }, [])


  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [alphabetical, setAlphabetical] = useState([]);
  const [pageAlphabetical, setPageAlphabetical] = useState(0);

  const [selectedOption, setSelectedOption] = useState('Default');
  const page_size = 100;

  const fetchData = () => {
    axios.get(`http://localhost:8000/data/?page=${page}&page_size=${page_size}`)
      .then(response => {
        setData(oldData => [...oldData, ...response.data.data]);
        setPage(oldPage => oldPage + 1);
      })
      .catch(error => console.error(error));
  };

  const fetchAlphabetical = () => {
    axios.get(`http://localhost:8000/alphabetical/?page=${pageAlphabetical}&page_size=${page_size}`)
    .then(response => {
      setAlphabetical(oldData => [...oldData, ...response.data.alphabetical]);
      setPageAlphabetical(oldPage => oldPage + 1);
    })
    .catch(error => console.error(error));
};

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Recent') {
      fetchRecent();
    } else if (event.target.value === 'Alphabetical') {
      fetchAlphabetical();
    } else {
      fetchData();
    }
  };
  

  useEffect(fetchData, []);

  const [isVisible, setIsVisible] = useState(false);

  const [selectedAction, setSelectedAction] = useState('Add');

  const handleActionAdd = () => {
    setSelectedAction('Add');
  };

  const handleActionEdit  = () => {
    setSelectedAction('Edit');
  };
  
  const handleActionDelete  = () => {
    setSelectedAction('Delete');
  };
  
  const [district, setDistrict] = useState('Lapaz'); // default value is Lapaz
  const [barangay, setBarangay] = useState('');
  const [dateReported, setDateReported] = useState('');
  const [timeReported, setTimeReported] = useState('');
  const [dateCommitted, setDateCommitted] = useState('');
  const [timeCommitted, setTimeCommitted] = useState('');
  const [offense, setOffense] = useState('');
  const [category, setCategory] = useState('Crimes Committed By Public Officers');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weight, setWeight] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [time, setTime] = useState('');
  const [lightCondition, setLightCondition] = useState('Day');
  const [day, setDay] = useState('Monday');
  const [officer, setOfficer] = useState(officer_name);

  const [crimeID, setCrimeID] = useState();

  // ADD CRIME DATA
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(officer)
    const data = { district: district, barangay: barangay, dateReported: dateReported, timeReported: timeReported, dateCommitted: dateCommitted,
    timeCommitted: timeCommitted, offense: offense , category: category, latitude: latitude, longitude: longitude, weight: weight, 
    year: year, month: month, time:time, lightCondition: lightCondition, day: day, officer: officer };

    const response = await axios.post('http://localhost:8000/add', data);

    if (response.data.result == "Crime Data Added."){
      toast.success('Crime Data Added.', {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }
    else {
      toast.error('Failed Adding Crime Data.', {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }


  };
  
  // DELETE CRIME DATA
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    console.log(crimeID)
    const data = { crimeID: crimeID };

    const response = await axios.post('http://localhost:8000/delete', data);

    if (response.data.result == "Crime Data Deleted."){
      toast.success(`Crime data with ID ${crimeID} successfully deleted.`, {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }
    else if (response.data.result == `Crime data with the specified ID does not exist.`){
      toast.error(`Crime data with ID ${crimeID} does not exist.`, {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }
    else {
      toast.error('Failed Deleting Crime Data.', {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }
  };

    // EDIT CRIME DATA
    const handleSubmit3 = async (event) => {
      event.preventDefault();
      console.log(crimeID, district, barangay, dateReported, timeReported, dateCommitted, timeCommitted, offense, category, latitude, longitude,
      weight, year, month, time, lightCondition, day, officer)
     
      const data = { crimeID: crimeID, district: district, barangay: barangay, dateReported: dateReported, timeReported: timeReported, dateCommitted: dateCommitted,
      timeCommitted: timeCommitted, offense: offense , category: category, latitude: latitude, longitude: longitude, weight: weight, 
      year: year, month: month, time:time, lightCondition: lightCondition, day: day, officer: officer };
    
      const response = await axios.post('http://localhost:8000/edit', data);
        console.log('gago');
      if (response.data.result == "Crime Data Updated."){
        toast.success(`Crime data with ID ${crimeID} successfully updated.`, {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
      }
      else if (response.data.result == `Crime data with the specified ID does not exist.`){
        toast.error(`Crime data with ID ${crimeID} does not exist.`, {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
      }
      else {
        toast.error('Failed Updating Crime Data.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
      }
    };

  const [isDashboardVisible, setIsDashboardVisible] = useState(true);


  return (
    <>
    <div style={{backgroundColor: '#fafafa'}}>
      <div className='d-flex col-12'>
        <div className='col-lg-2 border d-flex flex-column justify-content-between' style={{height: '100vh', backgroundColor: 'white'}}>
        
        <div>

          <div className='p-3 '>
            <img src="logo.png" alt="" style={{width: '150px'}} />
          </div>

          <div className=' p-3'>
            <div className='p-2'>
            {isDashboardVisible &&
              <button onClick={() => setIsDashboardVisible(true)} className=' w-100 rounded py-2 px-3 text-light text-start btn btn-primary' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
              <i className='bi-window fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Dashboard
              </button>
            }

            {!isDashboardVisible &&
              <button onClick={() => setIsDashboardVisible(true)} className=' w-100 rounded py-2 px-3 text-dark text-start btn ' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
              <i className='bi-window fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Dashboard
              </button>
            }
            </div>
            <div className='p-2'>
            {!isDashboardVisible &&
              <button onClick={() => setIsDashboardVisible(false)} className='w-100 rounded py-2 px-3 text-light text-start btn btn-primary' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
                <i className='bi-graph-up fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Insight
              </button>
            }
            {isDashboardVisible &&
              <button onClick={() => setIsDashboardVisible(false)} className='w-100 rounded py-2 px-3 text-dark text-start btn' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
                <i className='bi-graph-up fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Insight
              </button>
            }

            </div>

            <div className='p-2'>
            <button className='w-100 rounded py-2 px-3 text-light-emphasis text-start' style={{border: 'none', background: 'transparent', fontWeight: '300', fontSize: '14px'}}> 
              <i className='bi-gear fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Settings
            </button>
            </div>


          </div>
          </div>

          <div>
          <div className='p-2 border-top'>
            <button className='w-100 rounded py-2 px-3 text-light-emphasis text-start' style={{border: 'none', background: 'transparent', fontWeight: '300', fontSize: '14px'}}> 
              <i className='bi-door-closed fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Sign out
            </button>
            </div>

            <div className='p-2'>
            <button className='w-100 rounded py-2 px-3 text-light-emphasis text-start' style={{border: 'none', background: 'transparent', fontWeight: '300', fontSize: '14px'}}> 
              <i className='bi-question fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> Help
            </button>
            </div>

          </div>


        </div>

        <div className='col-lg-10 vh-100'>

          <div className='d-flex  align-items-center' style={{height: '110px', backgroundColor: 'white'}}>

            <div className='p-3 d-flex justify-content-between align-items-center w-100'>
              
              <div className=''>
                  <button className='text-start px-3 rounded border py-2 text-light-emphasis' style={{width: '500px', background: 'none', fontSize: '14px', fontWeight: '400'}}> <i className='bi-search'> &nbsp;</i> Search here...</button>
              </div>

              <div className='d-flex justify-content-center align-items-center'>

              <div className='p-2'>
                  <i className='bi-bell fw-bold' style={{fontWeight: '500'}}> &nbsp; </i> 
              </div>

              <div className='p-2'>
                
            <button onClick={() => setIsVisible(!isVisible)}
 className='rounded py-2 px-3 text-light text-start btn btn-primary' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
          + Update database
            </button>

              </div>

              </div>
            
            </div>

          </div>

          {isDashboardVisible && 
          <>
          {/** DashBoard */}
          <div className=''>
          <div className='d-flex  align-items-center'>
            
          <div className='p-3 d-flex justify-content-between align-items-center w-100'>

            <div style={{fontSize: '20px', fontWeight: '600'}}>
              Crime Database
            </div>
            
            <div>
              <select value={selectedOption} onChange={handleChange} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}>
                <option value="Default" className='border rounded' style={{fontWeight: '500px', fontSize: '14px'}}>Default</option>
                <option value="Alphabetical" className='border rounded' style={{fontWeight: '500px', fontSize: '14px'}}>Alphabetical</option>
              </select>
            </div>

          </div>

          </div>

          
          <div className='d-flex  align-items-center mx-3 rounded' style={{backgroundColor: 'white'}}>
            
          <div className='p-3' style={{width: '100%', overflow: 'auto', height: '450px'}}>
            <table>
                <tr>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>DISTRICT</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>BARANGAY</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>DATE REPORTED</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>TIME REPORTED</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>DATE COMMITTED</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>TIME COMMITTED</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>OFFENSES</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>CATEGORY</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>LATITUDE</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>LONGITUDE</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>WEIGHTS</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>YEAR</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>MONTH</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>TIME</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>LIGHT CONDITION</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>DAY</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>DATE TIME ADDED</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>Officer</th>
                  <th className='border p-2' style={{fontSize: '14px', fontWeight: '500'}}>Crime ID</th>

                  
                </tr>
                {selectedOption === 'Alphabetical' ? (
                  <>
                    {alphabetical.map((row, index) => (
                      <tr key={index}>
                        {row.map((item, i) => <td key={i} className='border cell'>{item}</td>)}
                      </tr>
                    ))}
                <button onClick={fetchAlphabetical} className='mt-4 rounded py-2 px-3 text-light text-start btn btn-primary' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
                  Load more...
                  </button>
                  </>
                ) : (
                  <>
                    {data.map((row, index) => (
                      <tr key={index}>
                        {row.map((item, i) => <td key={i} className='border cell'>{item}</td>)}
                      </tr>
                    ))}
                  <button onClick={fetchData} className='mt-4 rounded py-2 px-3 text-light text-start btn btn-primary' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
                  Load more...
                  </button>
                  </>
                )}
            </table>
          </div>
          </div>
          </div>
          </>
          }  

        {!isDashboardVisible && 
        <>
        <iframe 
        title="Report Section" 
        style={{ width: '100%', height: '100%'}} 
        src="https://app.powerbi.com/view?r=eyJrIjoiMmM4OTkyNmItNzA5Ni00YWVmLThhMDAtZTVmNDY0NWE2MDgxIiwidCI6IjBjYzZlMWZjLWQ4NDgtNDFkZi05NDMzLTY4MzE3NGM5MmIzMSIsImMiOjEwfQ%3D%3D&embedImagePlaceholder=true" 
        frameborder="0" 
        allowFullScreen="true"
      />

        </>
        }



        </div>

      </div>
    </div>

    {isVisible && 
    <div className='border d-flex justify-content-center align-items-center' style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      height: '100%',
      width: '100%',
      background: 'none'
    }}> 
      <div className='border container rounded shadow p-5 bg-light'>

        <div className='d-flex justify-content-between align-items-center'>
        <p className='' style={{fontSize: '20px', fontWeight: '600'}}> Update Database</p>    
        <button className='border bg-light rounded px-2 py-1' onClick={() => setIsVisible(!isVisible)} style={{fontSize: '14px', fontWeight: '400'}}> Close</button>    

        </div>

        <div className='d-flex gap-2'>

        <button onClick={handleActionAdd} className='rounded py-2 px-3 text-light text-start btn btn-success' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
          + Add crime data
        </button>
        <button onClick={handleActionEdit} className='rounded py-2 px-3 text-light text-start btn btn-warning' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
          ~ Edit crime data
        </button>

        <button onClick={handleActionDelete} className='rounded py-2 px-3 text-light text-start btn btn-danger' style={{border: 'none', fontWeight: '300', fontSize: '14px'}}> 
          - Delete crime data
        </button>

        </div>

        {/** Add Crime Data */}
        {selectedAction === 'Add' ? (
          <>
        <div className='col-12 mt-4  m-0 p-0'>
          <div className='d-flex px-2'>
            <p className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Add Crime Data</p> 
          </div>
          <form onSubmit={handleSubmit} className='col-12 row  m-0 p-0 d-flex'>
            <div className='col-6 d-flex flex-column  p-2 gap-2'>
              <select required value={district} onChange={e => setDistrict(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}>
                <option value="Lapaz">Lapaz</option>
                <option value="Molo">Molo</option>
                <option value="Arevalo">Arevalo</option>
                <option value="Jaro">Jaro</option>
                <option value="City Proper">City Proper</option>
                <option value="Mandurriao">Mandurriao</option>
              </select>
              <input required type="text" value={barangay} placeholder='Barangay' onChange={e => setBarangay(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}/>
              <div className='d-flex gap-2'>
              <label htmlFor="dateReported" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Date Reported: </label>
              <input required type="date" value={dateReported} name='dateReported' onChange={e => setDateReported(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="timeReported" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time Reported: </label>
              <input required type="time" value={timeReported} name='timeReported' className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setTimeReported(e.target.value)}  />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="dateCommitted" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Date Committed: </label>
              <input required type="date" value={dateCommitted} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} name='dateCommitted' onChange={e => setDateCommitted(e.target.value)}  />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="timeCommitted" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time Committed: </label>
              <input required type="datetime-local" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={timeCommitted} name='timeCommitted' onChange={e => setTimeCommitted(e.target.value)}  />
              </div>

              <input required type="text" value={offense} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} placeholder='Offense' onChange={e => setOffense(e.target.value)}  />
              <select required value={category} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setCategory(e.target.value)}>
              <option selected value="Crimes Committed By Public Officers">Crimes Committed By Public Officers</option>
              <option value="Crimes Against Public Morals">Crimes Against Public Morals</option>
              <option value="Quasi-Offenses">Quasi-Offenses</option>
              <option value="Crimes Against Honor">Crimes Against Honor</option>
              <option value="Crimes Against Personal Liberty And Security">Crimes Against Personal Liberty And Security</option>
              <option value="Crimes Against The Fundamental Laws Of The State">Crimes Against The Fundamental Laws Of The State</option>
              <option value="Crimes Against Public Interest">Crimes Against Public Interest</option>
              <option value="Final Provisions">Final Provisions</option>
              <option value="Batas Pambansa">Batas Pambansa</option>
              <option value="Crimes Against National Security & The Law Of The Nations">Crimes Against National Security & The Law Of The Nations</option>
              <option value="Crimes Against Persons">Crimes Against Persons</option>
              <option value="Crimes Against The Civil Status Of Persons">Crimes Against The Civil Status Of Persons</option>
              <option value="Presedential Decree">Presedential Decree</option>
              <option value="Crimes Against Public Order">Crimes Against Public Order</option>
              <option value="Republic Act">Republic Act</option>
              <option value="Crimes Against Popular Representation">Crimes Against Popular Representation</option>
              <option value="Crimes Against Property">Crimes Against Property</option>
              <option value="Crimes Against Chastity">Crimes Against Chastity</option>
              </select>
              <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={latitude} placeholder='Latitude' onChange={e => setLatitude(e.target.value)}  />
              <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={longitude} placeholder='Longitude' onChange={e => setLongitude(e.target.value)}  />

            </div>

            <div className='col-6 d-flex flex-column  p-2 gap-2'>
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={weight} placeholder='Weight' onChange={e => setWeight(e.target.value)}  />
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={year} placeholder='Year' onChange={e => setYear(e.target.value)}  />
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={month} placeholder='Month' onChange={e => setMonth(e.target.value)}  />
            <div className='d-flex gap-2'>
            <label htmlFor="time" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time: </label>
            <input required type="datetime-local" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={time} name='time' onChange={e => setTime(e.target.value)}  />
            </div>

            <select required value={lightCondition} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setLightCondition(e.target.value)}>
              <option selected value="Day" >Day</option>
              <option value="Night">Night</option>
            </select>

            <select required value={day} onChange={e => setDay(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            
            <div>
            <input required type="submit" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value="Submit" />
            </div>

            </div>

          </form>
        </div>
        </>
        ) : null
        }

          {/** Edit Crime Data */}
          {selectedAction === 'Edit' ? (
        <>
        <div className='col-12 mt-4  m-0 p-0'>
        <div className='d-flex px-2'>
            <p className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Modify Crime Data</p> 
          </div>
          <form onSubmit={handleSubmit3} className='col-12 row  m-0 p-0 d-flex'>
            <div className='col-6 d-flex flex-column  p-2 gap-2'>
            <input required type="text" value={crimeID} onChange={e => setCrimeID(e.target.value)} placeholder='Crime ID' className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} />
              <select required value={district} onChange={e => setDistrict(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}>
                <option value="Lapaz">Lapaz</option>
                <option value="Molo">Molo</option>
                <option value="Arevalo">Arevalo</option>
                <option value="Jaro">Jaro</option>
                <option value="City Proper">City Proper</option>
                <option value="Mandurriao">Mandurriao</option>
              </select>
              <input required type="text" value={barangay} placeholder='Barangay' onChange={e => setBarangay(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}/>
              <div className='d-flex gap-2'>
              <label htmlFor="dateReported" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Date Reported: </label>
              <input required type="date" value={dateReported} name='dateReported' onChange={e => setDateReported(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="timeReported" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time Reported: </label>
              <input required type="time" value={timeReported} name='timeReported' className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setTimeReported(e.target.value)}  />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="dateCommitted" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Date Committed: </label>
              <input required type="date" value={dateCommitted} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} name='dateCommitted' onChange={e => setDateCommitted(e.target.value)}  />
              </div>
              <div className='d-flex gap-2'>
              <label htmlFor="timeCommitted" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time Committed: </label>
              <input required type="datetime-local" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={timeCommitted} name='timeCommitted' onChange={e => setTimeCommitted(e.target.value)}  />
              </div>

              <input required type="text" value={offense} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} placeholder='Offense' onChange={e => setOffense(e.target.value)}  />
              <select required value={category} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setCategory(e.target.value)}>
              <option selected value="Crimes Committed By Public Officers">Crimes Committed By Public Officers</option>
              <option value="Crimes Against Public Morals">Crimes Against Public Morals</option>
              <option value="Quasi-Offenses">Quasi-Offenses</option>
              <option value="Crimes Against Honor">Crimes Against Honor</option>
              <option value="Crimes Against Personal Liberty And Security">Crimes Against Personal Liberty And Security</option>
              <option value="Crimes Against The Fundamental Laws Of The State">Crimes Against The Fundamental Laws Of The State</option>
              <option value="Crimes Against Public Interest">Crimes Against Public Interest</option>
              <option value="Final Provisions">Final Provisions</option>
              <option value="Batas Pambansa">Batas Pambansa</option>
              <option value="Crimes Against National Security & The Law Of The Nations">Crimes Against National Security & The Law Of The Nations</option>
              <option value="Crimes Against Persons">Crimes Against Persons</option>
              <option value="Crimes Against The Civil Status Of Persons">Crimes Against The Civil Status Of Persons</option>
              <option value="Presedential Decree">Presedential Decree</option>
              <option value="Crimes Against Public Order">Crimes Against Public Order</option>
              <option value="Republic Act">Republic Act</option>
              <option value="Crimes Against Popular Representation">Crimes Against Popular Representation</option>
              <option value="Crimes Against Property">Crimes Against Property</option>
              <option value="Crimes Against Chastity">Crimes Against Chastity</option>
              </select>
              <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={latitude} placeholder='Latitude' onChange={e => setLatitude(e.target.value)}  />
              <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={longitude} placeholder='Longitude' onChange={e => setLongitude(e.target.value)}  />

            </div>

            <div className='col-6 d-flex flex-column  p-2 gap-2'>
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={weight} placeholder='Weight' onChange={e => setWeight(e.target.value)}  />
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={year} placeholder='Year' onChange={e => setYear(e.target.value)}  />
            <input required type="text" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={month} placeholder='Month' onChange={e => setMonth(e.target.value)}  />
            <div className='d-flex gap-2'>
            <label htmlFor="time" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Time: </label>
            <input required type="datetime-local" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value={time} name='time' onChange={e => setTime(e.target.value)}  />
            </div>

            <select required value={lightCondition} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} onChange={e => setLightCondition(e.target.value)}>
              <option selected value="Day" >Day</option>
              <option value="Night">Night</option>
            </select>

            <select required value={day} onChange={e => setDay(e.target.value)} className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            
            <div>
            <input required type="submit" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value="Submit" />
            </div>

            </div>

          </form>

         </div> 
        </>
        ) : null
        }

        {/** Delete Crime Data */}
        {selectedAction === 'Delete' ? (
        <>
        <div className='col-12 mt-4  m-0 p-0'>
        <div className='d-flex px-2'>
            <p className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}}> Delete Crime Data</p> 
          </div>
          <form onSubmit={handleSubmit2} className='col-12 row  m-0 p-0 d-flex'>
            <div className='col-6 d-flex flex-column  p-2 gap-2'>
              <input required type="text" value={crimeID} onChange={e => setCrimeID(e.target.value)} placeholder='Crime ID' className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} />
            <div>
            <input required type="submit" className='border rounded px-3 py-1' style={{fontWeight: '500px', fontSize: '14px'}} value="Submit" />
            </div>

            </div>
          </form>
         </div> 
        </>
        ) : null
        }


      </div>
    </div>
    }

    </>
  )
}


export default Dashboard