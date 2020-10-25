import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';

//file css
import styles from './Styles';

//file global
import { colors } from '../../ConfigGlobal';

//file component
import HeaderComponent from '../Header/Header';

//library
import { Rating } from 'react-native-ratings';
import Icons from 'react-native-vector-icons/Ionicons';

//lib firebase
import { auth } from '../../Database/Firebase/ConfigGlobalFirebase';

//trip item information
const TourItemInformation = ({ nameIcon, text }) => {
    return(
        <View style={styles.containerTourItemInformation}>
            <Icons name={nameIcon} size={25} color={colors.TEXT_DARK_JUNGLE_GREEN}/>
            <Text style={styles.textInformation}>{text}</Text>
        </View>
    );
}

export default class ProfileTourGuides extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // props cho tour
        const { name, tourguideName, avgRating, introduce, 
            time, numberPeople, category, languages, 
            description, price, tourguideImage, tourguideImageCover } = this.props.route.params.tour;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                {/* header component */}
                <HeaderComponent {...this.props}/>
                {/* thong tin ve tour va tour guide*/}
                <ScrollView>
                    {/* phan top anh bia, avatar */}
                    <View style={{ flex: 1 }}>
                        <Image 
                            style={styles.imageCoverTourGuide}
                            source={{uri: tourguideImageCover }}
                        />
                        <View style={styles.containerAvatarTourGuide}>
                            <Image 
                                style={styles.avatarTourGuide}
                                source={{ uri: tourguideImage }}
                            />
                            </View>
                    </View>
                    {/* phan mid thong tin */}
                    <View style={styles.containerTitleAndRating}>
                        {/* title topic va name tour guide */}
                        <View style={styles.containerTextTitle}>
                            <Text style={styles.textTitle}>
                                {name}
                            </Text>
                        </View>
                        <View style={styles.containerTextTitleNameTourGuide}>
                            <Text style={styles.textTitleNameTourGuide}>{`With ${tourguideName}`}</Text>
                        </View>
                        <View style={styles.containerRating}>
                            <Rating 
                                type="custom"
                                ratingCount={5}
                                readonly={true}
                                imageSize={18}
                                startingValue={avgRating}
                            />
                            <Text style={styles.textRating}>{`(${avgRating})`}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const { navigate } = this.props.navigation;
                                    navigate('Reviews Tour Screen');
                                }}
                            >
                                <Text style={styles.textReviews}>See all reviews</Text>
                            </TouchableOpacity>
                        </View>
                        {/* gioi thieu ve tourguide */}
                        <View style={styles.containerIntroTourGuide}>
                            <Text style={styles.textIntroTourGuide}>{introduce}</Text>
                        </View>
                        {/* thong tin ve chuyen di */}
                        <View style={styles.containerInformationTour}>
                            <TourItemInformation nameIcon='time-outline' text={`${time} hours`}/>
                            <TourItemInformation nameIcon='people-outline' text={`Private group up to ${numberPeople} people`}/>
                            <TourItemInformation nameIcon='map-outline' text={category}/>
                            <TourItemInformation nameIcon='globe-outline' text={languages}/>
                        </View>
                        <View style={styles.containerSchedule}>
                            <Text style={styles.titleSchedule}>
                                What we are going to do
                            </Text>
                            <Text style={styles.textSchedule}>
                                {description}
                            </Text>
                        </View>
                        <View style={styles.containerGoodToKnow}>
                            <Text style={styles.textGoodToKnow}>Good to know</Text>
                            <View style={`${styles.containerMeetingPoint}`}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons 
                                        name='videocam-outline'
                                        size={25}
                                    />
                                    <Text style={styles.textTitleMeetingPoint}>Meeting point</Text>
                                </View>
                                <Text style={styles.textMeetingPoint}>
                                    We will meet online in a video call. You will receive a custom link after your booking is confirmed.
                                </Text>
                                <Text style={[styles.textTitleMeetingPoint, { marginTop: 15, marginLeft: 0}]}>
                                    Cancellations
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons 
                                        name='checkmark-outline'
                                        size={25}
                                        color={colors.COLOR_HEART}
                                    />
                                    <Text style={[styles.textMeetingPoint, { marginLeft: 5 }]}>
                                        Free cancellation up to 24H in advance
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons 
                                        name='checkmark-outline'
                                        size={25}
                                        color={colors.COLOR_HEART}
                                    />
                                    <Text style={[styles.textMeetingPoint, { marginLeft: 5 }]}>
                                        Reschedule at any time without any additional costs
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* phan bottom gia tien */}
                <View style={styles.containerBookingAndPrice}>
                    <View style={styles.containerPrice}>
                        <Text style={styles.textPrice}>{`${price}$`}</Text>
                        <Text style={styles.textInvite}>{`Invite ${numberPeople - 1} friends for free`}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            const isUser = auth().currentUser;
                            const { navigate } = this.props.navigation;
                            if(!isUser) {
                                navigate('Sign In Screen');
                            } else {
                                navigate('Booking Screen');
                            }
                        }}
                        style={styles.containerButtonBooking}
                    >
                        <Text style={styles.textButtonBooking}>Book now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}