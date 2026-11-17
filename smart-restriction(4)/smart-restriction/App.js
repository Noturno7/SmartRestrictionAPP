import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppProvider } from './context/AppContext';
import MenuLateral from './components/MenuLateral';
import InicioScreen from './screens/InicioScreen';
import NotasScreen from './screens/NotasScreen';
import PastasScreen from './screens/PastasScreen';
import AgendaScreen from './screens/AgendaScreen';
import CadastroScreen from './screens/CadastroScreen';
import { cores } from './theme';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Inicio"
          drawerContent={(props) => <MenuLateral {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: cores.fundo },
            headerTintColor: cores.texto,
            headerShadowVisible: false,
            drawerStyle: { backgroundColor: cores.texto, width: 270 },
          }}>
          <Drawer.Screen name="Inicio" component={InicioScreen} options={{ title: 'Início' }} />
          <Drawer.Screen name="Notas" component={NotasScreen} />
          <Drawer.Screen name="Pastas" component={PastasScreen} />
          <Drawer.Screen name="Agenda" component={AgendaScreen} />
          <Drawer.Screen name="Cadastro" component={CadastroScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
