import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contact: Contact = {
    id: Date.now(),
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    etat: 'actif',
    createdAt: new Date(),
    createdBy: '',
    updatedAt: undefined,
    updatedBy: undefined,
    description: ''
  };
  currentUser: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  getContacts(): any[] {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  }

  saveContacts(contacts: any[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addContact(): void {
    const contacts = this.getContacts();
    const newContact = {
      ...this.contact,
      id: new Date().getTime().toString(), // Générer un ID unique basé sur l'heure actuelle
      createdAt: new Date().toISOString(),
      createdBy: this.currentUser.id
    };
    contacts.push(newContact);
    this.saveContacts(contacts);
    this.router.navigate(['/contact-list']); // Rediriger vers la liste des contacts après l'ajout
    console.log(contacts)
  }
}
