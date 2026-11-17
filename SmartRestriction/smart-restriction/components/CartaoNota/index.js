import React from 'react';
import { View, Text } from 'react-native';
import { cores } from '../../theme';
import styles from './styles';

export default function CartaoNota({ nota, nomePasta }) {
  const { titulo, texto, prioridade, negrito, italico, cor, tamanho } = nota;
  const estiloTexto = {
    fontWeight: negrito === 'true' ? 'bold' : 'normal',
    fontStyle: italico === 'true' ? 'italic' : 'normal',
    color: cor && cor !== '#f1eedf' ? cor : cores.texto,
    fontSize: Number(tamanho) || 16,
  };
  return (
    <View style={[styles.cartao, prioridade === 'Alta' && styles.cartaoAlta]}>
      <View style={styles.linha}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={[styles.selo, prioridade === 'Média' && styles.seloMedia, prioridade === 'Alta' && styles.seloAlta]}>
          {prioridade}
        </Text>
      </View>
      {!!texto && <Text style={[styles.texto, estiloTexto]}>{texto}</Text>}
      <Text style={styles.pasta}>📁 {nomePasta}</Text>
    </View>
  );
}
