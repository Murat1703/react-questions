import cls from './AddQuestionPage.module.css';
import { Button } from '../../components/Button';
import { useActionState } from 'react';
import { DelayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { Loader } from '../../components/Loader';

const createCardAction = async(_prevState, formData) => {
    try {
        await DelayFn();
        console.log(Object.fromEntries(formData));

        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearform;

        const response = await fetch(`${API_URL}/react`, {
            method: "POST",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(','): [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined
            }),
        })

        if( response.status == 404){
            throw new Error(response.statusText)
        }

        const question = response.json();
        toast.success("New Questuion is Successfully created");
        return isClearForm ? {} : question;
    }
    catch(error){
        toast.error(error.message)
        return {}
    }

}

const AddQuestionPage = () => {

    const [formState, formAction, isPending]= useActionState(createCardAction, {clearForm: true});

    return( 
        <>
            {isPending && <Loader/>}

            <h1 className={cls.formTitle}>Add Question page</h1>
            <div className={cls.formContainer}>
                <form action={formAction} className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea 
                            defaultValue={formState.question}
                            name="question" 
                            id="questionField" 
                            cols={30} 
                            rows={2} 
                            required 
                            placeholder='please enter Question'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Short Answer: </label>
                        <textarea 
                            defaultValue={formState.answer}
                            name="answer" 
                            id="answerField" 
                            cols={30} 
                            rows={2} 
                            required 
                            placeholder='please enter a short Answer'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description: </label>
                        <textarea 
                            defaultValue={formState.description}
                            name="description" 
                            id="descriptionField" 
                            cols={30} 
                            rows={5} 
                            required 
                            placeholder='please enter a full description'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="resourcesField">Resources: </label>
                        <textarea 
                            defaultValue={formState.resources}
                            name="resources" 
                            id="resourcesField" 
                            cols={30} 
                            rows={5} 
                            required 
                            placeholder='please enter resources  separated by comas'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level: </label>
                        <select name="level" id="levelField" defaultValue={formState.level}>
                            <option disabled>Question Level</option>
                            <hr />
                            <option value={1}>1 - easiest</option>
                            <option value={2}>2 - medium</option>
                            <option value={3}>3 - hardest</option>
                        </select>
                    </div>

                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input type="checkbox" name='clearForm' id='clearFormField' defaultChecked={formState.clearForm} className={cls.checkbox}/>
                        <span>Clear Form After submitting?</span>
                    </label>

                    <Button disabled={isPending}>Add Question</Button>
                </form>
            </div>
        </>
    )
}

export default AddQuestionPage