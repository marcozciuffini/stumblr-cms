import React from 'react';
import {Link} from "react-router-dom";

const Header = (props) => {

    return (
        <div className="react-header">
            <div className="container subheader">
                <Link to="/towns" className="subheader-link">Towns</Link>
                <Link to="/pubs" className="subheader-link">Pubs</Link>
            </div>
        </div>
    );
};

export default Header;
