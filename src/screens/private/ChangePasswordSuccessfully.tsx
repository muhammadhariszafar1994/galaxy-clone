import React from 'react';
import {
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/reducers/auth';

function ChangePasswordSuccessfully(): React.JSX.Element {
    const dispatch = useDispatch();
    return (
        <View style={styles.modalBackground}>
            <BuddyCard
                cardStyle={{
                    height: '100%',
                    width: screenWidth,
                    paddingHorizontal: 25,
                    paddingVertical: 50,
                    borderRadius: 0
                }}
            >
                <View>
                    <Text style={styles.typoTitle2}>Change Password</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./../../assets/images/check-mark.png')}
                        />
                    </View>

                    <View style={styles.typoContainer}>
                        <Text style={styles.typoTitle}>Thank You!</Text>
                        <Text style={styles.typoPara}>
                        Your password has been seccessfully changes.
                        You can now use your new credentials to log in.
                        </Text>
                    </View>
                </View>

                <BuddyButton
                    title="Close"
                    onPress={() => dispatch(logOut())}
                    style={styles.buttonBuddy}
                />

            </BuddyCard>
        </View>
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
        marginTop: 100,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',

    },
    typoContainer: {
        alignItems: 'center',
        marginTop: 25,
    },
    
    typoTitle2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    typoTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },
    typoPara: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 14,
        lineHeight: 24,
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 'auto'
    },
});

export default ChangePasswordSuccessfully;
