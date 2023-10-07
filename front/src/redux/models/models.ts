export interface Auth {
  user: { name: string; email: string; role: string };
  token: string;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}

export interface DataModel {
  _id?: string;
  Occurrences: number | string;
  "Numéro d'appel": number | string;
  Type: string;
  "Status WF": string;
  "Date création": string;
  "Date affectation": string;
  Échéance: string;
  "Date de cloture WF": string;
  Fournisseur: string;
  "Nom Travailleur": string;
  "XY avec": string;
  "Position Tech": string;
  "OT Créé par": string;
  "OT Edité par": string;
  "OT Edité le": string;
  "Durée Attribution": number | string;
  "Durée Travail": number | string;
  "Durée Exécution": number | string;
}
