import React, { useCallback, useState } from 'react';
import {
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { screenWidth, colors, screenHeight } from '../../utils/Constants';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ChangePasswordAPI, ResetPasswordByEmailAPI } from '../../store/actions/auth';
import BuddyContainer from '../../components/BuddyContainer';

type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

function ChangePassword(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params;

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<FormData>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const onClose = () => {
        navigation.goBack();
    }

    const onSubmit = (data: FormData) => {
      const payload = {
        ...data,
        email: params?.email, // add email from route params
      };

      console.log('payload', payload)

      ResetPasswordByEmailAPI(payload)
          .then(() => {
            navigation.navigate('login');
          })
          .finally(() => reset());
    };

    useFocusEffect(
        useCallback(() => {
            reset(); // This clears form values and errors when the screen is focused
        }, [reset])
    );

    return (
        // <ScrollView keyboardShouldPersistTaps="handled">
            <BuddyContainer>
                <BuddyCard
                    cardStyle={{
                        height: screenHeight - 100,
                        width: screenWidth,
                        marginTop: 100,
                        paddingHorizontal: 25,
                        paddingVertical: 25,
                        borderRadius: 0
                    }}
                    purpleCut={true}
                >
                    <View>
                        <View style={styles.logoContainer}>
                            <Image
                            style={styles.logo}
                            source={require('./../../assets/images/logo.png')}
                            />
                        </View>
                    
                        <View style={styles.typoContainer}>
                            <Text style={styles.typoTitle}>Change your password</Text>
                            <Text style={styles.typoPara}>
                                For your security, please update your temporary {"\n"} password.
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: 'Password is required',
                                    validate: value =>
                                        value !== watch('oldPassword') || 'New password must be different from the current password',
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            placeholderTextColor="#666"
                                            secureTextEntry={!showPassword}
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            <Image
                                                source={
                                                    showPassword
                                                        ? require('./../../assets/images/open-eye.png')
                                                        : require('./../../assets/images/close-eye.png')
                                                }
                                                style={styles.eyeIconImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            {errors.password && (
                                <Text style={styles.errorText}>
                                    {errors.password.message}
                                </Text>
                            )}

                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{
                                    required: 'Please confirm your password',
                                    validate: value =>
                                        value === watch('password') || 'Passwords do not match',
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Confirm Password"
                                            placeholderTextColor="#666"
                                            secureTextEntry={!showConfirmPassword}
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            <Image
                                                source={
                                                    showConfirmPassword
                                                        ? require('./../../assets/images/open-eye.png')
                                                        : require('./../../assets/images/close-eye.png')
                                                }
                                                style={styles.eyeIconImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>
                                    {errors.confirmPassword.message}
                                </Text>
                            )}
                        </View>

                        {/* Remember Me and Forgot Password */}
                        {/*
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
                        */}
                    </View>
                    
                    <View style={styles.buttonBuddyContainer}>
                        <BuddyButton
                            title="Change Your Password"
                            onPress={handleSubmit(onSubmit)}
                            style={styles.buttonBuddy}
                        />
                    </View>
                </BuddyCard>
            </BuddyContainer>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    typoTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 30,
        marginBottom: 10,
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d11f8d',
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#000',
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    eyeIconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    buttonBuddyContainer: {
        // marginTop: 'auto',
        marginVertical: 50
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonBuddyReverse: {
        paddingVertical: 12,
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
});

export default ChangePassword;
