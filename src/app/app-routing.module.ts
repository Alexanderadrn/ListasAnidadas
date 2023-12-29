import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';
import { SetPersonasComponent } from './components/set-personas/set-personas.component';

const routes: Routes = [
  {path:"Personas",component:PersonasComponent},
  {path:"SetPersoans",component:SetPersonasComponent},
  {path:"**",redirectTo:"Personas",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
