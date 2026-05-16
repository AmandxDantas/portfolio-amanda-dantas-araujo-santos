import { ScrollView, Text, View, Pressable, ActivityIndicator, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

const LANGUAGES = [
  { code: "en", name: "Inglês", flag: "🇺🇸", color: "#3b82f6" },
  { code: "es", name: "Espanhol", flag: "🇪🇸", color: "#ec4899" },
  { code: "fr", name: "Francês", flag: "🇫🇷", color: "#8b5cf6" },
  { code: "de", name: "Alemão", flag: "🇩🇪", color: "#06b6d4" },
  { code: "pt", name: "Português", flag: "🇵🇹", color: "#10b981" },
  { code: "it", name: "Italiano", flag: "🇮🇹", color: "#f59e0b" },
  { code: "ja", name: "Japonês", flag: "🇯🇵", color: "#ef4444" },
  { code: "zh", name: "Chinês", flag: "🇨🇳", color: "#6366f1" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950" containerClassName="bg-gradient-to-b from-slate-900 to-slate-950">
        <ActivityIndicator size="large" color="#3b82f6" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  const handleSelectLanguage = (languageCode: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedLanguage(languageCode);
  };

  const handleFindPartner = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/language-proficiency?language=${selectedLanguage}`);
  };

  const selectedLanguageName = LANGUAGES.find((l) => l.code === selectedLanguage)?.name;
  const selectedLanguageFlag = LANGUAGES.find((l) => l.code === selectedLanguage)?.flag;
  const selectedLanguageColor = LANGUAGES.find((l) => l.code === selectedLanguage)?.color;

  return (
    <ScreenContainer className="p-0" containerClassName="bg-gradient-to-b from-slate-900 to-slate-950" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="bg-gradient-to-b from-slate-900 to-slate-950">
        <View className="flex-1 gap-6 p-6">
          {/* Hero Section */}
          <View className="gap-2">
            <Text className="text-5xl font-bold text-white">
              Olá, {user?.name?.split(" ")[0] || "Estudante"}! 👋
            </Text>
            <Text className="text-slate-300 text-base leading-relaxed">
              Conecte-se com estudantes do mundo todo e pratique idiomas em tempo real
            </Text>
          </View>

          {/* Featured Card */}
          <View className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 gap-3 border border-blue-400 overflow-hidden">
            <View className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full" />
            <Text className="text-white text-sm font-semibold opacity-90">🌍 Conecte Globalmente</Text>
            <Text className="text-white text-2xl font-bold">Encontre seu parceiro ideal</Text>
            <Text className="text-blue-100 text-sm">Pratique com falantes nativos de qualquer lugar do mundo</Text>
          </View>

          {/* Language Selection Card */}
          <View className="bg-slate-800 rounded-3xl p-6 gap-4 border border-slate-700">
            <View className="gap-1">
              <Text className="text-white text-lg font-bold">Qual idioma deseja praticar?</Text>
              <Text className="text-slate-400 text-sm">Escolha entre 8 idiomas disponíveis</Text>
            </View>

            {/* Current Selection */}
            <View 
              className="flex-row items-center justify-between rounded-2xl p-4 border border-slate-600"
              style={{ backgroundColor: `${selectedLanguageColor}20` }}
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">{selectedLanguageFlag}</Text>
                <View>
                  <Text className="text-slate-400 text-xs">Selecionado</Text>
                  <Text className="text-white font-bold text-lg">{selectedLanguageName}</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: selectedLanguageColor }}>
                <Text className="text-white text-lg">✓</Text>
              </View>
            </View>

            {/* Language Grid */}
            <View className="gap-3">
              <View className="flex-row flex-wrap gap-2 justify-between">
                {LANGUAGES.map((lang) => (
                  <Pressable
                    key={lang.code}
                    onPress={() => handleSelectLanguage(lang.code)}
                    style={({ pressed }: { pressed: boolean }) => ({
                      flex: 1,
                      minWidth: "22%",
                      paddingVertical: 14,
                      paddingHorizontal: 8,
                      borderRadius: 16,
                      backgroundColor: selectedLanguage === lang.code ? lang.color : "#334155",
                      borderWidth: 2,
                      borderColor: selectedLanguage === lang.code ? lang.color : "#475569",
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    })}
                  >
                    <View className="items-center gap-1">
                      <Text className="text-2xl">{lang.flag}</Text>
                      <Text
                        className={
                          selectedLanguage === lang.code
                            ? "text-white text-xs font-bold"
                            : "text-slate-300 text-xs"
                        }
                      >
                        {lang.name.split(" ")[0]}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Find Partner Button */}
          <Pressable
            onPress={handleFindPartner}
            style={({ pressed }: { pressed: boolean }) => ({
              backgroundColor: selectedLanguageColor,
              paddingVertical: 16,
              borderRadius: 16,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Text className="text-white font-bold text-center text-lg">
              🎯 Encontrar Parceiro
            </Text>
          </Pressable>

          {/* Stats Section */}
          <View className="gap-3">
            <Text className="text-white font-bold text-sm">Suas Estatísticas</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600">
                <Text className="text-3xl font-bold text-blue-400">0</Text>
                <Text className="text-slate-400 text-xs mt-1">Conversas</Text>
              </View>
              <View className="flex-1 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600">
                <Text className="text-3xl font-bold text-purple-400">0h</Text>
                <Text className="text-slate-400 text-xs mt-1">Tempo Total</Text>
              </View>
              <View className="flex-1 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600">
                <Text className="text-3xl font-bold text-cyan-400">0</Text>
                <Text className="text-slate-400 text-xs mt-1">Avaliação</Text>
              </View>
            </View>
          </View>

          {/* Recent Conversations */}
          <View className="gap-3 pb-6">
            <Text className="text-white font-bold text-sm">Conversas Recentes</Text>
            <View className="bg-slate-800 rounded-2xl p-6 border border-slate-700 items-center justify-center py-8">
              <Text className="text-3xl mb-2">📝</Text>
              <Text className="text-slate-300 text-sm font-semibold">Nenhuma conversa ainda</Text>
              <Text className="text-slate-500 text-xs mt-2 text-center">
                Comece uma conversa para ver seu histórico aqui
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
