export const saveStateToLocalStorage = (state:any) => {
  let amazonStr = localStorage.getItem('amazonYT');

  let amazonYT;

  if(amazonStr) {
    amazonYT = JSON.parse(amazonStr);
  } else {
    amazonYT = {};
  }
  
  amazonYT = { ...amazonYT, ...state };
  localStorage.setItem('amazonYT', JSON.stringify(amazonYT));
};

