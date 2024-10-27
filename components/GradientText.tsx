import React, { useEffect, useState, useCallback } from 'react';
import { LayoutChangeEvent, Text, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';

interface GradientTextProps {
  children: string;
  style?: TextStyle;
  colors?: string[];
  glimmerColor?: string;
  animationType?: 'gradient' | 'parallelogram';
  isEntering?: boolean;
  skewAngle?: number;
  [key: string]: any;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  style = {}, 
  colors = ["#dd3562", "#8354ff"],
  glimmerColor,
  animationType = 'gradient',
  isEntering = true,
  skewAngle = -45,
  ...props 
}) => {
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const glimmerPosition = useSharedValue(-150);
  const parallelogramAnimation = useSharedValue(0);

  const onTextLayout = useCallback((event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
    setTextHeight(event.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    if (animationType === 'gradient' && glimmerColor && textWidth > 0) {
      glimmerPosition.value = -150;
      glimmerPosition.value = withRepeat(
        withTiming(textWidth + 150, { duration: 2000, easing: Easing.ease }),
        -1,
        false
      );
    } else if (animationType === 'parallelogram') {
      parallelogramAnimation.value = isEntering ? 0 : 1;
      parallelogramAnimation.value = withTiming(isEntering ? 1 : 0, { duration: 300, easing: Easing.ease });
    }
  }, [animationType, glimmerColor, textWidth, isEntering]);

  const glimmerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: glimmerPosition.value },
      { skewX: `${skewAngle}deg` }
    ],
  }));

  const parallelogramStyle = useAnimatedStyle(() => {
    const translateY = withSequence(
      withTiming(20 * (1 - parallelogramAnimation.value), { duration: 0 }),
      withTiming(0, { duration: 300 })
    );

    const skewX = withSequence(
      withTiming(`${20 * (1 - parallelogramAnimation.value)}deg`, { duration: 0 }),
      withTiming('0deg', { duration: 300 })
    );

    const opacity = withTiming(parallelogramAnimation.value, { duration: 300 });

    return {
      transform: [
        { translateY },
        { skewX },
      ],
      opacity,
    };
  });

  const TextComponent = animationType === 'parallelogram' ? Animated.Text : Text;

  const renderText = () => (
    <TextComponent 
      style={[style, animationType === 'parallelogram' && parallelogramStyle]} 
      {...props} 
      onLayout={onTextLayout}
    >
      {children}
    </TextComponent>
  );

  const shimmerWidth = Math.abs(textHeight * Math.tan(skewAngle * Math.PI / 180)) + 50;

  if (animationType === 'gradient') {
    return (
      <MaskedView maskElement={renderText()}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flexDirection: 'row' }}
        >
          <Text style={[style, { opacity: 0 }]} {...props}>
            {children}
          </Text>
          {glimmerColor && textWidth > 0 && (
            <Animated.View style={[
              {
                position: 'absolute',
                top: -10,
                left: -shimmerWidth / 2,
                bottom: -10,
                width: shimmerWidth,
                backgroundColor: glimmerColor,
              },
              glimmerStyle
            ]} />
          )}
        </LinearGradient>
      </MaskedView>
    );
  } else {
    return renderText();
  }
};

export default GradientText;