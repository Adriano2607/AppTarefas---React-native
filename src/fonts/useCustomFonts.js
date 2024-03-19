
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';

export const useCustomFonts = () => {
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    LuckiestGuy_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return false;
  }

  return true;
};
