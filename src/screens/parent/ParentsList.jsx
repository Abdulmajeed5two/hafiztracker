import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../../components/Header';
import icons from '../../constant/Icons';
import { width } from '../../constant/Size';
import { colors } from '../../constant/Colors';
import { ParentsContext } from '../../context/ParentsContext';

const ParentsList = ({ navigation }) => {
  const { parentsData, pageNumber, loading, fetchParentses } = useContext(ParentsContext);
  const [selectedParent, setSelectedParent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); 

  const openModal = (parent) => {
    setSelectedParent(parent);
    setModalVisible(true);
  };

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true
    await fetchParentses(pageNumber); // Trigger the fetch to reload data
    setRefreshing(false); // Set refreshing to false after data is loaded
  };

  return (
    <View style={styles.container}>
      <Header
        title="Parent List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />

      <View style={styles.campus}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('addparents')}>
          <Image source={icons.Parent} style={styles.icon} />
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeaderB}>
        <Text style={styles.headerText}>Parent Name</Text>
        <Text style={styles.headerText}>Phone</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={parentsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)} style={styles.tableRow}>
              <Text style={styles.rowText}>{item.fatherName}</Text>
              <Text style={styles.rowText}>{item.contact}</Text>
            </TouchableOpacity>
          )}
          refreshing={refreshing} // Pass the refreshing state to FlatList
          onRefresh={onRefresh}   // Implement the onRefresh callback
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => fetchParentses(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
        >
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {pageNumber}</Text>

        <TouchableOpacity onPress={() => fetchParentses(pageNumber + 1)} style={styles.pageButton}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL FOR PARENT DETAILS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parent Details</Text>
            {selectedParent && (
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>User Name:</Text>
                  <Text style={styles.tableData}>{selectedParent.userName}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Email:</Text>
                  <Text style={styles.tableData}>{selectedParent.email}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Father Name:</Text>
                  <Text style={styles.tableData}>{selectedParent.fatherName}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Mother Name:</Text>
                  <Text style={styles.tableData}>{selectedParent.motherName}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Father CNIC:</Text>
                  <Text style={styles.tableData}>{selectedParent.fatherCNIC}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Mother CNIC:</Text>
                  <Text style={styles.tableData}>{selectedParent.motherCNIC}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Contact:</Text>
                  <Text style={styles.tableData}>{selectedParent.contact}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Address:</Text>
                  <Text style={styles.tableData}>{selectedParent.address}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Description:</Text>
                  <Text style={styles.tableData}>{selectedParent.description}</Text>
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ParentsList;

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
  campus: {
    margin: 12,
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
  icon: {
    width: 50,
    height: 50,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    width: '40%',
  },
  tableData: {
    width: '60%',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
