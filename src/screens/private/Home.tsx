// Home.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
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
  const [modalEditDocument, setModalEditDocument] = useState(false);
  const [loader, setLoader] = useState(false);

  // const [modalReferenceVisible, setModalReferenceVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const init = async () => {
    dispatch(resetStream());
    dispatch(resetSessionHistory());
    dispatch(setLoading(false));
    setHistory([]);
  
    try {
      const res = await UserSessionsAPI();
      console.log('init', res);
  
      const nextSessionId = getNextSessionId(res);
      setSessionId(nextSessionId);
  
      // Instead of relying on sessionHistory, use response directly
      const history = res?.chatHistory?.history || [];
      setHistory(history);
  
    } catch (err) {
      console.error(err);
      setSessionId('Session-1');
    }
  };

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

    setLoader(true);
    
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
      StreamResponseAPI(payload).finally(() => setLoader(false));
    } catch (error) {
      console.error('error', error);
    }
  }

  const showResponse = ({ option }: { option: string }) => {
    setLoader(true);

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
      StreamResponseAPI(payload).finally(() => setLoader(false));
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    init();
  }, [resetStream]) // make sure resetStream is available

  useEffect(() => {
    if (!sessionHistory) return;

    dispatch(setQuery(null));
    dispatch(resetStreamReponse());
  
    UserSessionsAPI()
      .then((res) => {
        console.log('UserSessionsAPI', res);
  
        setHistory(sessionHistory?.chatHistory?.history || []);
        setSessionId(sessionHistory?.sessionId || getNextSessionId(res));
      })
      .catch((err) => {
        console.error(err);
        setSessionId('Session-1');
      });
  
    console.log('sessionHistory?.chatHistory?.history', sessionHistory?.chatHistory?.history);
    console.log('sessionHistory', sessionHistory);
    console.log('history', history);
  
  }, [sessionHistory, resetStream]);
  
  useEffect(() => {
    if(documents?.length > 0) setModalEditDocument(true);
  }, [documents]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [history, response]);

  return (
    <>
      <Popups />

      <FollowUp
        visible={modalRefineVisible}
        onClose={() => setModalRefineVisible(false)}
        onShowResponse={showResponse}
      />

      <Reference
        visible={reference}
        onClose={() => dispatch(referenceAction(false))}
        onShowResponse={showResponse}
      />

      <EditDocument
        visible={modalEditDocument}
        onClose={() => setModalEditDocument(false)}
        onShowResponse={showResponse}
      />

      <View style={styles.buddyContainer}>
        <ScrollView 
          contentContainerStyle={styles.contentContainerStyle} 
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
          ref={scrollViewRef}
        >
          <Text style={{
            fontWeight: 'bold'
          }}>{sessionId}</Text>
          {
            (history && history?.length > 0) &&
              <>
                {history?.map((item, key) => (
                  <View>
                    
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

                  { loader && <ActivityIndicator size="large" /> }
                </View>
              </> :
            <BuddyHelloGreeting style={[styles.buddyHelloGreeting]} />  
          }
        </ScrollView>
        
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
    
  },
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 15
  },
  buddyHelloGreeting: {
    marginTop: 30,
  }
});

export default Home;
