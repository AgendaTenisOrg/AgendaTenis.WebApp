export interface ObterHistoricoDePartidasResponse {
    partidas: Partida[];
    totalDeItens: number;
  }
  
  export interface Partida {
    id: string;
    desafianteId: number;
    desafianteNome: string;
    adversarioId: number;
    adversarioNome: string;
    dataDaPartida: Date;
    idCidade: number;
    nomeCidade: string;
    modeloDaPartida: ModeloPartidaEnumModel;
    statusConvite: StatusConviteEnumModel;
    statusPlacar?: StatusPlacarEnumModel;
    vencedorId?: number;
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