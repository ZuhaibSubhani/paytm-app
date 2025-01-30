import { Signup} from "./pages/signup"
import { Signin } from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import { SendMoney } from "./components/SendMoney"
import { BrowserRouter,Route,Routes } from "react-router-dom"
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/sendmoney" element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>
       
    </div>
  )
}

export default App
