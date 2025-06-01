import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, View, Image, Text, StyleSheet, Alert } from 'react-native';
import { colors, screenWidth } from '../../utils/Constants';
import Home from '../../screens/private/Home';
import Question from '../../screens/private/Question';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/reducers/auth';
import ChangePasswordSuccessfully from '../../screens/private/ChangePasswordSuccessfully';
import Profile from '../../screens/private/Profile';
import ChangePassword from '../../screens/private/ChangePassword';
import { confirmSignOutVisibilityAction, reportToManagementAction, shareFeedbackAction } from '../../store/reducers/popups';
import { store } from '../../store/store';
import Popups from '../../popups/private/Popups';
import { resetStream } from '../../store/reducers/stream';
import SessionHistory from '../../screens/private/SessionHistory';
import { resetSessionHistory } from '../../store/reducers/sessions';
import PreferredLanguage from '../../screens/public/PreferredLanguage';

const Drawer = createDrawerNavigator();

const PrivateNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const { query, response, followUp, references, documents } = useSelector(state => state.stream);

  const initialRoute = userDetails && userDetails?.isFirstLogin ? 'change-password' : 'preferred-language';
  
  const plusPress = () => {
    
    dispatch(resetStream());
    dispatch(resetSessionHistory());


    navigation.navigate('home');
  }

  return (
    <>
      <Drawer.Navigator
        // initialRouteName="home"
        initialRouteName={initialRoute}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.lightgray,
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            shadowRadius: 0, // iOS
            shadowOffset: { height: 0, width: 0 }, // iOS
            shadowColor: 'transparent',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          sceneContainerStyle: {
            backgroundColor: colors.lightgray,
          },
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.white,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                style={{ marginLeft: 15 }}
              >
                <Image
                  source={require('./../../assets/images/other-options.png')}
                  style={{ width: 25, height: 25, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </>
          ),
          headerRight: () => (
            <>
              <View style={{ flexDirection: 'row', gap: 5, marginRight: 15 }}>
                <TouchableOpacity onPress={() => plusPress()}>
                  <Image
                    source={require('./../../assets/images/plus-sign.png')}
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Bell pressed')}>
                  <Image
                    source={require('./../../assets/images/bell.png')}
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>
            </>
          ),
        }}
      >
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="question" component={Question} />
        <Drawer.Screen name="change-password" component={ChangePassword} />
        <Drawer.Screen name="change-password-successfully" component={ChangePasswordSuccessfully} />
        <Drawer.Screen name="profile" component={Profile} />
        <Drawer.Screen name="session-history" component={SessionHistory} />
        <Drawer.Screen name="preferred-language" component={PreferredLanguage} />
      </Drawer.Navigator>
      
      
    </>
  );
};

const CustomDrawerContent = (props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const plusPress = () => {
    dispatch(resetStream());
    dispatch(resetSessionHistory());
    navigation.navigate('home');
  }

  return (
    <View style={[styles.drawerWrapper]}>
      <DrawerContentScrollView keyboardShouldPersistTaps="handled">
        {/* Toggle Button inside Drawer */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image
              source={require('./../../assets/images/other-options.png')} // <-- Replace with your logo
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('./../../assets/images/logo.png')} // <-- Replace with your logo
            style={{ width: screenWidth * 0.6, height: 40, resizeMode: 'contain' }}
          />
        </View>

        <View style={styles.menuSection}>
          {/* <CustomDrawerItem
            label="23/01/25"
            icon={require('./../../assets/images/date-icon.png')}
            onPress={() => console.log('Date')}
          /> */}

          <CustomDrawerItem
            label="Start New Session"
            icon={require('./../../assets/images/start-new-session.png')}
            onPress={() => plusPress()}
          />
          
          <CustomDrawerItem
            label="Session History"
            icon={require('./../../assets/images/session-history.png')}
            onPress={() => navigation.navigate('session-history')}
          />

          {/* <CustomDrawerItem
            label="Training and certification"
            icon={require('./../../assets/images/training-and-certification.png')}
            onPress={() => console.log('Training')}
          /> */}

          <CustomDrawerItem
            label="Report to management"
            icon={require('./../../assets/images/training-and-certification.png')}
            onPress={() => dispatch(reportToManagementAction(true))}
          />

          {/* <CustomDrawerItem
            label="Share Feedback"
            icon={require('./../../assets/images/training-and-certification.png')}
            onPress={() => dispatch(shareFeedbackAction(true))}
          /> */}

          {/* Settings with expandable submenu */}
          <TouchableOpacity style={styles.menuItem} onPress={() => setSettingsOpen(!settingsOpen)}>
            <Image source={require('./../../assets/images/settings.png')} style={styles.icon} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          {settingsOpen && (
            <View style={{ marginLeft: 40 }}>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('profile')}>
                <Text style={styles.subMenuText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('change-password')}>
                <Text style={styles.subMenuText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.menuItem} onPress={() => dispatch(confirmSignOutVisibilityAction(true))}>
          <Image source={require('./../../assets/images/signout.png')} style={styles.icon} />
          <Text style={styles.menuText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('preferred-language')}>
          <Image source={require('./../../assets/images/globe.png')} style={styles.icon} />
          <Text style={styles.menuText}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomDrawerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  drawerWrapper: {
    flex: 1,
    paddingHorizontal: 5
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent', // optional if you want transparent
  },
  logoContainer: {
    marginVertical: 20,
  },
  menuSection: {
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  subMenuItem: {
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 15,
    color: '#333',
  },
  subMenuText: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    color: '#333',
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default PrivateNavigation;
