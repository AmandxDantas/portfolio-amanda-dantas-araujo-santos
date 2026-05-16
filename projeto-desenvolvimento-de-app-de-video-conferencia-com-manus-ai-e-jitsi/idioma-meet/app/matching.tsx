import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

export default function MatchingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [isSearching] = useState(true);
  const [matchFound, setMatchFound] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [selectedLanguage] = useState(
    Array.isArray(params.language) ? params.language[0] : (params.language as string) || "en"
  );
  const [proficiencyLevel] = useState(
    Array.isArray(params.proficiency) ? params.proficiency[0] : (params.proficiency as string) || "intermediate"
  );
  const [searchTime, setSearchTime] = useState(0);

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isSearching && !matchFound) {
      interval = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSearching, matchFound]);

  const handleCancelSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleStartConversation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/video-call",
      params: { userName: user?.name || "Usuário" }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Effect para simular matchmaking quando a tela carrega
  useEffect(() => {
    if (matchFound) return;

    const delay = Math.random() * 1000 + 1000;
    const timeoutId = setTimeout(() => {
      setMatchFound(true);
      setPartnerName("João Silva");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [matchFound]);

  return (
    <ScreenContainer className="p-0" containerClassName="bg-gradient-to-b from-slate-900 to-slate-950" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="bg-gradient-to-b from-slate-900 to-slate-950">
        <View className="flex-1 justify-center gap-8 p-6">


          {/* Searching State */}
          {!matchFound && (
            <View className="items-center gap-8">
              <View className="w-32 h-32 rounded-full border-4 border-blue-500 items-center justify-center bg-slate-800 relative">
                <ActivityIndicator size="large" color="#3b82f6" />
                <View className="absolute w-40 h-40 rounded-full border-2 border-blue-500 opacity-30" />
              </View>
              <View className="items-center gap-3">
                <Text className="text-3xl font-bold text-white">Parceiro Encontrado!</Text>
                <Text className="text-slate-300 text-sm">Clique em "Iniciar Conversa" para começar</Text>
              </View>
            </View>
          )}

          {/* Match Found State */}
          {matchFound && (
            <View className="gap-6">
              {/* Profile Card */}
              <View className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 border border-slate-600 gap-4">
                <View className="items-center gap-4">
                  <View className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center border-4 border-blue-400">
                    <Text className="text-5xl">👤</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-white">{partnerName}</Text>
                    <Text className="text-slate-400 text-sm mt-1">Nível: {proficiencyLevel}</Text>
                  </View>
                </View>

                {/* Info Grid */}
                <View className="gap-3 mt-4">
                  <InfoRow label="Idioma" value={selectedLanguage.toUpperCase()} icon="🌍" />
                  <InfoRow label="Conversas" value="12" icon="💬" />
                  <InfoRow label="Avaliação" value="⭐ 4.8" icon="⭐" />
                </View>
              </View>

              {/* Match Confirmation */}
              <View className="bg-green-900 bg-opacity-30 rounded-2xl p-4 border border-green-500 items-center">
                <Text className="text-green-400 font-semibold">✓ Parceiro encontrado!</Text>
                <Text className="text-slate-300 text-xs mt-1">Clique em "Iniciar Conversa" para começar</Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View className="gap-3 mt-auto">


            {!matchFound && (
              <Pressable
                onPress={handleCancelSearch}
                style={({ pressed }: { pressed: boolean }) => ({
                  backgroundColor: "transparent",
                  paddingVertical: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "#ef4444",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text className="text-center text-red-400 font-bold text-base">Cancelar Busca</Text>
              </Pressable>
            )}

            {matchFound && (
              <>
                <Pressable
                  onPress={handleStartConversation}
                  style={({ pressed }: { pressed: boolean }) => ({
                    backgroundColor: "#10b981",
                    paddingVertical: 16,
                    borderRadius: 16,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                >
                  <Text className="text-center text-white font-bold text-base">
                    🎥 Iniciar Conversa
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleCancelSearch}
                  style={({ pressed }: { pressed: boolean }) => ({
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: "#64748b",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text className="text-center text-slate-400 font-bold text-base">
                    Procurar Outro
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View className="flex-row justify-between items-center py-2 px-3 bg-slate-900 rounded-lg border border-slate-700">
      <View className="flex-row items-center gap-2">
        <Text className="text-lg">{icon}</Text>
        <Text className="text-slate-400 text-sm">{label}</Text>
      </View>
      <Text className="text-white font-bold text-sm">{value}</Text>
    </View>
  );
}
