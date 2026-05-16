import { useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

export default function CallReportScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  // Dados da conversa
  const callData = {
    partnerName: "João Silva",
    partnerLevel: "Intermediário",
    language: "Inglês",
    duration: 420, // 7 minutos
    startTime: new Date(Date.now() - 420000).toISOString(),
    endTime: new Date().toISOString(),
    wordsSpoken: Math.floor(Math.random() * 200 + 100),
    topicsDiscussed: ["Viagens", "Tecnologia", "Cultura"],
    connectionQuality: "Excelente",
    audioQuality: "Ótimo",
    videoQuality: "Ótimo",
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const calculateXP = (seconds: number) => {
    return Math.floor(seconds / 60) * 10 + (rating * 5);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // TODO: Enviar relatório completo para o backend
      console.log("Report submitted:", {
        rating,
        comment,
        callData,
        xpEarned: calculateXP(callData.duration),
      });

      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to submit report:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(tabs)");
  };

  const xpEarned = calculateXP(callData.duration);

  return (
    <ScreenContainer
      className="p-0"
      containerClassName="bg-gradient-to-b from-slate-900 to-slate-950"
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="bg-gradient-to-b from-slate-900 to-slate-950">
        <View className="flex-1 gap-6 p-6 pb-8">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-5xl font-bold text-white">🎉 Parabéns!</Text>
            <Text className="text-slate-400 text-base">Conversa concluída com sucesso</Text>
          </View>

          {/* XP Earned Card */}
          <View className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-6 border border-yellow-400 items-center gap-2">
            <Text className="text-6xl font-bold text-white">+{xpEarned}</Text>
            <Text className="text-yellow-100 text-sm font-semibold">Pontos XP Ganhos</Text>
            <Text className="text-yellow-50 text-xs mt-1">Parabéns por praticar seu idioma!</Text>
          </View>

          {/* Conversation Summary */}
          <View className="bg-slate-800 rounded-2xl p-6 border border-slate-700 gap-4">
            <Text className="text-white font-bold text-lg">📊 Resumo da Conversa</Text>

            <View className="gap-3">
              <SummaryRow icon="👤" label="Parceiro" value={callData.partnerName} />
              <SummaryRow icon="📈" label="Nível do Parceiro" value={callData.partnerLevel} />
              <SummaryRow icon="🗣️" label="Idioma" value={callData.language} />
              <SummaryRow icon="⏱️" label="Duração" value={formatDuration(callData.duration)} />
              <SummaryRow
                icon="🕐"
                label="Horário"
                value={new Date(callData.startTime).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </View>
          </View>

          {/* Statistics Grid */}
          <View className="gap-3">
            <Text className="text-white font-bold text-sm">📈 Estatísticas Detalhadas</Text>
            <View className="flex-row gap-3">
              <StatCard icon="💬" label="Palavras" value={callData.wordsSpoken.toString()} />
              <StatCard icon="🎯" label="Tópicos" value={callData.topicsDiscussed.length.toString()} />
              <StatCard icon="⚡" label="Conexão" value="Ótima" />
            </View>
          </View>

          {/* Quality Metrics */}
          <View className="bg-slate-800 rounded-2xl p-6 border border-slate-700 gap-4">
            <Text className="text-white font-bold text-lg">🎙️ Qualidade da Conexão</Text>

            <View className="gap-3">
              <QualityRow label="Qualidade de Áudio" quality={callData.audioQuality} />
              <QualityRow label="Qualidade de Vídeo" quality={callData.videoQuality} />
              <QualityRow label="Conexão Geral" quality={callData.connectionQuality} />
            </View>
          </View>

          {/* Topics Discussed */}
          <View className="bg-slate-800 rounded-2xl p-6 border border-slate-700 gap-4">
            <Text className="text-white font-bold text-lg">🎯 Tópicos Discutidos</Text>
            <View className="flex-row flex-wrap gap-2">
              {callData.topicsDiscussed.map((topic, idx) => (
                <View key={idx} className="bg-blue-600 rounded-full px-4 py-2">
                  <Text className="text-white text-xs font-semibold">{topic}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rating Section */}
          <View className="bg-slate-800 rounded-2xl p-6 border border-slate-700 gap-4">
            <Text className="text-white font-bold text-lg">⭐ Como foi a conversa?</Text>

            {/* Star Rating */}
            <View className="flex-row justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setRating(star);
                  }}
                  style={({ pressed }: { pressed: boolean }) => ({
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                  })}
                >
                  <Text className="text-5xl">{star <= rating ? "⭐" : "☆"}</Text>
                </Pressable>
              ))}
            </View>

            {/* Comment Input */}
            <View className="gap-2">
              <Text className="text-slate-300 text-sm font-semibold">Deixe um comentário (opcional)</Text>
              <TextInput
                placeholder="Compartilhe sua experiência com este parceiro..."
                placeholderTextColor="#64748b"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#475569",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 14,
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>

          {/* Recommendations */}
          <View className="bg-green-900 bg-opacity-30 rounded-2xl p-4 border border-green-500 gap-2">
            <Text className="text-green-400 font-bold text-sm">💡 Dica para Próxima Conversa</Text>
            <Text className="text-green-300 text-xs leading-relaxed">
              Você teve uma ótima conversa! Tente praticar mais vocabulário sobre os tópicos discutidos para melhorar ainda mais.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-auto">
            <Pressable
              onPress={handleSubmitRating}
              disabled={isSubmitting || rating === 0}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: rating === 0 ? "#64748b" : "#10b981",
                paddingVertical: 16,
                borderRadius: 16,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-center text-white font-bold text-base">
                  {rating === 0 ? "Selecione uma avaliação" : "✓ Enviar Relatório"}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={handleSkip}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: "transparent",
                paddingVertical: 14,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: "#64748b",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-center text-slate-400 font-semibold text-base">Pular por Agora</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-700">
      <View className="flex-row items-center gap-3">
        <Text className="text-xl">{icon}</Text>
        <Text className="text-slate-400 text-sm">{label}</Text>
      </View>
      <Text className="text-white font-semibold text-sm">{value}</Text>
    </View>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View className="flex-1 bg-slate-800 rounded-2xl p-4 border border-slate-700 items-center gap-2">
      <Text className="text-3xl">{icon}</Text>
      <Text className="text-white font-bold text-lg">{value}</Text>
      <Text className="text-slate-400 text-xs text-center">{label}</Text>
    </View>
  );
}

function QualityRow({ label, quality }: { label: string; quality: string }) {
  const getQualityColor = (q: string) => {
    if (q === "Excelente") return "#10b981";
    if (q === "Ótimo") return "#3b82f6";
    if (q === "Bom") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <View className="flex-row items-center justify-between py-2">
      <Text className="text-slate-300 text-sm">{label}</Text>
      <View
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: `${getQualityColor(quality)}20` }}
      >
        <Text className="text-xs font-semibold" style={{ color: getQualityColor(quality) }}>
          {quality}
        </Text>
      </View>
    </View>
  );
}
