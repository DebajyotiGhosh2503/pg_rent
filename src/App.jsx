import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Component/Nav"
import Home from "./Component/Home"
import Createtenants from "./Component/Createtenants"
import Rentrecords from "./Component/Rentrecords"
import EditRecords from "./Component/EditRecords"

const App = ()=>{
    return(
        <div>
          <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/createtenants" element={<Createtenants/>}/>
            <Route path="/rentrecords" element={<Rentrecords/>}/>
            <Route path="/editrecords/:index" element={<EditRecords/>}/>
          </Routes>
          </BrowserRouter>
      </div>
    )
}

export default App