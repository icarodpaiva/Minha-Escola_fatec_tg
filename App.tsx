import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSubscribeTopics} from './src/hooks/useSubscribeTopics';
import {useNotificationListener} from './src/hooks/useNotificationListener';
import {requestUserPermission} from './src/utils/requestUserPermission';

const topics = ['class1', 'class2'];

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<any>(null);
  const [classes, setClasses] = useState<any>(null);

  useSubscribeTopics(topics);
  useNotificationListener();

  useEffect(() => {
    const alreadyLogged = async () => {
      const storageAccessToken = await AsyncStorage.getItem('access_token');

      if (storageAccessToken) {
        setAccessToken(storageAccessToken);
      }
    };

    alreadyLogged();
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            'http://192.168.4.112:3000/users/profile',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
              },
            },
          );

          const data = await response.json();

          setUser(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const fetchClasses = async () => {
        try {
          const currentDay = new Date(Date.now()).getDay();

          const response = await fetch(
            `http://192.168.4.112:3000/classes?date=${currentDay}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
              },
            },
          );

          const data = await response.json();

          setClasses(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchClasses();
    }
  }, [accessToken]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  const login = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.4.112:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      setAccessToken(data.access_token);
      await AsyncStorage.setItem('access_token', data.access_token);
    } catch (error) {
      Alert.alert('Erro', 'Revise os dados e tente novamente.');
    }
  }, [email, password]);

  return (
    <SafeAreaView style={styles.container}>
      {!accessToken && (
        <View style={styles.section}>
          <Text>Autentique-se:</Text>

          <Text>E-mail:</Text>
          <TextInput
            onChangeText={setEmail}
            placeholder="E-mail"
            style={styles.section}
          />

          <Text>Senha:</Text>
          <TextInput
            onChangeText={setPassword}
            placeholder="Senha"
            style={styles.section}
          />

          <Button onPress={login} title="Entrar" />
        </View>
      )}

      {user && (
        <View style={styles.section}>
          <Text>Informações do usuário:</Text>

          <Text>Nome: {user.name}</Text>
          <Text>E-mail: {user.email}</Text>
          <Text>RA: {user.ar}</Text>
          <Text>CPF: {user.document}</Text>
        </View>
      )}

      {classes && (
        <View style={styles.section}>
          <Text>Aulas do dia:</Text>

          {classes.map((classItem: any) => (
            <View style={styles.section} key={classItem.id}>
              <Text>Matéria: {classItem.subject}</Text>
              <Text>Professor: {classItem.teacher}</Text>

              <Text>Prédio: {classItem.locations.building}</Text>
              <Text>Andar: {classItem.locations.floor}</Text>
              <Text>Sala de aula: {classItem.locations.classroom}</Text>

              <Text>
                Horário: {classItem.start_time} - {classItem.end_time}
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 20,
  },
});
