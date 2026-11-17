import React from 'react';
import { Modal, View, Text } from 'react-native';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import styles from './styles';

export default function ModalSenha({ usuario, senha, erro, onMudarSenha, onConfirmar, onCancelar }) {
  return (
    <Modal visible={!!usuario} transparent animationType="fade" onRequestClose={onCancelar}>
      <View style={styles.fundo}>
        <View style={styles.caixa}>
          <Text style={styles.titulo}>Entrar como {usuario ? usuario.nome : ''}</Text>
          <Text style={styles.texto}>Digite a senha para acessar as anotações deste usuário.</Text>
          <CampoTexto rotulo="Senha" value={senha} onChangeText={onMudarSenha} erro={erro} secureTextEntry autoCapitalize="none" />
          <Botao titulo="Entrar" onPress={onConfirmar} />
          <Botao titulo="Cancelar" secundario onPress={onCancelar} />
        </View>
      </View>
    </Modal>
  );
}