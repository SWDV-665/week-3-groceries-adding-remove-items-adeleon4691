import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List";

//items has been left blank so that the user will start with a fresh list
  items =[
    
  ]
  constructor(public NavCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  //this section is for the 'Done' box and will remove an item after the user has gotten the item
  async removeItem(item, index){
    console.log("Removing -", item, index);

      const toast = await this.toastCtrl.create({
        message: 'Removing ' + item.name,
        duration: 2000
      });
      toast.present();

      this.items.splice(index, 1);

  }

  //this section is for the 'Add' button at the bottom of the screen
  //Users can click this button to add items to their grocery list
  addItem(){
    console.log("Adding item");
    //Prompt information found below
    this.AddItemPrompt();
  }

  //after user clicks 'Add' button this is the information for the prompt that will appear on the screen
  async AddItemPrompt() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Adding Item',
      //inputs for the user are for the name of the grocery and quantity
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity'
        }
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          //Once user clicks 'Ok' then the item will be pushed to the end of their grocery list
          text: 'Ok',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.items.push(item);
          }
        }
      ]
    });

    await alert.present();
  }
}
