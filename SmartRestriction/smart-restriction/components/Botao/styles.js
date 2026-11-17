import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  botao: { backgroundColor: cores.texto, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 6 },
  secundario: { backgroundColor: 'transparent', borderWidth: 1, borderColor: cores.suave },
  texto: { color: cores.fundo, fontWeight: 'bold', fontSize: 15 },
  textoSec: { color: cores.texto },
});
