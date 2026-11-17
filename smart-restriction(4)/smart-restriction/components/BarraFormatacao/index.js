import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CORES_TEXTO, TAMANHO_MIN, TAMANHO_MAX } from '../../theme';
import styles from './styles';

export default function BarraFormatacao({ negrito, italico, cor, tamanho, onMudar }) {
  return (
    <View style={styles.barra}>
      <View style={styles.linha}>
        <TouchableOpacity style={[styles.btn, negrito && styles.ativo]} onPress={() => onMudar({ negrito: !negrito })}>
          <Text style={[styles.btnTxt, negrito && styles.ativoTxt, { fontWeight: 'bold' }]}>N</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, italico && styles.ativo]} onPress={() => onMudar({ italico: !italico })}>
          <Text style={[styles.btnTxt, italico && styles.ativoTxt, { fontStyle: 'italic' }]}>I</Text>
        </TouchableOpacity>
        <View style={styles.espaco} />
        <TouchableOpacity style={styles.btn} onPress={() => onMudar({ tamanho: Math.max(TAMANHO_MIN, tamanho - 2) })}>
          <Text style={styles.btnTxt}>A−</Text>
        </TouchableOpacity>
        <Text style={styles.tamanho}>{tamanho}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => onMudar({ tamanho: Math.min(TAMANHO_MAX, tamanho + 2) })}>
          <Text style={styles.btnTxt}>A+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Cor</Text>
        {CORES_TEXTO.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => onMudar({ cor: c })}
            style={[styles.bolinha, { backgroundColor: c }, cor === c && styles.bolinhaAtiva]}
          />
        ))}
      </View>
    </View>
  );
}
