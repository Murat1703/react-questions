import { Button } from "../Button"
import ReactLogo from '../../assets/react.svg'
import cls from './Header.module.css'
import { useNavigate } from "react-router-dom"

export function Header(){
    const navigate = useNavigate();
    return(
        <header className={cls.header}>
            <p onClick={()=>navigate("/")}>
                <img src={ReactLogo} alt="react-logo"></img>
                <span>React Cards</span>
            </p>
            <div className={cls.headerButtons}>
                <Button onClick={()=>navigate("/addquestion")} >Add</Button>
                <Button>Login</Button>
            </div>
        </header>
    )
}