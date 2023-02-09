import { actions, handleLocalStorage } from "./";

  export const updateFromLocalStorage = (dispatch) => {
    const storage = handleLocalStorage();
    dispatch({ type: actions.updateFromLocalStorage, payload: storage })
  };
