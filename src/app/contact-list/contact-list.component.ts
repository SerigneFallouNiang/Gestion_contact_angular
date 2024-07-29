import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  loggedUser: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.loadContacts();
  }

  loadContacts() {
    const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = allContacts.filter(
      (contact: Contact) => contact.createdBy === this.loggedUser.email && !contact.isDeleted
    );
  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

  removeContact(contactId: number): void {
    // 1. Récupération de tous les contacts depuis le localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  
    // 2. Recherche de l'index du contact à supprimer dans le tableau des contacts
    const index = contacts.findIndex((contact: Contact) => contact.id === contactId);
  
    // 3. Si le contact est trouvé (index n'est pas égal à -1)
    if (index !== -1) {
      // 4. Marquer le contact comme supprimé en définissant sa propriété isDeleted à true
      contacts[index].isDeleted = true;
  
      // 5. Sauvegarder les modifications dans le localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
  
      // 6. Recharger la liste des contacts actifs en appelant la méthode loadContacts
      this.loadContacts();
    }
  }
  

  restoreContact(contactId: number): void {
    // 1. Récupération de tous les contacts depuis le localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  
    // 2. Recherche de l'index du contact à restaurer dans le tableau des contacts
    const index = contacts.findIndex((contact: Contact) => contact.id === contactId);
  
    // 3. Si le contact est trouvé (index n'est pas égal à -1)
    if (index !== -1) {
      // 4. Marquer le contact comme non supprimé en définissant sa propriété isDeleted à false
      contacts[index].isDeleted = false;
  
      // 5. Sauvegarder les modifications dans le localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
  
      // 6. Recharger la liste des contacts actifs en appelant la méthode loadContacts
      this.loadContacts();
    }
  }
  
}
