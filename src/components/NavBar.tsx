import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import "../styles/components/NavBar.css"

interface NavBarProps {
    handleSearch: (event: React.MouseEvent<HTMLElement>) => void;
    setText: (event: string) => void;
    getText: string;
}

const NavBar: React.FC<NavBarProps> = (props) => {    
    const textInput = useRef<HTMLInputElement>(null)

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setText(event.target.value)
        event.preventDefault();
    };

    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        textInput.current!.value = "";
        event.preventDefault();
    };

    return (
        <div>
            <OutlinedInput
                id="inputSearch"
                type='text'
                onChange={handleChangeText}
                value={props.getText}
                ref={textInput}
                placeholder="Pesquisar Produtos"
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={props.handleSearch}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </IconButton>
                </InputAdornment>
                }
            />
        </div>
    );
}

export default NavBar;