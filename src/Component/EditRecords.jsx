import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecords = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [roomno, setRoomno] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const { index } = useParams(); // Get 'index' from URL params
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/name/${index}`)
      .then((response) => {
        setName(response.data.name);
        setPhno(response.data.phno);
        setRoomno(response.data.roomno);
        setRent(response.data.rent);
        setDeposit(response.data.deposit);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [index]); // Add 'index' to the dependencies array

  const formHandle = () => {
    const payload = { name, phno, roomno, rent, deposit, due: rent - deposit };
    axios.put(`http://localhost:3000/name/${index}`, payload)
      .then(() => {
        console.log("Data has been saved");
        navigate('/rentrecords');
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };

  return (
    <div id="myform">
      <form>
        <h1>Please Update the data of the tenants</h1>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter tenant's full name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="phno">Contact No.:</label>
          <input type="tel" id="phno" placeholder="Enter tenant's mobile number" value={phno} onChange={(e) => setPhno(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="roomno">Room No.:</label>
          <input type="text" id="roomno" placeholder="Enter tenant's room number" value={roomno} onChange={(e) => setRoomno(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="rent">Rent:</label>
          <input type="number" id="rent" placeholder="Enter rent amount per month" value={rent} onChange={(e) => setRent(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="deposit">Deposit:</label>
          <input type="number" id="deposit" placeholder="Enter deposited amount" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        </div>
        <button type="button" onClick={formHandle}>Update</button>
      </form>
    </div>
  );
};

export default EditRecords;
