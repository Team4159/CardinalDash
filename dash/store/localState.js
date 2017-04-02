export const saveState = (state) => {
    try {
        const stateCopy = { ...state };
        delete stateCopy.routing;
        delete stateCopy.status;
        const stringifiedState = JSON.stringify({
            ...stateCopy
        });
        localStorage.setItem("state", stringifiedState);
    } catch (e) {
        console.error(e);
    }
};

export const loadState = () => {
    try {
        const stringifiedState = localStorage.getItem("state");
        const state = JSON.parse(stringifiedState);
        return state;
    } catch (e) {
        console.error(e);
        return null;
    }
};
