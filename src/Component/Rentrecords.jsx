import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './rentrecords.css';
import pic1 from '../Img/black cross.png';
import TenantService from '../services/TenantService'

const Rentrecords = () => {
  const [content, setContent] = useState([]);
  const [searchPhno, setSearchPhno] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3; // Number of items to display per page

  const fetchData = useCallback(async () => {
    try {
      const response = await TenantService.gettenants()
    console.log('response.data for tenent list',response.tenent);
      setContent(response.tenent);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    
    const filteredData = content.filter((x) =>
      x.phno.includes(searchPhno)
    );
    setFilteredContent(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1);
  }, [content, searchPhno]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContent.slice(startIndex, endIndex);

  const deleteTenant = (id, name) => {
    try {
      TenantService.deletetenant(id);
      window.location.assign('/rentrecords');
      alert(`The details of ${name} have been deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelSearch = () => {
    setSearchPhno('');
  };

  return (
    <div id="mainpage">
      <div id="searchbar">
        <input
          type="text"
          value={searchPhno}
          onChange={(e) => setSearchPhno(e.target.value)}
          placeholder="Enter Phone Number"
        />
        <img src={pic1} alt="" id="cancel" onClick={cancelSearch} />
      </div>
      <div id="recordpage">
        {currentItems.length > 0 ? (
          currentItems.map((x) => (
            <div id="card" key={x.id}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>Name:</b>
                    </td>
                    <td>{x.name}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Contact No.:</b>
                    </td>
                    <td>{x.phno}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Room No.:</b>
                    </td>
                    <td>{x.roomno}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Rent Amount:</b>
                    </td>
                    <td>Rs- {x.rent}/-</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Deposited Amount:</b>
                    </td>
                    <td>Rs- {x.deposit}/-</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Due:</b>
                    </td>
                    <td>Rs- {x.due}/-</td>
                  </tr>

                  <tr>
                    <td>
                      <button className="buttons" id="edit">
                        <Link to={`/editrecords/${x._id}`}>Edit</Link>
                      </button>
                    </td>

                    <td>
                      <button
                        className="buttons"
                        id="delete"
                        onClick={() => {
                          deleteTenant(x._id, x.name);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
      <div id="page">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <div id="pagecount">
          {currentPage}/{totalPages}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Rentrecords;
