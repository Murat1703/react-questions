import cls from './HomePage.module.css'
import { QuestionCard } from '../../components/questionCard'
import { API_URL } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { DelayFn } from '../../helpers/delayFn';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';


const cards = [];

export function HomePage(){

    const [questions, setQuestions] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    const [getQuestions, isLoading, error] = useFetch(async (url)=>{
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();
        setQuestions(questions);
        return questions;
    })


    // const getQuestions = async ()=>{
    //     try{
    //         setIsLoading(true);
    //         await DelayFn();
    //         const response  = await fetch(`${API_URL}/react`);
    //         const questions = await response.json();
    //         setQuestions(questions);
    //         console.log(questions)
    //     }
    //     catch (error) {
    //         console.error(error)
    //     }
    //     finally {
    //         setIsLoading(false)
    //     }
    // };


    useEffect (()=>{     
        getQuestions('react')   
    }, [])


    function onSearchChangeHandler(e){
        setSearchValue(e.target.value);
    }
    return(
        <>
        <div className={cls.controlContainer}>
            <SearchInput value={searchValue} onChange={onSearchChangeHandler}/>
        </div>
            {isLoading &&<Loader/>}
            {error && <p>{error}</p>}            
            <QuestionCardList cards={questions}/>
        </>
    )
}