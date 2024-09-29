import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [color, setColor] = useState("black");

  const change = () => {
    document.body.style.backgroundColor = "white";
    document.getElementById('hone').style.color = 'black';    
    document.getElementById('ps').style.color = 'black';    
    document.getElementById('buts').style.backgroundColor = 'black';    
    document.getElementById('buts').style.color = 'white'
  };

  const handleClick = () => {
    change();
  };

  useEffect(() => {
    setColor(color)
  }, [color]);

  return (
    <>
      <div className={styles.home}>
        <button className={styles.btn} onClick={handleClick} id="buts">
          Change screen color
        </button>
        <h1 id="hone">Welcome to the Home page</h1>
        <p id = 'ps'>
          In here, you can do so many things like recovering your forgot
          password, send emails to us and we respond back to you if only it is a
          valid email. Enjoy your time here!
        </p>
        <hr />
        <span>
          <Link to="/log/register">Sign Up</Link>
        </span>
      </div>
    </>
  );
}

export default Home;
