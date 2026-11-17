import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { cores } from '../../theme';
import styles from './styles';

export default function CampoTexto({ rotulo, erro, estiloInput, ...resto }) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={[styles.input, !!erro && styles.inputErro, estiloInput]}
        placeholderTextColor={cores.suave}
        {...resto}
      />
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}
