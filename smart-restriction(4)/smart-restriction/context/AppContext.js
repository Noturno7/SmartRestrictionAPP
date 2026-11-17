import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

export const AppContext = createContext();

// API RESTful: apenas GET (ler) e POST (salvar), como pede o documento
const listar = async (recurso) => {
  const resp = await fetch(`${API_URL}/${recurso}`);
  if (!resp.ok) throw new Error(`GET ${recurso}: ${resp.status}`);
  return resp.json();
};

const criar = async (recurso, corpo) => {
  const resp = await fetch(`${API_URL}/${recurso}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });
  if (!resp.ok) throw new Error(`o servidor recusou o POST em /${recurso} (erro ${resp.status})`);
  return resp.json();
};

// Dois recursos no MockAPI:
//  - usuarios : nome, email, senha
//  - registros: guarda pastas, notas e eventos, separados pelo campo "tipo"
//    pasta  -> titulo = nome da pasta, pastaId = pasta-mãe ('' = raiz)
//    nota   -> titulo, texto, prioridade, pastaId, negrito, italico, cor, tamanho
//    evento -> titulo, data
export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [pastas, setPastas] = useState([]);
  const [notas, setNotas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando | ok | erro
  const [falhas, setFalhas] = useState([]); // recursos que não puderam ser lidos

  // pasta principal (raiz) é gravada como 'raiz' para o servidor não confundir com campo vazio
  const converterPasta = (r) => ({ ...r, nome: r.titulo, paiId: r.pastaId === 'raiz' ? '' : (r.pastaId || '') });

  // GET: lê tudo do MockAPI
  const carregar = async () => {
    setStatus('carregando');
    const erros = [];
    const ler = async (recurso, guardar) => {
      try { guardar(await listar(recurso)); } catch (e) { erros.push(recurso); }
    };
    await Promise.all([
      ler('usuarios', setUsuarios),
      ler('registros', (lista) => {
        setPastas(lista.filter((r) => r.tipo === 'pasta').map(converterPasta));
        setNotas(lista.filter((r) => r.tipo === 'nota'));
        setEventos(lista.filter((r) => r.tipo === 'evento'));
      }),
    ]);
    setFalhas(erros);
    setStatus(erros.length ? 'erro' : 'ok');
  };

  useEffect(() => { carregar(); }, []);

  const donoId = usuarioAtual ? usuarioAtual.id : null;
  const minhasPastas = pastas.filter((p) => p.donoId === donoId);
  const minhasNotas = notas.filter((n) => n.donoId === donoId);
  const meusEventos = eventos.filter((e) => e.donoId === donoId);

  // POST: cada função salva no servidor e depois atualiza a lista local.
  // Os erros sobem (throw) para a tela mostrar a mensagem.
  const cadastrarUsuario = async ({ nome, email, senha }) => {
    const novo = await criar('usuarios', { nome, email, senha });
    setUsuarios((l) => [...l, novo]);
    setUsuarioAtual(novo);
    return novo;
  };

  const adicionarPasta = async ({ nome, paiId }) => {
    if (!usuarioAtual) return;
    const nova = await criar('registros', { tipo: 'pasta', donoId, titulo: nome, pastaId: paiId || 'raiz' });
    setPastas((l) => [...l, converterPasta({ ...nova, titulo: nome, pastaId: paiId || 'raiz' })]);
  };

  const adicionarNota = async ({ titulo, texto, prioridade, pastaId, negrito, italico, cor, tamanho }) => {
    if (!usuarioAtual) return;
    const nova = await criar('registros', {
      tipo: 'nota', donoId, titulo, texto, prioridade, pastaId, negrito, italico, cor, tamanho,
      criadoEm: new Date().toISOString(),
    });
    setNotas((l) => [nova, ...l]);
  };

  const adicionarEvento = async ({ titulo, data, hora }) => {
    if (!usuarioAtual) return;
    const novo = await criar('registros', { tipo: 'evento', donoId, titulo, data, hora, criadoEm: new Date().toISOString() });
    setEventos((l) => [...l, novo]);
  };

  return (
    <AppContext.Provider
      value={{
        status, falhas, carregar,
        usuarios, usuarioAtual, setUsuarioAtual, cadastrarUsuario,
        minhasPastas, adicionarPasta,
        minhasNotas, adicionarNota,
        meusEventos, adicionarEvento,
      }}>
      {children}
    </AppContext.Provider>
  );
}
