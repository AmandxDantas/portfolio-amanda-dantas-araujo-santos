import { useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { startOAuthLogin } from "@/constants/oauth";
import * as Haptics from "expo-haptics";

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  if (isAuthenticated) {
    router.replace("/(tabs)");
    return null;
  }

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await startOAuthLogin();
    } catch (error) {
      console.error("Login failed:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <ScreenContainer className="p-6" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <Text className="text-5xl font-bold text-primary">IdiomaMeet</Text>
            <Text className="text-lg text-muted text-center">
              Conecte-se com estudantes de idiomas ao redor do mundo
            </Text>
          </View>

          {/* Login Card */}
          <View className="bg-surface rounded-2xl p-6 gap-6 border border-border">
            <View className="gap-2">
              <Text className="text-xl font-semibold text-foreground">Bem-vindo de volta</Text>
              <Text className="text-sm text-muted">Faça login para começar a praticar</Text>
            </View>

            {/* OAuth Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoggingIn}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: "#0a7ea4",
                paddingVertical: 14,
                borderRadius: 12,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-center text-white font-semibold text-base">Entrar com Manus</Text>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-xs text-muted">ou</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-sm text-muted">Não tem uma conta?</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  handleLogin();
                }}
              >
                <Text className="text-sm font-semibold text-primary">Criar conta</Text>
              </Pressable>
            </View>
          </View>

          {/* Features Preview */}
          <View className="gap-4">
            <FeatureItem
              icon="🌍"
              title="Conecte Globalmente"
              description="Encontre parceiros de aprendizado em qualquer lugar do mundo"
            />
            <FeatureItem
              icon="🎥"
              title="Videoconferência"
              description="Conversas ao vivo com qualidade HD"
            />
            <FeatureItem
              icon="🎯"
              title="Prática Aleatória"
              description="Encontre novos parceiros a cada sessão"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View className="flex-row gap-3">
      <Text className="text-2xl">{icon}</Text>
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{title}</Text>
        <Text className="text-xs text-muted">{description}</Text>
      </View>
    </View>
  );
}
