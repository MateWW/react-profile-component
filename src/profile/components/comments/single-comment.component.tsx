import * as React from 'react';
import styled from 'react-emotion';
import moment from 'moment';

import { colors, fontSize, margins } from 'styles/variables';
import { ProfileAvatar } from '../shared/avatar.componen';

import { Comment } from '../../models/Comment';

export interface SingleCommentProps {
    comment: Comment;
    style: React.CSSProperties;
}

const CommentLine = styled.li`
    display: flex;
    position: relative;
    padding: ${margins.big} ${margins.regular} ${margins.medium};
    box-sizing: border-box;

    &:first-child {
        padding-top: 0;
    }

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        top: 100%;
        background: ${colors.borderLiteColor};
    }
`;

const CommentBody = styled.div`
    flex: 1;
    margin-left: ${margins.small};
`;

const bodyFontSize = `
    font-size: ${fontSize.small};
    line-height: 1.3em;
`;

interface TimeProps {
    time?: boolean;
}

const HeadText = styled.span<TimeProps>(
    `
    ${bodyFontSize};

    margin: ${margins.small} 0;
    display: block;
    color: ${colors.darkBlue};
`,
    ({ time }) => `
    padding-left: ${time ? margins.big : 0}
`,
);

const CommentText = styled.span`
    ${bodyFontSize};

    display: block;
    color: ${colors.grey};
`;

moment.locale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 's',
        ss: '%ss',
        m: 'a minute',
        mm: '%dm',
        h: 'an hour',
        hh: '%dh',
        d: 'a day',
        dd: '%dd',
        M: 'a month',
        MM: '%dM',
        y: 'a year',
        yy: '%dY',
    },
});

export const SingleComment: React.SFC<SingleCommentProps> = ({ style, comment }) => (
    <CommentLine style={style}>
        <ProfileAvatar size="small" {...comment.author} />
        <CommentBody>
            <HeadText>{comment.author.fullName}</HeadText>
            <CommentText>{comment.text}</CommentText>
        </CommentBody>
        <HeadText time={true}>{moment(comment.date).fromNow(true)}</HeadText>
    </CommentLine>
);
