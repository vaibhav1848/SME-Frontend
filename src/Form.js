import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import LatestData from './LatestData';

function Form() {
  // State for section 1
  const [uen, setUEN] = useState('');
  const [companyName, setCompanyName] = useState('');

  // State for section 2
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [reenterEmail, setReenterEmail] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showLatestData, setShowLatestData] = useState(false);
  const [latestData, setLatestData] = useState(null);




  // Validation for UEN
  const isUENValid = uen.length === 9 && /^[0-9]{8}[A-Za-z]$/.test(uen);

  // Validation for Company Name
  const isCompanyNameValid = companyName.length > 0;

  // Validation for Email and Re-enter Email
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isReenterEmailValid = email === reenterEmail;
  //Validation for Phone
  const isPhoneValid = phone.length===10;

  //Section Validations
  const isSection1Complete = isUENValid&&isCompanyNameValid;
  const isSection2Complete = fullName&&position&&email&&isPhoneValid;

  // File function
  function onSingleFileSelect(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFile(file);
      setIsFileUploaded(true);
    }
  }
  

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  const handleSubmit = async () => {
    const formData = {
      uen,
      companyName,
      fullName,
      position,
      email,
      phone,
    };

    try {
      const response = await axiosInstance.post('/api/company/submit-data', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  // fetch
  const fetchLatestData = async () => {
    try {
      const response = await axiosInstance.get('/api/company/latest-data');
      setLatestData(response.data);
      setShowLatestData(true); // Show the LatestData 
    } catch (error) {
      console.error('Error fetching latest data:', error);
    }
  };

  return (
    <div>
      {/* <h2>Company Information Form</h2> */}
      {/* <span class="MuiStepLabel-label Mui-active mui-style-dirb5g"><div class="MuiBox-root mui-style-jfp89m">Company Information</div></span> */}
      <form>
      <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root mui-style-a5y18n">       
       {/* Section 1 */}
       <span class="MuiStepLabel-label Mui-active mui-style-dirb5g"><div class="MuiBox-root mui-style-jfp89m">Company Information</div></span>

        <div>
          <Stack spacing={10} direction="row" m={2}>
            
            <TextField 
              label="UEN"
              variant="outlined"
              value={uen}
              onChange={(e) => setUEN(e.target.value)}
              required
              error={!isUENValid}
              helperText={!isUENValid ? 'Invalid Company UEN' : ''}
            />

            <TextField
              label="Company Name"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              error={!isCompanyNameValid}
              helperText={!isCompanyNameValid ? 'Company Name is Required' : ''}
            />
            
          </Stack>
        </div>

        {/* Section 2 */}
        <span class="MuiStepLabel-label Mui-active mui-style-dirb5g"><div class="MuiBox-root mui-style-jfp89m">Applicant Information</div></span>

        <div class>
          <Stack spacing={10} direction="row" m={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={!isSection1Complete}
            />
            <TextField
              label="Position"
              variant="outlined"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              disabled={!isSection1Complete}
            />
            </Stack>
            
            <Stack spacing={10} direction={"row"} m={2}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!isEmailValid}
              helperText={!isEmailValid ? 'Invalid email format.' : ''}
              disabled={!isSection1Complete}
            />
            <TextField
              label="Re-enter Email"
              variant="outlined"
              value={reenterEmail}
              onChange={(e) => setReenterEmail(e.target.value)}
              required
              error={!isReenterEmailValid}
              helperText={!isReenterEmailValid ? 'Emails do not match.' : ''}
              disabled={!isSection1Complete}
            />
            </Stack>
            <Stack spacing={10} direction={"row"} m={2}>
            <TextField
              label="Phone"
              type="number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={!isSection1Complete}
            />
          </Stack>
        </div>
        <div>
        <span class="MuiStepLabel-label Mui-active mui-style-dirb5g"><div class="MuiBox-root mui-style-jfp89m">Upload Documents</div></span>

          <Stack container-spacing={5} spacing={5} width={200} height={50} m={2}>
            <TextField
              variant="outlined"
              type="file"
              id="file"
              onClick={onSingleFileSelect}
              disabled={!isSection2Complete}
            />
            </Stack>
            <span class="MuiStepLabel-label Mui-active mui-style-dirb5g"><div class="MuiBox-root mui-style-jfp89m">Terms And Conditions</div></span>

            <Stack>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsChecked}
                    onChange={(e) => {
                      setTermsChecked(e.target.checked);
                    }}
                  />
                }
                label="I agree to the Terms and Conditions"
                disabled={!isFileUploaded}
              />
            </FormControl>   
            </Stack>
{/* Submit button */}
        
        <Button variant="contained" color="primary" disabled={!termsChecked} onClick={handleSubmit}>
          Submit
        </Button>

         {/* Show latest data button */}
         <Button variant="contained" color="primary" onClick={fetchLatestData} disabled={!termsChecked}>
          Show Data 
        </Button>
        
        </div>

        
        {/* Display the latest data */}
        {showLatestData && latestData && (
          <LatestData data={latestData} />
        )}
        </div>
      </form>
    </div>
  );
}

export default Form;
