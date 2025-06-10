import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyOption from '../../components/BuddyOption';
import BuddyButton from '../../components/BuddyButton';
import BuddyCard from '../../components/BuddyCard';
import BuddyButtonReverse from '../../components/BuddyButtonReverse';

type ReferenceProps = {
  visible: boolean;
  onClose: () => void;
  onShowResponse: (data: { option: string }) => void;
};

const EditDocument = ({ visible, onClose, onShowResponse }: ReferenceProps): React.JSX.Element => {
  const { documents } = useSelector((state: any) => state.stream);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      option: '',
    },
    mode: 'onTouched',
  });

  const selectedOption = watch('option');

  useEffect(() => {
    reset({ option: '' });
  }, [documents, reset]);

  const onSubmit = (data: { option: string }) => {
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
        <View style={styles.buddyContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <BuddyCard
              cardStyle={{
                height: '100%',
                width: screenWidth,
                paddingHorizontal: 25,
                paddingVertical: 50,
                borderRadius: 0,
              }}
            >
              <View style={styles.typoContainer}>
                <Text style={styles.typoTitle}>Select Document</Text>
                <Text style={styles.typoPara}>
                  We've found relevant information to answer your question across multiple documents.
                  To proceed, please select one of the following documents below to generate your response.
                </Text>
              </View>

              <Controller
                control={control}
                name="option"
                rules={{ required: 'Please select a document.' }}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.buddyResponse}>
                    {documents.map((document: any) => (
                      <BuddyOption
                        key={document.id}
                        label={document?.documentTitle}
                        company={document?.company?.companyName}
                        department={document?.department?.departmentName}
                        brief={document?.documentBrief}
                        selected={value === document.documentTitle}
                        onPress={() => onChange(document.documentTitle)}
                      />
                    ))}
                  </View>
                )}
              />

              {errors.option && (
                <Text style={styles.errorText}>{errors.option.message}</Text>
              )}
            </BuddyCard>
          </ScrollView>
          <View style={styles.buttonBuddyContainer}>
              <BuddyButton
                title="Show Response"
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonBuddy}
              />
              <BuddyButtonReverse
                  title="Close"
                  onPress={onClose}
                  buttonStyle={styles.buttonBuddyInverse}
              />
          </View>
        </View>
      </Modal>
    )}
  </>;
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
    flex: 1,
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
    paddingHorizontal: 25,
    paddingVertical: 25,
    },
  buttonBuddy: {
    // optional custom styles
  },
  buttonBuddyInverse: {
    paddingVertical: 12,
    marginTop: 10
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default EditDocument;
