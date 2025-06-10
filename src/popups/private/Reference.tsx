import React, { useEffect } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import BuddyButtonRefine from '../../components/BuddyButtonRefine';

import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import { SendRefrenceEmailAPI } from '../../store/actions/support';
import { referenceAction, ReferenceAction, sendEmailSuccessfullyAction, shareFeedbackAction } from '../../store/reducers/popups';
import { useNavigation } from '@react-navigation/native';
import { hasMultipleReferencesWithDifferentDocuments, showSuccess } from '../../utils/Helper';
import { GetDocumentAPI } from '../../store/actions/stream';

type ReferenceProps = {
    visible: boolean;
    onClose: () => void;
    onShowResponse: (data: { option: string }) => void;
};

function Reference({ visible, onClose, onShowResponse }: ReferenceProps): React.JSX.Element {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const references = useSelector((state: any) => state.stream.references ?? []);
    const { userDetails } = useSelector((state: any) => state.auth);

    const editDocument = () => {
        navigation.navigate('question');
    }

    const emailThisToMe = () => {
        if (Array.isArray(references)) {
            const header = `
                <tr>
                <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Document Name</th>
                <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Section Name</th>
                <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Section Number</th>
                </tr>`;

            const rows = references.map(item => `
                <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.documentName}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.sectionName}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.sectionNumber}</td>
                </tr>`).join('');

            const email = userDetails?.email;
            const content = `<table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
                ${header}
                ${rows}
                </table>`;

            SendRefrenceEmailAPI({email, content})
                .then(() => {
                    dispatch(sendEmailSuccessfullyAction(true));
                    dispatch(referenceAction(false));
                });
        
        }
    }

    const shareFeedback = () => {
        dispatch(shareFeedbackAction(true));
    }

    return <>
        {visible && (
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.modalBackground}>
                    <BuddyCard
                        cardStyle={{
                            height: screenHeight,
                            width: screenWidth,
                            paddingHorizontal: 25,
                            paddingVertical: 50,
                            borderRadius: 0
                        }}
                    >
                        <ScrollView style={styles.container}>
                            <View style={styles.table}>
                                {/* Header */}
                                <View style={[styles.row, styles.header]}>
                                <Text style={[styles.cell, styles.headerText]}>Document Name</Text>
                                <Text style={[styles.cell, styles.headerText]}>Section Name</Text>
                                <Text style={[styles.cell, styles.headerText]}>Section Number</Text>
                                </View>

                                {/* Data Rows */}
                                {Array.isArray(references) && references.map((item, index) => (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.cell}>{item.documentName}</Text>
                                        <Text style={styles.cell}>{item.sectionName}</Text>
                                        <Text style={styles.cell}>{item.sectionNumber}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={styles.buttonBuddyContainer}>
                            <BuddyButtonReverse
                                title="Email this to me"
                                onPress={() => emailThisToMe()}
                                buttonStyle={styles.buttonBuddyInverse}
                            />
                            <BuddyButtonReverse
                                title="Share Feedback"
                                onPress={() => shareFeedback()}
                                buttonStyle={styles.buttonBuddyInverse}
                            />
                            <BuddyButton
                                title="Ask Another Question"
                                onPress={onClose}
                                style={styles.buttonBuddy}
                            />
                        </View>
                    </BuddyCard>
                </View>
            </Modal>
        )}
    </>;
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 0
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14
    },
    buddyButtonRefineContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 20
    },
    buddyButtonRefine: {
        width: '48%',
        marginBottom: '2%',
        flexDirection: 'row',
        height: 60,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    buddyButtonRefineSelected: {
        borderColor: colors.black, // Highlight selected button
        borderWidth: 2
    },
    errorText: {
        color: 'red',
        marginTop: 10
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
        marginTop: 10
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    header: {
        backgroundColor: '#fce7f3',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    headerText: {
        fontWeight: 'bold',
    },
});

export default Reference;
