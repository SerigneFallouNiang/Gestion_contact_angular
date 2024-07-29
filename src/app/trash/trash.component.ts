import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent implements OnInit {
  deletedContacts: Contact[] = [];
  loggedUser: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.loadDeletedContacts();
  }

  loadDeletedContacts() {
    const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.deletedContacts = allContacts.filter(
      (contact: Contact) => contact.createdBy === this.loggedUser.email && contact.isDeleted
    );
  }

  restoreContact(contactId: number): void {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const index = contacts.findIndex((contact: Contact) => contact.id === contactId);
    if (index !== -1) {
      contacts[index].isDeleted = false;
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.loadDeletedContacts();
    }
  }
}
