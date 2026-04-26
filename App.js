import { FavoriteProvider } from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <FavoriteProvider>
      <AppNavigator />
    </FavoriteProvider>
  );
}