import { CHECK_CRIMINALRECORD ,CHECK_RECORD , CHECK_IMAGE } from './actionTypes'

export const checkCriminalRecord = (image) => {
    return {
        type: CHECK_CRIMINALRECORD,
        image: image
    };
};

export const checkRecord = (record) => {
    return {
        type: CHECK_RECORD,
        record: record
    };
};

export const checkImage = (image) => {
    return {
        type: CHECK_IMAGE,
        image: image
    };
};