// Home.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyOption from '../../components/BuddyOption';
import { useSelector } from 'react-redux';
import BuddyButton from '../../components/BuddyButton';
import BuddyCard from '../../components/BuddyCard';

type ReferenceProps = {
  visible: boolean;
  onClose: () => void;
  onShowResponse: (selectedOption: string) => void;
};

const Question = ({ visible, onClose, onShowResponse }: ReferenceProps): React.JSX.Element => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');
  const { documents } = useSelector(state => state.stream);

  useEffect(() => {
    console.log('documents', documents);
  }, [documents])
  
  return (
    <>
      <View style={styles.buddyContainer}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <BuddyCard cardStyle={{
              height: '100%',
              width: screenWidth,
              paddingHorizontal: 25,
              paddingVertical: 50,
              borderRadius: 0
            }}
          >
            <View style={styles.typoContainer}>
              <Text style={styles.typoTitle}>Select Document</Text>
              <Text style={styles.typoPara}>
                We've found relevant information to answer your
                question across multiple documents. To proceed,
                please select one of the following documents
                below to generate your response.
              </Text>
            </View>
            
            <View style={styles.buddyResponse}>
              {documents.map((document: any) => (
                <BuddyOption
                  key={document.id} // Use document.id as unique key
                  label={document?.documentTitle}
                  company={document?.company?.companyName}
                  department={document?.department?.departmentName}
                  brief={document?.documentBrief}
                  selected={selectedOption === document.documentTitle}
                  onPress={() => setSelectedOption(document.documentTitle)}
                />
              ))}
            </View>

            <View style={styles.buttonBuddyContainer}>
              <BuddyButton
                title="Show Response"
                onPress={() => onShowResponse(selectedOption)}
                style={styles.buttonBuddy}
              />
            </View>
          </BuddyCard>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buddyContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  buddyResponse: {
    marginTop: 30,
  },
  contentContainerStyle: {
    flex: 1
  },
  buddySendMessage: {
    marginTop: 'auto',
  },
  typoContainer: {
    alignItems: 'center'
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
    // alignSelf: 'center',
    // width: '100%',
    // marginTop: 10
  }
});

export default Question;
