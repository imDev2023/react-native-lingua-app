import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { languages } from '@/data/languages';
import { images } from '@/constants/images';
import { useLanguageStore } from '@/store/languageStore';

const LEARNER_COUNTS: Record<string, string> = {
  es: '28.4M',
  fr: '19.4M',
  de: '8.1M',
  ja: '12.7M',
  ko: '9.3M',
  zh: '7.4M',
};

export default function LanguageSelection() {
  const { selectedLanguageId, setSelectedLanguage } = useLanguageStore();
  const [selectedId, setSelectedId] = useState<string | null>(selectedLanguageId);
  const [search, setSearch] = useState('');

  const filtered = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-2">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#001132" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-poppins-semibold text-text-primary text-lg">
          Choose a language
        </Text>
        {/* Spacer to keep title centered */}
        <View style={{ width: 24 }} />
      </View>

      {/* Search bar */}
      <View className="px-4 mb-2">
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Language list + Continue button */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 4 }}
      >
        <Text className="px-4 mb-1 font-poppins-semibold text-text-primary text-sm">
          Popular
        </Text>

        {filtered.map((language) => {
          const isSelected = selectedId === language.id;
          return (
            <TouchableOpacity
              key={language.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              activeOpacity={0.7}
              onPress={() => setSelectedId(language.id)}
            >
              <Image source={{ uri: language.flag }} style={styles.flag} />
              <View className="flex-1 ml-3">
                <Text
                  className="font-poppins-semibold text-text-primary"
                  style={{ fontSize: 15 }}
                >
                  {language.name}
                </Text>
                <Text className="font-poppins text-text-secondary text-sm">
                  {LEARNER_COUNTS[language.id]} learners
                </Text>
              </View>
              {isSelected ? (
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              )}
            </TouchableOpacity>
          );
        })}

        {/* Continue sits right below the last card */}
        <View className="px-4 pt-3 pb-1">
          <TouchableOpacity
            style={[
              styles.continueBtn,
              !selectedId && styles.continueBtnDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!selectedId}
            onPress={() => {
                if (selectedId) {
                  setSelectedLanguage(selectedId);
                  router.replace('/');
                }
              }}
          >
            <Text className="font-poppins-semibold text-white text-base">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Earth illustration — fixed height below the scroll area */}
      <Image source={images.earth} style={styles.earthImage} resizeMode="contain" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#001132',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 7,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  cardSelected: {
    borderColor: '#6C4EF5',
    backgroundColor: '#F5F2FF',
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#6C4EF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtn: {
    backgroundColor: '#6C4EF5',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  continueBtnDisabled: {
    opacity: 0.4,
  },
  earthImage: {
    width: '100%',
    height: 160,
  },
});
