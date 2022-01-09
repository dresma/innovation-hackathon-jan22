import { CREATE_STORE_SUCCESS,
    CREATE_STORE_REQUEST,
    CREATE_STORE_FAILURE } from '../constants/index';
  
  
  
  const initialState = {
    loading: false,
    storeDetails: {},
    error: ''
  }
  
  const createStoreReducer = (state = initialState, action) => {
    console.log('action2',action)
    switch(action.type) {
      
      case CREATE_STORE_SUCCESS:
          //alert('3')
        return {
          loading: false,
          ...state,
          storeDetails: action.payload,
          error: ''
        };
  
        case CREATE_STORE_REQUEST:
          return {
            ...state,
            loading: true
          };
  
        case CREATE_STORE_FAILURE:
          return {
            loading: false,
            storeDetails: {},
            error: action.payload
          };
  
      default: return state;
    }
  }
  export default createStoreReducer;