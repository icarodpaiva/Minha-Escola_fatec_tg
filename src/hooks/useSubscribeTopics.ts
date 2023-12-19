import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const useSubscribeTopics = async (topics: string[]) => {
  useEffect(() => {
    topics.forEach(topic => {
      messaging().subscribeToTopic(topic);
    });

    return () => {
      topics.forEach(topic => {
        messaging().unsubscribeFromTopic(topic);
      });
    };
  }, [topics]);
};
