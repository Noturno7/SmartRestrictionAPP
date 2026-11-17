import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import AvisoSemUsuario from '../components/AvisoSemUsuario';
import { cores } from '../theme';
import { DIAS, MESES, MES_ABREV, saudacao, chaveHoje, chaveEvento, rotuloData } from '../utils/datas';

const corPrioridade = { Alta: cores.amarelo, 'Média': cores.suave, Baixa: cores.borda };

export default function InicioScreen({ navigation }) {
  const { usuarioAtual, minhasPastas, minhasNotas, meusEventos } = useContext(AppContext);
  if (!usuarioAtual) return <AvisoSemUsuario navigation={navigation} />;

  const hoje = new Date();
  const primeiroNome = usuarioAtual.nome.split(' ')[0];
  const dataTexto = `${DIAS[hoje.getDay()]}, ${hoje.getDate()} DE ${MESES[hoje.getMonth()]}`;

  const umaSemana = Date.now() - 7 * 24 * 3600 * 1000;
  const novasNaSemana = minhasNotas.filter((n) => n.criadoEm && new Date(n.criadoEm).getTime() >= umaSemana).length;
  const recentes = [...minhasNotas].reverse().sort((a, b) => (b.criadoEm || '').localeCompare(a.criadoEm || '')).slice(0, 4);
  const principais = minhasPastas.filter((p) => !p.paiId).length;
  const nomePasta = (id) => (minhasPastas.find((p) => p.id === id) || { nome: 'Sem pasta' }).nome;

  const futuros = meusEventos
    .filter((e) => chaveEvento(e.data) >= chaveHoje() && chaveEvento(e.data) !== '')
    .sort((a, b) => (chaveEvento(a.data) + (a.hora || '')).localeCompare(chaveEvento(b.data) + (b.hora || '')));
  const proximo = futuros[0];
  const ehHoje = (e) => chaveEvento(e.data) === chaveHoje();

  return (
    <ScrollView style={s.tela} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.data}>{dataTexto}</Text>
      <Text style={s.saudacao}>{saudacao()}, {primeiroNome}.</Text>
      <Text style={s.sub}>Organize o essencial. O resto pode esperar.</Text>

      <TouchableOpacity style={s.destaque} onPress={() => navigation.navigate('Agenda')}>
        <View style={{ flex: 1 }}>
          <Text style={s.destaqueRotulo}>PRÓXIMO COMPROMISSO</Text>
          <Text style={s.destaqueTitulo}>{proximo ? proximo.titulo : 'Nenhum compromisso'}</Text>
          <Text style={s.destaqueSub}>
            {proximo ? `${ehHoje(proximo) ? 'Hoje' : proximo.data}${proximo.hora ? ' às ' + proximo.hora : ''}` : 'Agende na tela Agenda'}
          </Text>
        </View>
        <View style={s.seta}><Text style={s.setaTxt}>›</Text></View>
      </TouchableOpacity>

      <View style={s.linha}>
        <View style={s.stat}>
          <Text style={s.statNumero}>{minhasNotas.length}</Text>
          <Text style={s.statRotulo}>Notas criadas</Text>
          <Text style={s.statSub}>+{novasNaSemana} esta semana</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNumero}>{minhasPastas.length}</Text>
          <Text style={s.statRotulo}>Pastas ativas</Text>
          <Text style={s.statSub}>{principais} principais</Text>
        </View>
      </View>

      <View style={s.cabecalho}>
        <Text style={s.secao}>Notas recentes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notas')}><Text style={s.link}>Ver todas ›</Text></TouchableOpacity>
      </View>
      {recentes.length === 0 && <Text style={s.vazio}>Nenhuma nota ainda. Crie a primeira na tela Notas.</Text>}
      {recentes.map((n) => (
        <View key={n.id} style={s.nota}>
          <View style={[s.dot, { backgroundColor: corPrioridade[n.prioridade] || cores.borda }]} />
          <Text style={s.notaTitulo}>{n.titulo}</Text>
          {!!n.texto && <Text style={s.notaTexto} numberOfLines={2}>{n.texto}</Text>}
          <View style={s.notaRodape}>
            <Text style={s.tag}>{nomePasta(n.pastaId)}</Text>
            <Text style={s.notaData}>{rotuloData(n.criadoEm)}</Text>
          </View>
        </View>
      ))}

      <View style={[s.cabecalho, { marginTop: 20 }]}>
        <Text style={s.secao}>Próximos dias</Text>
      </View>
      <View style={s.lista}>
        {futuros.length === 0 && <Text style={[s.vazio, { padding: 14 }]}>Sem compromissos futuros.</Text>}
        {futuros.slice(0, 3).map((e, i) => {
          const [dia, mes] = e.data.split('/');
          return (
            <View key={e.id} style={[s.dia, i > 0 && s.diaBorda]}>
              <View style={[s.caixaDia, ehHoje(e) && { backgroundColor: cores.amarelo }]}>
                <Text style={s.diaNum}>{dia}</Text>
                <Text style={s.diaMes}>{MES_ABREV[Number(mes) - 1].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.diaTitulo}>{e.titulo}</Text>
                {!!e.hora && <Text style={s.diaHora}>{e.hora}</Text>}
              </View>
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={s.agendaBtn} onPress={() => navigation.navigate('Agenda')}>
        <Text style={s.agendaTxt}>📅  Abrir agenda completa</Text>
        <Text style={s.agendaTxt}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  data: { color: cores.suave, fontSize: 11, letterSpacing: 1, fontWeight: 'bold' },
  saudacao: { color: cores.texto, fontSize: 32, fontWeight: 'bold', marginTop: 6 },
  sub: { color: cores.suave, fontSize: 14, marginTop: 4, marginBottom: 18 },
  destaque: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.amarelo, borderRadius: 14, padding: 18, marginBottom: 12 },
  destaqueRotulo: { color: cores.texto, fontSize: 10, letterSpacing: 1, fontWeight: 'bold' },
  destaqueTitulo: { color: cores.texto, fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  destaqueSub: { color: cores.texto, fontSize: 12, marginTop: 2 },
  seta: { width: 34, height: 34, borderRadius: 17, backgroundColor: cores.texto, alignItems: 'center', justifyContent: 'center' },
  setaTxt: { color: cores.fundo, fontSize: 22, marginTop: -3 },
  linha: { flexDirection: 'row', marginBottom: 22 },
  stat: { flex: 1, backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 14, padding: 14, marginRight: 10 },
  statNumero: { color: cores.texto, fontSize: 28, fontWeight: 'bold' },
  statRotulo: { color: cores.texto, fontSize: 13, fontWeight: 'bold' },
  statSub: { color: cores.suave, fontSize: 11, marginTop: 2 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  secao: { color: cores.texto, fontSize: 20, fontWeight: 'bold' },
  link: { color: cores.suave, fontSize: 13 },
  vazio: { color: cores.suave },
  nota: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 12, padding: 14, marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  notaTitulo: { color: cores.texto, fontSize: 15, fontWeight: 'bold' },
  notaTexto: { color: cores.suave, fontSize: 12, marginTop: 4 },
  notaRodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  tag: { color: cores.texto, backgroundColor: cores.fundo, fontSize: 11, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  notaData: { color: cores.suave, fontSize: 11 },
  lista: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 12 },
  dia: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  diaBorda: { borderTopWidth: 1, borderTopColor: cores.borda },
  caixaDia: { width: 46, height: 46, borderRadius: 8, backgroundColor: cores.fundo, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  diaNum: { color: cores.texto, fontSize: 17, fontWeight: 'bold' },
  diaMes: { color: cores.texto, fontSize: 9, fontWeight: 'bold' },
  diaTitulo: { color: cores.texto, fontSize: 14, fontWeight: 'bold' },
  diaHora: { color: cores.suave, fontSize: 12, marginTop: 2 },
  agendaBtn: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 10, padding: 14, marginTop: 10, marginBottom: 20 },
  agendaTxt: { color: cores.suave, fontSize: 13 },
});
