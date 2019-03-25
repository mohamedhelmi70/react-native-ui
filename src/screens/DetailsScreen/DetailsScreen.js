import React from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';

import MainText from '../../components/UI/mainText/mainText';
import Image from '../../components/UI/Image/Image';
import Icon from '../../components/TabBarIcon/TabBarIcon';

class DetailsScreen extends React.Component {
    
    static navigationOptions = {
        title: "Details",
    };
    
    state = {
        date: new Date()
    };

    render (){
        
            if (this.props.isLoading) {
                return ( <ActivityIndicator size="small" color="#f6b810" /> );
            } else {
                return( 
                    <ScrollView style={styles.Container}>
                        
                        <View style={styles.header}>
                            
                            <View>
                            
                                <Image /> 
                            
                            </View>
                            
                            <View>
                            
                                <MainText moreStyle={{fontSize: 21, fontFamily: 'Fjalla-one', color: '#2e3131'}}>{this.props.name}</MainText>
                            
                            </View>
                                
                            <View>
                                
                                <MainText moreStyle={{color: '#f6b810', fontSize: 18}} >{this.props.job}</MainText>
                            
                            </View>
                        
                        </View>
                        
                        <View style={styles.wideContainer} >
                            
                            <View style={styles.wideContainerSubItem}>
                            
                                <Icon name='md-clock' focused={true} /> 
                            
                                <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>{this.state.date}</MainText>
                            
                            </View>
                        
                            <View style={styles.wideContainerSubItem}>
                                
                                <Icon name='md-checkmark-circle' focused={true} />
                                
                                <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>{this.props.valid}</MainText>
                            
                            </View>
                        
                        </View>
                        
                        <View style={styles.bottemContainer}>
                            
                            <View style={styles.item}>
                                
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Address
                                </MainText> 
                                
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.address}
                                </MainText>
                            
                            </View>

                            <View style={styles.item}>    
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Date Of Birth  
                                </MainText> 
                                
                            
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.birthdate}
                                </MainText>
                            
                            </View>

                            <View style={styles.item}>
                            
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Status 
                                </MainText> 
                            
                                <MainText moreStyle={{color: '#2e3131'}}>                        
                                    {this.props.Status}
                                </MainText>
                            
                            </View>

                            <View style={styles.item}>
                                
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Nationality  
                                </MainText> 
                                
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.nationality}
                                </MainText>
                            
                            </View>
                        
                            <View style={styles.item}>
                            
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Gender 
                                </MainText> 
                            
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.gender}
                                </MainText>
                            
                            </View>

                            <View style={styles.item}>
                            
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Identity Status 
                                </MainText> 
                            
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.identityStatus}
                                </MainText>
                            
                            </View>

                            <View style={styles.item}>
                            
                                <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                                    Illness Status 
                                </MainText> 
                            
                                <MainText moreStyle={{color: '#2e3131'}}>
                                    {this.props.illnessStatus}
                                </MainText>
                            
                            </View>

                        </View>
                    
                    </ScrollView>
               );    
            }
    }
}

const styles = StyleSheet.create({
    Container: {
       flex: 1,
       backgroundColor: '#faf8fb',
       padding: 10
    },
    header: {
        alignItems: 'center',
        marginTop: 20
    },
    wideContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#FDFDEB',
        height: 60,
        width: '100%',
        marginTop: 10
    },
    wideContainerSubItem: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    bottemContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20
    },
    item: {
        flexDirection: 'row',
        alignItems: 'baseline',
        padding: 5,
    }
});

const mapStateToProps = state => {
    return {
        name: state.identity.user.name,
        job: state.identity.user.job,
        address: state.identity.user.address,
        nationality: state.identity.user.nationality,
        birthdate: state.identity.user.birthdate,
        gender: state.identity.user.gender, 
        status: state.identity.user.status, 
        valid: state.identity.user.valid, 
        illnessStatus: state.identity.user.illnessStatus, 
        identityStatus: state.identity.user.identityStatus, 
        isLoading: state.ui.isLoading
    };
};

export default connect(mapStateToProps)(DetailsScreen);