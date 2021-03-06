import * as React from 'react';
import { hot } from 'react-hot-loader';
import { injectGlobal } from 'emotion';

import { resetCss } from 'styles/reset';

import { DataControler } from './data-controler/data-controler';

injectGlobal(`
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    ${resetCss}
`);

export const App = hot(module)(() => <DataControler />);
