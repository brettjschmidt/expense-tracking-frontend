import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";


// styles
import "./styles/main.css";
import "./styles/home.css";
import "./styles/form.css";
import "./styles/navbar.css";
import "react-toastify/dist/ReactToastify.css";

// layouts
import CoreLayout from "./layouts/CoreLayout";

// Pages
import Home from "./pages/Home";
import Error from "./pages/Error";




const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<CoreLayout />} errorElement={<Error />}>
            <Route index element={<Home />}></Route>
        </Route>
    )
);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
}

export default App;
