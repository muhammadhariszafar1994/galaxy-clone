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
import { screenWidth, colors } from '../../utils/Constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ChangePasswordAPI } from '../../store/actions/auth';

type FormData = {
    oldPassword: string;
    password: string;
    confirmPassword: string;
};

function ChangePassword(): React.JSX.Element {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<FormData>();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onClose = () => {
        navigation.goBack();
    }

    const onSubmit = (data: FormData) => {
        ChangePasswordAPI(data)
            .then(() => {
                navigation.navigate('change-password-successfully');
            })
            .finally(() => reset());
    };

    useFocusEffect(
        useCallback(() => {
            reset(); // This clears form values and errors when the screen is focused
        }, [reset])
    );

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <BuddyCard
                cardStyle={{
                    height: '100%',
                    width: screenWidth,
                    paddingHorizontal: 25,
                    paddingVertical: 25,
                    borderRadius: 0,
                }}
            >
                <View>
                    <Text style={styles.typoTitle2}>Change Password</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./../../assets/images/change-password.png')}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Controller
                            control={control}
                            name="oldPassword"
                            rules={{ required: 'Current password is required' }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Current Password"
                                        placeholderTextColor="#666"
                                        secureTextEntry={!showOldPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowOldPassword(!showOldPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Image
                                            source={
                                                showOldPassword
                                                    ? require('./../../assets/images/open-eye.png')
                                                    : require('./../../assets/images/close-eye.png')
                                            }
                                            style={styles.eyeIconImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        {errors.oldPassword && (
                            <Text style={styles.errorText}>
                                {errors.oldPassword.message}
                            </Text>
                        )}

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
                </View>

                <View style={styles.buttonBuddyContainer}>
                    <BuddyButtonReverse
                        title="Cancel"
                        onPress={onClose}
                        buttonStyle={styles.buttonBuddyReverse}
                    />

                    <BuddyButton
                        title="Change Your Password"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.buttonBuddy}
                    />
                </View>
            </BuddyCard>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    typoTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 30,
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
        marginTop: 50,
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonBuddyReverse: {
        paddingVertical: 12,
    },
});

export default ChangePassword;
