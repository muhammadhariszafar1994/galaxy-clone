import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import AppNavigation from './Src/Navigation/AppNavigation'; // correct path lagao

function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AppNavigation />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default App;