import cls from './HomePage.module.css'
import { QuestionCard } from '../../components/questionCard'
import { API_URL } from '../../constants';
import { useState, useEffect, useRef, useMemo } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { DelayFn } from '../../helpers/delayFn';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';


const DEFAULT_PER_PAGE = 10;

export function HomePage(){
    
    const [searchParams, setSearchParams] = useState(`_page=1&_per_page=${DEFAULT_PER_PAGE}`)
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortSelectValue, setSortSelectValue]=useState("");

    const conrolsContainerRef = useRef();

    const getActivePageNumber = () => {
       return (questions.next === null ? questions.last : questions.next-1);
    }


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

    // const cards = questions.filter((d)=>d.question.toLowerCase().includes(searchValue.trim().toLowerCase()))

    const cards = useMemo(()=>{
        if (questions?.data){
            if (searchValue.trim()){
                return questions.data.filter((d)=>d.question.toLowerCase().includes(searchValue.trim().toLowerCase()))
            } else {
                return questions.data
            }
        }
        return [];
    }, [questions, searchValue])


    const pagination = useMemo(()=>{
        const totalCardsCount = questions?.pages || 0;

        return Array(totalCardsCount).fill(0).map((_, i)=>
            i+1
        )
    },[questions])

    useEffect (()=>{     
        getQuestions(`react?${searchParams}`)   
    }, [searchParams])

    function onSearchChangeHandler(e){
        setSearchValue(e.target.value);
    }

    function onSortSelectChange(e){
        setSortSelectValue(e.target.value);
        setSearchParams(`_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`)
    }

    const paginationHandler = (e)=>{
        if (e.target.tagName=="BUTTON"){
            setSearchParams(`_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`)
            conrolsContainerRef.current.scrollIntoView({ block: "center", behavior: "smooth"  });
            console.log('controlsContainerRef = ',conrolsContainerRef.current)
        }
    }



    return(
        <>
        <div className={cls.controlContainer}>
            <SearchInput value={searchValue} onChange={onSearchChangeHandler}/>
            <select value={sortSelectValue} onChange={onSortSelectChange} className={cls.select}>
                <option value="">sort by</option>
                <hr />
                <option value="_sort=level">level ASC</option>
                <option value="_sort=-level">level DESC</option>
                <option value="_sort=completed">completed ASC</option>
                <option value="_sort=-completed">completed DESC</option>
            </select>
        </div>
            {isLoading &&<Loader/>}
            {error && <p>{error}</p>}    
            <QuestionCardList cards={cards}/>
            {cards.length==0?<p className={cls.noCardsInfo}>No Cards...</p>: <div className={cls.paginationContainer} onClick={paginationHandler}>
                {pagination.map((value)=>{
                    return <Button key={value} isActive={value == getActivePageNumber()}>{value}</Button>
                })}
            </div>}        


        </>
    )
}