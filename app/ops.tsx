import React, { useRef, useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'react-native-drawer-layout';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Text, 
  View, 
  AppRegistry, 
  SafeAreaView, 
  ScrollView, 
  Pressable,
  Button 
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { BottomSheet, BottomSheetRef } from 'react-native-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import GradientText from '@/components/GradientText';
import { HelloWave } from "@/components/HelloWave";

// Import components
import { AnimatedButton } from '@/components/OPS/AnimatedButton';
import { ButtonDescription } from '@/components/OPS/ButtonDescription';
import { DataTable } from '@/components/OPS/DataTable';
import { BottomSheetContent } from '@/components/OPS/BottomSheetContent';

// Import types and constants
import { ButtonItem, ActiveButtonsState, ButtonCountersState } from '@/components/OPS/types';
import { buttonData, buttonPairs, tableHead, tableData } from '@/components/OPS/constants';
import { isValidCell } from '@/components/OPS/functions';


const OPS: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheet = useRef<BottomSheetRef>(null);
  const [activeButtons, setActiveButtons] = useState<ActiveButtonsState>({});
  const [buttonCounters, setButtonCounters] = useState<ButtonCountersState>({});
  const [selectedCriteria, setSelectedCriteria] = useState<string>('');

  const handleButtonPress = (label: string) => {
    setActiveButtons((prevActiveButtons) => {
      const updatedButtons = { ...prevActiveButtons };
      const pair = buttonPairs.find((pair) => pair.includes(label));
  
      if (pair && !updatedButtons[label]) {
        pair.forEach((button) => delete updatedButtons[button]);
        updatedButtons[label] = true;
      }
  
      return updatedButtons;
    });
  
    setButtonCounters((prevCounters) => {
      const updatedCounters = { ...prevCounters };
      if (activeButtons[label]) {
        updatedCounters[label] = (updatedCounters[label] || 1) + 1;
      } else {
        updatedCounters[label] = 1;
      }
      return updatedCounters;
    });
  };

  const handleButtonLongPress = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setButtonCounters(prev => ({ ...prev, [label]: 0 }));
    setActiveButtons(prev => {
      const updated = { ...prev };
      delete updated[label];
      return updated;
    });
  };

  const handleInfoPress = (criteria: string) => {
    setSelectedCriteria(criteria);
    bottomSheet.current?.show();
  };

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [activeButtons]);

  const DrawerContent = () => (
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


  // Memoized filtered table data
  const filteredTableData = useMemo(() => {
    return tableData.map(row => {
      return row.map((cell, index) => {
        if (index === 0) return cell;
        
        const value = cell;
        if (value) {
          const [first, second] = value.split('/');
          const columnHeader = tableHead[index];
          const [columnFirst] = columnHeader.split('/');
  
          const isValid = Object.entries(activeButtons).every(([filter, isActive]) => 
            !isActive || isValidCell(filter, first, second, columnHeader, columnFirst)
          );
  
          return isValid ? value : '          ';
        }
        return cell;
      });
    });
  }, [activeButtons]);



  return (
    <LinearGradient
      className='h-screen flex-1'
      locations={[0, 1]}
      start={{ x: 1.5, y: 0.2 }}
      colors={["#FFEBED", "#140034"]}
    >
      <StatusBar style="light" />
      <Drawer
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        renderDrawerContent={DrawerContent}
      >
        <SafeAreaView className="top-20">
          <View className="flex justify-center items-center mb-10">
            <GradientText className="text-3xl font-bold">
              Objective Personality Tool
            </GradientText>
          </View>

          <ScrollView className='flex h-full w-screen'>
            <MenuProvider>
              {/* Grid Layout for Buttons */}
              <View className="px-2">
                <View className="flex-row flex-wrap justify-between">
                  {buttonData.map((item: ButtonItem, index: number) => (
                    <View key={item.label} style={{ width: '48%', marginBottom: 8 }}>
                      <AnimatedButton
                        item={item}
                        isActive={activeButtons[item.label]}
                        counter={buttonCounters[item.label] || 0}
                        onPress={() => handleButtonPress(item.label)}
                        onLongPress={() => handleButtonLongPress(item.label)}
                        onInfoPress={() => handleInfoPress(item.criteria)}
                      />
                    </View>
                  ))}
                </View>
              </View>

              <ButtonDescription 
                activeButtons={activeButtons} 
                buttonData={buttonData} 
              />

              <DataTable 
                tableHead={tableHead} 
                tableData={filteredTableData} 
              />

              <Pressable 
                className="p-3 w-full my-16"
                onPress={() => bottomSheet.current?.show()}
              >
                <Text className="text-white text-center">
                  Open Function Combinations
                </Text>
              </Pressable>

              <Button
                onPress={() => setIsOpen((prevOpen) => !prevOpen)}
                title={`${isOpen ? 'Close' : 'Open'} drawer`}
              />

              <View className='mb-56'>
                <Text className="text-white text-center">
                  Objective Personality Tool
                </Text>
              </View>
            </MenuProvider>
          </ScrollView>
        </SafeAreaView>
      </Drawer>

      <BottomSheet 
        ref={bottomSheet}
        height={350} 
        borderRadius={10} 
        colorScheme='auto' 
        sheetBackgroundColor="#E3F5F3"
      >
        <BottomSheetContent criteria={selectedCriteria} />
      </BottomSheet>
    </LinearGradient>
  );
};

export default OPS;

AppRegistry.registerComponent('OPS', () => OPS);