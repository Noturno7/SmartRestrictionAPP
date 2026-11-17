import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
import AvisoSemUsuario from '../components/AvisoSemUsuario';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import { cores } from '../theme';

// Monta a árvore de pastas em lista plana, com o nível de cada pasta
// Pasta sem pasta-mãe válida aparece na raiz (assim nenhuma pasta fica escondida)
const ordenar = (lista) => {
  const ids = lista.map((p) => p.id);
  const filhos = (paiId, nivel) =>
    lista
      .filter((p) => (paiId === '' ? !p.paiId || !ids.includes(p.paiId) : p.paiId === paiId))
      .flatMap((p) => [{ ...p, nivel }, ...filhos(p.id, nivel + 1)]);
  return filhos('', 0);
};

export default function PastasScreen({ navigation }) {
  const { usuarioAtual, minhasPastas, minhasNotas, adicionarPasta } = useContext(AppContext);
  const [nome, setNome] = useState('');
  const [paiId, setPaiId] = useState('');
  const [erro, setErro] = useState('');

  if (!usuarioAtual) return <AvisoSemUsuario navigation={navigation} />;

  const criar = async () => {
    if (nome.trim().length < 2) { setErro('Dê um nome à pasta (mínimo 2 letras).'); return; }
    setErro('');
    try {
      await adicionarPasta({ nome: nome.trim(), paiId });
      setNome('');
    } catch (e) {
      setErro(`Não foi possível salvar: ${e.message}`);
    }
  };

  const cabecalho = (
    <View>
      <Text style={s.titulo}>Pastas de {usuarioAtual.nome}</Text>
      <CampoTexto rotulo="Nome da pasta *" value={nome} onChangeText={setNome} erro={erro} placeholder="Ex.: Faculdade" />
      <Text style={s.rotulo}>Criar dentro de</Text>
      <View style={s.picker}>
        <Picker selectedValue={paiId} onValueChange={setPaiId} style={s.pickerTexto} dropdownIconColor={cores.texto}>
          <Picker.Item label="Raiz (pasta principal)" value="" />
          {ordenar(minhasPastas).map((p) => (
            <Picker.Item key={p.id} label={'— '.repeat(p.nivel) + p.nome} value={p.id} />
          ))}
        </Picker>
      </View>
      <Botao titulo="Criar pasta" onPress={criar} />
      {minhasPastas.length === 0 && <Text style={s.vazio}>Nenhuma pasta ainda. Crie a primeira acima.</Text>}
    </View>
  );

  return (
    <FlatList
      style={s.tela} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled"
      data={ordenar(minhasPastas)} keyExtractor={(p) => p.id} ListHeaderComponent={cabecalho}
      renderItem={({ item }) => (
        <View style={[s.pasta, { marginLeft: item.nivel * 20 }]}>
          <Text style={s.nomePasta}>📁 {item.nome}</Text>
          <Text style={s.qtd}>{minhasNotas.filter((n) => n.pastaId === item.id).length} notas</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  rotulo: { color: cores.suave, fontSize: 13, marginBottom: 4 },
  picker: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 8, marginBottom: 8 },
  pickerTexto: { color: cores.texto },
  vazio: { color: cores.suave, marginTop: 12 },
  pasta: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.superficie, padding: 12, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: cores.borda },
  nomePasta: { color: cores.texto, flex: 1, fontSize: 16 },
  qtd: { color: cores.suave, fontSize: 12 },
});
