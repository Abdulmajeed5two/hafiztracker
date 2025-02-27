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
import azan from '../assets/sound/salah.mp3';
import { LanguageContext } from '../context/LanguageContext';

const PrayerTimeScreen = ({ navigation }) => {
  const { language } = useContext(LanguageContext);
  const [coordinates, setCoordinates] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sevenDayPrayerTimes, setSevenDayPrayerTimes] = useState([]);
  const [calcMethod, setCalcMethod] = useState('MoonsightingCommittee');

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

  const getPrayerTimes = (coordinates, date, method) => {
    let params;
    switch (method) {
      case 'Hanafi':
        params = CalculationMethod.MuslimWorldLeague();
        params.madhab = 'Hanafi';
        break;
      case 'Shafi':
        params = CalculationMethod.MuslimWorldLeague();
        params.madhab = 'Shafi';
        break;
      default:
        params = CalculationMethod.MoonsightingCommittee();
    }
    return new PrayerTimes(coordinates, date, params);
  };

  const getSevenDayPrayerTimes = (coordinates) => {
    const sevenDayTimes = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const date = startDate.clone().add(i, 'days').toDate();
      const times = getPrayerTimes(coordinates, date, calcMethod);
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

  const fetchLocationAndPrayerTimes = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        setError('Location permission denied. Please enable it in settings.');
        return;
      }

      setLoading(true);
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = new Coordinates(latitude, longitude);
          setCoordinates(userCoordinates);

          const date = new Date();
          const times = getPrayerTimes(userCoordinates, date, calcMethod);
          setPrayerTimes(times);

          const current = times.currentPrayer();
          setCurrentPrayer(current);

          const next = times.nextPrayer();
          setUpcomingPrayer(next);

          const sevenDayTimes = getSevenDayPrayerTimes(userCoordinates);
          setSevenDayPrayerTimes(sevenDayTimes);

          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Location Error:', error);
          let errorMessage = 'Unable to fetch location';
          switch (error.code) {
            case 1:
              errorMessage = 'Location permission denied';
              break;
            case 2:
              errorMessage = 'Location unavailable. Please check GPS';
              break;
            case 3:
              errorMessage = 'Location request timed out';
              break;
          }
          setError(errorMessage);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred while fetching location');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationAndPrayerTimes();
  }, [calcMethod]);

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

  const formatTime = (time) => (time ? moment(time).format('h:mm A') : 'N/A');

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

  const MethodSelector = () => (
    <View style={styles.methodSelector}>
      <TouchableOpacity
        style={[styles.methodButton, calcMethod === 'MoonsightingCommittee' && styles.activeMethod]}
        onPress={() => setCalcMethod('MoonsightingCommittee')}
      >
        <Text style={styles.methodButtonText}>Standard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.methodButton, calcMethod === 'Hanafi' && styles.activeMethod]}
        onPress={() => setCalcMethod('Hanafi')}
      >
        <Text style={styles.methodButtonText}>Hanafi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.methodButton, calcMethod === 'Shafi' && styles.activeMethod]}
        onPress={() => setCalcMethod('Shafi')}
      >
        <Text style={styles.methodButtonText}>Shafi'i</Text>
      </TouchableOpacity>
    </View>
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
              <Text style={styles.sevenDayTableHeaderCell}>{language === "English" ? 'Fajr' : 'فجر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Dhuhr' : 'ظہر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Asr' : 'عصر'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Maghrib' : 'مغرب'}</Text>
              <Text style={styles.sevenDayTableHeaderCell}>{language === 'English' ? 'Isha' : 'عشاء'}</Text>
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

  if (!coordinates || error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Unable to fetch location. Please try again.'}
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchLocationAndPrayerTimes}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <MethodSelector />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
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
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: 20,
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
  retryButton: {
    marginTop: 20,
    backgroundColor: colors.PrimaryGreen,
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  methodButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  activeMethod: {
    backgroundColor: colors.PrimaryGreen,
  },
  methodButtonText: {
    color: colors.black,
    fontSize: 14,
  },
});