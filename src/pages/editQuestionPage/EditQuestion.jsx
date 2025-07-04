import cls from './editQuestionPage.module.css';
import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import { QuestionForm } from '../../components/QuestionForm';
import { DelayFn } from '../../helpers/delayFn';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';
import { dateFormat } from '../../helpers/dateFormat';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const editCardAction = async(_prevState, formData) => {
    try {
        await DelayFn();

        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.trim();
        const questionId = newQuestion.questionId;
        const isClearForm = newQuestion.clearform;

        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(','): [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: dateFormat(new Date())
            }),
        })

        if( response.status == 404){
            throw new Error(response.statusText)
        }

        const question = response.json();
        toast.success("The Questuion is edited Successfully ");
        return isClearForm ? {} : question;
    }
    catch(error){
        toast.error(error.message)
        return {}
    }

}


export const EditQuestion = ({initialState = {}}) => {

        const navigate = useNavigate();
        const [formState, formAction, isPending]= useActionState(editCardAction, {...initialState, clearForm: false});

    
        const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
            await fetch(`${API_URL}/react/${initialState.id}`, {
                method: "DELETE",
            });
    
            toast.success("The Question is removed succesfully");
            navigate('/')
        });

        const onRemoveQuestionHandler = () => {
            const isRemove = confirm("Are you sure ? ");

            isRemove && removeQuestion();
        }

        return( 
            <>
                {isPending || isQuestionRemoving && <Loader/>}

                <h1 className={cls.formTitle}>Edit Question page</h1>
                <div className={cls.formContainer}>
                    <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}> 
                        X
                    </button>
                    <QuestionForm  formAction={formAction} formState={formState} isPending={isPending || isQuestionRemoving} submitBtnText="Edit Question"/>
                </div>
            </>
        )

}