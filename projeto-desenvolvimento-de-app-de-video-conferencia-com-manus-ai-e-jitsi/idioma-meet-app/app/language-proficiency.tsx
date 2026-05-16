import { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

const PROFICIENCY_LEVELS = [
  { code: "beginner", name: "Iniciante", description: "Estou começando", emoji: "🌱" },
  { code: "elementary", name: "Elementar", description: "Básico, frases simples", emoji: "📚" },
  { code: "intermediate", name: "Intermediário", description: "Conversas cotidianas", emoji: "💬" },
  { code: "upper_intermediate", name: "Intermediário Alto", description: "Conversas complexas", emoji: "🎯" },
  { code: "advanced", name: "Avançado", description: "Fluente com nuances", emoji: "🚀" },
  { code: "proficient", name: "Proficiente", description: "Nível nativo/fluente", emoji: "⭐" },
];

export default function LanguageProficiencyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>("intermediate");
  const [goals, setGoals] = useState("");
  const [interests, setInterests] = useState("");

  const language = Array.isArray(params.language) ? params.language[0] : (params.language as string) || "en";

  const handleSelectLevel = (levelCode: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedLevel(levelCode);
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Navigate to searching partner screen
    router.push(
      `/searching-partner?language=${language}&proficiency=${selectedLevel}&goals=${encodeURIComponent(goals)}&interests=${encodeURIComponent(interests)}`
    );
  };

  const selectedLevelData = PROFICIENCY_LEVELS.find((l) => l.code === selectedLevel);

  return (
    <ScreenContainer className="p-0" containerClassName="bg-gradient-to-b from-slate-900 to-slate-950" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="bg-gradient-to-b from-slate-900 to-slate-950">
        <View className="flex-1 gap-6 p-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-white">Seu Nível</Text>
            <Text className="text-slate-400 text-base">
              Ajude-nos a encontrar um parceiro com nível similar
            </Text>
          </View>

          {/* Current Selection */}
          {selectedLevelData && (
            <View className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 border border-blue-400">
              <Text className="text-6xl mb-3">{selectedLevelData.emoji}</Text>
              <Text className="text-white text-2xl font-bold">{selectedLevelData.name}</Text>
              <Text className="text-blue-100 text-sm mt-2">{selectedLevelData.description}</Text>
            </View>
          )}

          {/* Level Selection */}
          <View className="gap-3">
            <Text className="text-white font-bold text-sm">Escolha seu nível de proficiência</Text>
            <View className="gap-2">
              {PROFICIENCY_LEVELS.map((level) => (
                <Pressable
                  key={level.code}
                  onPress={() => handleSelectLevel(level.code)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    backgroundColor: selectedLevel === level.code ? "#3b82f6" : "#334155",
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedLevel === level.code ? "#3b82f6" : "#475569",
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                >
                  <View className="flex-row items-center gap-3">
                    <Text className="text-2xl">{level.emoji}</Text>
                    <View className="flex-1">
                      <Text className={selectedLevel === level.code ? "text-white font-bold" : "text-slate-300 font-semibold"}>
                        {level.name}
                      </Text>
                      <Text className={selectedLevel === level.code ? "text-blue-100 text-xs" : "text-slate-500 text-xs"}>
                        {level.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Goals */}
          <View className="gap-3">
            <Text className="text-white font-bold text-sm">Seus objetivos (opcional)</Text>
            <TextInput
              placeholder="Ex: Melhorar pronúncia, aprender gírias, praticar negócios..."
              placeholderTextColor="#64748b"
              value={goals}
              onChangeText={setGoals}
              multiline
              numberOfLines={3}
              style={{
                backgroundColor: "#1e293b",
                color: "#ffffff",
                borderWidth: 1,
                borderColor: "#475569",
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
              }}
            />
          </View>

          {/* Interests */}
          <View className="gap-3">
            <Text className="text-white font-bold text-sm">Seus interesses (opcional)</Text>
            <TextInput
              placeholder="Ex: Tecnologia, viagens, culinária, esportes..."
              placeholderTextColor="#64748b"
              value={interests}
              onChangeText={setInterests}
              multiline
              numberOfLines={3}
              style={{
                backgroundColor: "#1e293b",
                color: "#ffffff",
                borderWidth: 1,
                borderColor: "#475569",
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
              }}
            />
          </View>

          {/* Info Box */}
          <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <Text className="text-slate-300 text-xs leading-relaxed">
              <Text className="font-bold text-blue-400">💡 Dica:</Text> Ser honesto sobre seu nível ajuda a encontrar parceiros compatíveis para uma experiência de aprendizado melhor.
            </Text>
          </View>

          {/* Continue Button */}
          <Pressable
            onPress={handleContinue}
            style={({ pressed }: { pressed: boolean }) => ({
              backgroundColor: "#10b981",
              paddingVertical: 16,
              borderRadius: 16,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
              marginTop: "auto",
            })}
          >
            <Text className="text-center text-white font-bold text-base">
              ✓ Continuar para Matchmaking
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
