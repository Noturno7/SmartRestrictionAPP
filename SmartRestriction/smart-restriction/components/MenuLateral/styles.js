import { StyleSheet } from 'react-native';
import { cores } from '../../theme';

export default StyleSheet.create({
  tudo: { flexGrow: 1, justifyContent: 'space-between', backgroundColor: cores.texto, paddingHorizontal: 12, paddingBottom: 12 },
  marca: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 4 },
  logo: { width: 38, height: 38, marginRight: 10 },
  nomeApp: { color: cores.fundo, fontSize: 17, fontWeight: 'bold' },
  secao: { color: cores.suave, fontSize: 11, letterSpacing: 1, marginTop: 14, marginBottom: 8, marginLeft: 6 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, marginBottom: 4 },
  itemAtivo: { backgroundColor: cores.amarelo },
  icone: { fontSize: 16, marginRight: 12 },
  itemTxt: { color: cores.borda, fontSize: 16, flex: 1 },
  itemTxtAtivo: { color: cores.texto, fontWeight: 'bold' },
  badge: { backgroundColor: cores.suave, borderRadius: 10, minWidth: 22, paddingHorizontal: 6, paddingVertical: 1, alignItems: 'center' },
  badgeTxt: { color: cores.fundo, fontSize: 12 },
  sync: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: cores.suave },
  ponto: { width: 10, height: 10, borderRadius: 5, backgroundColor: cores.amarelo, marginRight: 10 },
  pontoErro: { backgroundColor: cores.suave },
  syncTitulo: { color: cores.fundo, fontSize: 13, fontWeight: 'bold' },
  syncSub: { color: cores.suave, fontSize: 11 },
  perfil: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, paddingHorizontal: 4 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: cores.amarelo, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarTxt: { color: cores.texto, fontWeight: 'bold', fontSize: 13 },
  perfilNome: { color: cores.fundo, fontWeight: 'bold', fontSize: 14 },
  perfilEmail: { color: cores.suave, fontSize: 12 },
});
