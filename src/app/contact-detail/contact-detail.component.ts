import { Component, Input } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CommonModule, UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact: Contact | null = null ;

}
