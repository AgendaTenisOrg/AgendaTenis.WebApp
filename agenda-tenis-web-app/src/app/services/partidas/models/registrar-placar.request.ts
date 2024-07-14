export interface RegistrarPlacarRequest {
    id: string;
    vencedorId: number;
    sets: {
      numeroSet: number;
      gamesDesafiante: number;
      gamesAdversario: number;
      tiebreakDesafiante: number | null;
      tiebreakAdversario: number | null;
    }[];
  }