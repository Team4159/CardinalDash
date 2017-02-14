const array = (prefix) => (state = {}, action) => {
    if (action.error) {
        return state;
    }
    switch (action.type) {
        case `${prefix}_ADD`:
            return [
                ...state,
                {...action.payload}
            ];
        case `${prefix}_RESET`:
            return {};
        default:
            return state;
    }
};

export default array;

export const getStore = (store) => store;
