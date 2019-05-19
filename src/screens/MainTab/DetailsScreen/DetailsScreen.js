import React from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

import MainText from '../../../components/UI/mainText/mainText';
import Image from '../../../components/UI/Image/Image';
import Icon from '../../../components/TabBarIcon/TabBarIcon';
import LogoTitle from '../../../components/UI/LogoTitle/LogoTitle';

class DetailsScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    static navigationOptions = {
        title: "Details",
        headerRight: <LogoTitle />,
    };

    static propTypes = {
        navigation: PropTypes.object,
    }

    render (){
        
        return( 
            <ScrollView style={styles.Container}>
                
                <View style={styles.header}>
                    
                    <View>
                    
                        <Image image={null} /> 
                    
                    </View>
                    
                    <View>
                    
                        <MainText moreStyle={{fontSize: 21, fontFamily: 'Fjalla-one', color: '#2e3131'}}>Mohamed Helmy</MainText>
                    
                    </View>
                        
                    <View>
                        
                        <MainText moreStyle={{color: '#f6b810', fontSize: 18}} >Front End Developer</MainText>
                    
                    </View>
                
                </View>
                
                <View style={styles.wideContainer} >
                    
                    <View style={styles.wideContainerSubItem}>
                    
                        <Icon name='md-clock' focused={true} /> 
                    
                        <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>25-5-2019</MainText>
                    
                    </View>
                
                    <View style={styles.wideContainerSubItem}>
                        
                        <Icon name='md-checkmark-circle' focused={true} />
                        
                        <MainText moreStyle={{fontSize: 19, color: '#2e3131', marginLeft: 5}}>Valid</MainText>
                    
                    </View>
                
                </View>
                
                <View style={styles.bottemContainer}>
                    
                    <View style={styles.item}>
                        
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Address
                        </MainText> 
                        
                        <MainText moreStyle={{color: '#2e3131'}}>
                            Faqus
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Date Of Birth  
                        </MainText> 
                        
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            25-5-1997
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>                        
                            Single
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                        
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Nationality  
                        </MainText> 
                        
                        <MainText moreStyle={{color: '#2e3131'}}>
                            Egypt
                        </MainText>
                    
                    </View>
                
                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Gender 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            Male
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Identity Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            Valid
                        </MainText>
                    
                    </View>

                    <View style={styles.item}>
                    
                        <MainText moreStyle={{color: '#000', fontWeight: 'bold', fontSize: 16, width: 150}}>
                            Illness Status 
                        </MainText> 
                    
                        <MainText moreStyle={{color: '#2e3131'}}>
                            Valid
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