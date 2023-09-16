import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {}

  async ngOnInit(){
    await SplashScreen.hide();
  }
}
