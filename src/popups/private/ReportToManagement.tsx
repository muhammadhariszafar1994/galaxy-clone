import React, { useCallback, useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { reportToManagementAction } from '../../store/reducers/popups';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SupportCreateAPI } from '../../store/actions/support';
import ThankYou from './ThankYou';

type FormData = {
    subject: string;
    description: string;
};

function ReportToManagement(): React.JSX.Element {
    const dispatch = useDispatch();
    const { reportToManagement } = useSelector(state => state.popups);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [ visibility, setVisibility ] = useState(false);

    const onSubmit = (data: FormData) => {
        SupportCreateAPI(data)
            .then((res) => {
                console.log('res', res)
                onClose();
                setVisibility(true);
            })
            .catch((err) => {
                console.log('err', err)
            });
    };

    const onClose = () => {
        reset();
        dispatch(reportToManagementAction(false));
    }

    return (
        <>
            <Modal
                visible={reportToManagement}
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
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
                        <Text style={styles.heading}>Report to Management</Text>

                        <View style={styles.formGroup}>
                            <Controller
                                control={control}
                                name="subject"
                                rules={{ 
                                    required: 'Title is required',
                                    maxLength: { value: 60, message: 'Title must be under 60 characters' }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Title of the issue"
                                        placeholderTextColor="#555"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.subject && <Text style={styles.error}>{errors.subject.message}</Text>}
                        </View>

                        <View style={styles.formGroup}>
                            <Controller
                                control={control}
                                name="description"
                                rules={{ 
                                    required: 'Description is required',
                                    maxLength: { value: 500, message: 'Description must be under 500 characters' }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[styles.input, styles.textArea]}
                                        placeholder="Describe the issue"
                                        placeholderTextColor="#555"
                                        value={value}
                                        onChangeText={onChange}
                                        multiline={true}
                                        numberOfLines={5}
                                        textAlignVertical="top"
                                    />
                                )}
                            />
                            {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
                        </View>

                        <View style={styles.buttonBuddyContainer}>
                            <BuddyButton
                                title="Submit"
                                onPress={handleSubmit(onSubmit)}
                                style={styles.buttonBuddy}
                            />
                            <BuddyButtonReverse
                                title="Cancel"
                                onPress={onClose}
                                buttonStyle={styles.buttonBuddyInverse}
                            />
                        </View>
                    </BuddyCard>
                </View>
            </Modal>

            <ThankYou 
                visible={visibility} 
                onClose={() => setVisibility(false)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#f5f6f8',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
    },
    textArea: {
        height: 150,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    buttonBuddyContainer: {
        marginTop: 'auto',
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
    },
    buttonBuddyInverse: {
        paddingVertical: 12,
        marginTop: 10,
    },
});

export default ReportToManagement;
