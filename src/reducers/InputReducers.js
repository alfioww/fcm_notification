

const INITIAL_STATE = {
    input: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'InputChange':
            return { ...state, input: action.payload }
        case 'Reset':
            return INITIAL_STATE;
        default:
            return state;
    }
}