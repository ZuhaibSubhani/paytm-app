import { Appbar } from "../components/Appbar"
import { SendMoney } from "../components/SendMoney"
import { Users } from "../components/Users"

function Dashboard() {
  return (
    <div className="py-32 px-20">
      <Appbar/>
      
      <Users/>
    </div>
  )
}

export default Dashboard
