
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'Fetch_Data':
            return action.payload;
        default:
            return state;
    }
}
