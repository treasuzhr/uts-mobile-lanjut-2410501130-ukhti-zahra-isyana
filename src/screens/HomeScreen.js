import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation();

  const getCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const json = await response.json();
      setData(json.categories);
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
    getCategories();
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <View>
          <Text>{error}</Text>
          <Text onPress={onRefresh}>Coba Lagi</Text>
        </View>
      ) : (
        <FlatList 
          data={data}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={({idCategory}) => idCategory}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Browse', {
              categoryName: item.strCategory
            })}>
              <Text>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;