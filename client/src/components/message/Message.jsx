import {useState } from "react";
import styles from "./Message.module.css";
import { useNavigate, useParams } from "react-router-dom";
function Message() {
  const [value, setValue] = useState({
    username: "",
    email: "",
    yourGender: "",
    address: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState("Send");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://nodemailer-send-api.vercel.app/log/message/${token}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: value.username,
        email:value.email,
        yourGender:value.yourGender,
        address:value.address,
        subject:value.subject,
        message:value.message
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.token === token && data.id !== '') || ( data.id && data.token)) {
          setIsLoading("Wait! Sending data...");
          setTimeout(() => {
            alert("Success: Your message was sent!");
            navigate("/log/login");
          }, 3000);
        } else {
          setIsLoading("Wait! checking credentials...");
          setTimeout(() => {
            alert(data);
            navigate(`/log/log/${token}`);
            setIsLoading(isLoading);
          }, 3000);
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <div className={styles.auth}>
        <p>Tokenized page with tokenized form</p>
      </div>
      <div className={styles.message}>
        <h1>Send us a message</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={value.username}
            placeholder="Enter your full name"
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={value.email}
            placeholder="Enter your email account"
            onChange={handleChange}
          />

          <label htmlFor="gender">gender:</label>
          <input
            type="text"
            name="yourGender"
            value={value.yourGender}
            placeholder="Enter your your sex category"
            onChange={handleChange}
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={value.address}
            name="address"
            placeholder="Enter your address"
            onChange={handleChange}
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            value={value.subject}
            name="subject"
            placeholder="Enter your subject"
            onChange={handleChange}
          />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            value={value.message}
            cols="21"
            rows="5"
            placeholder="Write down your message here..."
            onChange={handleChange}
          ></textarea>
          <button type="submit">{isLoading}</button>
        </form>
      </div>
    </>
  );
}

export default Message;
