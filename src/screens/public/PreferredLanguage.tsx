import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import useForm and Controller from react-hook-form
import {
    Image,
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
import { useNavigation } from '@react-navigation/native';

function PreferredLanguage(): React.JSX.Element {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [rememberMe, setRememberMe] = useState(false);

    const onSubmit = (data: any) => {
        navigation.navigate('login');
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

                        <View style={styles.typoContainer}>
                            <Text style={styles.typoTitle}>Welcome!</Text>
                            <Text style={styles.typoPara}>
                                Would you like to continue in English or Arabic? {"\n"} 
                                Please choose your preferred language to {"\n"}
                                enhance your experience.
                            </Text>
                        </View>

                        <View style={styles.buttonBuddyContainer}>
                            <BuddyButton
                                title="English"
                                onPress={() => navigation.navigate('home')}
                                style={styles.buttonBuddy}
                            />

                            <BuddyButton
                                title="العربية"
                                onPress={() => navigation.navigate('home')}
                                style={styles.buttonBuddy}
                            />
                        </View>
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
    buttonBuddyContainer: {
        marginTop: 100
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: screenWidth * 0.85,
        marginVertical: 5
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

export default PreferredLanguage;
