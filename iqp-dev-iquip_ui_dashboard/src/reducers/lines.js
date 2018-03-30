import {LINE_FETCHED} from '../actions/actions';

export default function lines(state = {}, action = {}) {
    switch (action.type) {

        case LINE_FETCHED:
            return action.lines;

        default:
            return state;
    }
}