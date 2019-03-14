import { ADD_CRIMINALRECORD , ADD_RECORD , ADD_IMAGE } from '../actions/actionTypes';

const initialState = {
   criminalImage: null,
   record: null,
   image: null
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
       case CHECK_CRIMINALRECORD:
        return {
            ...state,
            criminalImage: {
                uri: action.image.uri
            }  
        };
       case CHECK_RECORD:
        return {
            ...state,
            record: {
                source: ""
            }
        };
       case CHECK_IMAGE:
        return {
            ...state,
            image: {
                uri: action.image.uri
            }
        }  
       default:
        return state;
   }
}

export default reducer;