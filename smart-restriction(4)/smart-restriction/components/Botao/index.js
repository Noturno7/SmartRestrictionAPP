import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Botao({ titulo, onPress, secundario = false }) {
  return (
    <TouchableOpacity
      style={[styles.botao, secundario && styles.secundario]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.texto, secundario && styles.textoSec]}>{titulo}</Text>
    </TouchableOpacity>
  );
}
