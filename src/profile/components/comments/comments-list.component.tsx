import { List, CellMeasurer, CellMeasurerCache, ListRowRenderer, InfiniteLoader, Index } from 'react-virtualized';
import * as React from 'react';
import styled from 'react-emotion';

import { margins } from 'styles/variables';

import { SingleComment } from './single-comment.component';

import { LoadMore } from '../../actions/profile.actions';
import { ProfileContext } from '../../profile.context';
import { User } from 'profile/models/User';
import { Comment } from '../../models/Comment';
import { ProfileActions } from 'profile/actions/profile.actions';

interface CommentsListProps {
    listWidth: number;
    listHeight: number;
}

const CommentsListContainer = styled.div`
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
        const { listHeight, listWidth } = this.props;

        return (
            <ProfileContext.Consumer>
                {({ currentUser, comments, events }) => (
                    <CommentsListContainer>
                        <InfiniteLoader
                            isRowLoaded={({ index }) => this.isRowLoaded(comments.data, index)}
                            loadMoreRows={({ startIndex }) => this.loadMoreRows(currentUser, startIndex, events)}
                            rowCount={comments.total}
                        >
                            {({ onRowsRendered, registerChild }) => (
                                <List
                                    height={listHeight}
                                    width={listWidth}
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    rowCount={comments.data.length}
                                    scrollToAlignment="end"
                                    deferredMeasurementCache={this.cache}
                                    rowHeight={props => this.cache.rowHeight(props)}
                                    rowRenderer={this.getRowRenderer(comments.data)}
                                />
                            )}
                        </InfiniteLoader>
                    </CommentsListContainer>
                )}
            </ProfileContext.Consumer>
        );
    }

    public componentDidUpdate(): void {
        this.cache.clearAll();
    }

    private isRowLoaded = (comments: Comment[], index: number) => {
        return !!comments[index];
    };

    private loadMoreRows = ({ id }: User, offset: number, events: (action: ProfileActions) => void) => {
        events(LoadMore(id, offset));
        return Promise.resolve();
    };

    private getRowRenderer(comments: Comment[]): ListRowRenderer {
        return ({ key, parent, index, style }) => (
            <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <SingleComment style={style} comment={comments[index]} />
            </CellMeasurer>
        );
    }
}
