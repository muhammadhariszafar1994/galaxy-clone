import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
  SpeechStartEvent,
  SpeechEndEvent,
} from '@react-native-voice/voice';

const BuddySpeechToText = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: SpeechStartEvent) => {
    setStarted(true);
    console.log('Speech recognition started');
  };

  const onSpeechEnd = (e: SpeechEndEvent) => {
    setStarted(false);
    console.log('Speech recognition ended');
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResults(e.value ?? []);
    console.log('Speech results:', e.value);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error('Speech recognition error:', e.error);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for speech recognition.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
          return true;
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    return false;
  };

  const startRecognizing = async () => {
    const hasPermission = await requestPermissions();
    console.log('hasPermission', hasPermission)
    if (!hasPermission) return;

    try {
      await Voice.start('en-US');
      setRecognized('');
      setResults([]);
    } catch (e) {
      console.error('Error starting voice recognition:', e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Speech to Text</Text>
      {/* <Button
        onPress={started ? stopRecognizing : startRecognizing}
        title={started ? 'Stop Listening' : 'Start Listening'}
      /> */}
      <Button
        onPress={startRecognizing}
        title={'Listening'}
      />
      <Text style={{ marginTop: 20, fontSize: 18 }}>Results:</Text>
      {results.map((result, index) => (
        <Text key={index} style={{ fontSize: 16 }}>
          {result}
        </Text>
      ))}
    </View>
  );
};

export default BuddySpeechToText;
