import {ADD_MACHINETECHINFO, SET_MACHINEOPERTHRESHOLD} from '../actions/actions';

export default function machineoperthresholds(state = [], action = {}) {
    switch (action.type) {
        case ADD_MACHINETECHINFO:
            return [
                ...state,
                action.machinetechinfo
            ];

        case SET_MACHINEOPERTHRESHOLD:
            return action.machineoperthresholds;
    
        default:
            return state;
    }
}

