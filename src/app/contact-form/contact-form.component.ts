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
  styleUrls: ['./contact-form.component.css']
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
      this.router.navigate(['/login']);
    }
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addContact(): void {
    if (this.currentUser) {
      const contacts = this.getContacts();
      const newContact: Contact = {
        ...this.contact,
        id: new Date().getTime(), 
        createdAt: new Date(),
        createdBy: this.currentUser.email
      };
      contacts.push(newContact);
      this.saveContacts(contacts);
      this.router.navigate(['/contact-list']);
    } else {
      console.error('Utilisateur non connecté');
    }
  }
}
