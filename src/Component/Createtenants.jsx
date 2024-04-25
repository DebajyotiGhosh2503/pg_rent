import axios from "axios";
import React, { useState } from "react";
import "./createtenants.css";

const Createtenants = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [roomno, setRoomno] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!name || !phno || !roomno || !rent || !deposit) {
      setError("Please fill in all the fields.");
      return;
    }

    const payload = { name, phno, roomno, rent, deposit, due: rent - deposit };
    axios
      .post("http://localhost:3000/name", payload)
      .then(() => {
        setName("");
        setPhno("");
        setRoomno("");
        setRent("");
        setDeposit("");
        setDetails(`The details of ${name} have been saved`);
        setError("");

        setTimeout(() => {
          setDetails("");
        }, 2000);
      })
      .catch(() => {
        console.log("Data has not been posted");
      });
  };

  return (
// Inside your Createtenants component's return statement
<div id="myform" className="form-container">
  <form>
    <h1 style={{ margin: "0 auto", textAlign: "center" }}>Please fill in the data about the tenants</h1>
    <div>
      <label><b>Name:</b></label>
      <input type="text" placeholder="Enter tenant's full name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label><b>Contact No.:</b></label>
      <input type="number" placeholder="Enter tenant's mobile number" value={phno} onChange={(e) => setPhno(e.target.value)} required />
    </div>

    <div>
      <label><b>Room No.:</b></label>
      <input type="number" placeholder="Enter tenant's room number" value={roomno} onChange={(e) => setRoomno(e.target.value)} required />

      <label><b>Rent:</b></label>
      <input type="number" placeholder="Enter rent amount per month" value={rent} onChange={(e) => setRent(e.target.value)} required />
    </div>

    <div>
      <label><b>Deposit:</b></label>
      <input type="number" placeholder="Enter deposited amount" value={deposit} onChange={(e) => setDeposit(e.target.value)} required />

      <button type="button" onClick={submit}>SUBMIT</button>
    </div>

    <h3 className="error">{error}</h3>
    <h3 className="success">{details}</h3>
  </form>
</div>

  );
};

export default Createtenants;
