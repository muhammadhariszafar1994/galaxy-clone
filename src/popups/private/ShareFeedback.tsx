import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { referenceAction, shareFeedbackAction, shareFeedbackThankYouAction } from '../../store/reducers/popups';
import { Rating } from 'react-native-ratings'; // Import Rating component
import { GetFeedbackFormAPI, ShareFeedbackAPI } from '../../store/actions/support';
import { resetStream } from '../../store/reducers/stream';
import { resetSessionHistory } from '../../store/reducers/sessions';
import { useFocusEffect } from '@react-navigation/native';

const ratings = [
    {
        label: 'Very Bad',
        image: require('./../../assets/images/bad.png'),
        color: '#f44336',
    },
    {
        label: 'Poor',
        image: require('./../../assets/images/poor.png'),
        color: '#ff9800',
    },
    {
        label: 'Medium',
        image: require('./../../assets/images/medium.png'),
        color: '#ffeb3b',
    },
    {
        label: 'Good',
        image: require('./../../assets/images/good.png'),
        color: '#8bc34a',
    },
    {
        label: 'Excellent',
        image: require('./../../assets/images/excellent.png'),
        color: '#00e676',
    },
];

type FormData = {
    description: string;
};

function ShareFeedback(): React.JSX.Element {
    const dispatch = useDispatch();
    const { shareFeedback } = useSelector(state => state.popups);
    // const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<any>();
    const [selected, setSelected] = useState(null);
    const [responseTimeRating, setResponseTimeRating] = useState(0);
    const [voiceQualityRating, setVoiceQualityRating] = useState(0);
    const [easeToUseRating, setEaseToUseRating] = useState(0);
    const [feedbackForm, setFeedbackForm] = useState<any[]>([]);

    const onSubmit = (data: any) => {
        const payload: {
            formId: Number,
            responses: { questionId: any; answer: any }[],
            rating: Number
        } = {
            formId: 1,
            responses: [],
            rating: 0
        };

        feedbackForm.forEach((form) => {
            form.questions.forEach((question: any, index: any) => {
                payload.responses.push({
                    questionId: index,
                    answer: data[`field_${index}`],
                });
            });
        });

        payload.rating = data.rating;

        // const payload = {
        //     formId: 1,
        //     rating: selected !== null ? selected + 1 : 0,
        //     responses: [
        //         { questionId: 1, answer: responseTimeRating },
        //         { questionId: 2, answer: data.description },
        //         // { questionId: 3, answer: voiceQualityRating },
        //         { questionId: 3, answer: easeToUseRating }
        //     ],
        // };

        console.log('payload', payload);
        
        ShareFeedbackAPI(payload)
            .then(() => {
                dispatch(resetStream());
                dispatch(resetSessionHistory());

                dispatch(shareFeedbackThankYouAction(true));
                dispatch(referenceAction(false));
                onClose();
            });
    };

    const onClose = () => {
        reset();
        dispatch(shareFeedbackAction(false));
        setResponseTimeRating(0);
        setVoiceQualityRating(0);
        setEaseToUseRating(0);
    };

    const getErrorMessage = (error: any): string | undefined => {
        if (error && typeof error === 'object' && 'message' in error) {
            return error.message as string;
        }
        return undefined;
    }

    useEffect(
        () => {
            GetFeedbackFormAPI()
                .then((form) => {
                    setFeedbackForm(form);
                })

            return () => setFeedbackForm(null)
        }, 
    [shareFeedback]);

    return (
        <Modal visible={shareFeedback} animationType="fade" transparent={true} onRequestClose={onClose}>
            <BuddyCard cardStyle={{ height: screenHeight, width: screenWidth, borderRadius: 0 }}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle} keyboardShouldPersistTaps="handled">
                    <Text style={styles.heading}>
                        Feedback Form
                    </Text>

                    {
                        feedbackForm?.map((form) => (
                            <>
                                <Text style={styles.heading}>
                                    {form.title}
                                </Text>

                                <Controller
                                    control={control}
                                    name={`rating`}
                                    rules={{ required: 'Selection is required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <View style={styles.scaleBar}>
                                                {ratings.map((item, i) => (
                                                    <TouchableOpacity
                                                        key={i}
                                                        style={styles.ratingItem}
                                                        onPress={() => {
                                                            onChange(i);   // Form state
                                                            setSelected(i); // For progress bar
                                                        }}
                                                    >
                                                        <Image
                                                            source={item.image}
                                                            style={[
                                                                styles.iconImage,
                                                                value === i && { borderColor: item.color, borderWidth: 2 }
                                                            ]}
                                                        />
                                                        <Text style={[styles.label, { color: item.color }]}>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>

                                            {errors?.[`rating`] && (
                                                <Text style={styles.error}>
                                                    {getErrorMessage(errors[`rating`])}
                                                </Text>
                                            )}

                                            <View style={styles.progressBar}>
                                                {ratings.map((item, index) => (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.progressSegment,
                                                            {
                                                                backgroundColor: index <= selected ? item.color : '#e0e0e0',
                                                                flex: 1,
                                                            },
                                                        ]}
                                                    />
                                                ))}
                                            </View>
                                        </>
                                    )}
                                />


                                {
                                    form?.questions?.map((question: any, index: any) => (
                                        <>
                                            {
                                                (question?.questionType === "text") &&
                                                    <View style={styles.formGroup}>
                                                        <Text style={styles.formGroupTitle}>
                                                            {question?.questionText}
                                                        </Text>
                                                        <Controller
                                                            control={control}
                                                            name={`field_${index}`}
                                                            rules={{ required: 'Description is required' }}
                                                            render={({ field: { onChange, value } }) => (
                                                                <TextInput
                                                                    style={[styles.input, styles.textArea]}
                                                                    placeholder="We would love to hear your suggestions."
                                                                    placeholderTextColor="#555"
                                                                    value={value}
                                                                    onChangeText={onChange}
                                                                    multiline={true}
                                                                    numberOfLines={5}
                                                                    textAlignVertical="top"
                                                                />
                                                            )}
                                                        />
                                                        {
                                                            errors[`field_${index}`] && 
                                                                <Text style={styles.error}>
                                                                    {getErrorMessage(errors[`field_${index}`])}
                                                                </Text>
                                                        }
                                                    </View>
                                            }
                                            
                                            {question?.questionType === "star-rating" && (
                                                <View style={{ marginVertical: 15 }}>
                                                    <View style={styles.ratingSection}>
                                                    <Text style={styles.questionText}>{question?.questionText}</Text>

                                                    <Controller
                                                        control={control}
                                                        name={`field_${index}`}
                                                        rules={{ required: 'Rating is required' }}
                                                        render={({ field: { onChange, value } }) => (
                                                        <Rating
                                                            imageSize={25}
                                                            startingValue={value ?? 0}
                                                            onFinishRating={onChange}
                                                            style={{ marginLeft: 'auto' }}
                                                        />
                                                        )}
                                                    />
                                                    </View>

                                                    {errors?.[`field_${index}`] && (
                                                    <Text style={styles.error}>
                                                        {getErrorMessage(errors[`field_${index}`])}
                                                    </Text>
                                                    )}
                                                </View>
                                                )}

                                            
                                        </>
                                    ))
                                }
                            </>
                        ))
                    }

                    

                    

                    {/* Rating Components for Response Time, Voice Quality, Ease to Use */}
                    {/* <View style={{ marginVertical: 15 }}>
                        <View style={styles.ratingSection}>
                            <Text>Recommend us to others?</Text>
                            <Rating
                                imageSize={25}
                                startingValue={responseTimeRating}
                                onFinishRating={setResponseTimeRating}
                                style={{ marginLeft: 'auto' }}
                            />
                        </View>

                        <View style={styles.ratingSection}>
                            <Text>Please share your rating.</Text>
                            <Rating
                                imageSize={25}
                                startingValue={easeToUseRating}
                                onFinishRating={setEaseToUseRating}
                                style={{ marginLeft: 'auto' }}
                            />
                        </View>
                    </View> */}

                    {/* Optional Suggestion Input */}
                    {/* <View style={styles.formGroup}>
                        <Text style={styles.formGroupTitle}>Suggestion (Optional)</Text>
                        <Controller
                            control={control}
                            name="description"
                            rules={{ required: 'Description is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="We would love to hear your suggestions."
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
                    </View> */}

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
                </ScrollView>
            </BuddyCard>
        </Modal>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingHorizontal: 25,
        paddingVertical: 50,
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
    formGroupTitle: {
        textAlign: 'center',
        fontSize: 14,
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
    scaleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    ratingItem: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 50,
    },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 40,
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
    progressBar: {
        flexDirection: 'row',
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        marginTop: 16,
        width: '100%',
    },
    progressSegment: {
        marginHorizontal: 1,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.bordergray,
    },
    questionText: {
        width: screenWidth * 0.4
    }
});

export default ShareFeedback;
