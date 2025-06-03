// Home.js
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import BuddyHelloGreeting from '../../components/BuddyHelloGreeting';
import { colors } from '../../utils/Constants';
import BuddySendMessage from '../../components/BuddySendMessage';
import { GetDocumentAPI, StreamResponseAPI } from '../../store/actions/stream';
import { useDispatch, useSelector } from 'react-redux';
import { resetDocument, resetStream, resetStreamReponse, setQuery } from '../../store/reducers/stream';
import ThankYouModal from '../../popups/private/ThankYou';
import ConfirmSignOut from '../../popups/private/ConfirmSignOut';
import SentSuccessfully from '../../popups/private/SentSuccessfully';
import ReportToManagement from '../../popups/private/ReportToManagement';
import Profile from '../../popups/private/Profile';
import ChangePassword from '../../popups/private/ChangePassword';
import { store } from '../../store/store';
import { confirmSignOutVisibilityAction, referenceAction } from '../../store/reducers/popups';
import Popups from '../../popups/private/Popups';
import BuddySpeechToText from '../../components/BuddySpeechToText';
import BuddyQuestion from '../../components/BuddyQuestion';
import BuddyAnswer from '../../components/BuddyAnswer';
import FollowUp from '../../popups/private/FollowUp';
import Reference from '../../popups/private/Reference';
import { resetSessionHistory } from '../../store/reducers/sessions';
import { setLoading } from '../../store/reducers/auth';
import { getNextSessionId, hasMultipleReferencesWithDifferentDocuments } from '../../utils/Helper';
import EditDocument from '../../popups/private/EditDocument';
import { UserSessionsAPI } from '../../store/actions/session';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;

  const { query, response, followUp, references, documents } = useSelector(state => state.stream);
  const { token } = useSelector(state => state.auth);
  const { sessionHistory } = useSelector(state => state.sessions);
  const { reference } = useSelector(state => state.popups);

  const [sessionId, setSessionId] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  
  const [modalRefineVisible, setModalRefineVisible] = useState(false);
  // const [modalReferenceVisible, setModalReferenceVisible] = useState(false);
  const [modalEditDocument, setModalEditDocument] = useState(false);

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    UserSessionsAPI()
      .then((res) => {
        console.log('UserSessionsAPI', res);

        setSessionId(sessionHistory?.sessionId || getNextSessionId(res));
        setHistory(sessionHistory?.chatHistory?.history || []);
      })
      .catch(() => {
        setSessionId(`Session-1`);
      });
      
      console.log('sessionHistory', sessionHistory);
    
  }, [sessionHistory])

  const init = () => {
    dispatch(resetStream());
    dispatch(resetSessionHistory());
    dispatch(setLoading(false));
    setHistory([]);

    UserSessionsAPI()
      .then((res) => {
        console.log('init', res);
        setSessionId(getNextSessionId(res));
      })
      .catch(() => {
        setSessionId(`Session-1`);
      });
  }

  const handleSend = async ({ message }: { message: string }) => {
    // const payload: {
    //   chat_history: string[];
    //   language: string;
    //   query: string;
    //   session_id: string;
    // } = {
    //   chat_history: [],
    //   language: 'en',
    //   query: message,
    //   session_id: sessionId,
    // };

    // if(response && typeof response === 'string') {
    //   payload.chat_history.push(query);
    //   payload.chat_history.push(response);
    //   setHistory(payload.chat_history);
    // }

    // dispatch(resetDocument());
    // dispatch(resetStreamReponse());
    // dispatch(setQuery(message));
    // StreamResponseAPI(payload);

    try {
      // Clone the history to ensure it's a mutable array
      const clonedHistory = [...history];

      const payload = {
        chat_history: clonedHistory,
        language: 'en',
        query: message,
        session_id: sessionId,
      };

      console.log('payload', payload);
      console.log('query', query);
      console.log('response', response);

      // Now it's safe to use push because clonedHistory is mutable
      if(query && typeof query === 'string' && response && typeof response === 'string') {
        payload.chat_history.push(query);
        payload.chat_history.push(response);
      }

      setHistory(payload.chat_history);

      dispatch(resetDocument());
      dispatch(resetStreamReponse());
      dispatch(setQuery(message));
      StreamResponseAPI(payload);
    } catch (error) {
      console.error('error', error);
    }
  }

  const showResponse = ({ option }: { option: string }) => {
    try {
      // Clone the history to ensure it's a mutable array
      const clonedHistory = [...history];

      const payload = {
        chat_history: clonedHistory,
        language: 'en',
        query: option,
        session_id: sessionId,
      };

      console.log('payload', payload);
      console.log('query', query);
      console.log('response', response);

      // Now it's safe to use push because clonedHistory is mutable
      payload.chat_history.push(query);
      payload.chat_history.push(response);
      setHistory(payload.chat_history);

      dispatch(resetDocument());
      dispatch(resetStreamReponse());
      dispatch(setQuery(option));
      StreamResponseAPI(payload);
    } catch (error) {
      console.error('error', error);
    }
  };


  return (
    <>
      {/* <BuddySpeechToText /> */}

      <Popups />

      {/* <Button title='test' onPress={() => {
        console.log('sessionHistory', sessionHistory)
        console.log('sessionHistory?.chatHistory?.history', sessionHistory?.chatHistory?.history)
        
      }}/> */}

      <View style={styles.buddyContainer}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <ScrollView style={styles.container}>
            <Text>{sessionId}</Text>
            {
              (history && history?.length > 0) &&
                <>
                  {history?.map((item, key) => (
                    <View style={styles.buddyResponseWrapper}>
                      
                      {
                        key % 2 === 0 ? (
                          <BuddyQuestion key={key} content={item} />
                        ) : (
                          <BuddyAnswer key={key} content={item} />
                        )
                      }
                    </View>
                  ))}
                </>
            }
            {
              ((query && typeof query === 'string') || (history && history?.length > 0)) ?
                <>
                  <View style={styles.buddyResponseWrapper}>
                    {
                      (query && typeof query === 'string') && 
                        <BuddyQuestion content={query} />
                    }
                    
                    {
                      (response && typeof response === 'string' ) &&
                        <BuddyAnswer content={response} />
                    }
                  </View>
                </> :
              <BuddyHelloGreeting style={[styles.buddyHelloGreeting]} />  
            }
          </ScrollView>
        </ScrollView>

        {/* <ConfirmSignOut
          visible={confirmSignOutVisibility}
          onClose={() => dispatch(confirmSignOutVisibilityAction(false))}
        /> */}
        
        {/* <Button onPress={() => navigation.navigate('change-password-successfully')} title='Test'/> */}

        {/* <Button onPress={() => setModalRefineVisible(true)} title='Test'/> */}

        <FollowUp
          visible={modalRefineVisible}
          onClose={() => setModalRefineVisible(false)}
          onShowResponse={showResponse}
        />

        <Reference
          // visible={modalReferenceVisible}
          // onClose={() => setModalReferenceVisible(false)}
          visible={reference}
          onClose={() => dispatch(referenceAction(false))}
          onShowResponse={showResponse}
        />

        <EditDocument
          visible={modalEditDocument}
          onClose={() => setModalEditDocument(false)}
          onShowResponse={showResponse}
        />
        
        <BuddySendMessage 
          style={[styles.buddySendMessage]} 
          onMessageSend={handleSend}
          simplePanel={true}
          operationalPanel={(response && typeof response === 'string' )}
          refineIt={(followUp?.options?.length > 0)}
          onRefineIt={() => setModalRefineVisible(true)}
          references={(references?.length > 0)}
          onReferences={() => dispatch(referenceAction(true))}
          editDocument={(documents?.length > 0)}
          onEditDocument={() => setModalEditDocument(true)}
        />
        
        {/* 
        <ThankYouModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onChangeLanguage={() => navigation.navigate('preferred-language')}
        /> */}

        {/* <ConfirmSignOut
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onChangeLanguage={() => navigation.navigate('preferred-language')}
        /> */}

        

        {/* <ReportToManagement
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onChangeLanguage={() => navigation.navigate('preferred-language')}
        /> */}
        
        {/* <Profile
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onChangeLanguage={() => navigation.navigate('preferred-language')}
        /> */}

        {/* <ChangePassword
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onChangeLanguage={() => navigation.navigate('preferred-language')}
        /> */}
      </View>
     
    </>
  );
};

const styles = StyleSheet.create({
  buddyContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    // paddingHorizontal: 15
  },
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 15
  },
  buddyHelloGreeting: {
    marginTop: 30,
  },
  buddyResponseWrapper: {
    marginBottom: 5
  },
  buddySendMessage: {
    marginTop: 'auto',
  }
});

export default Home;
