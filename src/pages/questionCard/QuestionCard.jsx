import cls from './QuestionCard.module.css'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export function QuestionCard({card}){

    const navigate = useNavigate();

    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level {card.level}</div>
                <div>{card.completed?"Completed":"Not Completed"}</div>
            </div>
            <h5 className={cls.cardTitle}>{card.question}</h5>
            <div className={cls.cardAnswers}>
                <span>Short Answer: </span>
                <p className={cls.cardAnswer}>{card.answer}</p>
            </div>

            <Button onClick={()=>navigate(`/question/${card.id}`)}>View</Button>
        </div>
    )
}