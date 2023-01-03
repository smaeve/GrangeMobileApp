import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tudublin.fblogin',
  appName: 'A2grangemobile',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],

      //OAuth Client ID from google cloud platform website
      serverClientId: '491288604931-hhgltnleqdqugrs4boko8gr1uam05sj5.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
