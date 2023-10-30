import React, { useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "../../styles/pages/Layout.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faHouse, faList } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import NavBar from "../../components/NavBar";

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>("")

    function HandleSearchClick(event: React.MouseEvent<HTMLElement>) : void{
        setSearchText("")
        navigate("/list", {state: {search: searchText}});
    }

    return (
        <div className="mainbodyStyle">
            <div className="logo">
            </div>
            <div className="listLinksNavbar">
                <NavBar handleSearch={HandleSearchClick} setText={setSearchText} getText={searchText} />
            </div>
            <div className="SideBar">
                <Tooltip title="Home" placement="right">
                    <Link to="/" className="navbarLinks">
                            <FontAwesomeIcon icon={faHouse} className="linkIcon"></FontAwesomeIcon>
                    </Link>
                </Tooltip>
                <Tooltip title="Listar Produtos" placement="right">
                    <Link to="/list" className="navbarLinks">
                        <FontAwesomeIcon icon={faList} className="linkIcon"></FontAwesomeIcon>
                    </Link>
                </Tooltip>
                <Tooltip title="Adicionar" placement="right">
                    <Link to="/add" className="navbarLinks">
                        <FontAwesomeIcon icon={faAdd} className="linkIcon"></FontAwesomeIcon>
                    </Link>
                </Tooltip>
            </div>
            <Outlet />

        </div>
    );
}

export default Layout;