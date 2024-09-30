import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import styles from "./Login.module.css";
function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [color, setColor] = useState("black");
  const [isLoading, setIsLoading] = useState("Login");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const change = () => {
    document.body.style.backgroundColor = "aliceblue";
    document.getElementById("form").style.backgroundColor = "grey";
    document.getElementById("buts").style.backgroundColor = "aliceblue";
    document.getElementById("buts").style.color = "black";
    document.getElementById("hone").style.color = "black";
    document.getElementById("pdont").style.color = "black";
  };

  const handleClick = () => {
    change();
  };

  useEffect(() => {
    setColor(color);
  }, [color]);
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://nodemailer-ap1.vercel.app/log/login", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username !== "" && data.username !== undefined) {
          setUser(data.username);
          setIsLoading("Wait! Fetching data...");
          setTimeout(() => {
            alert("You are logged in!");
            navigate(`/log/content/${data._id} /${data.token}`);
          }, 3000);
        } else {
          setIsLoading("wait! checking credentials...");
          setUser(user);
          setTimeout(() => {
            setIsLoading(isLoading);
            alert(data);
            navigate("/log/login");
          }, 3000);
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <div className={styles.auth}>
        <p>You need my token to access the treasure below</p>
      </div>

      <div className={styles.login}>
        <h1 id="hone">Sign In here</h1>
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={value.email}
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={value.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button type="submit">{isLoading}</button>
        </form>
        <div className={styles.dont}>
          <p id="pdont">Dont have account?</p>
          <hr />
          <span>
            <Link to="/log/register">Sign Up</Link>
          </span>
          <button className={styles.btn} onClick={handleClick} id="buts">
            Change screen color
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
