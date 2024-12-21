// import React, { useState } from "react";
// import Image from "../assets/logo2.png";
// import Logo from "../assets/img4.jpg";
// import { Link } from "react-router-dom";
// import './Signup.css';

// const ForgotPassword = () => {
//   const [emailSent, setEmailSent] = useState(false);

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     const email = document.querySelector("input[name='email']").value;

//     const response = await fetch("http://127.0.0.1:5000/forgot", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     });

//     const result = await response.json();
//     setEmailSent(result.success);
//     alert(result.message);
//   };

//   return (
//     <div className="login-main">
//       <div className="login-left">
//         <img src={Image} alt="" />
//       </div>
//       <div className="login-right">
//         <div className="login-right-container">
//           <div className="login-logo">
//             <img src={Logo} alt="" />
//           </div>
//           <div className="login-center">
//             <h2>Forgot Your Password?</h2>
//             <p>Please enter your email address</p>
//             <form>
//               <input type="email" name="email" placeholder="Email" required />

//               <div className="login-center-buttons">
//                 <button type="button" onClick={handleForgotPassword}>Send Reset Link</button>
//               </div>

//               {emailSent && <p className="success-message">Email sent successfully!</p>}
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Remember your password? <a href="#">Log In</a>
//           </p>
//           <p className="Backref">
//             <Link to="/">Back to Home</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default forget;