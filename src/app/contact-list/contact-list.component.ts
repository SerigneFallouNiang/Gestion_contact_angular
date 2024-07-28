import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactsListComponent implements OnInit {
  router: any;
  deleteContact(contactId: string) {
    const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contactIndex = allContacts.findIndex((contact: any) => contact.id === contactId);
    if (contactIndex !== -1) {
      allContacts[contactIndex].etat = 'deleted';
      localStorage.setItem('contacts', JSON.stringify(allContacts));
      this.contacts = this.contacts.filter(contact => contact.id !== contactId);
    }
  }
  contacts: any[] = [];
  loggedUser: any;


  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = allContacts.filter(
      (contact: any) => contact.createdBy === currentUser.email
    );
  }
}



