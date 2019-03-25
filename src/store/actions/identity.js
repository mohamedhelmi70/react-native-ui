import { 
    ADD_CRIMINALRECORD , 
    ADD_RECORD , 
    ADD_IMAGE,
    CHECK_CRIMINALRECORD, 
    ADD_FINGERPRINT, 
    CHECK_IDENTITY,
    CHECK_FORBIDDENTRAVELLER
} from './actionTypes'

export const addFingerprint = fingerprint => {
    return {
        type: ADD_FINGERPRINT,
        fingerprint: fingerprint
    };
};

export const checkCriminalRecord = () => {
    return {
        type: CHECK_CRIMINALRECORD,
    };
};

export const checkIdentity = () => {
    return {
        type: CHECK_IDENTITY,
    };
};

export const checkForbiddenTraveller = () => {
    return {
        type: CHECK_FORBIDDENTRAVELLER,
    };
};

export const addCriminalRecord = criminalrecord => {
    return {
        type: ADD_CRIMINALRECORD,
        criminalrecord: criminalrecord
    };
};

export const addRecord = record => {
    return {
        type: ADD_RECORD,
        record: record
    };
};

export const addImage = image => {
    return {
        type: ADD_IMAGE,
        image: image
    };
};