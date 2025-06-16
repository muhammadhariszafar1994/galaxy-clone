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
} from 'react-native';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordAPI } from '../../store/actions/auth';

function ForgotPassword(): React.JSX.Element {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: any) => {
    await ForgotPasswordAPI(data)
            .then(() => {
              navigation.navigate('reset-your-password');
            });
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

            <View style={styles.typoContainer}>
              <Text style={styles.typoTitle}>Forgot Password?</Text>
              <Text style={styles.typoPara}>No worries, enter your email to get reset {"\n"} instructions</Text>
            </View>

            {/* Form for Email */}
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

              {/* Remember Me and Forgot Password */}
              <View style={styles.backToLoginContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={styles.backToLogin}><Text>{`\u003C`}</Text> Back to Login</Text>
                </TouchableOpacity>
              </View>
            </View>



            <BuddyButton
              title="Reset Password"
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
  typoContainer: {
    alignItems: 'center',
    marginTop: 70
  },
  typoTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 14
  },
  typoPara: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 24
  },
  formContainer: {
    width: '100%',
    padding: 10,

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
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.85,
    alignSelf: 'center',
  },
  rememberText: {
    marginLeft: 10,
    color: colors.pink
  },
  backToLogin: {
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
  },

});

export default ForgotPassword;
