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

type ThankYouProps = {
    visible: boolean;
    onClose: () => void;
    onChangeLanguage?: () => void;
};

function ThankYou({ visible, onClose, onChangeLanguage }: ThankYouProps): React.JSX.Element {
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
                        height: screenHeight - 150,
                        width: screenWidth,
                        marginTop: 150,
                        paddingHorizontal: 25,
                        paddingVertical: 50,
                        borderRadius: 0
                    }}
                    purpleCut={true}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('./../../assets/images/check-mark.png')}
                        />
                    </View>

                    <View style={styles.typoContainer}>
                        <Text style={styles.typoTitle}>Thank You!</Text>
                        <Text style={styles.typoPara}>
                            Your report has been submitted to our
                            management team. We appriciate your help in
                            improving our service.
                        </Text>
                    </View>

                    <BuddyButton
                        title="OK"
                        onPress={onClose}
                        style={styles.buttonBuddy}
                    />

                </BuddyCard>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 100,
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
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 'auto'
    }
});

export default ThankYou;
