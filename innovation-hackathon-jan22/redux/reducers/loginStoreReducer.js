import { LOGIN_STORE_SUCCESS,
    LOGIN_STORE_REQUEST,
    LOGIN_STORE_FAILURE } from '../constants/index';
  
  
  
  const initialState = {
    loading: false,
    loginInfo: {},
    error: ''
  }
  
  const loginStoreReducer = (state = initialState, action) => {
    console.log('action2',action)
    switch(action.type) {
      
      case LOGIN_STORE_SUCCESS:
          //alert('3')
        return {
          loading: false,
          ...state,
          loginInfo: action.payload,
          error: ''
        };
  
        case LOGIN_STORE_REQUEST:
          return {
            ...state,
            loading: true
          };
  
        case LOGIN_STORE_FAILURE:
          return {
            loading: false,
            loginInfo: {},
            error: action.payload
          };
  
      default: return state;
    }
  }
  export default loginStoreReducer;