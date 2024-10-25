import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style1.module.css'; // Importing CSS module

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });
  const [showPasswordRules, setShowPasswordRules] = useState(false); // To show password rules
  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If password is being typed, check for validity
    if (name === 'password') {
      setPasswordValid({
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all password rules are satisfied before submitting
    if (passwordValid.hasUppercase && passwordValid.hasLowercase && passwordValid.hasNumber) {
      try {
        const response = await axios.post('https://book-recommendator-backend.onrender.com/signup', formData);
        console.log('Signup successful:', response.data);
        navigate('/login'); // Redirect to login on successful signup
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      setError('Please meet all password requirements.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Hide password rules when clicking outside the password field
  const hidePasswordRules = () => {
    setShowPasswordRules(false);
  };

  return (
    <div className={styles.container}>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={hidePasswordRules}  // Hide rules when clicking here
            required
          />
        </div><br /><br />

        <div className="mb-3">
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            className={`form-control ${styles.formControl}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={hidePasswordRules}  // Hide rules when clicking here
            required
          />
        </div><br /><br />

        <div className="mb-3">
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input
            type="password"
            className={`form-control ${styles.formControl}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => setShowPasswordRules(true)}  // Show rules on focus
            required
          />
        </div><br /><br />

        {/* Display password validation rules */}
        {showPasswordRules && (
          <div className={styles.passwordRules}>
            <p>Password must contain:</p>
            <ul>
              <li style={{ color: passwordValid.hasUppercase ? 'green' : 'red' }}>
                {passwordValid.hasUppercase ? '✔' : '✘'} One uppercase letter
              </li>
              <li style={{ color: passwordValid.hasLowercase ? 'green' : 'red' }}>
                {passwordValid.hasLowercase ? '✔' : '✘'} One lowercase letter
              </li>
              <li style={{ color: passwordValid.hasNumber ? 'green' : 'red' }}>
                {passwordValid.hasNumber ? '✔' : '✘'} One number
              </li>
            </ul>
          </div>
        )}

        {error && <div className={styles.alert}>{error}</div>}

        <div className={styles.dFlex}>
          {/* Disable Register button until password is valid */}
          <button type="submit" className={styles.btnPrimary} disabled={
            !(passwordValid.hasUppercase && passwordValid.hasLowercase && passwordValid.hasNumber)
          }>
            Register
          </button><br /><br />
          <p>Already have an account?</p>
          <button
            type="button"
            className={styles.btnLink}
            onClick={handleLoginRedirect}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
