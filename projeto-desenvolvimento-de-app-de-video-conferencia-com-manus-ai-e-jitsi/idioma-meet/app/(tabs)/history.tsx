import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Conversation {
  id: string;
  partnerName: string;
  language: string;
  duration: number;
  date: string;
  rating: number;
}

const MOCK_CONVERSATIONS: Conversation[] = [];

export default function HistoryScreen() {
  const handleDeleteAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    // TODO: Implement delete all conversations
  };

  const renderConversation = ({ item }: { item: Conversation }) => (
    <View className="bg-surface rounded-lg p-4 border border-border mb-3 flex-row items-center gap-4">
      <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
        <Text className="text-white font-bold text-lg">{item.partnerName.charAt(0)}</Text>
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{item.partnerName}</Text>
        <Text className="text-xs text-muted">{item.language}</Text>
        <Text className="text-xs text-muted mt-1">{item.date}</Text>
      </View>
      <View className="items-end gap-1">
        <Text className="font-semibold text-primary">{item.duration}m</Text>
        <Text className="text-xs text-muted">⭐ {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-6">
      <View className="flex-1 gap-4">
        {/* Header */}
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">Histórico</Text>
          <Text className="text-sm text-muted">Suas conversas anteriores</Text>
        </View>

        {/* Conversations List */}
        {MOCK_CONVERSATIONS.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-3">
            <Text className="text-4xl">📚</Text>
            <Text className="text-lg font-semibold text-foreground">Nenhuma conversa ainda</Text>
            <Text className="text-sm text-muted text-center">
              Comece uma conversa para ver seu histórico aqui
            </Text>
          </View>
        ) : (
          <FlatList
            data={MOCK_CONVERSATIONS}
            renderItem={renderConversation}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}

        {/* Delete All Button */}
        {MOCK_CONVERSATIONS.length > 0 && (
          <Pressable
            onPress={handleDeleteAll}
            style={({ pressed }: { pressed: boolean }) => ({
              paddingVertical: 12,
              borderRadius: 8,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className="text-center text-error text-sm font-semibold">
              Limpar Histórico
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenContainer>
  );
}
