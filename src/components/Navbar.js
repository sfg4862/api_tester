import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();

    return (
        <nav className="navbar bg-warning text-white fw-bold">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-3 mb-lg-0 d-flex flex-row">
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${location.pathname === "/" ? "active text-decoration-underline" : ""} text-white`}
                            style={{ backgroundColor: "#d48806" }}
                            aria-current="page"
                            to="/"
                        > <div className="ps-3 pe-3">메인</div>
                        </Link>
                    </li>
                    <li className="nav-item ms-4">
                        <Link
                            className={`nav-link ${location.pathname === "/test" ? "active text-decoration-underline" : ""} text-white`}
                            style={{ backgroundColor: "#d48806" }}
                            to="/test"
                        ><div className="ps-3 pe-3">테스트 탭</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
