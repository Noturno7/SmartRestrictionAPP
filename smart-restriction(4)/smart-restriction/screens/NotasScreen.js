import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
import AvisoSemUsuario from '../components/AvisoSemUsuario';
import CampoTexto from '../components/CampoTexto';
import CartaoNota from '../components/CartaoNota';
import BarraFormatacao from '../components/BarraFormatacao';
import Botao from '../components/Botao';
import { cores, PRIORIDADES, CORES_TEXTO, TAMANHO_PADRAO } from '../theme';

export default function NotasScreen({ navigation }) {
  const { usuarioAtual, minhasPastas, minhasNotas, adicionarNota } = useContext(AppContext);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [fmt, setFmt] = useState({ negrito: false, italico: false, cor: CORES_TEXTO[0], tamanho: TAMANHO_PADRAO });
  const mudarFmt = (parte) => setFmt((f) => ({ ...f, ...parte }));
  const { negrito, italico, cor, tamanho } = fmt;
  const [pastaId, setPastaId] = useState('');
  const [filtro, setFiltro] = useState('Todas');
  const [erros, setErros] = useState({});

  if (!usuarioAtual) return <AvisoSemUsuario navigation={navigation} />;

  const salvar = async () => {
    const e = {};
    if (titulo.trim().length < 2) e.titulo = 'Informe um título.';
    if (!pastaId) e.pasta = 'Escolha uma pasta (crie uma na tela Pastas, se necessário).';
    setErros(e);
    if (Object.keys(e).length) return;
    try {
      await adicionarNota({
        titulo: titulo.trim(), texto: texto.trim(), prioridade, pastaId,
        negrito: String(negrito), italico: String(italico), cor, tamanho: String(tamanho),
      });
      setTitulo(''); setTexto('');
    } catch (erro) {
      setErros({ geral: `Não foi possível salvar: ${erro.message}` });
    }
  };

  const nomeDaPasta = (id) => (minhasPastas.find((p) => p.id === id) || { nome: 'Sem pasta' }).nome;
  const lista = filtro === 'Todas' ? minhasNotas : minhasNotas.filter((n) => n.prioridade === filtro);

  const cabecalho = (
    <View>
      <Text style={s.titulo}>Nova nota</Text>
      <CampoTexto rotulo="Título *" value={titulo} onChangeText={setTitulo} erro={erros.titulo} placeholder="Ex.: Resumo da aula" />
      <Text style={s.rotulo}>Conteúdo</Text>
      <BarraFormatacao negrito={negrito} italico={italico} cor={cor} tamanho={tamanho} onMudar={mudarFmt} />
      <CampoTexto
        value={texto} onChangeText={setTexto} placeholder="Escreva sua anotação" multiline
        estiloInput={{
          minHeight: 140, textAlignVertical: 'top', color: cor, fontSize: tamanho,
          fontWeight: negrito ? 'bold' : 'normal', fontStyle: italico ? 'italic' : 'normal',
        }}
      />
      <Text style={s.rotulo}>Pasta *</Text>
      <View style={s.picker}>
        <Picker selectedValue={pastaId} onValueChange={setPastaId} style={s.pickerTexto} dropdownIconColor={cores.texto}>
          <Picker.Item label="Selecione uma pasta" value="" />
          {minhasPastas.map((p) => <Picker.Item key={p.id} label={p.nome} value={p.id} />)}
        </Picker>
      </View>
      {!!erros.pasta && <Text style={s.erro}>{erros.pasta}</Text>}
      <Text style={s.rotulo}>Prioridade</Text>
      <View style={s.picker}>
        <Picker selectedValue={prioridade} onValueChange={setPrioridade} style={s.pickerTexto} dropdownIconColor={cores.texto}>
          {PRIORIDADES.map((p) => <Picker.Item key={p} label={p} value={p} />)}
        </Picker>
      </View>
      <Botao titulo="Salvar nota" onPress={salvar} />
      {!!erros.geral && <Text style={s.erro}>{erros.geral}</Text>}
      <Text style={[s.titulo, { marginTop: 20 }]}>Minhas notas</Text>
      <Text style={s.rotulo}>Filtrar por prioridade</Text>
      <View style={s.picker}>
        <Picker selectedValue={filtro} onValueChange={setFiltro} style={s.pickerTexto} dropdownIconColor={cores.texto}>
          {['Todas', ...PRIORIDADES].map((p) => <Picker.Item key={p} label={p} value={p} />)}
        </Picker>
      </View>
      {lista.length === 0 && <Text style={s.vazio}>Nenhuma nota para este filtro.</Text>}
    </View>
  );

  return (
    <FlatList
      style={s.tela} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled"
      data={lista} keyExtractor={(n) => n.id} ListHeaderComponent={cabecalho}
      renderItem={({ item }) => (
        <CartaoNota nota={item} nomePasta={nomeDaPasta(item.pastaId)} />
      )}
    />
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  rotulo: { color: cores.suave, fontSize: 13, marginBottom: 4 },
  picker: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 8, marginBottom: 10 },
  pickerTexto: { color: cores.texto },
  erro: { color: cores.texto, fontSize: 12, fontStyle: 'italic', marginBottom: 8 },
  vazio: { color: cores.suave, marginBottom: 8 },
});
