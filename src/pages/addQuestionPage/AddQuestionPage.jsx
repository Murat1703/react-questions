import cls from './AddQuestionPage.module.css';
import { Button } from '../../components/Button';

export const AddQuestionPage = () => {
    return( 
        <>
            <h1 className={cls.formTitle}>Add Question page</h1>
            <div className={cls.formContainer}>
                <form action="" className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea 
                            defaultValue={"defaultValue"}
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
                            defaultValue={"defaultValue"}
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
                            defaultValue={"defaultValue"}
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
                            defaultValue={"defaultValue"}
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
                        <select name="level" id="levelField">
                            <option disabled>Question Level</option>
                            <hr />
                            <option value={1}>1 - easiest</option>
                            <option value={2}>2 - medium</option>
                            <option value={3}>3 - hardest</option>
                        </select>
                    </div>

                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input type="checkbox" name='clearForm' id='clearFormField' defaultChecked={true} className={cls.checkbox}/>
                        <span>Clear Form After submitting?</span>
                    </label>

                    <Button>Add Question</Button>
                </form>
            </div>
        </>
    )
}