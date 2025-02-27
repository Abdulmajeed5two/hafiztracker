import { FlatList, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useContext, useState } from 'react';
import { StudentContext } from '../../context/StudentContext';
import Appbar from '../../components/Appbar';

const CheckActStudents = ({ navigation }) => {
  const { studentData, fetchStudentes, pageNumber, loading } = useContext(StudentContext);
  const [refreshing, setRefreshing] = useState(false);

  const onStudentPress = (student) => {
    navigation.navigate("actuser", { student }); 
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStudentes(pageNumber);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Appbar
        title="Select Student"
        onMenuPress={() => navigation.goBack()}
        onNotifyPress={() => console.log('Notification Pressed')}
      />

      <FlatList
        data={studentData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.tableHeaderB}>
            <Text style={styles.headerText}>Names</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.loadingText}>{loading ? 'Loading...' : 'No Students Found'}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onStudentPress(item)} style={styles.tableRow}>
            <Text style={styles.rowText}>{item.userName}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => fetchStudentes(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
        >
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {pageNumber}</Text>

        <TouchableOpacity
          onPress={() => fetchStudentes(pageNumber + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CheckActStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tableHeaderB: {
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
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});
