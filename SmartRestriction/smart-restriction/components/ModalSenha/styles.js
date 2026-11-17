import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  fundo: { flex: 1, backgroundColor: 'rgba(43,43,43,0.65)', justifyContent: 'center', padding: 24 },
  caixa: { backgroundColor: cores.superficie, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: cores.borda },
  titulo: { color: cores.texto, fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  texto: { color: cores.suave, marginBottom: 14 },
});