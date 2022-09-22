import React, {FC} from "react";
import {FormApi} from "final-form";
import {Field, Form} from "react-final-form";
import send from "../../../common/assets/img/send.svg";

export interface NewMessageForm {
    body: string
}

const NewMessage: FC<{sendMessage: (formData: any) => void}> = ({sendMessage}) => {
    const sendMessageOnEnter = (e: React.KeyboardEvent, form: FormApi<NewMessageForm>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            form.submit()
            form.reset()
        }
    }
    return (
        <div className="message-text-container">
            <Form
                onSubmit={sendMessage}
                render={
                    ({handleSubmit, submitting, pristine, form}) => (
                        <form onSubmit={handleSubmit}>
                            <Field
                                onKeyDown={
                                    (e: React.KeyboardEvent) => sendMessageOnEnter(e, form)
                                }
                                name='body'
                                component='textarea'
                                placeholder='Text a message'
                            />
                            <button disabled={submitting || pristine}>
                                <img src={send} alt=""/>
                            </button>
                        </form>
                )}
            />
        </div>
    )
}
export default NewMessage;