import React from 'react';
import { TouchableOpacity, View, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedButtonProps } from './types';

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  item,
  isActive,
  counter,
  onPress,
  onLongPress,
  onInfoPress
}) => (
  <LinearGradient
    className="rounded-full w-[40%] m-2"
    locations={[0, 1]}
    colors={isActive ? ["#dd3562", "#8354ff"] : ["#140034", "#FFEBED"]}
    style={{ 
      padding: isActive ? 2 : 0, 
      borderRadius: 35, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 3 }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84, 
      elevation: 5 
    }}
  >
    <TouchableOpacity
      className={`
        relative flex flex-row items-center justify-center
        w-full rounded-full
        ${isActive ? 'h-14 bg-slate-900' : 'h-16 bg-violet-600/60'}
      `}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
    >
      <View className="flex-row justify-between items-center">
        <View className='w-[20%] justify-left'>
          <Image 
            className="w-6 h-6 mr-2 rounded-full" 
            source={item.icon}
            resizeMode="cover"
            style={{ width: 24, height: 24, marginRight: 8, borderRadius: 12 }}
          />
        </View>
        <Text className={isActive ? 'text-gray-200 text-lg font-bold' : 'text-white opacity-none text-lg font-base'}>
          {item.label} {counter > 0 && `x${counter}`}
        </Text>
      </View>
      <Pressable 
        className={isActive ? '' : 'flex w-7 h-7 absolute right-2 top-2 rounded-full'}
        onPress={onInfoPress}
      >
        <Image
          className={isActive ? 'w-0 h-0 rounded-full' : 'flex w-5 h-5 rounded-full justify-center items-center'} 
          source={require('@/assets/images/ops/kiosk.png')}
          resizeMode="cover"
          style={isActive ? 
            { width: 0, height: 0, borderRadius: 999 } : 
            { width: 20, height: 20, borderRadius: 999 }
          }
        />
      </Pressable>
    </TouchableOpacity>
  </LinearGradient>
);