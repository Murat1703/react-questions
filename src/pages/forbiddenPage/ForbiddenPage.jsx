import { useLocation, useNavigate } from 'react-router-dom';
import cls from './ForbiddenPage.module.css';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/isAuth';

export const ForbiddenPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const {isAuth} = useAuth();

    const fromPage = location.state?.from || "/"

    console.log('location= ', location.state);

    useEffect(()=> {
        isAuth && navigate(fromPage, {replace: true})
    }, [isAuth])

    return(
        <h2 className={cls.title}> Page is Forbidden </h2>
    )
}