import React, { useState } from "react";
import { Button, CircularProgress, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData((nextData) => ({ ...nextData, [key]: value }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const register = async (formData) => {
    if (!validateInput(formData)) return;
    try {
      setLoading(true);
      const url = `${config.endpoint}/auth/register`
      const res = await axios.post(url, {
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      history.push("/login", { from: "Register" });
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          { variant: "error" });
      }
    }
  }

  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "warning" });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            helperText="Password must be at least 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            placeholder="Re-enter your password to confirm"
            value={formData.confirmPassword}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => register(formData)}
            >
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login" className="link">Login Here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
}

export default Register;





// p -1

// import { Button, CircularProgress, Stack, TextField} from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useSnackbar} from "notistack";
// import React, { useState } from "react";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import { useHistory, Link } from "react-router-dom";
// import "./Register.css";


// const Register = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [formData, setFormData] = useState({username : "",password:"",confirmPassword:""})
//   const [waiting, setWaiting] = useState(false);
//   const history = useHistory();

//   // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
//   /**
//    * Definition for register handler
//    * - Function to be called when the user clicks on the register button or submits the register form
//    *
//    * @param {{ username: string, password: string, confirmPassword: string }} formData
//    *  Object with values of username, password and confirm password user entered to register
//    *
//    * API endpoint - "POST /auth/register"
//    *
//    * Example for successful response from backend for the API call:
//    * HTTP 201
//    * {
//    *      "success": true,
//    * }
//    *
//    * Example for failed response from backend for the API call:
//    * HTTP 400
//    * {
//    *      "success": false,
//    *      "message": "Username is already taken"
//    * }
//    */
//   const updateUsername = (e) => {
//     setFormData({...formData, username : e.target.value})
//   }

//   const updatePassword = (e) => {
//     setFormData({...formData, password : e.target.value})
//   }

//   const updatePasswordConfirm = (e) => {
//     setFormData({...formData, confirmPassword : e.target.value})
//   }

//   const register = async (formData) => {
//     if(!validateInput(formData)) return;
//     try{
//       setWaiting(true)
//       await axios.post(`${config.endpoint}/auth/register`, {
//         username: formData.username,
//         password : formData.password
//       })

//       setFormData(
//         {username : "",
//         password:"",
//         confirmPassword:""})

//       setWaiting(false)
//       enqueueSnackbar('Registered Successfully',{
//         variant: 'success'
//       })
//       history.push('/login')
//     }
//     catch(e){
//       setWaiting(false)
//       if(e.response && e.response.status === 400){
//         return enqueueSnackbar(e.response.data.message,{
//           variant: 'error'
//         });
//       }
//       else{
//         enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{
//           variant: 'error'
//         })
//       }
//     }
// };


//   // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
//   /**
//    * Validate the input values so that any bad or illegal values are not passed to the backend.
//    *
//    * @param {{ username: string, password: string, confirmPassword: string }} data
//    *  Object with values of username, password and confirm password user entered to register
//    *
//    * @returns {boolean}
//    *    Whether validation has passed or not
//    *
//    * Return false if any validation condition fails, otherwise return true.
//    * (NOTE: The error messages to be shown for each of these cases, are given with them)
//    * -    Check that username field is not an empty value - "Username is a required field"
//    * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
//    * -    Check that password field is not an empty value - "Password is a required field"
//    * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
//    * -    Check that confirmPassword field has the same value as password field - Passwords do not match
//    */
//   const validateInput = (data) => {
//     console.log(data)
//     //check for Username
//     if(!data.username){
//       enqueueSnackbar("Username is required field",{
//         variant: 'warning'
//       })
//       return false
//     }
//     if(data.username.length < 6){
//       enqueueSnackbar("Username must be at least 6 characters",{
//         variant: 'warning'
//       })
//       return false
//     }
//     if(!data.password){
//       enqueueSnackbar("Password is a required field",{
//         variant: 'warning'
//       })
//       return false
//     }
//     if(data.password.length < 6){
//       enqueueSnackbar("Password must be at least 6 characters",{
//         variant: 'warning'
//       })
//       return false
//     }
//     if(data.confirmPassword !== data.password ){
//       enqueueSnackbar("Passwords do not match",{
//         variant: 'warning'
//       })
//       return false
//     }
//     return true
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="space-between"
//       minHeight="100vh"
//     >
//       <Header hasHiddenAuthButtons />
//       <Box className="content">
//         <Stack spacing={2} className="form" >
//           <h2 className="title">Register</h2>
//           <TextField
//             id="username"
//             label="Username"
//             variant="outlined"
//             title="Username"
//             name="username"
//             placeholder="Enter Username"
//             fullWidth
//             onChange = {updateUsername}
//             value = {formData.username}
//           />
//           <TextField
//             id="password"
//             variant="outlined"
//             label="Password"
//             name="password"
//             type="password"
//             helperText="Password must be atleast 6 characters length"
//             fullWidth
//             placeholder="Enter a password with minimum 6 characters"
//             onChange = {updatePassword}
//             value = {formData.password}
//           />
//           <TextField
//             id="confirmPassword"
//             variant="outlined"
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             fullWidth
//             onChange = {updatePasswordConfirm}
//             value = {formData.confirmPassword}
//           />{!waiting ? 
//             <Button className="button" variant="contained" onClick = {async() => await register(formData)}>
//                Register Now
//             </Button> :
//             <div style={{display: 'flex', justifyContent: 'center'}}>
//               <CircularProgress />
//             </div> 
//             }
//           <p className="secondary-action">
//             Already have an account?{" "}
//              <Link className="link" to="/login">Login here</Link>
//           </p>
          
//           {/* <div>{success && <Alert severity="success">Registered successfully</Alert> }</div> */}
//         </Stack>
//       </Box>
//       <Footer />
//     </Box>
//   );
// };
// export default Register;
