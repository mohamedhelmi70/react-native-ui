import { AsyncStorage } from 'react-native';
import { uiStartLoading, uiStopLoading } from '../actions/index';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';

export const addAvatar = avatar => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://us-central1-fingerprintmakeslifeeasier.cloudfunctions.net/storeImage', {
            method: "POST",
            body: JSON.stringify({
                image: avatar.base64
            }),
            headers: {
                "Authorization": "Berar "
            }
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes); 
        });
    }
};


export const authSignin = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAP6RiwPmHGVSir7Q_x7kWJhWo_uD7gpyU", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken:true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication failed, please try again..!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if(parsedRes.error) {
                alert("Authentication failed, please try again..!");
            } else {
                dispatch(authStoreToken(parsedRes.idToken));
                props.navigation.navigate('App');
            }
        });
    }
};

export const authSignup = authData => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAP6RiwPmHGVSir7Q_x7kWJhWo_uD7gpyU", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication failed, please try again..!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if(parsedRes.idToken) {
                alert("Authentication failed, please try again..!");
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                props.navigation.navigate('App');
            }
        });
    }
}; 

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime + ( expiresIn * 1000 );
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDaye", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    };
};

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if(!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                .catch(() => reject())
                .then(tokenFromStorage => {
                    fetchedToken = tokenFromStorage;
                    if(!tokenFromStorage) {
                        reject();
                        return;
                    }
                   return AsyncStorage.getItem("ap:auth:expiryDate");
                })
                .then( expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if (parsedExpiryDate > now) {
                        dispatch(authSetToken(fetchedToken));
                        resolve(fetchedToken);
                    } else {
                        reject();
                    }
                })
                .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise.catch(err => {
            AsyncStorage.get("ap:auth:refreshToken")
            .then(refreshToken => {
                fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyAP6RiwPmHGVSir7Q_x7kWJhWo_uD7gpyU", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: "grant_type=refresh_token&refresh_token" + refreshToken,
                    
                })  
            })
            .then(parsedRes => {
                if (parsedRes.id_token) {
                    dispatch(authStoreToken(parsedRes.id_token, parsedRes.expiresIn, parsedRes.refreshToken));
                    return parsedRes.id_token;
                } else {
                    dispatch(authClearStorage());
                }
            })
            .then(token => {
                if(!token) {
                    throw new Error();
                } else {
                   return token;
                }
            })
        });
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => props.navigation.navigate('App'))
        .catch(error => console.log("failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return dispatch => {
        dispatch(AsyncStorage.remove("ap:auth:token"));
        dispatch(AsyncStorage.remove("ap:auth:expiresIn"));
    };
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
        .then(() => {
            props.navigation.navigate('Auth');
        });
        dispatch(authRemoveToken);
    }; 
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};