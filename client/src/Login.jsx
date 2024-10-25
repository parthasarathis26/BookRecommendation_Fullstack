import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style1.module.css'; // Importing CSS module

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Login successful, token:', response.data.token);
      localStorage.setItem('token', response.data.token); // Save token
  
      // Redirect to Main page after successful login
      navigate('/main'); // Adjusted to point to the correct route
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  
  const handleSignupRedirect = () => {
    navigate('/'); // Navigate to Signup page
  };

  return (
    <div className={styles.container}> {/* Using CSS module class */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className={styles.formLabel}>Email </label>
          <input
            type="email"
            className={`form-control ${styles.formControl}`} // Combining with Bootstrap class
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div><br></br>

        <div className="mb-3">
          <label htmlFor="password" className={styles.formLabel}>Password </label>
          <input
            type="password"
            className={`form-control ${styles.formControl}`} // Combining with Bootstrap class
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div><br></br>

        {error && <div className={styles.alert}>{error}</div>} {/* Using CSS module class */}

        <div className={styles.dFlex}>
          <button type="submit" className={styles.btnPrimary}>Login</button><br></br>
          <p>Don't have an account? </p>
          <button
            type="button"
            className={styles.btnLink}
            onClick={handleSignupRedirect}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
