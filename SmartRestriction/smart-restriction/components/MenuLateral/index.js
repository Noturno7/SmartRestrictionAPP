import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AppContext } from '../../context/AppContext';
import styles from './styles';
import { LOGO } from '../../theme';

const ICONES = { Inicio: '🏠', Notas: '📝', Pastas: '📁', Agenda: '📅', Cadastro: '👤' };
const TITULOS = { Inicio: 'Início', Notas: 'Notas', Pastas: 'Pastas', Agenda: 'Agenda', Cadastro: 'Cadastro' };

export default function MenuLateral({ state, navigation }) {
  const { usuarioAtual, status, falhas, carregar, minhasNotas } = useContext(AppContext);
  const iniciais = usuarioAtual
    ? usuarioAtual.nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('')
    : '?';
  const textoStatus =
    status === 'ok' ? 'Tudo sincronizado'
    : status === 'carregando' ? 'Sincronizando...'
    : `Falha ao ler: ${falhas.join(', ')}`;

  return (
    <DrawerContentScrollView contentContainerStyle={styles.tudo}>
      <View>
        <View style={styles.marca}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.nomeApp}>Smart Restriction</Text>
        </View>
        <Text style={styles.secao}>SEU ESPAÇO</Text>
        {state.routes.map((rota, i) => {
          const ativo = state.index === i;
          return (
            <TouchableOpacity
              key={rota.key}
              style={[styles.item, ativo && styles.itemAtivo]}
              onPress={() => navigation.navigate(rota.name)}>
              <Text style={styles.icone}>{ICONES[rota.name]}</Text>
              <Text style={[styles.itemTxt, ativo && styles.itemTxtAtivo]}>{TITULOS[rota.name]}</Text>
              {rota.name === 'Notas' && minhasNotas.length > 0 && (
                <View style={styles.badge}><Text style={styles.badgeTxt}>{minhasNotas.length}</Text></View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View>
        <TouchableOpacity style={styles.sync} onPress={carregar}>
          <View style={[styles.ponto, status === 'erro' && styles.pontoErro]} />
          <View>
            <Text style={styles.syncTitulo}>{textoStatus}</Text>
            <Text style={styles.syncSub}>Toque para atualizar</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.perfil}>
          <View style={styles.avatar}><Text style={styles.avatarTxt}>{iniciais}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.perfilNome} numberOfLines={1}>{usuarioAtual ? usuarioAtual.nome : 'Visitante'}</Text>
            <Text style={styles.perfilEmail} numberOfLines={1}>{usuarioAtual ? usuarioAtual.email : 'Faça o cadastro'}</Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
