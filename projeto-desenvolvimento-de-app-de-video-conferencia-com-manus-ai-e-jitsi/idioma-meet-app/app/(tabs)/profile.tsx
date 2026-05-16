import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  const handleLogout = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/profile-setup");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Profile Header */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <Text className="text-white font-bold text-4xl">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold text-foreground">{user?.name || "Usuário"}</Text>
              <Text className="text-sm text-muted">{user?.email}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">Estatísticas</Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-primary">0</Text>
                <Text className="text-xs text-muted mt-1">Conversas</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-primary">0h</Text>
                <Text className="text-xs text-muted mt-1">Tempo Total</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-primary">0</Text>
                <Text className="text-xs text-muted mt-1">Idiomas</Text>
              </View>
            </View>
          </View>

          {/* Profile Info */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-4">
            <Text className="text-lg font-semibold text-foreground">Informações</Text>
            <View className="gap-3">
              <InfoRow label="Idioma Nativo" value="Português" />
              <InfoRow label="Nível de Proficiência" value="Iniciante" />
              <InfoRow label="Membro Desde" value={new Date().toLocaleDateString("pt-BR")} />
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3 mt-auto">
            <Pressable
              onPress={handleEditProfile}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: "#0a7ea4",
                paddingVertical: 12,
                borderRadius: 8,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              <Text className="text-center text-white font-semibold">Editar Perfil</Text>
            </Pressable>

            <Pressable
              onPress={handleLogout}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: "transparent",
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ef4444",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-center text-error font-semibold">Sair</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b border-border">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="text-sm font-semibold text-foreground">{value}</Text>
    </View>
  );
}
