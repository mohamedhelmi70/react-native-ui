import { 
    ADD_CRIMINALRECORD , 
    ADD_RECORD , 
    ADD_IMAGE, 
    ADD_FINGERPRINT, 
    CHECK_CRIMINALRECORD, 
    CHECK_IDENTITY, 
    CHECK_FORBIDDENTRAVELLER 
} from '../actions/actionTypes';

const initialState = {
    criminalImage: {
       uri: null
    },
    fingerprint: {
       uri: null
    },
    record: {
       source: null
    },
    image: {
       uri: null
    },
    criminalRecordStatus: null,
    user: null
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
        case ADD_CRIMINALRECORD:
            return {
                ...state,
                criminalImage: {
                    uri: action.image.uri
                }  
            };
        case ADD_FINGERPRINT:
            return {
                ...state,
                fingerprint: {
                    uri: action.fingerprint.uri
                }
            }  
        case ADD_RECORD:
            return {
                ...state,
                record: {
                    source: ""
                }
            };
        case ADD_IMAGE:
            return {
                ...state,
                image: {
                    uri: action.image.uri
                }
            }
        case CHECK_CRIMINALRECORD:
            return {
                ...state,
                criminalRecordStatus: 'Valid'
            };
        case CHECK_IDENTITY:
            return {
                ...state,
                user: {
                    name: 'Mohame Helmy Abdel Aziz',
                    job: 'Student',
                    address: 'Faqus',
                    nationality: 'Egypt',
                    birthdate: '25/1/1997',
                    gender: 'male',
                    status: 'Single',
                    valid: 'valid',
                    illnessStatus: 'Valid',
                    identityStatus: 'Valid'
                },
            };
        case CHECK_FORBIDDENTRAVELLER:
            return {
                ...state,
                user: {
                    name: 'Mohame Helmy Abdel Aziz',
                    job: 'Student',
                    address: 'Faqus',
                    nationality: 'Egypt',
                    birthdate: '25/1/1997',
                    gender: 'male',
                    status: 'Single',
                    valid: 'valid',
                    illnessStatus: 'Valid',
                    identityStatus: 'Valid'
                },
            };             
        default:
            return state;
    }
}

export default reducer;