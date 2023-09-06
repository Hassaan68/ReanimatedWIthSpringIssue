/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const springOptions = {
  damping: 15,
  mass: 1,
  stiffness: 100,
};
function Section({children, title}: SectionProps): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const progress = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(400, {
          easing: Easing.cubic,
          duration: 0,
        }),
        withTiming(400, {
          easing: Easing.cubic,
          duration: 0,
        }),
        withTiming(180, {
          easing: Easing.cubic,
          duration: 1400,
        }),
        withTiming(180, {
          easing: Easing.cubic,
          duration: 1400,
        }),
        withTiming(180, {
          easing: Easing.cubic,
          duration: 0,
        }),
      ),
      -1,
      false,
    );
  });

  const viewWidth = useDerivedValue(() => {
    return withSpring(progress.value, springOptions);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    if (isNaN(viewWidth.value)) {
      console.log('WidthValue ', viewWidth.value);
    }
    return {
      width: withSpring(progress.value, springOptions),
      height: withSpring(progress.value / 1.5),
      opacity: progress.value,
    };
  }, [mounted, viewWidth.value, progress.value]);
  return (
    <View style={styles.sectionContainer}>
      <Animated.View style={[animatedStyle]}>
        <View
          width={'100%'}
          height={'100%'}
          style={{backgroundColor: 'yellow'}}></View>
      </Animated.View>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    backgroundColor: 'red',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
