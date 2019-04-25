import React from 'react';
import {
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  View,
} from 'react-native';
import { Audio, FileSystem, Permissions, Asset } from 'expo';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

export const ICON_RECORD_BUTTON = new Icon(require('../../assets/images/record_button.png'), 30, 30);
export const ICON_RECORDING = new Icon(require('../../assets/images/record_icon.png'), 30, 30);

export const ICON_PLAY_BUTTON = new Icon(require('../../assets/images/play_button.png'), 30, 30);
export const ICON_PAUSE_BUTTON = new Icon(require('../../assets/images/pause_button.png'), 30, 30);
export const ICON_STOP_BUTTON = new Icon(require('../../assets/images/stop_button.png'), 30, 30);

export const ICON_MUTED_BUTTON = new Icon(require('../../assets/images/muted_button.png'), 30, 30);
export const ICON_UNMUTED_BUTTON = new Icon(require('../../assets/images/unmuted_button.png'), 30, 30);

export const ICON_TRACK_1 = new Icon(require('../../assets/images/track.png'), 166, 5);
export const ICON_THUMB_1 = new Icon(require('../../assets/images/thumb.png'), 30, 30);
export const ICON_THUMB_2 = new Icon(require('../../assets/images/thumb.png'), 30, 30);

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 2.0;
const BACKGROUND_COLOR = '#fff';

class PickRecord extends React.Component {
  
  constructor(props) {
    super(props);
    this.recording = '';
    this.sound = '';
    this.isSeeking = '';
    this.shouldPlayAtEndOfSeek = '';
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: '',
      soundDuration: '',
      recordingDuration: '',
      shouldPlay: '',
      isPlaying: '',
      isRecording: '',
      shouldCorrectPitch: '',
      volume: 1.0,
      rate: 1.0,
    };

    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
    this.recordingSettings.android['maxFileSize'] = 12000;
  }

  componentDidMount() {
    this.askForPermissions();
  }

  askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        alert(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this.stopRecordingAndEnablePlayback();
      }
    }
  };

  async stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this.updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync();
    this.setState({
      isLoading: false,
    });
  }

  async stopRecordingAndEnablePlayback() {
    
    this.setState({
      isLoading: true,
    });
    
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      alert(`${error.message}`)
    }
    
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    const { sound } = await this.recording.createNewLoadedSound(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this.updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  onRecordPressed = () => {
    if (this.state.isRecording) {
      this.stopRecordingAndEnablePlayback();
    } else {
      this.stopPlaybackAndBeginRecording();
    }
  };

  onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        alert(`${error.message}`);
      }
    }
  };

  onRateSliderSlidingComplete = async value => {
    this.trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  onPitchCorrectionPressed = async value => {
    this.trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this.getMMSSFromMillis(this.state.soundPosition)} / ${this.getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this.getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this.getMMSSFromMillis(0)}`;
  }

  render() {
    return  !this.state.haveRecordingPermissions ? (
      
      <View style={styles.container}>
        <View />
          <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
            You must enable audio recording permissions in order to use this app.
          </Text>
        <View />
      </View> ) : 
      (
        <View style={styles.container}>
          
          <View style={[ styles.halfScreenContainer, { opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0 }, ]}>
          
            <View style={styles.recordingContainer}>
              
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={styles.wrapper} onPress={this.onRecordPressed} disabled={this.state.isLoading}>

                <Image style={styles.image} source={ICON_RECORD_BUTTON.module} />

              </TouchableHighlight>
             
              <View style={styles.recordingDataContainer}>

                <Text style={[styles.liveText, { fontFamily: 'cutive-mono-regular' }]}>
                  {this.state.isRecording ? 'LIVE' : ''}
                </Text>

                <View style={styles.recordingDataRowContainer}>
                  
                  <Image style={[styles.image, { opacity: this.state.isRecording ? 1.0 : 0.0 }]} source={ICON_RECORDING.module} />

                  <Text style={[styles.recordingTimestamp, { fontFamily: 'cutive-mono-regular' }]}> {this.getRecordingTimestamp()} </Text>
              
                </View>
                
              </View>

            </View>
  
          </View>
       
          <View
            style={[
              styles.halfScreenContainer, 
              { 
                opacity: !this.state.isPlaybackAllowed || this.state.isLoading ? DISABLED_OPACITY : 1.0 
              },
            ]}>
    
            <View style={styles.playbackContainer}>
           
              <Slider
                style={styles.playbackSlider}
                trackImage={ICON_TRACK_1.module}
                thumbImage={ICON_THUMB_1.module}
                value={this.getSeekSliderPosition()}
                onValueChange={this.onSeekSliderValueChange}
                onSlidingComplete={this.onSeekSliderSlidingComplete}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
              />

              <Text style={[styles.playbackTimestamp, { fontFamily: 'cutive-mono-regular' }]}> {this.getPlaybackTimestamp()} </Text>

            </View>

            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}>
            
              <View style={styles.volumeContainer}>
             
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onMutePressed}
                  disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                  
                  <Image style={styles.image} source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module} />

                </TouchableHighlight>
                
                <Slider
                  style={styles.volumeSlider}
                  trackImage={ICON_TRACK_1.module}
                  thumbImage={ICON_THUMB_2.module}
                  value={1}
                  onValueChange={this.onVolumeSliderValueChange}
                  disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
                />

              </View>

              <View style={styles.playStopContainer}>
                
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this.onPlayPausePressed}
                  disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                  
                  <Image style={styles.image} source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module} />

                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this.onStopPressed}
                  disabled={!this.state.isPlaybackAllowed || this.state.isLoading} >
                  
                  <Image style={styles.image} source={ICON_STOP_BUTTON.module} />
                
                </TouchableHighlight>

              </View>
                         
            </View>

            <View style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
              
              <Text style={[styles.timestamp, { fontFamily: 'cutive-mono-regular' }]}>Rate:</Text>
              
              <Slider
                style={styles.rateSlider}
                trackImage={ICON_TRACK_1.module}
                thumbImage={ICON_THUMB_1.module}
                value={this.state.rate / RATE_SCALE}
                onSlidingComplete={this.onRateSliderSlidingComplete}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
              />

              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this.onPitchCorrectionPressed}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                
                <Text style={[{ fontFamily: 'cutive-mono-regular' }]}> PC: {this.state.shouldCorrectPitch ? 'yes' : 'no'} </Text>

              </TouchableHighlight>
            
            </View>
                      
          </View>
       
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    minHeight: 200,
    maxHeight: 200,
    width: '80%',
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 100,
    maxHeight: 100,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
    minWidth: ICON_RECORD_BUTTON.width * 3.0,
    maxWidth: ICON_RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORDING.height,
    maxHeight: ICON_RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {
    color: LIVE_COLOR,
  },
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
    maxWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: { width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: { width: DEVICE_WIDTH / 2.0 },
});

export default PickRecord;