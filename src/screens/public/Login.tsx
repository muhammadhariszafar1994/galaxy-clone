import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller from react-hook-form
import {
  Image,
  TextInput, // Import TextInput for form fields
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { useNavigation } from '@react-navigation/native';
import { LoginAPI } from '../../store/actions/auth';

function Login(): React.JSX.Element {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: any) => {
    await LoginAPI(data)
        .then((res) => {
          console.log('LoginAPI--res', res)
        })
        .catch((err) => {
          const redirectTo = err?.errorData?.data?.redirectTo;

          if(redirectTo) {
            navigation.navigate(redirectTo?.replace(/\//g, ''), {
              email: data?.email
            });
          }

          // navigation.navigate('change-password', {
          //   email: data?.email
          // });
          
          console.error('LoginAPI--err', redirectTo)
        });
    console.log('Form submitted with data:', data);
  };

  return (
    // <ScrollView keyboardShouldPersistTaps="handled">
      <BuddyContainer>
        <View style={styles.cardContainer}>
          <BuddyCard
            cardStyle={{
              height: screenHeight,
              width: screenWidth,
            }}
            purpleCut={true}
          >
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('./../../assets/images/logo.png')}
              />
            </View>

            {/* Form for Email and Password */}
            <View style={styles.formContainer}>
              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your email"
                    />
                  )}
                  name="email"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => {
                    const [secureText, setSecureText] = useState(true);

                    return (
                      <View style={styles.passwordWrapper}>
                        <TextInput
                          style={[styles.input, { flex: 1, borderWidth: 0 }]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Enter your password"
                          secureTextEntry={secureText}
                        />
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                          {
                            secureText ?
                              <Image style={[styles.eyeIcon]} source={require('./../../assets/images/close-eye.png')} /> :
                              <Image style={[styles.eyeIcon]} source={require('./../../assets/images/open-eye.png')} />
                          }
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  name="password"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
              </View>

              {/* Remember Me and Forgot Password */}
              <View style={styles.rememberContainer}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.checkboxContainer}>
                      <TouchableOpacity
                        style={[
                          styles.circleCheckbox,
                          value ? { backgroundColor: colors.pink } : {},
                        ]}
                        onPress={() => {
                          const newValue = !value;
                          onChange(newValue); // Update the value in the form state
                          setRememberMe(newValue);
                        }}
                      />
                      <Text style={styles.rememberText}>Remember Me</Text>
                    </View>
                  )}
                  name="rememberMe"
                />
                <TouchableOpacity onPress={() => navigation.navigate('forgot-password')}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <BuddyButton
              title="Login"
              onPress={handleSubmit(onSubmit)} // Handle form submission
              style={styles.buttonBuddy}
            />

            <BuddyLang onPress={() => navigation.navigate('preferred-language')} style={styles.langBuddy} />
          </BuddyCard>
        </View>
      </BuddyContainer>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.7,
    height: 50,
    objectFit: 'contain',
    marginTop: 70,
  },
  formContainer: {
    width: '100%',
    padding: 10,
    marginTop: 70
  },
  inputContainer: {
    marginBottom: 10,
    width: screenWidth * 0.85,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.pink,
    padding: 10,
    borderRadius: 5,
    height: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonBuddy: {
    alignSelf: 'center',
    width: screenWidth * 0.85,
    marginTop: 100
  },
  langBuddy: {
    alignSelf: 'center',
    marginTop: 30
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.85,
    alignSelf: 'center',
  },
  rememberText: {
    marginLeft: 5,
    color: colors.pink
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: colors.pink,
    fontSize: 14,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.pink,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    marginTop: 5,
  },
  eyeIcon: {
    paddingHorizontal: 8,
    width: 20,
    resizeMode: 'contain'
  },
});

export default Login;
