import { useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

const LANGUAGES = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "Inglês", flag: "🇺🇸" },
  { code: "es", name: "Espanhol", flag: "🇪🇸" },
  { code: "fr", name: "Francês", flag: "🇫🇷" },
  { code: "de", name: "Alemão", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "Japonês", flag: "🇯🇵" },
  { code: "zh", name: "Chinês", flag: "🇨🇳" },
  { code: "ko", name: "Coreano", flag: "🇰🇷" },
  { code: "ru", name: "Russo", flag: "🇷🇺" },
];

const PROFICIENCY_LEVELS = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
];

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [nativeLanguage, setNativeLanguage] = useState<string>("pt");
  const [learningLanguages, setLearningLanguages] = useState<string[]>([]);
  const [proficiencyLevel, setProficiencyLevel] = useState<string>("beginner");
  const [isSaving, setIsSaving] = useState(false);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  const toggleLearningLanguage = (code: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLearningLanguages((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    );
  };

  const handleContinue = async () => {
    if (learningLanguages.length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsSaving(true);
      // TODO: Save profile data to backend
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to save profile:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenContainer className="p-6" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Configurar Perfil</Text>
            <Text className="text-sm text-muted">Personalize sua experiência de aprendizado</Text>
          </View>

          {/* Native Language Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Seu idioma nativo</Text>
            <View className="flex-row flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <Pressable
                  key={lang.code}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setNativeLanguage(lang.code);
                  }}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: nativeLanguage === lang.code ? "#0a7ea4" : "#f5f5f5",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text
                    className={
                      nativeLanguage === lang.code ? "text-white font-semibold" : "text-foreground"
                    }
                  >
                    {lang.flag} {lang.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Learning Languages Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Idiomas para aprender</Text>
            <Text className="text-xs text-muted">Selecione pelo menos um</Text>
            <View className="flex-row flex-wrap gap-2">
              {LANGUAGES.filter((l) => l.code !== nativeLanguage).map((lang) => (
                <Pressable
                  key={lang.code}
                  onPress={() => toggleLearningLanguage(lang.code)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: learningLanguages.includes(lang.code) ? "#0a7ea4" : "#f5f5f5",
                    borderWidth: learningLanguages.includes(lang.code) ? 0 : 1,
                    borderColor: "#e5e7eb",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text
                    className={
                      learningLanguages.includes(lang.code)
                        ? "text-white font-semibold"
                        : "text-foreground"
                    }
                  >
                    {lang.flag} {lang.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Proficiency Level Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Seu nível de proficiência</Text>
            <View className="gap-2">
              {PROFICIENCY_LEVELS.map((level) => (
                <Pressable
                  key={level.value}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setProficiencyLevel(level.value);
                  }}
                  style={({ pressed }: { pressed: boolean }) => ({
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: proficiencyLevel === level.value ? "#0a7ea4" : "#f5f5f5",
                    borderWidth: proficiencyLevel === level.value ? 0 : 1,
                    borderColor: "#e5e7eb",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text
                    className={
                      proficiencyLevel === level.value
                        ? "text-white font-semibold"
                        : "text-foreground"
                    }
                  >
                    {level.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Continue Button */}
          <View className="mt-auto gap-3">
            <Pressable
              onPress={handleContinue}
              disabled={isSaving || learningLanguages.length === 0}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: learningLanguages.length === 0 ? "#ccc" : "#0a7ea4",
                paddingVertical: 14,
                borderRadius: 12,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              {isSaving ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-center text-white font-semibold text-base">Continuar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
