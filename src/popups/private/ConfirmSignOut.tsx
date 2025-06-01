import React, { useState } from 'react';
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
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import reducer, { logOut } from '../../store/reducers/auth';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { useDispatch, useSelector } from 'react-redux';
import { confirmSignOutVisibilityAction } from '../../store/reducers/popups';

function ConfirmSignOut(): React.JSX.Element {
    const dispatch = useDispatch();
    const { confirmSignOutVisibility } = useSelector(state => state.popups); 

    const onClose = () => dispatch(confirmSignOutVisibilityAction(false));
    const onConfirm = async () => {
        dispatch(confirmSignOutVisibilityAction(false));
        dispatch(logOut());
    };

    return (
        <Modal
            visible={confirmSignOutVisibility}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <BuddyCard
                    cardStyle={{
                        height: screenHeight - 400,
                        width: screenWidth,
                        paddingHorizontal: 25,
                        paddingVertical: 50,
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}
                    purpleCut={true}
                >
                    <View>
                        <View style={styles.typoContainer}>
                            <Text style={styles.typoTitle}>Confirm Sign Out</Text>
                            <Text style={styles.typoPara}>
                                Are you sure you want to sign out?
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonBuddyContainer}>
                        <BuddyButtonReverse
                            title="Yes"
                            onPress={onConfirm}
                            buttonStyle={styles.buttonBuddyInverse}
                        />
                        <BuddyButton
                            title="No"
                            onPress={onClose}
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
    typoContainer: {
        alignItems: 'center',
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
        marginTop: 'auto',
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 10
    },
    buttonBuddyInverse: {
        paddingVertical: 12,
    }
});

export default ConfirmSignOut;
