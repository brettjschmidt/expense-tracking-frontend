import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineHome, AiOutlineRollback } from "react-icons/ai"

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <div className="error-page">
            <h1>Uh oh! Something went wrong.</h1>
            <p>{error.message || error.statusText}</p>
            <button onClick={()=> navigate(-1)}>
            <AiOutlineRollback/>
            <span>Go Back</span>
            </button>
            <Link to="/">
            
            < AiOutlineHome />
                <span>Go home</span>
            </Link>
        </div>
    );
};

export default Error;
