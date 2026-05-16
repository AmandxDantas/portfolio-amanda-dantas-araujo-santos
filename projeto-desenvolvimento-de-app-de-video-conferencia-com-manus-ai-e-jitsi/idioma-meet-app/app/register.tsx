import { useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { startOAuthLogin } from "@/constants/oauth";
import * as Haptics from "expo-haptics";

export default function RegisterScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

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

  const handleSignUp = async () => {
    try {
      setIsSigningUp(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await startOAuthLogin();
    } catch (error) {
      console.error("Sign up failed:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <ScreenContainer className="p-6" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <Text className="text-4xl font-bold text-primary">Criar Conta</Text>
            <Text className="text-base text-muted text-center">
              Junte-se a milhares de estudantes de idiomas
            </Text>
          </View>

          {/* Sign Up Card */}
          <View className="bg-surface rounded-2xl p-6 gap-6 border border-border">
            {/* Sign Up Button */}
            <Pressable
              onPress={handleSignUp}
              disabled={isSigningUp}
              style={({ pressed }: { pressed: boolean }) => ({
                backgroundColor: "#0a7ea4",
                paddingVertical: 14,
                borderRadius: 12,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              {isSigningUp ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-center text-white font-semibold text-base">Criar com Manus</Text>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-xs text-muted">ou</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Login Link */}
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-sm text-muted">Já tem uma conta?</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.back();
                }}
              >
                <Text className="text-sm font-semibold text-primary">Entrar</Text>
              </Pressable>
            </View>
          </View>

          {/* Benefits */}
          <View className="gap-4">
            <Text className="text-sm font-semibold text-foreground">Benefícios de se registrar:</Text>
            <BenefitItem icon="✓" text="Acesso ilimitado a conversas" />
            <BenefitItem icon="✓" text="Histórico de aprendizado" />
            <BenefitItem icon="✓" text="Perfil personalizado" />
            <BenefitItem icon="✓" text="Comunidade global" />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function BenefitItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View className="flex-row items-center gap-3">
      <Text className="text-lg text-success font-bold">{icon}</Text>
      <Text className="text-sm text-muted">{text}</Text>
    </View>
  );
}
