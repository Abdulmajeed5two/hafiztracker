import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import Header from '../../components/Header';
import icons from '../../constant/Icons';
import { FlatList } from 'react-native-gesture-handler';
import { width } from '../../constant/Size';
import { colors } from '../../constant/Colors';
import { StudentContext } from '../../context/StudentContext';
import { TeacherContext } from '../../context/TeacherContext';

const TeacherList = ({navigation}) => {
  const { teacherData, fetchTeacheres, pageNumber, loading } = useContext(TeacherContext);

  return (
    <View style={styles.container}>
      <Header
        title="Teacher List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
      <View style={styles.campus}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('addteacher')}>
            <Image source={icons.Teacher} style={styles.icon} />
            <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>MasjidId</Text>
          <Text style={styles.headerText}>Phone</Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={teacherData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.rowText}>{item.userName}</Text>
                <Text style={styles.rowText}>{item.masjidId}</Text>
                <Text style={styles.rowText}>{item.phone}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>

      <View style={styles.pagination}>
        <TouchableOpacity 
          onPress={() => fetchTeacheres(pageNumber - 1)} 
          disabled={pageNumber === 1}
          style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
        >
         <Text style={styles.text}>
         Prev
         </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {pageNumber}</Text>

        <TouchableOpacity 
          onPress={() => fetchTeacheres(pageNumber + 1)}
          style={styles.pageButton}
        >
         <Text style={styles.text}>
         Next
         </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeacherList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: colors.white,
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
},
campus:{
    margin:12
},
  scrollContainer: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 14,
    color: '#333',
    fontWeight:'600'
  },
  icon:{
    width:50,
    height:50,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
