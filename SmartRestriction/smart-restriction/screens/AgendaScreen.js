import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import AvisoSemUsuario from '../components/AvisoSemUsuario';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { cores } from '../theme';

// Valida DD/MM/AAAA e devolve AAAAMMDD (para ordenar) ou null
const lerData = (txt) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(txt);
  if (!m) return null;
  const [, d, mes, a] = m;
  const dt = new Date(Number(a), Number(mes) - 1, Number(d));
  const ok = dt.getFullYear() === Number(a) && dt.getMonth() === Number(mes) - 1 && dt.getDate() === Number(d);
  return ok ? a + mes + d : null;
};

// Máscara: "11112026" vira "11/11/2026" enquanto a pessoa digita
const mascaraData = (txt) => {
  const n = txt.replace(/\D/g, '').slice(0, 8);
  if (n.length > 4) return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
  if (n.length > 2) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return n;
};

const mascaraHora = (txt) => {
  const n = txt.replace(/\D/g, '').slice(0, 4);
  return n.length > 2 ? `${n.slice(0, 2)}:${n.slice(2)}` : n;
};

export default function AgendaScreen({ navigation }) {
  const { usuarioAtual, meusEventos, adicionarEvento } = useContext(AppContext);
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [erros, setErros] = useState({});

  if (!usuarioAtual) return <AvisoSemUsuario navigation={navigation} />;

  const salvar = async () => {
    const e = {};
    if (titulo.trim().length < 2) e.titulo = 'Informe o que está agendado.';
    if (hora && !/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) e.hora = 'Use uma hora válida (HH:MM).';
    if (!lerData(data)) e.data = 'Use uma data válida no formato DD/MM/AAAA.';
    setErros(e);
    if (Object.keys(e).length) return;
    try {
      await adicionarEvento({ titulo: titulo.trim(), data, hora });
      setTitulo(''); setData(''); setHora('');
    } catch (erro) {
      setErros({ geral: `Não foi possível salvar: ${erro.message}` });
    }
  };

  const ordenados = [...meusEventos].sort((a, b) => (lerData(a.data) + (a.hora || '')).localeCompare(lerData(b.data) + (b.hora || '')));

  const cabecalho = (
    <View>
      <Text style={s.titulo}>Agenda</Text>
      <CampoTexto rotulo="Compromisso *" value={titulo} onChangeText={setTitulo} erro={erros.titulo} placeholder="Ex.: Entrega do trabalho" />
      <CampoTexto rotulo="Data *" value={data} onChangeText={(t) => setData(mascaraData(t))} erro={erros.data} placeholder="Digite só os números: 11112026" keyboardType="numeric" maxLength={10} />
      <CampoTexto rotulo="Hora (opcional)" value={hora} onChangeText={(t) => setHora(mascaraHora(t))} erro={erros.hora} placeholder="Digite só os números: 1430" keyboardType="numeric" maxLength={5} />
      <Botao titulo="Agendar" onPress={salvar} />
      {!!erros.geral && <Text style={s.erro}>{erros.geral}</Text>}
      {ordenados.length === 0 && <Text style={s.vazio}>Sem compromissos. Agende o primeiro acima.</Text>}
    </View>
  );

  return (
    <FlatList
      style={s.tela} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled"
      data={ordenados} keyExtractor={(e) => e.id} ListHeaderComponent={cabecalho}
      renderItem={({ item }) => (
        <View style={s.evento}>
          <Text style={s.data}>{item.data}</Text>
          <Text style={s.nome}>{item.titulo}{item.hora ? `  ·  ${item.hora}` : ''}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  vazio: { color: cores.suave, marginTop: 12 },
  erro: { color: cores.texto, fontSize: 12, fontStyle: 'italic', marginTop: 6 },
  evento: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.superficie, padding: 12, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: cores.borda },
  data: { color: cores.fundo, backgroundColor: cores.texto, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontWeight: 'bold', marginRight: 10, overflow: 'hidden' },
  nome: { color: cores.texto, flex: 1, fontSize: 16 },
});
