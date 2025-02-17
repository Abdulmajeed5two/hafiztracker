import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment-timezone';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';
import BackButton from '../components/BackButton';
import azan from '../assets/sound/salah.mp3'
import { LanguageContext } from '../context/LanguageContext';


const PrayerTimeScreen = ({navigation}) => {
  const {language} = useContext(LanguageContext);
  const [coordinates, setCoordinates] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sevenDayPrayerTimes, setSevenDayPrayerTimes] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location for prayer times.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getSevenDayPrayerTimes = (coordinates) => {
    const sevenDayTimes = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const date = startDate.clone().add(i, 'days').toDate();
      const times = new PrayerTimes(coordinates, date, CalculationMethod.MoonsightingCommittee());
      sevenDayTimes.push({
        date: moment(date).format('MMM DD'),
        fajr: moment(times.fajr).format('h:mm A'),
        dhuhr: moment(times.dhuhr).format('h:mm A'),
        asr: moment(times.asr).format('h:mm A'),
        maghrib: moment(times.maghrib).format('h:mm A'),
        isha: moment(times.isha).format('h:mm A'),
      });
    }
    return sevenDayTimes;
  };

  useEffect(() => {
    const fetchLocationAndPrayerTimes = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = new Coordinates(latitude, longitude);
          setCoordinates(userCoordinates);

          const params = CalculationMethod.MoonsightingCommittee();
          const date = new Date();
          const times = new PrayerTimes(userCoordinates, date, params);
          setPrayerTimes(times);

          const current = times.currentPrayer();
          setCurrentPrayer(current);

          const next = times.nextPrayer();
          setUpcomingPrayer(next);

          const sevenDayTimes = getSevenDayPrayerTimes(userCoordinates);
          setSevenDayPrayerTimes(sevenDayTimes);

          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    fetchLocationAndPrayerTimes();
  }, []);

  const prayerName = (prayer) => {
    switch (prayer) {
      case Prayer.Fajr:
        return 'Fajr';
      case Prayer.Dhuhr:
        return 'Dhuhr';
      case Prayer.Asr:
        return 'Asr';
      case Prayer.Maghrib:
        return 'Maghrib';
      case Prayer.Isha:
        return 'Isha';
      default:
        return 'None';
    }
  };

  const formatTime = (time) =>
    time ? moment(time).format('h:mm A') : 'N/A';

  const renderPrayerTimeRow = ({ item }) => {
    const isActive = item === currentPrayer || item === upcomingPrayer;
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.prayerCell]}>{prayerName(item)}</Text>
        <Text style={[styles.tableCell, styles.timeCell]}>
          {formatTime(prayerTimes?.timeForPrayer(item))}
        </Text>
        <TouchableOpacity style={styles.notifyCell}>
          <Image
            source={isActive ? icons.ActiveNotify : icons.Notify}
            style={[
              styles.Icon,
              { tintColor: isActive ? colors.PrimaryGreen : colors.gray },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSevenDayPrayerTimes = ({ item }) => (
    <View style={styles.sevenDayTableRow}>
      <Text style={[styles.sevenDayTableCell, styles.dateCell]}>{item.date}</Text>
      <Text style={styles.sevenDayTableCell}>{item.fajr}</Text>
      <Text style={styles.sevenDayTableCell}>{item.dhuhr}</Text>
      <Text style={styles.sevenDayTableCell}>{item.asr}</Text>
      <Text style={styles.sevenDayTableCell}>{item.maghrib}</Text>
      <Text style={styles.sevenDayTableCell}>{item.isha}</Text>
    </View>
  );

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'today') {
      return (
        <>
          {renderSectionHeader(`Today's Prayer Times (${moment(new Date()).format('MMMM DD, YYYY')})`)}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.prayerHeaderCell]}>Prayer</Text>
              <Text style={[styles.tableHeaderCell, styles.timeHeaderCell]}>Time</Text>
              <Text style={[styles.tableHeaderCell, styles.notifyHeaderCell]}>Notify</Text>
            </View>
            <FlatList
              data={[Prayer.Fajr, Prayer.Dhuhr, Prayer.Asr, Prayer.Maghrib, Prayer.Isha]}
              renderItem={renderPrayerTimeRow}
              keyExtractor={(item) => item}
              scrollEnabled={false}
            />
          </View>
        </>
      );
    } else if (item.type === 'sevenDay') {
      return (
        <>
          {renderSectionHeader('Next 7 Days Prayer Times')}
          <View style={styles.sevenDayTableContainer}>
            <View style={styles.sevenDayTableHeader}>
              <Text style={[styles.sevenDayTableHeaderCell, styles.dateHeaderCell]}>Date</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === "English" ? 'Fajr':'فجر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Dhuhr':'ظہر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Asr':'عصر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Maghrib':'مغرب'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Isha':'عشاء'}</Text>
            </View>
            <FlatList
              data={sevenDayPrayerTimes}
              renderItem={renderSevenDayPrayerTimes}
              keyExtractor={(item) => item.date}
              scrollEnabled={false}
            />
          </View>
        </>
      );
    }
    return null;
  };

  const data = [
    { type: 'today' },
    { type: 'sevenDay' },
  ];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.PrimaryGreen} />
      </View>
    );
  }

  if (!coordinates) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to fetch location. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerText}>Prayer Time</Text>
        </View>
      }
      />
      </View>
  );
};

export default PrayerTimeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  Icon: {
    width: 20,
    height: 20,
  },
  header: {
    backgroundColor: colors.PrimaryGreen,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  tableContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.PrimaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  prayerHeaderCell: {
    flex: 2,
    textAlign: 'left',
  },
  timeHeaderCell: {
    flex: 1,
    textAlign: 'center',
  },
  notifyHeaderCell: {
    flex: 1,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  tableCell: {
    fontSize: 14,
  },
  prayerCell: {
    flex: 2,
    textAlign: 'left',
  },
  timeCell: {
    flex: 1,
    textAlign: 'center',
  },
  notifyCell: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sevenDayTableContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 20,
  },
  sevenDayTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.PrimaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sevenDayTableHeaderCell: {
    fontSize: 12,
    color: colors.white,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dateHeaderCell: {
    flex: 0.8,
  },
  sevenDayTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  sevenDayTableCell: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  dateCell: {
    flex: 0.8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorText: {
    fontSize: 18,
    color: colors.red,
    textAlign: 'center',
    padding: 20,
  },
});