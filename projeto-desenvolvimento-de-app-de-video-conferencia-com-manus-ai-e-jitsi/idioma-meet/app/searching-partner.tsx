import { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

export default function SearchingPartnerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isAuthenticated } = useAuth();
  const [searchTime, setSearchTime] = useState(0);
  const [dots, setDots] = useState(".");

  const language = Array.isArray(params.language) ? params.language[0] : (params.language as string) || "en";
  const proficiency = Array.isArray(params.proficiency) ? params.proficiency[0] : (params.proficiency as string) || "intermediate";

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  // Atualizar contador de tempo
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    interval = setInterval(() => {
      setSearchTime((prev) => prev + 1);
    }, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Animar pontos
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    interval = setInterval(() => {
      setDots((prev) => {
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return ".";
      });
    }, 500);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Simular encontro de parceiro após 3-5 segundos
  useEffect(() => {
    const delay = Math.random() * 2000 + 3000; // 3-5 segundos
    const timeoutId = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace(`/matching?language=${language}&proficiency=${proficiency}`);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [language, proficiency, router]);

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <ScreenContainer
      className="p-0"
      containerClassName="bg-gradient-to-b from-slate-900 to-slate-950"
      edges={["top", "left", "right", "bottom"]}
    >
      <View className="flex-1 items-center justify-center gap-8 px-6">
        {/* Animated Circle */}
        <View className="w-40 h-40 rounded-full border-4 border-blue-500 items-center justify-center bg-slate-800 relative">
          <ActivityIndicator size="large" color="#3b82f6" />
          <View className="absolute w-48 h-48 rounded-full border-2 border-blue-500 opacity-20" />
          <View className="absolute w-56 h-56 rounded-full border-2 border-blue-500 opacity-10" />
        </View>

        {/* Main Text */}
        <View className="items-center gap-2">
          <Text className="text-5xl font-bold text-white">
            Procurando por parceiro{dots}
          </Text>
          <Text className="text-slate-400 text-base">
            Encontrando alguém com nível similar
          </Text>
        </View>

        {/* Info Cards */}
        <View className="w-full gap-3 bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-400 text-sm">🌍 Idioma</Text>
            <Text className="text-white font-bold text-sm">{language.toUpperCase()}</Text>
          </View>
          <View className="h-px bg-slate-700" />
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-400 text-sm">📊 Nível</Text>
            <Text className="text-white font-bold text-sm capitalize">{proficiency}</Text>
          </View>
          <View className="h-px bg-slate-700" />
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-400 text-sm">⏱️ Tempo</Text>
            <Text className="text-white font-bold text-sm">{searchTime}s</Text>
          </View>
        </View>

        {/* Tips */}
        <View className="bg-blue-900 bg-opacity-30 rounded-2xl p-4 border border-blue-500 w-full">
          <Text className="text-blue-300 text-xs text-center leading-relaxed">
            💡 Dica: Quanto mais específico seu nível, mais rápido encontramos um parceiro compatível!
          </Text>
        </View>

        {/* Cancel Button */}
        <Pressable
          onPress={handleCancel}
          style={({ pressed }: { pressed: boolean }) => ({
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#64748b",
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <Text className="text-slate-400 font-semibold text-sm">Cancelar Busca</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
