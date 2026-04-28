import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants'

const BrowseScreen = ({ route }) => {
    const { categoryName } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false)
    const navigation = useNavigation();

    const getMeals = async () => {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
          const json = await response.json();
          setData(json.meals);
        } catch (error) {
          setError('Gagal memuat data.');
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
    };
    
    const onRefresh = () => {
        setRefreshing(true);
        setError(null);
        getMeals();
    }
    
    useEffect(() => {
        getMeals();
    }, []);

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🍴 {categoryName}</Text>
            <Text style={styles.headerSubtitle}>Pilih resep yang kamu suka</Text>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 40}}/>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
                <Text style={styles.retryText}>Coba Lagi</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList 
              data={data}
              onRefresh={onRefresh}
              refreshing={refreshing}
              keyExtractor={({idMeal}) => idMeal}
              contentContainerStyle={styles.listContainer}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('Detail', {
                    idMeal: item.idMeal
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
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default BrowseScreen;