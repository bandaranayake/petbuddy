import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { name as appName } from './app.json';
import { theme } from './src/core/theme';
import store from './store';
import App from './App';

export default function Main() {
    return (
        <ReduxProvider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </ReduxProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);