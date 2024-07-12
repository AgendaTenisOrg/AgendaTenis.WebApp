export interface ObterHistoricoDePartidasResponse {
  partidas: Partida[];
  totalDeItens: number;
}

export interface Partida {
  id: string;
  desafianteId: number;
  desafianteNome: string | null;
  adversarioId: number;
  adversarioNome: string | null;
  dataDaPartida: Date;
  idCidade: number;
  nomeCidade: string;
  modeloDaPartida: ModeloPartidaEnumModel;
  statusConvite: StatusConviteEnumModel;
  statusPlacar: StatusPlacarEnumModel;
  vencedorId: number | null;
  placar?: Placar; // Adicione esta linha
}

export interface ModeloPartidaEnumModel {
  id: number;
  descricao: string;
}

export interface StatusConviteEnumModel {
  id: number;
  descricao: string;
}

export interface StatusPlacarEnumModel {
  id: number;
  descricao: string;
}

export interface Placar { // Adicione esta interface
  sets: {
    numeroSet: number;
    gamesDesafiante: number;
    gamesAdversario: number;
    tiebreakDesafiante: number | null;
    tiebreakAdversario: number | null;
  }[];
}
