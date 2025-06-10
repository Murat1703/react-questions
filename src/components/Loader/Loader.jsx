import cls from './Loader.module.css'

export function Loader(){
    return(
        <div className={cls.loaderWrapper}>
            <span class={cls.loader}></span>

        </div>
    )
}