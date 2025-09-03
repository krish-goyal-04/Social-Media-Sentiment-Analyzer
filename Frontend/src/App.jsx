import Header from "./components/Header"
import { Outlet } from "react-router-dom"


const App = ()=>{
    return(
        <div className=" min-h-screen w-full bg-neutral-900">
            <Header />
            <Outlet />
        </div>
        
    )
}
export default App