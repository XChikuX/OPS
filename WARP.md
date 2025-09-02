# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.
``

Repository profile
- Stack: Expo (React Native + Expo Router v4), TypeScript, NativeWind (Tailwind for RN), Yarn 4 (Berry)
- Entry: expo-router/entry via package.json
- Platforms: Android, iOS, Web
- Notable configs: app.json, babel.config.js, metro.config.js, tsconfig.json, eas.json

Commands you’ll use often
Setup and install
- Use Yarn 4 with node-modules linking (per README):
  - yarn set version berry
  - yarn config set nodeLinker node-modules
  - yarn install

Run locally
- Start dev server (Expo):
  - yarn start
  - Add a platform flag to auto-launch:
    - Android: yarn start --android
    - iOS (macOS only): yarn start --ios
    - Web: yarn start --web

Native run/build (local)
- Prebuild native projects (generates android/ios):
  - yarn prebuild
- Run on device/emulator:
  - Android: yarn android (alias for expo run:android)
  - iOS: yarn ios (alias for expo run:ios)

Testing
- All tests (watch mode): yarn test
- Run a single test file:
  - yarn test components/__tests__/ThemedText-test.tsx
- Filter by test name:
  - yarn test -t "renders correctly"
- Run once (no watch):
  - yarn test --watchAll=false
- Update snapshots:
  - yarn test -u

Linting and types
- Lint: yarn lint
- Auto-fix:
  - yarn lint --fix
- Type-check (no emit):
  - npx tsc --noEmit

EAS builds (cloud)
- Generate native projects first if needed: yarn prebuild
- Use the provided EAS profiles in eas.json. Example (Android APK dev client):
  - eas build --platform android --profile preview3
- Important Android note (from README): add to ./android/build.gradle if you hit duplicate .so errors during EAS builds:
  android {
     packagingOptions {
       pickFirst '**/libc++_shared.so'
       pickFirst '**/libfbjni.so'
       pickFirst '**/libcrypto.so'
     }
  }

High-level architecture and structure
Routing and screens (Expo Router v4)
- app/ directory defines routes. Key patterns:
  - app/_layout.tsx: root layout
  - app/(tabs)/_layout.tsx and siblings: tabbed sub-tree (e.g., index.tsx, explore.tsx)
  - app/+not-found.tsx: 404 boundary
  - app/ops.tsx and other files map directly to routes
- app.json sets experiments.typedRoutes=true to enable typed routes.

UI and styling
- NativeWind + Tailwind pipeline:
  - babel.config.js uses "babel-preset-expo" with jsxImportSource: "nativewind" and enables "nativewind/babel".
  - metro.config.js is wrapped with withNativeWind(config, { input: './global.css' }) and sets isCSSEnabled.
  - Tailwind config: tailwind.config.js, global styles in global.css.
- React Native Reanimated is enabled via the required Babel plugin and Metro settings.
- SVG support: metro.config.js configures react-native-svg-transformer (adds 'svg' to sourceExts and removes from assetExts) so .svg files import as components.

TypeScript and module resolution
- tsconfig.json extends expo/tsconfig.base with strict mode and alias:
  - "@/*" → project root (e.g., import from '@/components/...').

Testing
- Jest is configured in package.json:
  - preset: "react-native"
  - transform: "^.+\\.tsx?$": "babel-jest"
  - transformIgnorePatterns adjusted for victory, react-native-svg, react-native
- Example test lives at components/__tests__/ThemedText-test.tsx using react-test-renderer.

The OPS module (feature focus)
- Location: components/OPS/
- Purpose: encapsulates domain logic and UI primitives for an OPS data table and filters.
- Key files:
  - constants.ts: domain data (buttonData), static table descriptors (tableHead, tableData), and regex ColumnPatterns for derived traits.
  - functions.ts: classification sets (e.g., observers/deciders) and a pure isValidCell(filter, first, second, columnHeader, columnFirst) used for filtering.
  - utils.ts: builds lookup maps for fast membership checks and provides an isValidCell variant that evaluates against the activeButtons state and column header regexes.
  - types.ts: shared types for button metadata, active state, and regex patterns.
- Typical flow:
  - UI toggles modify an ActiveButtonsState map.
  - A render path passes first/second function tokens plus the column header into utils.isValidCell, which applies set membership and regex rules to decide whether to show a cell.
  - DataTable and AnimatedButton components (in this folder) bind the domain to the UI.

Assets and images
- Images and SVGs live in assets/ (including assets/images/ops/).
- AsyncImage component uses expo-image and an authenticated fetch pattern:
  - imports authSequenceWithHeaders from ../Utils/crypto; ensure this module is present or stubbed in your environment if you use AsyncImage.

Expo and build configuration
- app.json enables new architecture (newArchEnabled: true); sets Android package, deep-linking scheme, and expo-router + expo-font plugins.
- metro.config.js:
  - Custom transformer (react-native-svg-transformer)
  - assetPlugins: ['expo-asset/tools/hashAssetFiles']
  - inlineRequires enabled for perf
- babel.config.js:
  - babel-preset-expo, nativewind, and reanimated plugin

Yarn Berry notes specific to this repo
- The README specifies using Yarn 4 (Berry) but with nodeLinker set to node-modules (instead of PnP). Use the Setup steps above before running commands.
- The repository currently contains .pnp.* files; if you switch to node-modules linking, Yarn will install into node_modules and Metro will resolve modules the usual way.
- Repository policy (from README): before committing, remove the packageManager field ("packageManager": "yarn@4.x.x") from package.json.

Appendix: script reference (from package.json)
- start: expo start
- android: expo run:android
- ios: expo run:ios
- web: expo start --web
- prebuild: npx expo prebuild
- lint: expo lint
- test: jest --watchAll
- reset-project: node ./scripts/reset-project.js (moves current app/components/hooks/constants/scripts into app-example; creates a fresh app/)

