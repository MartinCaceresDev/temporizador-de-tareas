/**
 * 
 * @param {{speechAlertOn: boolean; tasks: any[]}} tasksApp - (Object)(optional) Receives data to save in local storage. 
 * @returns {{storage: {speechAlertOn: boolean; tasks: any[]}}} If tasksApp is sended, it saves in local storage and returns nothing. Otherwise returns data from local storage.
 */

export const handleLocalStorage = (tasksApp= null)=>{
  if (!tasksApp){
    const storage = !!JSON.parse(localStorage.getItem('tasksApp')) && JSON.parse(localStorage.getItem('tasksApp')) ;
    return storage;
  }
  localStorage.setItem('tasksApp', JSON.stringify(tasksApp));
};