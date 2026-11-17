import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  cartao: { backgroundColor: cores.superficie, borderRadius: 10, padding: 14, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: cores.borda },
  cartaoAlta: { borderLeftColor: cores.texto },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titulo: { color: cores.texto, fontSize: 17, fontWeight: 'bold', flex: 1 },
  texto: { color: cores.texto, opacity: 0.85, marginVertical: 8 },
  selo: { color: cores.texto, backgroundColor: cores.borda, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10, fontSize: 12, overflow: 'hidden' },
  seloMedia: { backgroundColor: cores.suave, color: cores.fundo },
  seloAlta: { backgroundColor: cores.texto, color: cores.fundo, fontWeight: 'bold' },
  pasta: { color: cores.suave, fontSize: 13 },
  excluir: { color: cores.suave, fontSize: 13, textDecorationLine: 'underline' },
});
