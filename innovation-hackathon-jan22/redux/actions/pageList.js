import  { 
GET_PAGE_LIST_SUCCESS,
GET_PAGE_LIST_REQUEST,
GET_PAGE_LIST_FAILURE
} from '../constants/index';

const axios = require('axios');



export function getPageList() {
    return async (dispatch) => {
        dispatch(setPageListRequest())
        let  apiReq = []
            
                await axios
                .get('https://dummy.restapiexample.com/api/v1/employees')
                .then(async function (response) {
                apiReq = response.data.data
                await dispatch(setPageListSuccess(apiReq));
                return apiReq || []
             })
            .catch(error =>{
                console.log(error);
                dispatch(setPageListFailure(error.message))
                return error
            });
    };
}

export const setPageListSuccess = pageList => {
    return {
        type: GET_PAGE_LIST_SUCCESS,
        payload: pageList,
    };
}



export const setPageListRequest = () => {
    return {
      type: GET_PAGE_LIST_REQUEST,
    }
  }
  
  export const setPageListFailure = error => {
    return {
      type: GET_PAGE_LIST_FAILURE,
      payload: error,
    }
  }