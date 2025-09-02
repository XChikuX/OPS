# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack & Architecture

- **Framework**: Expo SDK 53 (React Native + Expo Router v4)
- **Languages**: TypeScript (strict mode)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Package Manager**: Yarn 4 (Berry) with node-modules linking
- **Platforms**: Android, iOS, Web
- **Entry Point**: expo-router/entry via package.json

## Essential Setup Commands

Before working with this project, you must set up Yarn 4 correctly:

```bash
yarn set version berry
yarn config set nodeLinker node-modules
yarn install
```

**Important**: Remove `"packageManager": "yarn@4.x.x"` from package.json before committing.

## Development Commands

### Local Development
- `yarn start` - Start Expo dev server
- `yarn start --android` - Start with Android auto-launch
- `yarn start --ios` - Start with iOS auto-launch (macOS only)
- `yarn start --web` - Start with web auto-launch

### Native Builds
- `yarn prebuild` - Generate native android/ios folders
- `yarn android` - Build and run on Android device/emulator
- `yarn ios` - Build and run on iOS device/emulator

### Testing & Quality
- `yarn test` - Run Jest tests in watch mode
- `yarn test --watchAll=false` - Run tests once
- `yarn test -u` - Update snapshots
- `yarn lint` - Run ESLint
- `yarn lint --fix` - Auto-fix linting issues

### TypeScript
- `npx tsc --noEmit` - Type check without emitting files

### EAS Cloud Builds
- Build profiles in `eas.json`: development, preview, preview2, preview3, production
- Example: `eas build --platform android --profile preview3`
- **Android Build Fix**: If EAS build fails with duplicate .so files, add to `./android/build.gradle`:
  ```gradle
  android {
     packagingOptions {
       pickFirst '**/libc++_shared.so'
       pickFirst '**/libfbjni.so'
       pickFirst '**/libcrypto.so'
     }
  }
  ```

## Project Architecture

### Routing (Expo Router v4)
- **app/** directory defines file-based routes
- **app/_layout.tsx** - Root layout
- **app/(tabs)/** - Tabbed navigation sub-tree
- **app/+not-found.tsx** - 404 error boundary
- **app/ops.tsx** - Main OPS feature screen
- Typed routes enabled via `app.json` experiments

### Styling System
- **NativeWind + Tailwind**: Configured via `tailwind.config.js`, `babel.config.js`, `metro.config.js`
- **Global CSS**: `global.css` processed by NativeWind
- **Themed Components**: `ThemedText`, `ThemedView` in components/
- **SVG Support**: react-native-svg-transformer configured in Metro

### OPS Feature Module
Located in `components/OPS/` - the core domain logic:
- **constants.ts**: Button data, table descriptors, column regex patterns
- **functions.ts**: Classification sets and pure filtering logic
- **utils.ts**: Lookup maps and state-aware cell validation
- **types.ts**: Shared types for button metadata and patterns
- **DataTable.tsx, AnimatedButton.tsx**: UI components

### Module Resolution
- **TypeScript alias**: `@/*` maps to project root
- **Import pattern**: `import { Component } from '@/components/Component'`

### Testing
- **Jest** with react-native preset
- **Transform ignores**: victory, react-native-svg, react-native
- **Example test**: `components/__tests__/ThemedText-test.tsx`

## Key Configuration Files

- **app.json**: Expo config with new architecture enabled
- **metro.config.js**: Custom transformer for SVG, asset hashing, inline requires
- **babel.config.js**: NativeWind JSX transform, Reanimated plugin
- **tsconfig.json**: Extends expo/tsconfig.base with strict mode
- **eas.json**: Cloud build profiles for different deployment targets