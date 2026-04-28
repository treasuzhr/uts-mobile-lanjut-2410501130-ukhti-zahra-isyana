import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoriteContext } from '../context/FavoritesContext';
import { COLORS } from '../constants';

const FavoritesScreen = () => {
  const { state, dispatch } = useContext(FavoriteContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorit Saya</Text>
        <Text style={styles.headerSubtitle}>Resep yang kamu simpan</Text>
      </View>

      {state.favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada resep favorit!</Text>
          <Text style={styles.emptySubtext}>Cari resep favoritmu</Text>
        </View>
      ) : (
        <FlatList
          data={state.favorites}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => navigation.navigate('Home', {
                  screen: 'Detail',
                  params: { idMeal: item.idMeal }
                })}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
                <Text style={styles.mealCategory}>🍽️ {item.strCategory}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => dispatch({
                  type: 'REMOVE_FAVORITE',
                  payload: item.idMeal
                })}>
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.gray,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  cardContent: {
    flex: 1,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  mealCategory: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default FavoritesScreen;