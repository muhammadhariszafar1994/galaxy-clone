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
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailSuccessfullyAction, shareFeedbackAction } from '../../store/reducers/popups';

function SentSuccessfully(): React.JSX.Element {
    const dispatch = useDispatch();
    const { sendEmailSuccessfully } = useSelector(state => state.popups);

    const shareFeedback = () => {
        dispatch(sendEmailSuccessfullyAction(false));
        dispatch(shareFeedbackAction(true));
    }

    return (
        <Modal
            visible={sendEmailSuccessfully}
            animationType="fade"
            transparent={true}
            onRequestClose={() => dispatch(sendEmailSuccessfullyAction(false))}
        >
            <View style={styles.modalBackground}>
                <BuddyCard
                    cardStyle={{
                        height: screenHeight - 150,
                        marginTop: 150,
                        width: screenWidth,
                        paddingHorizontal: 25,
                        paddingVertical: 50,
                       
                    }}
                    purpleCut={true}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./../../assets/images/sent-successfully.png')}
                        />
                    </View>

                    <View style={styles.typoContainer}>
                        <Text style={styles.typoTitle}>Sent Successfully</Text>
                        <Text style={styles.typoPara}>
                            The policy clause has been sent to your
                            registered email address. Please check your
                            inbox.
                        </Text>
                    </View>
                    <View style={styles.buttonBuddyContainer}>
                        {/* <BuddyButtonReverse
                            title="Share Feedback"
                            onPress={() => shareFeedback()}
                            buttonStyle={styles.buttonBuddyInverse}
                        /> */}
                        <BuddyButton
                            title="OK"
                            onPress={() => shareFeedback()}
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
        marginTop: 50
    },
    logo: {
        width: screenWidth * 0.7,
        height: 100,
        resizeMode: 'contain',

    },
    typoContainer: {
        alignItems: 'center',
        marginTop: 50,
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
    buttonBuddyContainer: {
        marginTop: 'auto'
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 10
    },
    buttonBuddyInverse: {
        paddingVertical: 12,
    },
    langBuddy: {
        alignSelf: 'center',
        marginTop: 30,
    },
});

export default SentSuccessfully;
