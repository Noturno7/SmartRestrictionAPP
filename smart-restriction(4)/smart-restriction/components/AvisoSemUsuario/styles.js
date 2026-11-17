import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 140, height: 140, marginBottom: 16 },
  nomeApp: { color: cores.texto, fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  slogan: { color: cores.suave, fontSize: 14, marginTop: 4, marginBottom: 28, textAlign: 'center' },
  caixa: { alignSelf: 'stretch', backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 14, padding: 18 },
  titulo: { color: cores.texto, fontSize: 18, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  texto: { color: cores.suave, fontSize: 14, marginBottom: 14, textAlign: 'center' },
});
