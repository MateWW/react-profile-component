import * as React from 'react';
import styled from 'react-emotion';
import { fontSize, colors, margins } from 'styles/variables';

const AddCommentInput = styled.input`
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${colors.borderDarkColor};
    padding: 5px 0;
    color: ${colors.grey};
    font-size: ${fontSize.basic};
    transition: border .3s;

    &::placeholder {
        color: ${colors.lightBlue};
        transition: color .3s;
    }

    &:focus {
        outline: none;
        border-bottom-color: ${colors.orange}
    }

    &:focus::placeholder{
        color: ${colors.orange}
    }
`;

const AddCommentLabel = styled.label`
    display: block;
    width: 100%;
    position: relative;
    padding: ${margins.xBig} ${margins.regular} ${margins.big};
    box-sizing: border-box;

    &:after {
        content: '';
        width: 100vw;
        height: 1px;
        background: ${colors.borderLiteColor};

        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
`;

export const AddComment: React.SFC = () => (
    <form>
        <AddCommentLabel>
            <AddCommentInput type="text" placeholder="Add comment" />
        </AddCommentLabel>
    </form>
);
