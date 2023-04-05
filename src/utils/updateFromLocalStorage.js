import { actions, handleLocalStorage } from "./";

/**
 * 
 * @param {Function} dispatch - (Function) Dispatch.
 * @returns {Void} (Void) Gets data from local storage and updates the state accordingly.
 */

  export const updateFromLocalStorage = (dispatch) => {
    const storage = handleLocalStorage();
    dispatch({ type: actions.updateFromLocalStorage, payload: storage })
  };
