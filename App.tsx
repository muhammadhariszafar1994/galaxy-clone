/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import Welcome from './src/screens/public/Welcome';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import BuddyFullPageLoading from './src/components/BuddyFullPageLoading';
import Navigation from './src/navigation';
import FlashMessage from 'react-native-flash-message';
import { setLoading } from './src/store/reducers/auth';

enableScreens();

function App(): React.JSX.Element {
  useEffect(() => {
    store.dispatch(setLoading(false));
  }, [])

  return (
    <>
      <Provider store={store}>
          <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              
              {
                store.getState().auth.loading ?
                  <BuddyFullPageLoading />
                :
                  <>
                    <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
                    <Navigation />
                    <FlashMessage position="top" />
                  </>
              }
              
            </KeyboardAvoidingView>
          </SafeAreaView>
      </Provider>
    </>
  );
}

export default App;
