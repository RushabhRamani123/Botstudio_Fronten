import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar"
import CreateAndEditFlow from "./components/Bot/Flow/CreateAndEditFlow";
function App() {
  return (
    <>
      {/* <Navbar />  */}
      <Routes>
            <Route path='/bot/flow' element={<CreateAndEditFlow /> }/>
          </Routes>
    </>
  )
}
export default App;