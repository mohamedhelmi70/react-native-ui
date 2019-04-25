import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as  theme  from '../../../constants/Theme/Theme';

import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';
import PickImage from '../../../components/PickImage/PickImage';
import PicKRecord from '../../../components/PickRecord/PickRecord';
import { ButtonD , Block, Text } from '../../../components/UI/index';

class IdentityScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            active: 'Fingerprint',
            Fingerprint: false,
            Image: false,
            Record: false,
            controls: {
                imagePicked: {
                    value: null,
                    valid: false
                },
                fingerprintPicked: {
                    value: null,
                    valid: false
                },
                recordPicked: {
                    value: null,
                    valid: false
                },
            }
        };
    };

    static navigationOptions = {
        title: "Identity",
        headerRight: <LogoTitle />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    pickImageHandler = image => {
        this.setState(prevState => {
            return {
               controls: {
                    ...prevState.controls,
                    imagePicked: {
                        value: image,
                        valid: true
                    }
               }    
            };
        });
    };

    pickFingerprintHandler = fingerprint => {
        this.setState(prevState => {
            return {
               controls: {
                    ...prevState.controls,
                    fingerprintPicked: {
                        value: fingerprint,
                        valid: true
                    }
               }    
            };
        });
    };
     
    checkIdentityHandler = async () => {
        this.props.navigation.navigate('details');
    }

    renderTab = tab => {
        const { active } = this.state;
        const isActive = active === tab;
    
        return (
          <TouchableOpacity
            key={`tab-${tab}`}
            onPress={() => this.handleTab(tab)}
            style={[
              styles.tab,
              isActive ? styles.active : null
            ]}
          >
            <Text size={16} medium gray={!isActive} primary={isActive}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
    }

    handleTab = tab => {
        if ( tab === 'Fingerprint' ){
           this.setState(prevState => {
                return {
                   ...prevState,
                   fingerprint: true, 
                   image: false,
                   record: false,
                }
           })
        } else if (tab === 'Take Selfie' ) {
            this.setState(prevState => {
                return {
                   ...prevState,
                   fingerprint: false, 
                   image: true,
                   record: false,
                }
           })
        } else {
            this.setState(prevState => {
                return {
                   ...prevState,
                   fingerprint: false, 
                   image: false,
                   record: true, 
                }
           })
        }
    }
    
    render() {

        const tabs = ['Fingerprint', 'Take Selfie', 'Pick Record']; 
        
        const Fingerprint = null;
        if (fingerprint) {
            Fingerprint = (
                <Block center shadow>
                    <PickImage text="Capture image of your fingerprint" wth={'80%'} hht={150} onImagePicked={this.pickFingerprintHandler} />
                </Block>  
            );
        }
        const Image = null;
        if (image) {
            Image =  (
                <Block center shadow>
                    <PickImage text="Take Selfie" wth={'60%'} hht={160} onImagePicked={this.pickImageHandler} />
                </Block>
            );    
        }
        const record = null;
        if (record){
            Record =  (
                <Block center shadow>
                    <PicKRecord />
                </Block> 
            );
        }
        
        return (
            
            <Block>

                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>
                 
                <Block middle style={styles.mid}>
                     
                        { Fingerprint }
                        { Image }
                        { Record }
                        
                        <ButtonD gradient
                            onPress={() => this.checkIdentityHandler} 
                            disabled={
                                !this.state.controls.fingerprintPicked.valid &&
                                !this.state.controls.imagePicked.valid &&
                                !this.state.controls.recordPicked.valid 
                            }
                        >
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold black center>Check Identity</Text>
                            }
                        </ButtonD>           

                </Block>
     
            </Block>
       );
    }
}

const styles = StyleSheet.create({
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.tintColor,
        borderBottomWidth: 3,
    },
    mid: {
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5,
    },
});

export default IdentityScreen;