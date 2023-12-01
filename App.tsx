import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {useNotificationListener} from './src/hooks/useNotificationListener';
import {requestUserPermission} from './src/utils/requestUserPermission';

export default function App() {
  useNotificationListener();

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
