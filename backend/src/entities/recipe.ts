export interface Recipe {
  id: number;
  id_usuarios: number;
  id_categorias: number;
  categoria?: string;
  nome: string;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  modo_preparo: string;
  ingredientes: string | null;
}
