import  { 
    CREATE_STORE_SUCCESS,
    CREATE_STORE_REQUEST,
    CREATE_STORE_FAILURE
    } from '../constants/index';
    
    const axios = require('axios');
    
    
    
    export function createStoreAction(payload) {
        //alert(JSON.stringify(payload))
        
        return async (dispatch) => {
            dispatch(createStoreRequest())
            let  apiResponse = {}
            const headers = {
                'Content-Type': 'application/json',
              }
                
                    await axios
                    .post('http://3.134.83.186/api/v1/user/createStore',
                    payload,
                    {
                        headers: headers
                    }
                    )
                    .then(async function (response) {
                        console.log('resoinder',response)
                        apiResponse = response
                    await dispatch(createStoreSuccess(apiResponse));
                    return apiResponse || {}
                 })
                .catch(error =>{
                    console.log(error);
                    dispatch(createStoreFailure(error.message))
                    return error
                });
        };
    }
    
    export const createStoreSuccess = Response => {
        return {
            type: CREATE_STORE_SUCCESS,
            payload: Response,
        };
    }
    
    
    
    export const createStoreRequest = () => {
        return {
          type: CREATE_STORE_REQUEST,
        }
      }
      
      export const createStoreFailure = error => {
        return {
          type: CREATE_STORE_FAILURE,
          payload: error,
        }
      }