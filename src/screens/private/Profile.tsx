import React, { useEffect } from 'react';
import {
    Modal,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { capitalizeFirstLetter } from '../../utils/Helper';

function Profile(): React.JSX.Element {
    const { userDetails } = useSelector(state => state.auth);
    const navigation = useNavigation();

    useEffect(() => {
        console.log('userDetails', userDetails)
    }, [userDetails]);

    const onClose = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.modalBackground}>
            <BuddyCard
                cardStyle={{
                    height: '100%',
                    width: screenWidth,
                    paddingHorizontal: 25,
                    paddingVertical: 50,
                    borderRadius: 0
                }}
            >
                <View>
                    <Text style={styles.typoTitle2}>Profile Settings</Text>
                    <View style={styles.logoContainer}>
                        {/* <Image
                            style={styles.logo}
                            source={require('./../../assets/images/profile.png')}
                        /> */}
                        <View style={styles.logoConainer}>
                            <Text style={styles.logoText}>{capitalizeFirstLetter(userDetails?.name)}</Text>
                        </View>
                    </View>

                    <View style={styles.typoContainer}>
                        <Text style={styles.typoTitle}>{userDetails?.name} </Text>
                        <Text style={styles.typoSubTitle}>{userDetails?.company?.companyName}</Text>
                        <View style={styles.employeeDetails}>
                            <View style={styles.employeeBox}>
                                <Text style={styles.employeeBoxLeftText}>Employee ID</Text>
                                <Text style={styles.employeeBoxRightText}>{userDetails?.employeeId}</Text>
                            </View>
                            <View style={styles.employeeBox}>
                                <Text style={styles.employeeBoxLeftText}>Email ID</Text>
                                <Text style={styles.employeeBoxRightText}>{userDetails?.email}</Text>
                            </View>
                            <View style={styles.employeeBox}>
                                <Text style={styles.employeeBoxLeftText}>Department</Text>
                                <Text style={styles.employeeBoxRightText}>{userDetails?.department?.departmentName}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <BuddyButton
                    title="Close"
                    onPress={onClose}
                    style={styles.buttonBuddy}
                />

            </BuddyCard>
        </View>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: colors.blacktransparent,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',

    },
    typoContainer: {
        alignItems: 'center',
        marginTop: 25
    },
    
    typoTitle2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    typoTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    typoSubTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
        color: colors.pink
    },
    typoPara: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 14,
        lineHeight: 24,
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 'auto'
    },
    employeeDetails: {
        width: '100%',
        marginTop: 10
    },
    employeeBox: {
        borderBottomColor: colors.bordergray,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    employeeBoxLeftText: {
        width: '40%',
        fontSize: 15,
        paddingVertical: 10
    },
    employeeBoxRightText: {
        width: '60%',
        fontSize: 15,
        paddingVertical: 10
    },
    logoConainer: {
        borderColor: colors.purple,
        borderWidth: 5,
        borderRadius: 100,
        width: 100,
        height: 100,
        padding: 4
    },
    logoText: {
        fontSize: 36,
        fontWeight: 500,
        color: colors.white,
        backgroundColor: '#454746',
        textAlign: 'center',
        padding: 20,
        borderRadius: 80,
    }
});

export default Profile;
