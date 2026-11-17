export const DIAS = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO'];
export const MESES = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
export const MES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const dois = (n) => String(n).padStart(2, '0');

export const saudacao = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
};

export const chaveHoje = () => {
  const d = new Date();
  return `${d.getFullYear()}${dois(d.getMonth() + 1)}${dois(d.getDate())}`;
};

// "DD/MM/AAAA" -> "AAAAMMDD" (ou '' se a data for inválida)
export const chaveEvento = (data) => {
  if (typeof data !== 'string' || data.length !== 10) return '';
  const [d, m, a] = data.split('/');
  return `${a}${m}${d}`;
};

// Data ISO -> "Hoje, 09:42" / "Ontem, 18:20" / "12 Nov, 14:10"
export const rotuloData = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const hora = `${dois(d.getHours())}:${dois(d.getMinutes())}`;
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);
  if (d.toDateString() === hoje.toDateString()) return `Hoje, ${hora}`;
  if (d.toDateString() === ontem.toDateString()) return `Ontem, ${hora}`;
  return `${d.getDate()} ${MES_ABREV[d.getMonth()]}, ${hora}`;
};
