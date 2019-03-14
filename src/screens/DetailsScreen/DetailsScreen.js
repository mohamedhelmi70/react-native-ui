import React from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView
} from 'react-native';

import MainText from '../../components/UI/mainText/mainText';
import Image from '../../components/UI/Image/Image';
import Icon from '../../components/TabBarIcon/TabBarIcon';

class DetailsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    state = {
        User: {
            name: 'Mohame Helmy Abdel Aziz',
            job: 'Student',
            address: 'Faqus',
            nationality: 'Egypt',
            birthdate: '25/1/1997',
            Gender: 'male',
            Status: 'Single',
            valid: 'valid',
            illnessStatus: 'Valid',
            identityStatus: 'Valid'
        },
        date: '27-5-218',
    };

    render (){
        return (
            <ScrollView style={styles.Container}>
                
                <View style={styles.header}>
                    
                    <View>
                       
                        <Image /> 
                    
                    </View>
                    
                    <View>
                    
                        <MainText moreStyle={{fontSize: 21, fontFamily: 'Fjalla-one', color: '#2e3131'}}>{this.state.User.name}</MainText>
                    
                    </View>
                        
                    <View>
                        
                        <MainText moreStyle={{color: '#f6b810', fontSize: 18}} >{this.state.User.job}</MainText>
                    
                    </View>
                
                </View>
                
                <View style={styles.wideContainer} >
                    
                    <View style={styles.wideContainerSubItem}>
                    
                        <Icon name='md-clock' focused={true} /> 
                     
                        <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>{this.state.date}</MainText>
                    
                    </View>
                   
                    <View style={styles.wideContainerSubItem}>
                        
                        <Icon name='md-checkmark-circle' focused={true} />
                        
                        <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>{this.state.User.valid}</MainText>
                    
                    </View>
                
                </View>
                
                <View style={styles.bottemContainer}>
                    
                    <View style={styles.item}>
                        
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Address
                        </MainText> 
                        
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.address}
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Date Of Birth  
                        </MainText> 
                        
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.birthdate}
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>                        
                            {this.state.User.Status}
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                        
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Nationality  
                        </MainText> 
                        
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.nationality}
                        </MainText>
                    
                    </View>
                
                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Gender 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.Gender}
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Identity Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.identityStatus}
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Illness Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            {this.state.User.illnessStatus}
                        </MainText>
                    
                    </View>

                </View>
            
            </ScrollView>
        );
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

export default DetailsScreen;