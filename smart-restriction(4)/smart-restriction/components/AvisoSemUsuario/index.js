import React from 'react';
import { View, Text, Image } from 'react-native';
import Botao from '../Botao';
import styles from './styles';
import { LOGO } from '../../theme';

// Tela de entrada: aparece quando não há usuário ativo
export default function AvisoSemUsuario({ navigation }) {
  return (
    <View style={styles.tela}>
      <Image source={LOGO} style={styles.logo} />
      <Text style={styles.nomeApp}>Smart Restriction</Text>
      <Text style={styles.slogan}>Suas anotações, protegidas.</Text>
      <View style={styles.caixa}>
        <Text style={styles.titulo}>Nenhum usuário ativo</Text>
        <Text style={styles.texto}>Cadastre-se ou escolha um usuário para ver suas anotações.</Text>
        <Botao titulo="Ir para o cadastro" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    </View>
  );
}
