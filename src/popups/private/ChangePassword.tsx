import React from 'react';
import {
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { screenWidth, colors } from '../../utils/Constants';

type FormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type ChangePasswordProps = {
    visible: boolean;
    onClose: () => void;
};

function ChangePassword({ visible, onClose }: ChangePasswordProps): React.JSX.Element {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <BuddyCard
                    cardStyle={{
                        height: '100%',
                        width: screenWidth,
                        paddingHorizontal: 25,
                        paddingVertical: 50,
                        borderRadius: 0,
                    }}
                >
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
                            name="currentPassword"
                            rules={{ required: 'Current password is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Current Password"
                                    placeholderTextColor="#666"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.currentPassword && (
                            <Text style={styles.errorText}>
                                {errors.currentPassword.message}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name="newPassword"
                            rules={{ required: 'New password is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="New Password"
                                    placeholderTextColor="#666"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.newPassword && (
                            <Text style={styles.errorText}>
                                {errors.newPassword.message}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{
                                required: 'Please confirm your password',
                                validate: value =>
                                    value === watch('newPassword') || 'Passwords do not match',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#666"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>
                                {errors.confirmPassword.message}
                            </Text>
                        )}
                    </View>

                    <View style={styles.buttonBuddyContainer}>
                        <BuddyButtonReverse
                            title="Cancel"
                            onPress={onClose}
                            buttonStyle={styles.buttonBuddyReverse}
                        />

                        <BuddyButton
                            title="Save"
                            onPress={handleSubmit(onSubmit)}
                            style={styles.buttonBuddy}
                        />
                    </View>
                </BuddyCard>
            </View>
        </Modal>
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    buttonBuddyContainer: {
        marginTop: 'auto',
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
