import React from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '@/components/GradientText';
import StarIcon from '@/assets/images/svg/star.svg';
import PsyncIcon from '@/assets/images/svg/psync-tilt.svg';

type BottomSheetContentProps = {
  criteria: string;
};

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ criteria }) => (
  <LinearGradient
    className="flex-row h-full w-screen border-2 border-white opacity-70 rounded justify-center items-center -translate-y-4 pb-5 -z-50"
    locations={[0, 1]}
    colors={['#4C407B', '#01010d']}
  >
    <View className='flex relative items-center'>
      <GradientText width={200} height={30} style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 100 }} >{criteria}</GradientText>
      <Image
        className='w-5 h-5 rounded-full absolute'
        source={require('@/assets/images/ops/kiosk.png')}
      />
      <PsyncIcon width={30} height={30} />
      <View className='mt-4'>
        <GradientText width={200} height={30} colors={["#1D976C", "#93F9B9"]} style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }} >Rate Us:</GradientText>
      </View>
      <View className="flex justify-end items-center pb-4 border-1 border-black">
        <View className="flex-row m-5">
          <StarIcon width={20} height={20} />
          <StarIcon width={20} height={20} />
          <StarIcon width={20} height={20} />
          <StarIcon width={20} height={20} />
          <StarIcon width={20} height={20} />
        </View>
      </View>
    </View>
  </LinearGradient>
);