// window.Promise = undefined;
// window.fetch = undefined;

import { Promise } from 'es6-promise';
if(!window.Promise)
    window.Promise = Promise;
import 'whatwg-fetch';