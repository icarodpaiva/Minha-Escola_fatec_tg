import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSubscribeTopics} from './src/hooks/useSubscribeTopics';
import {useNotificationListener} from './src/hooks/useNotificationListener';
import {requestUserPermission} from './src/utils/requestUserPermission';
import {formatDate} from './src/utils/formatDate';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<any>(null);
  const [classes, setClasses] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>(null);

  useSubscribeTopics(
    classes?.map((classItem: any) => String(classItem.id)) || [],
  );
  useNotificationListener();

  useEffect(() => {
    const alreadyLogged = async () => {
      const storageAccessToken = await AsyncStorage.getItem('access_token');

      console.log(storageAccessToken);

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

          if (!response.ok) {
            setAccessToken('');
            setUser(null);
            return;
          }

          const data = await response.json();

          setUser(data);
        } catch (error) {
          console.log(error);

          setAccessToken('');
          setUser(null);
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

          if (!response.ok) {
            setAccessToken('');
            setClasses(null);
            return;
          }

          const data = await response.json();

          setClasses(data);
        } catch (error) {
          console.log(error);

          setAccessToken('');
          setClasses(null);
        }
      };

      fetchClasses();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(
            'http://192.168.4.112:3000/notifications',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
              },
            },
          );

          if (!response.ok) {
            setAccessToken('');
            setNotifications(null);
            return;
          }

          const data = await response.json();

          setNotifications(data);
        } catch (error) {
          console.log(error);

          setAccessToken('');
          setNotifications(null);
        }
      };

      fetchNotifications();
    }
  }, [accessToken]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  const handleLogin = useCallback(async () => {
    console.log(email, password);

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

      if (!response.ok) {
        Alert.alert('Erro', 'Revise os dados e tente novamente.');

        setAccessToken('');
        await AsyncStorage.setItem('access_token', '');
        return;
      }

      const data = await response.json();

      console.log('data', data);

      setAccessToken(data.access_token);
      await AsyncStorage.setItem('access_token', data.access_token);
    } catch (error) {
      Alert.alert('Erro', 'Revise os dados e tente novamente.');

      setAccessToken('');
      await AsyncStorage.setItem('access_token', '');
    }
  }, [email, password]);

  const handleLogout = useCallback(async () => {
    setAccessToken('');
    setEmail('');
    setPassword('');
    setUser(null);
    setClasses(null);
    setNotifications(null);

    await AsyncStorage.setItem('access_token', '');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={styles.container}>
        {!accessToken ? (
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

            <Button onPress={handleLogin} title="Entrar" />
          </View>
        ) : (
          <View>
            <Button title="Sair" onPress={handleLogout} />
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
                <Text>Disciplina: {classItem.subject}</Text>
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

        {notifications && (
          <View style={styles.section}>
            <Text>Notificações:</Text>

            {notifications.map((notification: any) => (
              <View style={styles.section} key={notification.id}>
                <Text>Disciplina: {notification.subject}</Text>

                <Text>
                  Data e horário de recebimento:{' '}
                  {formatDate(notification.created_at)}
                </Text>

                <Text>Título: {notification.title}</Text>
                <Text>Mensagem: {notification.message}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  section: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 20,
  },
});
