import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICiudad } from 'src/app/interface/ciudad';
import { IParroquia } from 'src/app/interface/parroquia';
import { IPersonas } from 'src/app/interface/personas';
import { IProvincias } from 'src/app/interface/provincias';
import { PersonasService } from 'src/app/service/personas.service';

@Component({
  selector: 'app-set-personas',
  templateUrl: './set-personas.component.html',
  styleUrls: ['./set-personas.component.css']
})
export class SetPersonasComponent {
  titulo:string ="Registrar"

  public personas: IPersonas={
    idPersonas:0,
    nombrePersona:"",
    cedulaPersonas:"",
    idProvincia:0,
    nombreProvincia:"",
    idCiudad:0,
    nombreCiudad:"",
    idParroquia:0,
    nombreParroquia:""

  }
  public provincias: IProvincias[] = []
  public ciudad: ICiudad[] = []
  public parroquia: IParroquia[] = []

  public provinciaSelected:IProvincias={
    idProvincias:0,
    nombreProvincia:""
  }
  public ciudadSelected:ICiudad={
    idCiudad:0,
    nombreCiudad:""
  }
  public parroquiaSelected:IParroquia={
    idParroquia:0,
    nombreParroquia:""
  }
  constructor(
    private personaService: PersonasService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
    this.getProvincias();
    this.getCiudades();
    this.getParroquias();    
  }
  obtenerDatos() {
    if (localStorage.getItem("usuario")) {
      var datos = localStorage.getItem("usuario")
      this.personas = JSON.parse(datos!)
      this.titulo = "Actualizar"
    }
  }
  onKeyPressTexto(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[a-z A-Z]+$/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }
  onKeyPressNumero(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[0-9]+$/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }

  getProvincias() {
   
    this.provincias = []
    this.personaService.getProvincias().subscribe(resp => {
      this.provincias = resp
      console.log(resp)
    })
  }
  
  getCiudades(){
    this.ciudad=[]
    console.log(this.personas.idProvincia)
    this.personaService.getCiudadesById(this.personas.idProvincia).subscribe(resp=>{
      this.ciudad=resp
      console.log(resp)
    })
  }
  getParroquias(){
    this.parroquia=[]
    console.log(this.personas.idCiudad)
    this.personaService.getParroquiasById(this.personas.idCiudad).subscribe(resp=>{
      this.parroquia=resp
      console.log(resp)
    })
  }

  setPersonas() {
    
    if (this.personas.idPersonas == 0) {
      this.personaService.setPersonas(this.personas).subscribe(resp => {
        if (resp) {
          console.log(resp)
          this.matDialog.closeAll();
        } else {
          alert("No se pudo registrar")
        }
      });
    } else {
      this.personaService.updatePersonas(this.personas).subscribe(resp => {
        if (resp) {
          localStorage.removeItem("usuario");
          this.matDialog.closeAll();
        }
        else {
          alert("No se pudo editar la persona");
        }
      });
    
    this.matDialog.closeAll();
  }}
  dismissModal() {
    this.matDialog.closeAll();
  }
 
  
}
