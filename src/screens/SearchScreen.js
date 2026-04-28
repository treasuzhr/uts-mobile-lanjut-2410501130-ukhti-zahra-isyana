import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';

const SearchScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigation = useNavigation();

    const getMeals = async () => {
      if (query.trim() === '') {
        setValidationError('Kolom pencarian tidak boleh kosong.');
        return;
      }
      if (query.trim().length < 3) {
        setValidationError('Minimal 3 karakter.');
        return;
      }
      setValidationError('');
      setLoading(true);
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const json = await response.json();
          setData(json.meals);
        } catch (error) {
          setError('Gagal memuat data.');
        } finally {
          setLoading(false);
        }
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔍 Cari Resep</Text>
          <Text style={styles.headerSubtitle}>Temukan resep yang kamu inginkan</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Cari resep..."
            placeholderTextColor={COLORS.gray}
          />
          <TouchableOpacity style={styles.searchButton} onPress={getMeals}>
            <Text style={styles.searchButtonText}>Cari</Text>
          </TouchableOpacity>
        </View>

        {validationError ? (
          <Text style={styles.validationError}>{validationError}</Text>
        ) : null}

        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 40}}/>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ketik nama resep dan tekan Cari</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={({idMeal}) => idMeal}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Home', {
                  screen: 'Detail',
                  params: { idMeal: item.idMeal }
                })}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#FFE0CC',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: COLORS.text,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  validationError: {
    color: COLORS.error,
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 15,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default SearchScreen;