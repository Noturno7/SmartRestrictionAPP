import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import ModalSenha from '../components/ModalSenha';
import { cores } from '../theme';

export default function CadastroScreen({ navigation }) {
  const { usuarios, usuarioAtual, setUsuarioAtual, cadastrarUsuario } = useContext(AppContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    const e = {};
    if (nome.trim().length < 3) e.nome = 'Informe o nome (mínimo 3 letras).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Informe um e-mail válido.';
    else if (usuarios.some((u) => u.email === email.trim().toLowerCase())) e.email = 'Este e-mail já está cadastrado.';
    if (senha.length < 6) e.senha = 'A senha precisa ter ao menos 6 caracteres.';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const salvar = async () => {
    try {
      if (!validar()) return;
      await cadastrarUsuario({ nome: nome.trim(), email: email.trim().toLowerCase(), senha });
      setNome(''); setEmail(''); setSenha('');
      navigation.navigate('Inicio');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar no servidor. Verifique a internet e a URL do MockAPI.');
    }
  };

  // Troca de usuário protegida por senha
  const [alvo, setAlvo] = useState(null);
  const [senhaTent, setSenhaTent] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const pedirSenha = (u) => {
    if (usuarioAtual && usuarioAtual.id === u.id) return;
    setAlvo(u); setSenhaTent(''); setErroSenha('');
  };
  const cancelarSenha = () => { setAlvo(null); setSenhaTent(''); setErroSenha(''); };
  const confirmarSenha = () => {
    if (alvo && senhaTent === alvo.senha) {
      setUsuarioAtual(alvo);
      cancelarSenha();
      navigation.navigate('Inicio');
    } else {
      setErroSenha('Senha incorreta.');
    }
  };

  const cabecalho = (
    <View>
      <Text style={s.titulo}>Criar conta</Text>
      <CampoTexto rotulo="Nome *" value={nome} onChangeText={setNome} erro={erros.nome} placeholder="Seu nome" />
      <CampoTexto rotulo="E-mail *" value={email} onChangeText={setEmail} erro={erros.email}
        placeholder="voce@email.com" autoCapitalize="none" keyboardType="email-address" />
      <CampoTexto rotulo="Senha *" value={senha} onChangeText={setSenha} erro={erros.senha}
        placeholder="Mínimo 6 caracteres" secureTextEntry />
      <Botao titulo="Cadastrar" onPress={salvar} />
      {!!usuarioAtual && <Botao secundario titulo="Sair da conta" onPress={() => setUsuarioAtual(null)} />}
      <Text style={[s.titulo, { marginTop: 24 }]}>Usuários cadastrados</Text>
      {usuarios.length === 0 && <Text style={s.vazio}>Ainda não há usuários. Cadastre o primeiro acima.</Text>}
    </View>
  );

  return (
    <>
    <FlatList
      style={s.tela} contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
      data={usuarios} keyExtractor={(u) => u.id} ListHeaderComponent={cabecalho}
      renderItem={({ item }) => {
        const ativo = usuarioAtual && usuarioAtual.id === item.id;
        return (
          <TouchableOpacity style={[s.usuario, ativo && s.usuarioAtivo]} onPress={() => pedirSenha(item)}>
            <Text style={s.nome}>{item.nome}</Text>
            <Text style={s.email}>{ativo ? 'Usuário ativo' : 'Toque e digite a senha'} · {item.email}</Text>
          </TouchableOpacity>
        );
      }}
    />
    <ModalSenha
      usuario={alvo} senha={senhaTent} erro={erroSenha}
      onMudarSenha={setSenhaTent} onConfirmar={confirmarSenha} onCancelar={cancelarSenha}
    />
    </>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  vazio: { color: cores.suave },
  usuario: { backgroundColor: cores.superficie, padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: cores.borda },
  usuarioAtivo: { borderColor: cores.texto },
  nome: { color: cores.texto, fontSize: 16, fontWeight: 'bold' },
  email: { color: cores.suave, fontSize: 13, marginTop: 2 },
});
