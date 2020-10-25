import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView } from 'react-native';

// file css
import styles from './Styles';

//library
import Icons from 'react-native-vector-icons/Ionicons';

//file component
import HeaderComponent from '../Header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

// file config firebase
import { auth, logOut } from '../../Database/Firebase/ConfigGlobalFirebase';
import { colors } from '../../ConfigGlobal';

const Item = ({ title, nameIcon, nameScreen, navigation }) => {
    return(
        <TouchableOpacity 
            onPress={() => {
                const { navigate } = navigation;
                navigate(nameScreen);
            }}
        >
            <View style={styles.containerItem}>
                <Text style={styles.textItem}>{title}</Text>
                <Icons name={nameIcon} size={25} color='#000'/>
            </View>
        </TouchableOpacity>
    );
}

const ItemSignOut = ({ title, nameIcon, _signOut }) => {
    return(
        <TouchableOpacity 
            onPress={_signOut}
        >
            <View style={styles.containerItem}>
                <Text style={styles.textItem}>{title}</Text>
                <Icons name={nameIcon} size={25} color='#000'/>
            </View>
        </TouchableOpacity>
    );
}

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    _signOut = () => {
        logOut().then(() => {
            console.log('log out !');
            this.setState({ user: null });
        });
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({ user });
            }
       });
       this.props._onGetTraveler();
    }

    componentDidUpdate() {
        this.props._onGetTraveler();
    }

    render() {
        const { user } = this.state;
        if(user) {
            const { email, name, picture } = this.props.traveler;
            return(
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <HeaderComponent {...this.props} isHome={true}/>
                    <ScrollView>
                        <View style={styles.containerTop}>
                            <View style={styles.containerImage}>
                                <Image 
                                    style={styles.image}
                                    source={{ uri:  picture}}
                                />
                            </View>
                            <View style={styles.containerNameAndEmail}>
                                <Text style={styles.textName}>{name}</Text>
                                <Text style={styles.textEmail}>{email}</Text>
                            </View>
                        </View>
                        <View style={styles.containerBottom}>
                            <Item title='Profile' nameIcon='person-outline' nameScreen='Profile Screen' navigation={this.props.navigation}/>
                            <Item title='Bookings' nameIcon='calendar-outline'/>
                            <Item title='Become a tour guide' nameIcon='medal-outline' nameScreen='Register Tour Guide Screen' navigation={this.props.navigation}/>
                            <Item title='Favorites' nameIcon='heart-outline'/>
                            <Item title='Change password' nameIcon='lock-closed-outline'/>
                            <ItemSignOut title='Sign out' nameIcon='log-out-outline' _signOut={this._signOut}/>
                        </View>
                    </ScrollView>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <HeaderComponent {...this.props} isHome={true}/>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '500'
                        }}>
                            You are not logged in to your account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                const { navigate } = this.props.navigation;
                                navigate('Sign In Screen');
                            }}
                        >
                            <View style={{
                                width: 120,
                                height: 45,
                                backgroundColor: colors.BACKGROUND_BLUEYONDER,
                                borderRadius: 22,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '600',
                                    color: colors.BACKGROUND_CULTURE
                                }}
                                    >Sign In
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}