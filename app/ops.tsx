import React, { useRef, useEffect, useState, useMemo } from 'react';
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'react-native-drawer-layout';
import { Table,Row, Rows } from 'react-native-reanimated-table';
import { LinearGradient } from 'expo-linear-gradient';

// import {Image} from 'expo-image'
import { Text, View, AppRegistry, Modal, Image,
   ScrollView, SafeAreaView, Pressable, Button, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import Animated, { Easing, FadeInUp, FadeOutUp, LinearTransition, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import Ripple from 'react-native-material-ripple';

import { BottomSheet, BottomSheetRef } from 'react-native-sheet';
import { HelloWave } from "@/components/HelloWave"
import GradientText from '@/components/GradientText';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';


import StarIcon from '@/assets/images/svg/star.svg'
import PsyncIcon from '@/assets/images/svg/psync-tilt.svg'


const buttonData = [
  { label: 'O', color: 'bg-blue-500', definition:'Observer', description: 'Stuck on info & pathways, not stuck on others point of view', criteria: "Look for negative reaction to talking about things over people", icon: require('@/assets/images/ops/icon.png') },
  { label: 'D', color: 'bg-orange-300', definition:'Decider', description: 'Stuck on people, judgment, fairness, not stuck on missing info', criteria: "Look for a more serious voice when dealing with people", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Di', color: 'bg-blue-500', definition:'Looks Inward for Decisions', description: 'Me-story, what I want, I\'m allowed, leaves the tribe behind', criteria: "Watch for 'my way' even if other people are involved in the stories.", icon: require('@/assets/images/ops/icon.png') },
  { label: 'De', color: 'bg-orange-300', definition:'Prioritises Tribal Decisions', description: 'We-story, drags in others, void in what they want, not allowed', criteria: "Watch for 'He said, She said' talk", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Oi', color: 'bg-gray-300', definition:'Narrowed Observations', description: 'Has a way, same story, concludes, narrows, shoves away new', criteria: "Watch for effort in sticking to the same topic", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Oe', color: 'bg-blue-500', definition:'Scattered Observations', description: 'Channel change, we\'ll see, wants control - but doesn\'t', criteria: "Watch for struggle in staying in the same topic", icon: require('@/assets/images/ops/icon.png') },
  { label: 'N', color: 'bg-gray-300', definition:'Intuition', description: 'Summarizing, categories, abstract, void in supporting facts', criteria: "Lack of exact examples", icon: require('@/assets/images/ops/icon.png') },
  { label: 'S', color: 'bg-gray-300', definition:'Sensory', description: 'Proving, gives facts, grounded, not jumping or summarizing', criteria: "Overuse of exact examples", icon: require('@/assets/images/ops/icon.png') },
  { label: 'F', color: 'bg-gray-300', definition:'Feeling', description: 'Values, likes, hates, weak reasons, won\'t make it work', criteria: "Watch for emotional connects of likes/dislikes", icon: require('@/assets/images/ops/icon.png') },
  { label: 'T', color: 'bg-gray-300', definition:'Thinking', description: 'Works, get it done, logic, reasons, unowned emotions', criteria: "Watch for explainations of how things work, getting stuff done", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Sleep', color: 'bg-blue-500', definition:'Processing / Meditating', description: 'Same story about self, processed, resolved, won\'t jump in', criteria: "Watch for mope, slow talk in prolonged conversations", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Play', color: 'bg-orange-300', definition:'Ping Pong with the tribe', description: 'Random story about others, unresolved, won\'t hit the brakes', criteria: "Watch for quick wittedness with self and tribe.", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Consume', color: 'bg-gray-300', definition:'Savouring / Worldview Changing', description: 'Random story about self, takes you along, trails off, not ready', criteria: "Watch for relaxed talk", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Blast', color: 'bg-orange-300', definition:'Teaching / Working', description: 'Same story about others, lessons, jumps in, overextended', criteria: "Watch for teachings, logical or emotional", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Info', color: 'bg-green-300', definition:'On Point - B & C in top 3', description: 'Balance in learning and sharing info, works/rests in swings', criteria: "Sticks to information", icon: require('@/assets/images/ops/icon.png') },
  { label: 'Energy', color: 'bg-yellow-300', definition:'Quirky - S & P in top 3', description: 'Balance in work and rest, learns/talks in swings', criteria: "Sticks to playfullness", icon: require('@/assets/images/ops/icon.png') },
  { label: 'I', color: 'bg-red-300', definition:'Introvert', description: 'Always "kicked" by the tribe to talk and move, outbursts later', criteria: "Decided by top 3 coins", icon: require('@/assets/images/ops/icon.png') },
  { label: 'E', color: 'bg-purple-300', definition:'Extravert', description: 'Always tiring out self and tribe, then crashes later', criteria: "Decided by top 3 coins", icon: require('@/assets/images/ops/icon.png') },
];


const buttonPairs = [
  ['O', 'D'],
  ['Di', 'De'],
  ['Oi', 'Oe'],
  ['N', 'S'],
  ['F', 'T'],
  ['Sleep', 'Play'],
  ['Consume', 'Blast'],
  ['Info', 'Energy'],
  ['I', 'E']
];

const columns = {
  "SC/B(p)": ["Fi/Ni", "Fi/Si", "Ni/Fi", "Ni/Ti", "Si/Fi", "Si/Ti", "Ti/Ni", "Ti/Si"],
  "SC/P(b)": ["Fi/Ni", "Fi/Si", "Ni/Fi", "Ni/Ti", "Si/Fi", "Si/Ti", "Ti/Ni", "Ti/Si"],
  "SB/C(p)": ["Fi/Ni", "Fi/Si", "Ni/Fi", "Ni/Ti", "Si/Fi", "Si/Ti", "Ti/Ni", "Ti/Si"],
  "SB/P(c)": ["Fi/Ni", "Fi/Si", "Ni/Fi", "Ni/Ti", "Si/Fi", "Si/Ti", "Ti/Ni", "Ti/Si"],
  "CS/B(p)": ["Fi/Ne", "Fi/Se", "Ti/Ne", "Ti/Se", "Ne/Fi", "Ne/Ti", "Se/Fi", "Se/Fi"],
  "CS/P(b)": ["Fi/Ne", "Fi/Se", "Ti/Ne", "Ti/Se", "Ne/Fi", "Ne/Ti", "Se/Fi", "Se/Fi"],
  "CP/S(b)": ["Fi/Ne", "Fi/Se", "Ti/Ne", "Ti/Se", "Ne/Fi", "Ne/Ti", "Se/Fi", "Se/Fi"],
  "CP/B(s)": ["Fi/Ne", "Fi/Se", "Ti/Ne", "Ti/Se", "Ne/Fi", "Ne/Ti", "Se/Fi", "Se/Fi"],
  "BS/C(p)": ["Ni/Fe", "Ni/Te", "Si/Fe", "Si/Te", "Fe/Ni", "Fe/Si", "Te/Ni", "Te/Si"],
  "BS/P(c)": ["Ni/Fe", "Ni/Te", "Si/Fe", "Si/Te", "Fe/Ni", "Fe/Si", "Te/Ni", "Te/Si"],
  "BP/S(c)": ["Ni/Fe", "Ni/Te", "Si/Fe", "Si/Te", "Fe/Ni", "Fe/Si", "Te/Ni", "Te/Si"],
  "BP/C(s)": ["Ni/Fe", "Ni/Te", "Si/Fe", "Si/Te", "Fe/Ni", "Fe/Si", "Te/Ni", "Te/Si"],
  "PC/S(b)": ["Fe/Ne", "Fe/Se", "Ne/Fe", "Ne/Te", "Se/Fe", "Se/Te", "Te/Ne", "Te/Se"],
  "PC/B(s)": ["Fe/Ne", "Fe/Se", "Ne/Fe", "Ne/Te", "Se/Fe", "Se/Te", "Te/Ne", "Te/Se"],
  "PB/S(c)": ["Fe/Ne", "Fe/Se", "Ne/Fe", "Ne/Te", "Se/Fe", "Se/Te", "Te/Ne", "Te/Se"],
  "PB/C(s)": ["Fe/Ne", "Fe/Se", "Ne/Fe", "Ne/Te", "Se/Fe", "Se/Te", "Te/Ne", "Te/Se"]
};

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

const elementButton = (value: string) => (
  <TouchableOpacity onPress={() => Alert.alert(`You pressed ${value}`)}>
    <View >
      <Text >{value}</Text>
    </View>
  </TouchableOpacity>
);

// Helper function to get text from elementButton
const getElementButtonText = (element: React.ReactElement): string => {
  return element.props.children.props.children.props.children;
};


const tableHead = ['         ', ...Object.keys(columns)];
const tableData: any[][] = [];

// Get the maximum length of any column
const maxLength = Math.max(...Object.values(columns).map(arr => arr.length));

// Create rows
for (let i = 0; i < maxLength; i++) {
  const row = [elementButton(` ${i + 1} `)]; // Row number as a button
  Object.values(columns).forEach(column => {
    return row.push(elementButton(column[i])); // Add value or empty string if undefined
  });
  tableData.push(row);
}



const OPS: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const bottomSheet = useRef<BottomSheetRef>(null);


  type ActiveButtonsState = { [key: string]: boolean };
  type ButtonCountersState = { [key: string]: number };

  const [activeButtons, setActiveButtons] = useState<ActiveButtonsState>({});
  const [buttonCounters, setButtonCounters] = useState<ButtonCountersState>({});

  const filteredTableData = useMemo(() => {
    return tableData.map(row => {
      return row.map((cell, index) => {
        if (index === 0) return cell; // Keep the row number button
        let value = '';
        if (React.isValidElement(cell)) {
          // Extract the value from the elementButton
          value = getElementButtonText(cell);
        } else if (typeof cell === 'string') {
          value = cell;
        }

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
              // Ignore 'Play' or any other non-filtering buttons
              default: return true;
            }
          });

          return isValid ? cell : '          ';
        }
        return cell;
      });
    });
  }, [activeButtons]);


  const AnimatedButton: React.FC<{ item: any; index: number }> = ({ item, index }) => {

    const toggleButton = (label: string) => {
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
          updatedCounters[label] = 0;
        }
        return updatedCounters;
      });
    };
    
    const scale = useSharedValue(1);
    
    const handlePress = () => {
      scale.value = withSpring(1.1, {
        damping: 2,
        stiffness: 80,
      }, () => {
        scale.value = withTiming(1, {
          duration: 300,
          easing: Easing.bounce,
        });
      });
      toggleButton(item.label);
    };
    
    const handleLongPress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setButtonCounters((prevCounters) => {
        const updatedCounters = { ...prevCounters, [item.label]: 0 };
        return updatedCounters;
      });
      setActiveButtons((prevActiveButtons) => {
        const updatedButtons = { ...prevActiveButtons };
        delete updatedButtons[item.label];
        return updatedButtons;
      });
    };


    return (
      <LinearGradient
        key={index}
        className="rounded-full w-[40%] m-2"
        locations={[0, 1]}
        colors={activeButtons[item.label] ? ["#dd3562", "#8354ff"] : ["#140034", "#FFEBED"]}
        style={
          { 
            padding: activeButtons[item.label] ? 2 : 0, 
            borderRadius: 35, 
            shadowColor: "#000", 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.25, 
            shadowRadius: 3.84, 
            elevation: 5
          }
        }
      >
        <TouchableOpacity
          className={`relative w-full h-16 flex-row items-center justify-center text-center rounded-full ${
            activeButtons[item.label] ? 'bg-slate-900 h-14' : 'bg-violet-600 opacity-60'
          }`}
          onPress={handlePress}
          onLongPress={handleLongPress}
          delayLongPress={300}
        >
          <View className="flex-row justify-between items-center">
            <View className='w-[20%] justify-left'>
            <Image className="w-6 h-6 mr-2 rounded-full" source={item.icon} contentFit='cover' />
            </View>
            <Text className={activeButtons[item.label] ? 'text-gray-200 text-lg font-bold' : 'text-white opacity-none text-lg font-base'}>
              {item.label} {buttonCounters[item.label] && activeButtons[item.label] ? `x${buttonCounters[item.label]}` : ''}
            </Text>
          </View>
          <Pressable 
            className={activeButtons[item.label] ? '' : 'flex w-7 h-7 absolute right-2 top-2 rounded-full'}
            onPressIn={() => bottomSheet.current?.show()} 
            onPressOut={() => bottomSheet.current?.hide()}
          >
          <Image
            className={activeButtons[item.label] ? 'w-0 h-0 rounded-full' : 'flex w-5 h-5 rounded-full justify-center items-center'} 
            source="./assets/kiosk.png"
          />
          </Pressable>
          <BottomSheet height={350} borderRadius={10} colorScheme='auto' sheetBackgroundColor="#E3F5F3" ref={bottomSheet}>
            <LinearGradient
                className="flex-row h-full w-screen border-2 border-white opacity-70 rounded justify-center items-center -translate-y-4 pb-5 -z-50"
                locations={[0, 1]}
                colors={['#4C407B', '#01010d']}
            >
              <View className='flex items-center'>
                <GradientText width={200} height={30} style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 100 }} >{item.criteria}</GradientText>
                <Image
                  className='w-14 h-14 rounded-full absolute -right-20 -top-5'
                  source="./assets/kiosk.png"
                />
                <PsyncIcon width={30} height={30} />
                <View className='mt-4'>
                    <GradientText width={200} height={30} colors={["#1D976C", "#93F9B9"]} style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }} >Rate Us:</GradientText>
                </View>
                <View className="flex justify-end items-center pb-4 border-1 border-black">
                    <Pressable className="flex-row m-5" >
                        <StarIcon width={20} height={20} />
                        <StarIcon width={20} height={20} />
                        <StarIcon width={20} height={20} />
                        <StarIcon width={20} height={20} />
                        <StarIcon width={20} height={20} />
                    </Pressable>

                </View>
              </View>
            </LinearGradient>
          </BottomSheet >
        </TouchableOpacity>
      </LinearGradient>
    );
  };


  // Effect to log the updated state after each change
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // console.log('Updated active buttons:', activeButtons);
  }, [activeButtons]);

  return (

    <LinearGradient
      className='h-screen flex-1'
      locations={[0, 1]}
      start={{ x: 1.5, y: 0.2 }}
      colors={["#FFEBED", "#140034"]}
    >
      <Drawer
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          renderDrawerContent={() => (
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
          )}
      >
        <SafeAreaView className="top-20">

          <View className="flex justify-center items-center mb-10">
            <GradientText className="text-3xl font-bold">Objective Personality Tool</GradientText>
          </View>
          <ScrollView className='flex h-full w-screen'>
            <MenuProvider>

            <View className="flex-row flex-wrap justify-center items-center w-screen rounded-full">
        {buttonData.map((item, index) => (
          <AnimatedButton key={index} item={item} index={index} />
        ))}
      </View>

          <View className="mt-20 mb-10 items-center justify-center">
            <View className="text-white bg-slate-700 opacity-80 p-10 m-1 rounded-2xl">
              {Object.keys(activeButtons).length > 0 ? (
                buttonData
                  .filter(item => activeButtons[item.label])
                  .map((item, index) => (
                    <Animated.View
                    key={item.label}
                    entering={FadeInUp.duration(300)}
                    exiting={FadeOutUp.duration(300)}
                    layout={LinearTransition.springify()}
                    className='flex w-full justify-start mb-4'
                  >
                    <Ripple rippleOpacity={0.9} rippleDuration={800} rippleSize={500}>
                      <Text  className="text-lg text-blue-400 font-semibold ">
                        {'Þ '}{item.definition}
                      </Text>
                      <Text className="text-base underline text-white">
                        {item.label}: {item.description} {'\n'}
                      </Text>
                    </Ripple>
                  </Animated.View>
                  ))
                  
              ) : (
                <Text className="text-sm text-white">No buttons selected</Text>
              )}
            </View>
          </View>


          <Image style={{width: 100, height: 100, borderRadius: 50}}  source='@/assets/images/ops/react-logo.png'/>

          <View className="text-white bg-slate-700 opacity-80 p-1 m-1 rounded-2xl">
            {/* If parent element is not Table component，please add the type of borderstyle. */}
            <View style={styles.container}>
              <ScrollView horizontal={true}>
                <View style={{borderRadius: 16, paddingBottom: 2, paddingRight: 2}}>
                  <Table borderStyle={{borderWidth: 5, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} style={styles.head} />
                    <Rows data={filteredTableData} style={styles.row} />
                  </Table>
                </View>
              </ScrollView>
            </View>
          </View>
          <Pressable 
            className="p-3 w-full my-16"
            onPress={() => bottomSheet.current?.show()}
          >
            <Text className="text-white text-center">Open Function Combinations</Text>
          </Pressable>
          <Button
            onPress={() => setIsOpen((prevOpen) => !prevOpen)}
            title={`${isOpen ? 'Close' : 'Open'} drawer`}
          />
            <View className='mb-56'>
              <Text className="text-white text-center">Objective Personality Tool</Text>
            </View>
          </MenuProvider>
        </ScrollView>
        </SafeAreaView>
        </Drawer>
      </LinearGradient>
  );
};


export default OPS;

AppRegistry.registerComponent('OPS', () => OPS);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 2, paddingTop: 10, backgroundColor: '#fff', width: '100%', borderRadius: 10, textAlign: 'center', justifyContent: 'center' },
  head: {  height: 40, backgroundColor: '#f1f8ff', textAlign: 'center', justifyContent: 'center', alignContent: 'center' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28, backgroundColor: '#f9f9f9', textAlign: 'center', justifyContent: 'center', alignContent: 'center' },
  text: { textAlign: 'center' }
});   