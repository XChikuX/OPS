import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import { ActiveButtonsState, ButtonData } from '@/components/OPS/types';

type ButtonDescriptionProps = {
  activeButtons: ActiveButtonsState;
  buttonData: ButtonData;
};

export const ButtonDescription: React.FC<ButtonDescriptionProps> = ({ activeButtons, buttonData }) => (
  <View className="mt-20 mb-10 items-center justify-center">
    <View className="text-white bg-slate-700 opacity-80 p-10 m-1 rounded-2xl">
      {Object.keys(activeButtons).length > 0 ? (
        buttonData
          .filter(item => activeButtons[item.label])
          .map((item) => (
            <Animated.View
              key={item.label}
              entering={FadeInUp.duration(300)}
              exiting={FadeOutUp.duration(300)}
              layout={LinearTransition.springify()}
              className='flex w-full justify-start mb-4'
            >
              <Ripple rippleOpacity={0.9} rippleDuration={800} rippleSize={500}>
                <Text className="text-lg text-blue-400 font-semibold">
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
);