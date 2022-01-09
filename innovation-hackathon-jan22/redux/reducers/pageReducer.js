import { GET_PAGE_LIST_SUCCESS,
  GET_PAGE_LIST_REQUEST,
  GET_PAGE_LIST_FAILURE } from '../constants/index';



const initialState = {
  loading: false,
  pageList: [],
  error: ''
}

const pageReducer = (state = initialState, action) => {
  console.log('action2',action)
  switch(action.type) {
    
    case GET_PAGE_LIST_SUCCESS:
      return {
        loading: false,
        ...state,
        pageList: action.payload,
        error: ''
      };

      case GET_PAGE_LIST_REQUEST:
        return {
          ...state,
          loading: true
        };

      case GET_PAGE_LIST_FAILURE:
        return {
          loading: false,
          pageList: [],
          error: action.payload
        };

    default: return state;
  }
}
export default pageReducer;