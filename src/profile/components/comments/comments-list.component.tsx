import { List, CellMeasurer, CellMeasurerCache, ListRowRenderer } from 'react-virtualized';
import * as React from 'react';
import styled from 'react-emotion';

import { margins } from 'styles/variables';

import { SingleComment } from './single-comment.component';
import { Comment } from '../../models/Comment';

interface CommentsListProps {
    comments: Comment[];
    listWidth: number;
    listHeight: number;
}

const CommentsListContainer = styled.ul`
    width: 100%;
    height: auto;
    margin-top: ${margins.big};
    padding: 0;
`;

export class CommentsList extends React.Component<CommentsListProps> {
    private cache: CellMeasurerCache = new CellMeasurerCache({
        defaultHeight: 150,
        fixedWidth: true,
    });

    public render(): React.ReactNode {
        const { comments, listHeight, listWidth } = this.props;

        return (
            <CommentsListContainer>
                <List
                    height={listHeight}
                    width={listWidth}
                    rowCount={comments.length}
                    deferredMeasurementCache={this.cache}
                    rowHeight={props => this.cache.rowHeight(props)}
                    rowRenderer={this.getRowRenderer()}
                />
            </CommentsListContainer>
        );
    }

    public componentDidUpdate(): void {
        this.cache.clearAll();
    }

    private getRowRenderer(): ListRowRenderer {
        const { comments } = this.props;
        return ({ key, parent, index, style }) => (
            <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <SingleComment style={style} comment={comments[index]} />
            </CellMeasurer>
        );
    }
}
