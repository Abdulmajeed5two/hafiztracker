import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useContext, useState, useCallback } from 'react';
import { SuratContext } from '../../context/SuratContext';
import { colors } from '../../constant/Colors';
import Appbar from '../../components/Appbar';
import { LanguageContext } from '../../context/LanguageContext';

const ITEMS_PER_PAGE = 13;

const Surat = ({ navigation }) => {
  const {language} = useContext(LanguageContext)
  const { suratData, loading } = useContext(SuratContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const paginatedData = suratData?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const totalPages = Math.ceil((suratData?.length || 0) / ITEMS_PER_PAGE);

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Appbar
        title={language === 'English' ? "Surat":'سورت'}
        onMenuPress={() => navigation.goBack()}
        onNotifyPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.fixedHeader}>
        <Text style={styles.headerText}>{language === 'English' ? 'Surat Number':'سورت نمبر'}</Text>
        <Text style={styles.headerText}>{language === 'English' ? 'Surat Name':'سورت نام'}</Text>
      </View>
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" color={colors.primary} /> :
          <Text style={styles.loadingText}>No Surat Found</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tableRow}>
            <Text style={styles.rowText}>{item.suratNumber}</Text>
            <Text style={styles.rowText}>{item.suratName}</Text>
          </TouchableOpacity>
        )}
      />

      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => handlePagination(pageNumber - 1)}
            disabled={pageNumber === 1}
            style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
          >
            <Text style={styles.text}>Prev</Text>
          </TouchableOpacity>

          <Text style={styles.pageText}>Page {pageNumber} of {totalPages}</Text>

          <TouchableOpacity
            onPress={() => handlePagination(pageNumber + 1)}
            disabled={pageNumber === totalPages}
            style={[styles.pageButton, pageNumber === totalPages && styles.disabledButton]}
          >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Surat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10, 
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
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  paginationContainer: {
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
});
