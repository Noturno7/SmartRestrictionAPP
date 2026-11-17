import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  caixa: { marginBottom: 12 },
  rotulo: { color: cores.suave, fontSize: 13, marginBottom: 4 },
  input: {
    backgroundColor: cores.superficie, color: cores.texto, borderWidth: 1,
    borderColor: cores.borda, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },
  inputErro: { borderColor: cores.texto, borderWidth: 2 },
  erro: { color: cores.texto, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
});
