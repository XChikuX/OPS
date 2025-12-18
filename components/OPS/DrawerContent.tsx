import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { HelloWave } from "@/components/HelloWave";

export const DrawerContent: React.FC = () => (
  <LinearGradient
    className="flex-1 w-full h-screen"
    locations={[0, 1]}
    start={{ x: 1.5, y: 0.2 }}
    colors={["#33196B", "#4C407B"]}
  >
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <HelloWave />
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>
);