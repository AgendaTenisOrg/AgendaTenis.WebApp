export interface BuscarAdversariosResponse {
    adversarios: Adversario[];
    totalDeItens: number;
  }
  
  export interface Adversario {
    id: number;
    usuarioId: number;
    nomeCompleto: string;
    pontuacao: number;
    categoria: Categoria;
  }
  
  export interface Categoria {
    id: number;
    descricao: string;
  }
  
  export enum CategoriaEnum {
    Atp = 1,
    Avancado = 2,
    Intermediario = 3,
    Iniciante = 4
  }
  