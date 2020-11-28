import React from "react";
import styled from "styled-components";
export interface formProps {
    [p: string]: unknown;
}

const Form = styled.form`
    & {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    div.field {
        display: flex;
        padding: 10px 0;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        label {
            width: 6em;
            display: inline-block;
        }
        input,
        textarea,
        div {
            width: 80%;
            border-radius: 4px;
        }
        textarea {
            height: 8em;
        }
    }
`;
const StyledForm = (props: formProps) => {
    return <Form {...props}></Form>;
};

export default StyledForm;
