import { 
  SYNC_USER, 
  LOGIN_FAILURE, 
  LOGOUT_FAILURE, 
  SIGNUP_FAILURE,
  CONFIRM_PASSWORD_FAILURE,
  RESET_PASSWORD_FAILUR 
} from '../actions/actionTypes';

const initialState = {
  user: '',
  message: '',
};

const authReducer  = (state = initialState, action) => {
  switch(action.type) {
    case SYNC_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: `Login In error ${action.payload.error.message}`
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        message: `Sign Up error ${action.payload.error.message}`
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        message: `Logout error ${action.payload.error.message}`
      };
    case CONFIRM_PASSWORD_FAILURE:
      return {
        ...state,
        message: `Confirm password error ${action.payload.error.message}`  
      };
    case RESET_PASSWORD_FAILUR:
      return {
        ...state,
        message: `Reset password error ${action.payload.error.message}`
      }      
    default:
      return state;       
  }
};

export default authReducer;