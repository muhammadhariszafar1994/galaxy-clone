/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { useNavigation } from '@react-navigation/native';

function Welcome(): React.JSX.Element {
    const navigation = useNavigation();

    return <>
        <ScrollView keyboardShouldPersistTaps="handled">
            <BuddyContainer>
                <View style={
                    styles.logoContainer
                }>
                    <Image
                        style={styles.logo}
                        source={require('./../../assets/images/logo.png')}
                    />
                </View>

                <View style={styles.cardContainer}>
                    <BuddyCard
                        cardStyle={{
                            height: screenHeight,
                            width: screenWidth * 0.75,
                        }}
                    >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>WELCOME</Text>
                        </View>

                        <View style={
                            styles.imageBuddyContainer
                        }>
                            <Image
                                style={styles.imageBuddy}
                                source={require('./../../assets/images/nerdybuddy-charactor.png')}
                            />
                        </View>

                        <BuddyButton
                            title="Get Started"
                            onPress={() => navigation.navigate('login')}
                            style={styles.buttonBuddy}
                        />

                        <BuddyLang onPress={() => navigation.navigate('preferred-language')} style={styles.langBuddy} />
                    </BuddyCard>
                </View>
            </BuddyContainer>
        </ScrollView>
    </>;
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: screenWidth * 0.7,
        height: 50,
        objectFit: 'contain',
        marginTop: 100
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: 25
    },
    title: {
        fontSize: 22,
        color: colors.pink
    },
    cardContainer: {
        marginTop: 15
    },
    imageBuddyContainer: {
        alignItems: 'center'
    },
    imageBuddy: {
        width: screenWidth * 0.5,
        height: 300,
        objectFit: 'contain',
    },
    buttonBuddy: {
        alignSelf: 'center',
        width: screenWidth * 0.85,
        marginVertical: 50
    },
    langBuddy: {
        alignSelf: 'center',
    }
});

export default Welcome;
