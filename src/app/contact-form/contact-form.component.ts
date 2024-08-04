import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  currentUser: any = null;
  isEditing: boolean = false;
  contact: Contact | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
    this.checkIfEditing();
  }

  checkIfEditing(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.isEditing = true;
      this.contact = this.getContactById(+contactId);
      if (this.contact) {
        this.contactForm.patchValue(this.contact);
      }
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

  getContactById(id: number): Contact | undefined {
    const contacts = this.getContacts();
    return contacts.find(c => c.id === id);
  }

  addOrUpdateContact(): void {
    const contacts = this.getContacts();
    const contactData = this.contactForm.value;

    if (this.isEditing && this.contact) {
      const index = contacts.findIndex(c => c.id === this.contact?.id);
      if (index !== -1) {
        contacts[index] = {
          ...this.contact,
          ...contactData,
          updatedAt: new Date(),
          updatedBy: this.currentUser.email
        };
      }
    } else {
      const newContact: Contact = {
        ...contactData,
        id: new Date().getTime(),
        createdAt: new Date(),
        createdBy: this.currentUser.email
      };
      contacts.push(newContact);
    }

    this.saveContacts(contacts);
    this.router.navigate(['/contact-list']);
  }


  cancel() {
    // Réinitialiser le formulaire
    this.contactForm.reset();
    
    // Naviguer vers la liste des contacts
    this.router.navigate(['/contact-list']);
  }
}
