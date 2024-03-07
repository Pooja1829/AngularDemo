import { Component } from '@angular/core';
import { Account } from '../../model/account';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adda-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {

  newAccount: Account = new Account();
  message: string = "";
  errorMessage: string = "";
  success: string ="";

  constructor(private accountService: AccountService) { }

  addAccount() {
    console.log(this.newAccount);
    this.accountService.addNewAccount(this.newAccount)
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this.message = "Account Added.";
            this.errorMessage = "";
          },
          error: (err) => {
            console.log(err);
            // this.errorMessage="Could't add Account";/
            if (err.status == "0")
              this.errorMessage = " Network error, please try again later."
            else
              this.errorMessage = err.error;

            this.message = "";
            this.success = "success";
          }
        }
      );
  }
}