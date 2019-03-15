import React from 'react';
import { View, StyleSheet } from 'react-native';

import Heading from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/mainText/mainText';

export default class Stats extends React.Component {
  static navigationOptions = {
    title: 'Stats'
  }; 

  state= {
    Data: {
      CriminalRecord: {
        total: 1000,
        Valid: 600,
        Invalid: 400
      },
      Identity: {
        total: 500,
        Valid: 300,
        Invalid: 200
      },
      ForbiddenTravellers: {
        total: 700,
        pass: 500,
        fail: 200
      }
    }
  }

  render() {
    return (
      
      <View style={styles.container}>
          
          <View style={styles.headerContainer}>
                 <View style={{backgroundColor: '#f6b810', width: 250, height: 30, alignItems: 'center'}}>
                    <MainText moreStyle={{fontSize: 20, justifyContent: 'center'}}>Day</MainText>
                 </View>
          </View>
          
          <View style={styles.bodyContainer}>
            
            <View style={styles.itemContainer}>
               
              <View style={styles.Item}>
                <Heading size={25} >Criminal Record</Heading>
                <MainText moreStyle={{color: '#f6b810', fontSize: 40}}>{this.state.Data.CriminalRecord.total}</MainText>
              </View>
               
              <View style={styles.details}>
                <View style={styles.details}>
                    <MainText> Valid :</MainText>
                    <MainText>   {this.state.Data.CriminalRecord.Invalid}   </MainText>
                </View>
                <View style={styles.details}>
                    <MainText>  InValid :</MainText>
                    <MainText> {this.state.Data.CriminalRecord.Invalid}  </MainText>
                </View>
              </View>

            </View>

            <View style={styles.itemContainer}>
               
              <View style={styles.Item}>
                <Heading size={25} >  Check Identity  </Heading>
                <MainText moreStyle={{color: '#f6b810', fontSize: 40}}>  {this.state.Data.Identity.total}  </MainText>
              </View>
               
              <View style={styles.details}>
                
                <View style={styles.details}>
                    <MainText> Valid :</MainText>
                    <MainText> {this.state.Data.Identity.Invalid} </MainText>
                </View>
                
                <View style={styles.details}>
                    <MainText> Invalid :</MainText>
                    <MainText>  {this.state.Data.Identity.Invalid}  </MainText>
                </View>
              
              </View>

            </View>

            <View style={styles.itemContainer}>
               
              <View style={styles.Item}>
              
                <Heading size={25} >Travelers</Heading>
                <MainText moreStyle={{color: '#f6b810', fontSize: 40}}> {this.state.Data.ForbiddenTravellers.total} </MainText>
              
              </View>
               
              <View style={styles.details}>
                <View style={styles.details}>
                    <MainText>Pass :</MainText>
                    <MainText> {this.state.Data.ForbiddenTravellers.pass} </MainText>           
                </View>
               
                <View style={styles.details}>
                    <MainText>Fail :</MainText>
                    <MainText>{this.state.Data.ForbiddenTravellers.fail} </MainText>
                </View>
              </View>

            </View> 
          
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#faf8fb',
    alignItems: 'center'
  },
  headerContainer: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10
  },
  selectBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  bodyContainer: {
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  itemContainer: {
    marginTop: 5,
    marginBottom: 10
  },
  Item: {
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  }
});
