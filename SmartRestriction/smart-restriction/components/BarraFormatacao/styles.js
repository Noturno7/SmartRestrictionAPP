import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  barra: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 8, padding: 8, marginBottom: 8 },
  linha: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  btn: { minWidth: 38, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 6, borderWidth: 1, borderColor: cores.borda, alignItems: 'center', marginRight: 6 },
  ativo: { backgroundColor: cores.texto, borderColor: cores.texto },
  btnTxt: { color: cores.texto, fontSize: 15 },
  ativoTxt: { color: cores.fundo },
  espaco: { flex: 1 },
  tamanho: { color: cores.suave, width: 28, textAlign: 'center', marginRight: 6 },
  rotulo: { color: cores.suave, fontSize: 13, marginRight: 10 },
  bolinha: { width: 26, height: 26, borderRadius: 13, marginRight: 10, borderWidth: 1, borderColor: cores.borda },
  bolinhaAtiva: { borderWidth: 3, borderColor: cores.texto },
});
