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
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const index = contacts.findIndex((contact: Contact) => contact.id === contactId);
    if (index !== -1) {
      contacts[index].isDeleted = true;
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.loadContacts();
    }
  }

  restoreContact(contactId: number): void {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const index = contacts.findIndex((contact: Contact) => contact.id === contactId);
    if (index !== -1) {
      contacts[index].isDeleted = false;
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.loadContacts();
    }
  }
}
