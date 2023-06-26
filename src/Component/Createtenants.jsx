import axios from "axios";
import React, { useState } from "react";
import style from "./home.module.css";

const Createtenants = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [roomno, setRoomno] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    // Check if any field is empty
    if (!name || !phno || !roomno || !rent || !deposit) {
      alert("Please fill in all the fields.");
      return; // Stop execution if any field is empty
    }

    const payload = { name, phno, roomno, rent, deposit, due: rent - deposit };
    axios
      .post("http://localhost:3000/name", payload)
      .then(() => {
        console.log("Data has been posted");
        setName("");
        setPhno("");
        setRoomno("");
        setRent("");
        setDeposit("");
        setDetails(`The details of ${name} have been saved`);

        // Clear the message after 2 seconds
        setTimeout(() => {
          setDetails("");
        }, 2000);
      })
      .catch(() => {
        console.log("Data has not been posted");
      });
  };

  return (
    <div id={style.myform}>
      <form>
        <h1>Please fill in the data about the tenants</h1>
        <label><b>Name:</b></label>
        <input type="text" placeholder="Enter tenant's full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />

        <label><b>Contact No.:</b></label>
        <input type="number" placeholder="Enter tenant's mobile number" value={phno} onChange={(e) => setPhno(e.target.value)} required />
        <br />

        <label><b>Room No.:</b></label>
        <input type="number" placeholder="Enter tenant's room number" value={roomno} onChange={(e) => setRoomno(e.target.value)} required />
        <br />

        <label><b>Rent:</b></label>
        <input type="number" placeholder="Enter rent amount per month" value={rent} onChange={(e) => setRent(e.target.value)} required />
        <br />

        <label><b>Deposit:</b></label>
        <input type="number" placeholder="Enter deposited amount" value={deposit} onChange={(e) => setDeposit(e.target.value)} required />
        <br />

        <button type="button" onClick={submit}>SUBMIT</button>
        <h3>{error}</h3>
        <h3>{details}</h3>
      </form>
    </div>
  );
};

export default Createtenants;
