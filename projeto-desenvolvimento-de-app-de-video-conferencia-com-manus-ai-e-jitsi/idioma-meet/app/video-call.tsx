import { View, Text, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { WebView } from "react-native-webview";
import { useState } from "react";

export default function VideoCallScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const params = useLocalSearchParams();
  const [showVideo, setShowVideo] = useState(false);

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  const roomName = `idiomameet-${Date.now()}`;
  const userName = params.userName as string || "Usuário";

  // HTML MINIMALISTA - APENAS JITSI MEET OFICIAL
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IdiomaMeet</title>
  <style>
    * { margin: 0; padding: 0; }
    body { width: 100%; height: 100vh; background: #000; }
    #jitsi { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="jitsi"></div>
  
  <script src="https://meet.jit.si/external_api.js"></script>
  <script>
    const options = {
      roomName: '${roomName}',
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#jitsi'),
      userInfo: {
        displayName: '${userName}'
      }
    };
    
    const api = new JitsiMeetExternalAPI('meet.jit.si', options);
    
    api.addEventListener('videoConferenceLeft', () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'left' }));
    });
  </script>
</body>
</html>
  `;

  if (!showVideo) {
    return (
      <ScreenContainer className="flex items-center justify-center gap-6">
        <View className="items-center gap-4">
          <Text className="text-3xl font-bold text-foreground">Pronto para começar?</Text>
          <Text className="text-muted text-center">Sala: {roomName}</Text>
        </View>
        
        <Pressable
          onPress={() => setShowVideo(true)}
          className="bg-primary px-8 py-4 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">Iniciar Vídeo</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          className="px-8 py-2"
        >
          <Text className="text-primary">Cancelar</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <WebView
        source={{ html: htmlContent, baseUrl: 'https://meet.jit.si' }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);
          if (message.type === 'left') {
            router.replace('/call-report');
          }
        }}
      />
    </View>
  );
}
