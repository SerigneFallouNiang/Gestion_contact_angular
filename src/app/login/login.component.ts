import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isSignDivVisiable: boolean  = true;
  isSignUpSuccess: boolean = false; // Ajouté pour contrôler l'affichage du message de succès


  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router){}

  onRegister() {
    // debugger;
        // Récupère le formulaire et les utilisateurs stockés dans le localStorage
        const form = document.querySelector('#formRegister');
        const localUser = localStorage.getItem('angular17users');

   // Vérifie si des utilisateurs existent déjà dans le localStorage
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    
  
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    }

   // Mettre à jour la propriété pour afficher le message de succès
   this.isSignUpSuccess = true;
   this.isSignDivVisiable = false; // Masquer le formulaire après l'inscription
  }

  onLogin() {
    // debugger;
    const localUsers =  localStorage.getItem('angular17users');
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
      if(isUserPresent != undefined) {
        // alert("User Found...");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/contact-list');
      } else {
        alert("Inscrivez vous svp")
      }
    }
  }

}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}
