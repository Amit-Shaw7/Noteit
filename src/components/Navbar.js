import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link disabled={true} className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        <form className="d-flex">
                            {
                                localStorage.getItem('token') ? <div className="btn btn-primary mx-2" role="button" aria-pressed="true" onClick={handleLogout}>Logout</div> :

                                    <>
                                        <Link to="/login" className="btn btn-primary mx-2" role="button" aria-pressed="true">Login</Link>
                                        <Link to="/signup" className="btn btn-primary mx-2" role="button" aria-pressed="true">Signup</Link>
                                    </>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar