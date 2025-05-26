import cls from './HomePage.module.css'
import { QuestionCard } from '../questionCard'
import { API_URL } from '../../constants';
import { useState, useEffect } from 'react';


const cards = [];

export function HomePage(){

    const [questions, setQuestions] = useState([]);

    const getQuestions = async ()=>{
        try{
            const response  = await fetch(`${API_URL}/react`);
            const questions = await response.json();
            setQuestions(questions);
            console.log(questions)
        }
        catch (error) {
            console.error(error)
        }
    };


    useEffect (()=>{     
        getQuestions()   
    }, [])


    return(
        <>
            {questions.map((item, index)=>{
                return <QuestionCard key={index} card={item}/>}
            )}


        </>
    )
}