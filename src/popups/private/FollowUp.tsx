import React, { useEffect } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import BuddyButtonRefine from '../../components/BuddyButtonRefine';

import { colors, screenHeight, screenWidth } from '../../utils/Constants';

type FollowUpProps = {
    visible: boolean;
    onClose: () => void;
    onShowResponse: (data: { option: string }) => void;
};

function FollowUp({ visible, onClose, onShowResponse }: FollowUpProps): React.JSX.Element {
    const { followUp } = useSelector((state: any) => state.stream);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            option: ''
        },
        mode: 'onTouched'
    });

    const selectedOption = watch('option');

    useEffect(() => {
        reset();
    }, [followUp, reset]);

    const onSubmit = (data: { option: string }) => {
        console.log('data.option', data.option)
        
        if (data.option) {
            onShowResponse(data);
            onClose();
        }
    };

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
                        <View style={styles.container}>
                            <View style={styles.field}>
                                <Text style={styles.text}>{followUp?.question}</Text>
                            </View>

                            <Controller
                                control={control}
                                name="option"
                                rules={{ required: 'Please select an option.' }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.buddyButtonRefineContainer}>
                                        {followUp?.options?.map((item: string, index: number) => (
                                            <BuddyButtonRefine
                                                key={index}
                                                title={item}
                                                selected={value === item}
                                                onPress={() => onChange(item)}
                                                buttonStyle={[
                                                    styles.buddyButtonRefine,
                                                    value === item && styles.buddyButtonRefineSelected
                                                ]}
                                            />
                                        ))}
                                    </View>
                                )}
                            />

                            {errors.option && (
                                <Text style={styles.errorText}>{errors.option.message}</Text>
                            )}
                        </View>

                        <View style={styles.buttonBuddyContainer}>
                            <BuddyButton
                                title="Show Response"
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
        width: '100%'
    },
    buttonBuddyInverse: {
        paddingVertical: 12,
        marginTop: 10
    }
});

export default FollowUp;
