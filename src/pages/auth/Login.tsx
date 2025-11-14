
// import { Link } from "react-router-dom"  //use like anchor tag
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; //use for programmatic navigation

const Login = () => {

    const navigate = useNavigate();

    const goToSignup = () => {
        navigate("/signup"); // Navigate programmatically
    };

    
    return (
        <div>
            <Button onClick={goToSignup}>Go to Signup</Button>
        </div>

    )
}

export default Login