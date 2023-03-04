import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, TouchableOpacity, View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import AuthButton from './components/AuthButton';
import TabButton from './components/TabButton';
import Login from './screens/Login';
import { light } from './constants/theme';
import AppContext from './contexts/appContext';
import MenuProfile from './components/MenuProfile';
import AppNavigator from './AppNavigator';

export default function App() {
  const theme = light;
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const handleMenu = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.80,
      duration: 200,
      useNativeDriver: true
    }).start();
    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230,
      duration: 200,
      useNativeDriver: true
    }).start();
    setShowMenu(!showMenu);
  }
  const init = async () => {
    try {
      const userData = await AsyncStorage.getItem('@userData')
      const authToken = await AsyncStorage.getItem('@authToken')
      if (userData !== null && authToken) {
        let data = (JSON.parse(userData))
        setUser(data)
        // @ts-ignore
        setToken(authToken)
      }
    } catch (e) {
      setUser(null)
      setToken(null)
    }
  }
  useEffect(() => {
    init()
    return () => {
      setToken(null)
      setUser(null)
    };
  }, []);
  return (
    <AppContext.Provider value={{ theme: theme, token: token, setToken: setToken, user: user, setUser: setUser, }}>
      <NavigationContainer>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.primary, }]}>
          <StatusBar hidden={false} backgroundColor={showMenu ? theme.primary : theme.appBg} barStyle={'light-content'} />
          <View style={{ justifyContent: 'flex-start', padding: 15 }}>
            <MenuProfile handleMenu={handleMenu} />
            <View style={{ flexGrow: 1, marginTop: 20 }}>
              {token !== null ? <TabButton handleMenu={handleMenu} screen={'Home'} title={"Home"} family='ad' icon='home' /> : null}
              {token !== null ? <TabButton handleMenu={handleMenu} screen={'Products'} title={"Products"} family='ad' icon='car' /> : null}
              {token !== null && (user?.role == 'admin' || user?.role == 'editor') ? <TabButton handleMenu={handleMenu} screen={'NewProduct'} title={"New Product"} family='fi' icon='plus' /> : null}
              {token !== null && user?.role == 'admin' ? <TabButton handleMenu={handleMenu} screen={'Users'} title={"Users"} family='fa5' icon='users' /> : null}
              {token !== null && user?.role == 'admin' ? <TabButton handleMenu={handleMenu} screen={'NewUser'} title={"New User"} family='fi' icon='plus' /> : null}
              {token !== null && user?.role == 'admin' ? <TabButton handleMenu={handleMenu} screen={'Settings'} title={"Settings"} family='ii' icon='settings' /> : null}
            </View>
            <View>
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                paddingLeft: 7,
                marginTop: 10
              }}>
              </View>
              <AuthButton handleMenu={handleMenu} />
            </View>
          </View>
          {/* Screen View */}
          <Animated.View
            keyboardShouldPersistTaps={true}
            // @ts-ignore
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              flexGrow: 1,
              backgroundColor: 'white',
              borderRadius: (showMenu ? 15 : 0),
              overflow: (showMenu ? 'hidden' : null),
              transform: [
                { scale: scaleValue },
                { translateX: offsetValue }
              ]
            }}>
            <SafeAreaView style={{
              borderRadius: showMenu ? 15 : 0,
              flexGrow: 1,
              backgroundColor: theme.appBg,
              paddingTop: (Platform.OS === 'android' ? 0 : StatusBar.currentHeight),

            }}>
              {!token ?
                <Login /> :
                <>
                  <Header showMenu={showMenu} handleMenu={handleMenu} />
                  <AppNavigator />
                </>
              }
            </SafeAreaView>
          </Animated.View>
          {showMenu ?
            <Animated.View style={{
              flexGrow: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: showMenu ? 15 : 0,
              transform: [
                { scale: scaleValue },
                { translateX: offsetValue }
              ]
            }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={handleMenu}>
              </TouchableOpacity>
            </Animated.View> : null
          }
        </SafeAreaView>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

});