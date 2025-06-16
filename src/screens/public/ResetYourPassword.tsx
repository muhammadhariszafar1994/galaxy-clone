import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Image,
    TextInput,
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
import OTPTextView from 'react-native-otp-textinput';
import { ResetPassword } from '../../store/actions/auth';

function ResetYourPassword(): React.JSX.Element {
    const navigation = useNavigation();
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        register,
    } = useForm();

    const [uniqueID, setUniqueID] = useState('');
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

    useEffect(() => {
        register('uniqueID', {
            required: 'OTP is required',
            minLength: {
                value: 6,
                message: 'OTP must be 6 digits',
            },
        });
        register('password', {
            required: 'Password is required',
            minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
            },
        });
        register('confirmPassword', {
            required: 'Confirm password is required',
            minLength: {
                value: 6,
                message: 'Confirm password must be at least 6 characters',
            },
        });
    }, [register]);

    const onSubmit = (data: any) => {
        ResetPassword(data).then(() => {
            navigation.navigate('password-reset-successfully');
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
                            <Text style={styles.typoTitle}>Reset your Password</Text>
                            <Text style={styles.typoPara}>Enter your new password</Text>
                        </View>

                        {/* Password Field */}
                        <View style={styles.inputContainer}>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={[styles.input, { flex: 1, borderWidth: 0 }]}
                                    placeholder="Enter your password"
                                    secureTextEntry={passwordSecure}
                                    onChangeText={(text) => setValue('password', text)}
                                />
                                <TouchableOpacity
                                    onPress={() => setPasswordSecure(!passwordSecure)}
                                    style={styles.eyeIconTouchable}
                                >
                                    <Image
                                        style={styles.eyeIcon}
                                        source={
                                            passwordSecure
                                                ? require('./../../assets/images/close-eye.png')
                                                : require('./../../assets/images/open-eye.png')
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorText}>{errors.password.message}</Text>
                            )}
                        </View>

                        {/* Confirm Password Field */}
                        <View style={styles.inputContainer}>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={[styles.input, { flex: 1, borderWidth: 0 }]}
                                    placeholder="Confirm your password"
                                    secureTextEntry={confirmPasswordSecure}
                                    onChangeText={(text) => setValue('confirmPassword', text)}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setConfirmPasswordSecure(!confirmPasswordSecure)
                                    }
                                    style={styles.eyeIconTouchable}
                                >
                                    <Image
                                        style={styles.eyeIcon}
                                        source={
                                            confirmPasswordSecure
                                                ? require('./../../assets/images/close-eye.png')
                                                : require('./../../assets/images/open-eye.png')
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>
                                    {errors.confirmPassword.message}
                                </Text>
                            )}
                        </View>

                        {/* OTP / uniqueID Field */}
                        <View style={styles.otpContainer}>
                            <Text style={styles.typoPara}>Enter the OTP sent to your email</Text>
                            <OTPTextView
                                inputCount={6}
                                handleTextChange={(val) => {
                                    setUniqueID(val);
                                    setValue('uniqueID', val, { shouldValidate: true });
                                }}
                                textInputStyle={{
                                    backgroundColor: '#F3F3F3',
                                    borderBottomWidth: 0,
                                    width: 42,
                                    height: 42,
                                    borderRadius: 8,
                                }}
                            />
                            {errors.uniqueID && (
                                <Text style={styles.errorText}>{errors.uniqueID.message}</Text>
                            )}

                            <View style={styles.otpNoteContainer}>
                                <Text style={styles.otpPara}>Did not receive OTP?</Text>
                                <TouchableOpacity>
                                    <Text style={styles.otpButtonText}>RESEND</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <BuddyButton
                            title="Reset Password"
                            onPress={handleSubmit(onSubmit)}
                            style={styles.buttonBuddy}
                        />

                        <BuddyLang
                            onPress={() => navigation.navigate('preferred-language')}
                            style={styles.langBuddy}
                        />
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
        marginTop: 40,
    },
    typoTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14,
    },
    typoPara: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 14,
        lineHeight: 24,
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
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: screenWidth * 0.85,
        marginTop: 30,
    },
    langBuddy: {
        alignSelf: 'center',
        marginTop: 30,
    },
    otpContainer: {
        marginTop: 15,
        paddingHorizontal: 25,
        alignSelf: 'center',
    },
    otpNoteContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    otpPara: {
        fontSize: 14,
    },
    otpButtonText: {
        color: colors.pink,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.pink,
        borderRadius: 5,
        paddingHorizontal: 10,
        // height: 50,
        marginTop: 5,
    },
    eyeIconTouchable: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default ResetYourPassword;
