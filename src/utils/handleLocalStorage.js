export const handleLocalStorage = (tasksApp)=>{
  if (!tasksApp){
    const storage = JSON.parse(localStorage.getItem('tasksApp'));
    return storage;
  }
  localStorage.setItem('tasksApp', JSON.stringify(tasksApp));
};