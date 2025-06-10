// Home.js
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/Constants';
import BuddyOption from '../../components/BuddyOption';
import { useDispatch, useSelector } from 'react-redux';
import { UserSessionsAPI } from '../../store/actions/session';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';
import BuddyButton from '../../components/BuddyButton';
import { reponseMapping } from '../../utils/Helper';
import { setSessionHistory, resetSessions, resetSessionHistory } from '../../store/reducers/sessions';

const SessionHistory = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { sessions } = useSelector(state => state.sessions); 
    const [ selectedOption, setSelectedOption ] = useState('');

    useFocusEffect(
        useCallback(() => {
            dispatch(resetSessions()); // it is new

            UserSessionsAPI();
            setSelectedOption('');
        }, [])
    );

    const showSession = () => {
        const session = sessions?.find(x => x._id === selectedOption);
        if(session !== undefined) {
            const chatHistory = {
                history: [],
                reponseMapped: {}
            };

            const sessionHistory = {
                _id: session?._id,
                sessionId: session?.sessionId,
                userId: session?.userId,
                chatHistory: {
                    history: [],
                    reponseMapped: {}
                }
            };

            session?.chatHistory?.forEach((chat: { question: string; answer: string; }) => {
                if(chat?.question) sessionHistory.chatHistory.history.push(chat?.question);
                if(chat?.answer) {
                    const _reponseMapping = reponseMapping(chat?.answer);

                    sessionHistory.chatHistory.reponseMapped = _reponseMapping;
                    sessionHistory.chatHistory.history.push(_reponseMapping?.response);
                }
            });

            console.log('sessionHistory', sessionHistory)
            
            dispatch(setSessionHistory(sessionHistory));
            
            navigation.navigate('home');
        }
    }
    
    return (
        <>
            <View style={styles.buddyContainer}>
                <Text style={styles.typoTitle}>Session History</Text>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {
                        Array.isArray(sessions) ?
                        (    sessions?.map((item) => (
                                <>
                                    <BuddyOption
                                        label={item?.chatHistory[0]?.question}
                                        selected={selectedOption === item?._id}
                                        onPress={() => setSelectedOption(item?._id)}
                                    />
                                </>
                            ))
                        ) : (
                            <><Text style={{
                                marginTop: 50,
                                textAlign: 'center'
                            }}>No session found</Text></>
                        )
                    }
                </ScrollView>
                {
                    Array.isArray(sessions) &&
                        <View style={styles.buttonBuddyContainer}>
                            <BuddyButton
                                title="Show Session"
                                onPress={() => showSession()}
                                style={styles.buttonBuddy}
                            />
                        </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buddyContainer: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 50,
    },
    buddyResponse: {
        marginTop: 30,
    },
    buddyQuestion: {
        marginBottom: 15
    },
    buddyAnswer: {
        marginBottom: 15
    },
    buddyReference: {

    },
    contentContainerStyle: {
        flex: 1
    },
    typoTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
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

export default SessionHistory;