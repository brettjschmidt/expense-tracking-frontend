import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.js";



export default function CoreLayout() {
    return (
        <div className="core-layout">
            <header>
                <Navbar />
            </header>
            
            <main>
                <Outlet />
            </main>
        </div>
    )
}
