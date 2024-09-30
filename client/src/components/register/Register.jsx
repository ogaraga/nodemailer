import { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";

//component

function Register() {
  //calling/using imported usestate to manage resources here

  const [value, setValue] = useState({
    username: "",
    email: "",
    yourGender: "",
    address: "",
    password: "",
    password2: "",
  });
  const [color, setColor] = useState("black");
  const [isLoading, setIsLoading] = useState("Sign Up");

  //usenavigation for routing
  const navigate = useNavigate();

  //function to change backgroundcolor
  const change = () => {
    document.body.style.backgroundColor = "aliceblue";
    document.getElementById("form").style.backgroundColor = "grey";
    document.getElementById("ps").style.color = "black";
    document.getElementById("buts").style.backgroundColor = "aliceblue";
    document.getElementById("buts").style.color = "black";
  };

  //click and to see it work
  const handleClick = () => {
    change();
  };

  //helps us to manage rendering of color state
  useEffect(() => {
    setColor(color);
  }, [color]);

  //changing or controlling how inputs change dynamically
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://nodemailer-ap1.vercel.app/log/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: value.username,
        email: value.email,
        yourGender: value.yourGender,
        address: value.address,
        password: value.password,
        password2: value.password2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "User created successfully!") {
          setIsLoading("Wait! Storing details...");
          setTimeout(() => {
            alert("Details captured and saved!");          
            navigate("/log/login");
          }, 3000);
        } else {
          setIsLoading("Wait, checking credentials...");
          setTimeout(() => {
            setIsLoading(isLoading);
            alert(data);
            navigate("/log/register");
          }, 3000);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit} id="form">
        <h1>Sign up here</h1>
        <label htmlFor="username" id="label">
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={value.username}
          placeholder="Enter your full name"
          onChange={handleChange}
        />

        <label htmlFor="email" id="label">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={value.email}
          placeholder="Enter your email account"
          onChange={handleChange}
        />

        <label htmlFor="gender" id="label">
          Gender:
        </label>
        <input
          type="text"
          name="yourGender"
          value={value.yourGender}
          placeholder="Enter your your sex category"
          onChange={handleChange}
        />

        <label htmlFor="address" id="label">
          Address:
        </label>
        <input
          type="text"
          value={value.address}
          name="address"
          placeholder="Enter your address"
          onChange={handleChange}
        />
        <label htmlFor="password" id="label">
          Password:
        </label>
        <input
          type="password"
          value={value.password}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <label htmlFor="password2" id="label">
          ConfirmPass:
        </label>
        <input
          type="password"
          name="password2"
          value={value.password2}
          placeholder="Enter your confirm password"
          onChange={handleChange}
        />
        <button type="submit">{isLoading}</button>
      </form>
      <div className={styles.already}>
        <p id="ps">Already have account?</p>
        <hr />
        <span>
          <Link to="/log/login">Sign In</Link>
        </span>
        <button className={styles.btn} onClick={handleClick} id="buts">
          Change screen color
        </button>
      </div>
    </div>
  );
}

export default Register;
