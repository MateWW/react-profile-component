import React from 'react';
import { Subscription } from 'rxjs';

import { ProfileContainer } from '../profile/profile.container';
import { ProfileContextValue } from '../profile/profile.context';
import { Store } from '../services/store.service';
import { State } from 'models/State';

function mapStateToProps({
    comments,
    visibleUser,
    currentUser,
}: State): Pick<ProfileContextValue, 'visibleUser' | 'currentUser' | 'comments'> {
    return {
        comments: {
            visible: comments.visible,
            total: comments.total,
            data: comments.data,
        },
        visibleUser: visibleUser.user,
        currentUser: currentUser.user,
    };
}

export class DataControler extends React.Component {
    public store = new Store();
    public state: Pick<ProfileContextValue, 'visibleUser' | 'currentUser' | 'comments'> = {
        comments: {
            visible: true,
            total: 0,
            data: [],
        },
        visibleUser: null,
        currentUser: null,
    };

    private subscription: Subscription;

    public componentDidMount(): void {
        this.subscription = this.store.getState().subscribe(state => this.setState(mapStateToProps(state)));
    }

    public componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    public render(): React.ReactNode {
        return <ProfileContainer {...this.state} events={action => this.store.dispatch(action)} />;
    }
}
