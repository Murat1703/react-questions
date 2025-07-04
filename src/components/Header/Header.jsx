import { Button } from "../Button"
import ReactLogo from '../../assets/react.svg'
import cls from './Header.module.css'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/isAuth";
import { AUTH_STORAGE } from "../../constants";

export function Header(){
    const navigate = useNavigate();

    const {isAuth, setIsAuth} = useAuth();

    console.log('isAuth = ', isAuth);

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, !isAuth)
        setIsAuth(!isAuth);
    }

    return(
        <header className={cls.header}>
            <p onClick={()=>navigate("/")}>
                <img src={ReactLogo} alt="react-logo"></img>
                <span>React Cards</span>
            </p>
            <div className={cls.headerButtons}>
                {isAuth &&  <Button onClick={()=>navigate("/addquestion")} >Add</Button>}               
                <Button onClick={loginHandler} isActive={!isAuth}>{isAuth? "LogOut" : "Login"}</Button>
            </div>
        </header>
    )
}