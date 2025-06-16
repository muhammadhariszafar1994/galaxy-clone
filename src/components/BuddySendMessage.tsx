import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, StyleProp, ViewStyle, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { startSpeechToText } from 'react-native-voice-to-text';
import { colors } from '../utils/Constants';
import BuddyButtonReverse from './BuddyButtonReverse';
import BuddyBlockButton from './BuddyBlockButton';

type BuddyCardProps = {
  style?: StyleProp<ViewStyle>;
  onMessageSend?: (data: FormValues) => void;
  // onMicPress?: () => void;
  onRefineIt?: () => void;
  onReferences?: () => void;
  onEditDocument?: () => void;
  editDocument?: Boolean;
  simplePanel: Boolean;
  operationalPanel: Boolean,
  refineIt: Boolean,
  references: Boolean
};

type FormValues = {
  message: string;
};

export type BuddySendMessageRef = {
  reset: () => void;
};

const BuddySendMessage = forwardRef<BuddySendMessageRef, BuddyCardProps>(({
  style,
  onMessageSend,
  onRefineIt,
  onReferences,
  onEditDocument,
  editDocument,
  simplePanel,
  operationalPanel,
  refineIt,
  references
}, ref) => {

  const { handleSubmit, control, formState: { errors }, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      message: '',
    },
  });

  const messageValue = watch('message'); // Watch the message value

  const onSubmit = async (data: FormValues) => {
    onMessageSend?.(data);
    reset();
  };
  
  useImperativeHandle(ref, () => ({
    reset: () => reset()
  }));

  return (
    <View style={[styles.container, style]}>
        <View style={[styles.fieldbox]}>
            <View style={styles.fieldset}>
                <View style={styles.fields}>
                    <Controller
                        name="message"
                        control={control}
                        rules={{
                          required: 'Field is required',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            <TextInput
                              placeholder="Type your message..."
                              style={styles.input}
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              multiline={false}
                              numberOfLines={1}
                            />      
                          </>
                        )}
                    />
                </View>

                {(simplePanel && messageValue.trim() !== '') && (
                  <TouchableOpacity style={[styles.button, styles.buttonLG]} onPress={handleSubmit(onSubmit)}>
                      <Image style={styles.buttonImageLG} source={require('./../assets/images/send-message.png')} />
                  </TouchableOpacity>
                )}
                {
                  simplePanel &&
                    <TouchableOpacity style={[styles.button, styles.buttonLG]} onPress={async () => {
                      try {
                        const audioText = await startSpeechToText();
                        console.log('audioText:', { audioText });
                        setValue('message', audioText);
                      } catch (error) {
                        console.log({ error });
                      }
                    }}>
                      <Image style={styles.buttonImageLG} source={require('./../assets/images/mic-2.png')} />
                    </TouchableOpacity>
                }
            </View>

            {errors.message && (
              <Text style={styles.errorText}>{errors.message.message}</Text>
            )}

            {
              // operationalPanel &&
                <View style={[styles.fieldset, {
                    marginTop: 15
                }]}>
                    <View style={styles.leftbox}>
                      {
                        references &&
                          <BuddyButtonReverse 
                            title='Show Reference' 
                            onPress={onReferences ?? (() => {})}
                            buttonStyle={styles.buddyButtonReverse}
                            textStyle={styles.buddyButtonReverseText}
                          />
                      }
                      
                      {
                        refineIt && 
                          <BuddyButtonReverse 
                            title='Refine it' 
                            onPress={onRefineIt ?? (() => {})}
                            buttonStyle={styles.buddyButtonReverse}
                            textStyle={styles.buddyButtonReverseText}
                          />
                      }

                      {
                        editDocument && 
                          <BuddyButtonReverse 
                            title='Select Document' 
                            onPress={onEditDocument ?? (() => {})}
                            buttonStyle={styles.buddyButtonReverse}
                            textStyle={styles.buddyButtonReverseText}
                          />
                      } 
                    </View>
                    {/* <View style={styles.rightbox}> */}
                        {/* <TouchableOpacity style={[
                            styles.button,styles.buttonSM
                        ]} onPress={handleSubmit(onSubmit)}>
                            <Image style={[{
                                height:20,
                                width: 20,
                            }]} source={require('./../assets/images/add-button.png')} />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={[styles.button, styles.buttonSM]} onPress={handleSubmit(onSubmit)}>
                            <Image style={styles.buttonImage} source={require('./../assets/images/mic-2.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSM]} onPress={handleSubmit(onSubmit)}>
                            <Image style={styles.buttonImage} source={require('./../assets/images/send-message.png')} />
                        </TouchableOpacity> */}
                    {/* </View> */}
                </View>
            }

            {/* <View style={[styles.fieldset, {
                marginTop: 15,
                gap: 15
            }]}>
                <BuddyBlockButton 
                    title='New Question'
                    icon={require('./../assets/images/new-question.png')}
                    onPress={() => console.log('Show Reference')}
                    
                />
                <BuddyBlockButton 
                    title='Detailed View'
                    icon={require('./../assets/images/detailed-view.png')}
                    onPress={() => console.log('Detailed View')}
                    
                />
                <BuddyBlockButton 
                    title='Share'
                    icon={require('./../assets/images/share.png')}
                    onPress={() => console.log('Share')}
                    
                />
            </View>

            <View style={[styles.fieldset, {
                marginTop: 15,
                gap: 15
            }]}>
                <BuddyBlockButton 
                    title='New Question'
                    icon={require('./../assets/images/new-question.png')}
                    onPress={() => console.log('Show Reference')}
                    
                />
                <BuddyBlockButton 
                    title='Email this to me'
                    icon={require('./../assets/images/email-this.png')}
                    onPress={() => console.log('Email this to me')}
                    
                />
                <BuddyBlockButton 
                    title='Share Feedback'
                    icon={require('./../assets/images/share-feedback.png')}
                    onPress={() => console.log('Share')}
                    
                />
            </View> */}
        </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  fieldbox: {
    alignItems: 'center',
  },
  fieldset: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  fields: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    height: 50,
    backgroundColor: colors.lightgray,
    flex: 1,
    fontSize: 14
  },
  button: {
    marginLeft: 5,
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLG: {
    height:50,
    width: 50,
    borderRadius: 50,
  },
  buttonSM: {
    height:40,
    width: 40,
    borderRadius: 40,
  },
  buttonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    objectFit: 'contain'
  },
  buttonImageLG: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    objectFit: 'contain'
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  leftbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    gap: '2%'
  },
  rightbox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  },
  buddyButtonReverse: {
    height: 40,
    width: '32%',
    // paddingHorizontal: 6,
    
  },
  buddyButtonReverseText: {
    fontSize: 12,
    textAlign: 'center'
  }
});

export default BuddySendMessage;
