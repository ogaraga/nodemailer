import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function Content() {
  const [user, setUser] = useState("");
  const { _id, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://nodemailer-ap1.vercel.app/log/content/${_id}/${token}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          (data.token === token && data._id === _id) ||
          (data.username !== "" && data.id !== '')
        ) {
          setUser(data.username);
          setTimeout(() => {
          }, 3000);
        } else {
          navigate("/log/login");
        }
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <>
      <div className={styles.content}>
        <h1>Welcome {user}. This route is protected and you can only send us message if only your session is valid!</h1>
        <hr />
        <span>
          {user?
          <Link to={`/log/message/${token}`}>Send Us Message</Link>: navigate('/log/login')}
        </span>
      </div>
    </>
  );
}

export default Content;
