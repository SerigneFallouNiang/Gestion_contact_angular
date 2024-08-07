export interface Contact {
  isDeleted: boolean;
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  etat: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string;
}
