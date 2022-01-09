import  { 
    LOGIN_STORE_SUCCESS,
    LOGIN_STORE_REQUEST,
    LOGIN_STORE_FAILURE
    } from '../constants/index';
    
    const axios = require('axios');
    
    
    
    export function loginStoreAction(payload) {
        //alert(JSON.stringify(payload))
        
        return async (dispatch) => {
            dispatch(loginStoreRequest())
            let  apiResponse = {}
            const headers = {
                'Content-Type': 'application/json',
              }
                
                    await axios
                    .post('http://3.134.83.186/api/v1/user/login',
                    payload,
                    {
                        headers: headers
                    }
                    )
                    .then(async function (response) {
                        console.log('resoinder',response)
                        apiResponse = response
                    await dispatch(loginStoreSuccess(apiResponse));
                    return apiResponse || {}
                 })
                .catch(error =>{
                    console.log(error);
                    dispatch(loginStoreFailure(error.message))
                    return error
                });
        };
    }
    
    export const loginStoreSuccess = Response => {
        return {
            type: LOGIN_STORE_SUCCESS,
            payload: Response,
        };
    }
    
    
    
    export const loginStoreRequest = () => {
        return {
          type: LOGIN_STORE_REQUEST,
        }
      }
      
      export const loginStoreFailure = error => {
        return {
          type: LOGIN_STORE_FAILURE,
          payload: error,
        }
      }