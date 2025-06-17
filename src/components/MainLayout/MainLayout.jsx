import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.css'
import { Header } from '../Header';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '../Loader';


export function MainLayout(){
    const currentYear = new Date().getFullYear();
    return(
        <>        
        <div className={cls.mainLayout}>
            <Header />
            <div className={cls.mainWrapper}>
                <main className={cls.main}>
                    <Suspense fallback={<Loader/>}>
                        <Outlet />
                    </Suspense>
                </main>
                <footer className={cls.footer}>
                    React Question Cards Application | {currentYear}<br/>
                    by MKS
                </footer>
            </div>
        </div>
        <ToastContainer />
      
        </>
    )
}