import * as React from 'react';
import styled from 'react-emotion';

import { margins, colors, fontSize } from 'styles/variables';
import { applyBox } from 'styles/mixins';
import { getScrollTop } from 'helpers/getScrollTop';

import { CommentsList } from './comments-list.component';
import { AddComment } from './add-comment.component';
import { ProfileContext } from '../../profile.context';
import { ToggleComments } from '../../actions/profile.actions';

const ProfileCommentsContainer = styled.section`
    ${applyBox()};

    width: 100%;
    padding: ${margins.regular} 0 0;
    margin-top: ${margins.small};
`;

const HideComments = styled.button`
    padding: 0 ${margins.regular};
    border: 0;
    background: 0;
    font-size: ${fontSize.small};
    line-height: 1.3em;
    color: ${colors.orange};
    text-decoration: underline;
    cursor: pointer;
`;

export interface ProfileCommentsState {
    listWidth: number;
    listHeight: number;
}

export class ProfileComments extends React.Component {
    public containerNode: Element;
    public state: ProfileCommentsState = {
        listWidth: 500,
        listHeight: 500,
    };

    public render(): React.ReactNode {
        return (
            <ProfileContext.Consumer>
                {({ events, visibleUser, comments }) => (
                    <ProfileCommentsContainer innerRef={container => (this.containerNode = container)}>
                        <HideComments onClick={() => events(ToggleComments(visibleUser.id, comments.data.length))}>
                            {comments.visible ? 'Hide' : 'Show'} comments({comments.total})
                        </HideComments>

                        {comments.visible && <CommentsList {...this.state} />}
                        <AddComment />
                    </ProfileCommentsContainer>
                )}
            </ProfileContext.Consumer>
        );
    }

    public componentDidMount(): void {
        this.updateListSize();
        window.addEventListener('resize', this.updateListSize.bind(this));
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateListSize.bind(this));
    }

    private updateListSize(): void {
        const styles = getComputedStyle(this.containerNode);
        const paddingHorizontal = parseInt(styles.paddingLeft, 10) + parseInt(styles.paddingRight, 10);
        const paddingVertical = parseInt(styles.paddingBottom, 10) + parseInt(styles.paddingTop, 10);
        const listWidth = parseInt(styles.width, 10) - paddingHorizontal;
        const fromTopDistance = this.containerNode.getBoundingClientRect().top + getScrollTop();
        const fullHeight = parseInt(styles.height, 10) + paddingVertical;

        const windowHeight = window.innerHeight;
        const missingHeight = windowHeight - fromTopDistance - fullHeight;
        const listHeight = this.state.listHeight + missingHeight;
        this.setState({
            listWidth,
            listHeight,
        });
    }
}
