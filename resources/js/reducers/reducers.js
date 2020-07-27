import {
    SET_TOWN,
} from '../constants/';

const defaultState = {
    townId: 0
};

const reducers = (state={ ...defaultState }, action) => {
    switch (action.type) {
        case SET_TOWN: {
            return {
                ...state,
                townId: action.payload
            };
        }

        default:
            return state;
    }
};

export default reducers;
