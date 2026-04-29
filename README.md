# ResepKita 🍽️

Aplikasi katalog resep masakan berbasis React Native + Expo.

## Identitas
- **Nama:** Ukhti Zahra Isyana
- **NIM:** 2410501130
- **Kelas:** A

## Tema
Tema A - ResepKita (Katalog Resep Kuliner)
API: https://www.themealdb.com/api.php

## Tech Stack
- React Native + Expo SDK 52
- JavaScript
- @react-navigation/native ^7.2.2
- @react-navigation/native-stack ^7.x
- @react-navigation/bottom-tabs ^7.x
- Context API + useReducer

## Cara Install & Run
```bash
git clone https://github.com/treasuzhr/uts-mobile-lanjut-2410501130-ukhti-zahra-isyana
cd uts-mobile-lanjut-2410501130-ukhti-zahra-isyana
npm install
npx expo start
```
Scan QR code dengan Expo Go di HP.

## Screenshot
| Home | Browse | Detail |
|------|--------|--------|
| ![Home](screenshots/home.png) | ![Browse](screenshots/browse.png) | ![Detail](screenshots/detail.png) |

| Favorites | Search | About |
|-----------|--------|-------|
| ![Favorites](screenshots/favorites.png) | ![Search](screenshots/search.png) | ![About](screenshots/about.png) |

## Video Demo
[Link Video Demo] (https://youtu.be/kb3jf2MAmM8?si=x3C3rZLdrbn2C24K)

## State Management
Aplikasi ini menggunakan **Context API + useReducer** untuk mengelola state favorit.

**Alasan pemilihan:**
Context API + useReducer dipilih karena lebih simpel dan sudah built-in di React tanpa perlu install library tambahan.

## Referensi
1. React Navigation - Getting Started - https://reactnavigation.org/docs/getting-started/?framework=expo
2. React Navigation - Stack Navigator - https://reactnavigation.org/docs/stack-navigator/#installation
3. React Navigation - Bottom Tab Navigator - https://reactnavigation.org/docs/bottom-tab-navigator/#installation
4. React Native - Intro to React - https://reactnative.dev/docs/intro-react
5. React Navigation - Nesting Navigators - https://reactnavigation.org/docs/nesting-navigators/?config=dynamic
6. React Native - Network/Fetch - https://reactnative.dev/docs/network?language=javascript
7. TheMealDB API - https://www.themealdb.com/api.php
8. React Native - FlatList - https://reactnative.dev/docs/flatlist
9. Stack Overflow - Pull to Refresh FlatList - https://stackoverflow.com/questions/47570998/implement-pull-to-refresh-flatlist
10. React Navigation - Params - https://reactnavigation.org/docs/params/
11. DEV.to - Context API + useReducer - https://dev.to/thisisarkajitroy/react-context-api-pro-build-state-management-using-usecontext-usereducer-typescript-3gm1
12. React Native - StyleSheet - https://reactnative.dev/docs/stylesheet
13. React Native - Style - https://reactnative.dev/docs/style
14. Materi Pertemuan 7 - Forms & Input Handling, Fakultas Ilmu Komputer 2024/2025

## Refleksi

Pengerjaan UTS ini memberikan banyak pengalaman baru dalam pengembangan aplikasi mobile menggunakan React Native dan Expo.

**Kesulitan yang dihadapi:**
Sempat bingung kenapa header muncul double di HomeScreen. Ternyata karena Stack Navigator dan Bottom Tab Navigator keduanya punya header masing-masing sehingga perlu disembunyikan salah satunya. Selain itu, susah menemukan cara navigasi dari FavoritesScreen ke DetailScreen karena DetailScreen ada di dalam HomeStack (nested navigator). Context API + useReducer juga butuh waktu untuk dimengerti alurnya, terutama cara Provider membungkus seluruh aplikasi agar state bisa diakses semua screen.

**Bug yang pernah muncul:**
- Header muncul double saat masuk BrowseScreen
- Pull to refresh tidak muncul saat kondisi error karena FlatList tidak ter-render
- Import typo berkali-kali dan terkadang lupa memasukkan import yang diperlukan
- Navigation params dari FavoritesScreen ke DetailScreen error "screen not found"

**Yang dipelajari:**
- Cara fetch API dengan loading state dan error handling di React Native
- Navigasi bertingkat Stack + Bottom Tab Navigator
- State management menggunakan Context API + useReducer
- Passing data antar screen menggunakan navigation params
- Styling komponen dengan StyleSheet React Native