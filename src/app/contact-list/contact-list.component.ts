import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../models/contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  loggedUser: any;
  searchQuery: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = allContacts.filter(
      (contact: Contact) => contact.createdBy === this.loggedUser.email
    );
  }

  filteredContacts(): Contact[] {
    if (!this.searchQuery) {
      return this.contacts;
    }

    const query = this.searchQuery.toLowerCase();

    return this.contacts.filter(contact =>
      contact.nom.toLowerCase().includes(query) ||
      contact.prenom.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.telephone.includes(query)
    );
  }


  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }
}
