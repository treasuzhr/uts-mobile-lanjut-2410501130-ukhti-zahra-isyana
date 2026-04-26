import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
              keyExtractor={({idMeal}) => idMeal}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                  idMeal: item.idMeal
                })}>
                  <Text>{item.strMeal}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      );

};

export default BrowseScreen;