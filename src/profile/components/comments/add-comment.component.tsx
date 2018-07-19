import * as React from 'react';
import styled from 'react-emotion';

import { fontSize, colors, margins } from 'styles/variables';

import { ProfileContext, ProfileContextValue } from '../../profile.context';
import { AddProfileComment } from '../../actions/profile.actions';

const AddCommentInput = styled.input`
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${colors.borderDarkColor};
    padding: 5px 0;
    color: ${colors.grey};
    font-size: ${fontSize.basic};
    transition: border 0.3s;

    &::placeholder {
        color: ${colors.lightBlue};
        transition: color 0.3s;
    }

    &:focus {
        outline: none;
        border-bottom-color: ${colors.orange};
    }

    &:focus::placeholder {
        color: ${colors.orange};
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

interface AddCommentState {
    value: string;
}

export class AddComment extends React.Component<{}, AddCommentState> {
    public state: AddCommentState = {
        value: '',
    };

    public render(): React.ReactNode {
        return (
            <ProfileContext.Consumer>
                {context => (
                    <form onSubmit={e => this.addComment(e, context)}>
                        <AddCommentLabel>
                            <AddCommentInput
                                type="text"
                                placeholder="Add comment"
                                value={this.state.value}
                                onChange={e => this.updateInputValue(e)}
                                onBlur={() => this.cleanSpaces()}
                            />
                        </AddCommentLabel>
                    </form>
                )}
            </ProfileContext.Consumer>
        );
    }

    public updateInputValue(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            value: e.currentTarget.value,
        });
    }

    public cleanSpaces(): void {
        if (this.state.value.length && !this.state.value.trim().length) {
            this.setState({
                value: '',
            });
        }
    }

    public addComment(e: React.FormEvent, { events, currentUser }: ProfileContextValue): void {
        e.preventDefault();

        if (this.state.value.trim().length) {
            events(AddProfileComment(currentUser.id, this.state.value));
        }
    }
}
