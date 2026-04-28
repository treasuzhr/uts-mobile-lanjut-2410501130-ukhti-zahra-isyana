import React, {useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoriteContext } from '../context/FavoritesContext';
import { COLORS } from '../constants';

const DetailScreen = ({ route }) => {
    const { idMeal } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { state, dispatch } = useContext(FavoriteContext);
    const isFavorited = state.favorites.some(item => item.idMeal === data?.idMeal);

    const getMealDetail = async () => {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
          const json = await response.json();
          setData(json.meals[0]);
        } catch (error) {
          setError('Gagal memuat data.');
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      getMealDetail();
    }, []);

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 40}}/>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <ScrollView>
            <Image source={{uri: data.strMealThumb}} style={styles.image}/>
            <View style={styles.content}>
              <Text style={styles.title}>{data.strMeal}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.badge}>🍽️ {data.strCategory}</Text>
                <Text style={styles.badge}>🌍 {data.strArea}</Text>
              </View>
              <Text style={styles.sectionTitle}>Instruksi</Text>
              <Text style={styles.instructions}>{data.strInstructions}</Text>
              <Text style={styles.sectionTitle}>YouTube</Text>
              <Text style={styles.youtube}>{data.strYoutube}</Text>
              <TouchableOpacity
                style={[styles.favButton, isFavorited && styles.favButtonDisabled]}
                onPress={() => {
                  if (!isFavorited) {
                    dispatch({ type: 'ADD_FAVORITE', payload: data });
                  }
                }}>
                <Text style={styles.favButtonText}>
                  {isFavorited ? 'Sudah di Favorit' : 'Tambah ke Favorit'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#FFE0CC',
    color: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 16,
  },
  instructions: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
  },
  youtube: {
    fontSize: 14,
    color: COLORS.primary,
  },
  favButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  favButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
  },
  favButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
});

export default DetailScreen;