import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  savingsStored:boolean = false
  alertActive:boolean = true

  alertMessage:string = ""

  savingsString:string = ""
  reduceString:string = ""

  constructor() {}

  ngOnInit(){

    this.getSavingsFromStorage()

  }

  async getSavingsFromStorage() {
    const ret = await Preferences.get({ key: 'savings' });
    const savings = ret.value || "0";

    if(savings === "0"){
      this.savingsStored = false
      this.alertActive = true
      this.alertMessage = "ENTER SAVINGS FIRST"
    }
    else{
      this.savingsString = String(savings)
      this.savingsStored = true
    }

  }

  enterNum(num:number){
    switch(this.savingsStored){
      case false:
        if(this.savingsString.length < 7){
          this.savingsString += String(num)
          this.alertActive = false
          this.alertMessage = ""
        }
        else{
          this.alertActive = true
          this.alertMessage = "MAX AMOUNT REACHED"
        }
        break
      
      case true:
        if(this.reduceString.length < 7){
          this.reduceString += String(num)
          this.alertActive = false
          this.alertMessage = ""
        }
        else{
          this.alertActive = true
          this.alertMessage = "MAX AMOUNT REACHED"
        }
        break
    }
  }

  clearNum(){
    switch(this.savingsStored){
      case false:
        this.savingsString = ""
        break
      
      case true:
        this.reduceString = ""
        break
    }
    this.alertActive = false
    this.alertMessage = ""
    
  }

  backNum(){
    switch(this.savingsStored){
      case false:
        this.savingsString = this.savingsString.slice(0, -1)

        if(this.savingsString.length < 7){
          this.alertActive = false
          this.alertMessage = ""
        }
        break

      case true:
        this.reduceString = this.reduceString.slice(0, -1)

        if(this.reduceString.length < 7){
          this.alertActive = false
          this.alertMessage = ""
        }
        break
    }
    

  }

  async setSavings(){
    await Preferences.set({
      key: 'savings',
      value: String(Number(this.savingsString))
    });

    this.alertActive = true
    this.alertMessage = "SAVINGS SET"
    this.savingsStored = true

    this.savingsString = String(Number(this.savingsString))
  }

  async reduceSavings(){
    if(Number(this.reduceString) <= Number(this.savingsString)){

      const newSavings = Number(this.savingsString) - Number(this.reduceString)

      this.savingsString = String(newSavings)

      await Preferences.set({
        key: 'savings',
        value: String(newSavings)
      });
  
      this.alertActive = true
      this.alertMessage = "AMOUNT DETUCTED"
      this.savingsStored = true

      this.reduceString = ""

      if(newSavings === 0){
        this.savingsStored = false
        this.alertActive = true
        this.alertMessage = "ENTER SAVINGS FIRST"
      }

    }
    else{
      this.alertActive = true
      this.alertMessage = "INSUFFICIENT SAVINGS"
    }
  }

}
