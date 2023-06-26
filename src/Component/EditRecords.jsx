import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './home.module.css'

const EditRecords = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState();
  const [roomno, setRoomno] = useState();
  const [rent, setRent] = useState();
  const [deposit, setDeposit] = useState();
  // const [details, setDetails] = useState("");

  let {index} = useParams()
  let navigate = useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:3000/name/${index}`)
    .then((response)=>{
      setName(response.data.name)
      setPhno(response.data.phno)
      setRoomno(response.data.roomno)
      setRent(response.data.rent)
      setDeposit(response.data.deposit)
    })
    .catch((error)=>{console.log(error)})
    
  },[])

  let formHandle =()=>{
    const payload = { name, phno, roomno, rent, deposit, due: rent - deposit };
    axios.put(`http://localhost:3000/name/${index}`, payload)
    .then(()=>{
      console.log("Data Has been saved")
      })
      .catch(()=>{
        console.log("Something went wromg")
        })
        navigate('/rentrecords')
  }

  return (
    <div id={style.myformedit}>
        <form>
        <h1>Please Update the data of the tenants</h1>
        <label><b>Name:</b></label>
        <input type="text" placeholder="Enter tenant's full name" value={name} onChange={(e) => setName(e.target.value)}/>
        <br />

        <label><b>Contact No.:</b></label>
        <input type="number" placeholder="Enter tenant's mobile number" value={phno} onChange={(e) => setPhno(e.target.value)}/>
        <br />

        <label><b>Room No.:</b></label>
        <input type="number" placeholder="Enter tenant's room number" value={roomno} onChange={(e) => setRoomno(e.target.value)}/>
        <br />

        <label><b>Rent:</b></label>
        <input type="number" placeholder="Enter rent amount per month" value={rent} onChange={(e) => setRent(e.target.value)}/>
        <br />

        <label><b>Deposit:</b></label>
        <input type="number" placeholder="Enter deposited amount" value={deposit} onChange={(e) => setDeposit(e.target.value)}/>
        <br />

        <button onClick={formHandle} >Update</button>
        </form>
        </div>
  )
}

export default EditRecords
