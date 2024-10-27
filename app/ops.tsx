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
import { ButtonItem, ButtonData, ActiveButtonsState, ButtonCountersState } from '@/components/OPS/types';
import { buttonData, buttonPairs, tableHead, tableData } from '@/components/OPS/constants';

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

  const observers = ["Ni", "Si", "Ne", "Se"];
  const deciders = ["Fi", "Ti", "Fe", "Te"];
  const de = ["Te", "Fe"];
  const di = ["Ti", "Fi"];
  const oi = ["Si", "Ni"];
  const oe = ["Se", "Ne"];
  const n = ["Ni", "Ne"];
  const s = ["Si", "Se"];
  const f = ["Fi", "Fe"];
  const t = ["Ti", "Te"];


  // Memoized filtered table data
  const filteredTableData = useMemo(() => {
    return tableData.map(row => {
      return row.map((cell, index) => {
        if (index === 0) return cell; // Keep the row number

        const value = cell;
        if (value) {
          const [first, second] = value.split('/');
          const columnHeader = tableHead[index];
          const [columnFirst, columnSecond] = columnHeader.split('/');

          const isValid = Object.entries(activeButtons).every(([filter, isActive]) => {
            if (!isActive) return true; // If the filter is not active, don't apply it
            
            switch(filter) {
              case 'O': return observers.includes(first);
              case 'D': return deciders.includes(first);
              case 'Di': return di.includes(first) || di.includes(second);
              case 'De': return de.includes(first) || de.includes(second);
              case 'Oi': return oi.includes(first) || oi.includes(second);
              case 'Oe': return oe.includes(first) || oe.includes(second);
              case 'N': return n.includes(first) || n.includes(second);
              case 'S': return s.includes(first) || s.includes(second);
              case 'F': return f.includes(first) || f.includes(second);
              case 'T': return t.includes(first) || t.includes(second);
              case 'Sleep': return columnFirst.includes('S');
              case 'Play': return columnFirst.includes('P');
              case 'Blast': return columnFirst.includes('B');
              case 'Consume': return columnFirst.includes('C');
              case 'Energy': return RegExp(/S.*P|P.*S/).exec(columnHeader) !== null;
              case 'Info': return RegExp(/B.*C|C.*B/).exec(columnHeader) !== null;
              case 'I': return RegExp(/S.*C|C.*S/).exec(columnHeader) !== null;
              case 'E': return RegExp(/P.*B|B.*P/).exec(columnHeader) !== null;
              default: return true;
            }
          });

          return isValid ? value : '          ';  // Return empty space if not valid
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
              <View className="flex-row flex-wrap justify-center items-center w-screen rounded-full">
                {buttonData.map((item: ButtonItem) => (
                  <AnimatedButton
                    key={item.label}
                    item={item}
                    isActive={activeButtons[item.label]}
                    counter={buttonCounters[item.label] || 0}
                    onPress={() => handleButtonPress(item.label)}
                    onLongPress={() => handleButtonLongPress(item.label)}
                    onInfoPress={() => handleInfoPress(item.criteria)}
                  />
                ))}
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