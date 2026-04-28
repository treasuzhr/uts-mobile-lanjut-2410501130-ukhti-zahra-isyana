import React from 'react';
import { View, Text, Image,StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constants';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About</Text>
        <Text style={styles.headerSubtitle}>Informasi Pengembang</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/foto.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ukhti Zahra Isyana</Text>
        <Text style={styles.nim}>2410501130</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Kelas</Text>
          <Text style={styles.infoValue}>A</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Tema</Text>
          <Text style={styles.infoValue}>ResepKita</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Credit API</Text>
          <Text style={styles.infoValue}>TheMealDB</Text>
          <Text style={styles.infoLink}>www.themealdb.com</Text>
        </View>
      </View>
    </ScrollView>
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
  profileContainer: {
    alignItems: 'center',
    padding: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  nim: {
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 4,
  },
  infoContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  infoLink: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 2,
  },
});

export default AboutScreen;