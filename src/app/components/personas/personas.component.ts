import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICiudad } from 'src/app/interface/ciudad';
import { IParroquia } from 'src/app/interface/parroquia';
import { IPersonas } from 'src/app/interface/personas';
import { IProvincias } from 'src/app/interface/provincias';
import { PersonasService } from 'src/app/service/personas.service';
import { SetPersonasComponent } from '../set-personas/set-personas.component';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  public personas: IPersonas[] = []
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
    //this.getPersonas();
    this.getProvincias();
    this.getCiudades();
    this.getParroquias();
    this.getPersonasbyFiltros();
  }
  getPersonas() {
    this.personas = []
    this.personaService.getPersonas().subscribe(resp => {
      this.personas = resp
      console.log(resp)
    })
  }
  registrarPersonas() {
    
    const dialogRef = this.matDialog.open(SetPersonasComponent, {
      width: '600px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getPersonasbyFiltros()
      
    });
  }
  actualizarPersonas(empleados: any) {
    localStorage.setItem("usuario", JSON.stringify(empleados));
    const dialogRef = this.matDialog.open(SetPersonasComponent, {
      width: '600px',
      panelClass: 'fondo',
      data: null
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getPersonasbyFiltros()
    });
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
    console.log(this.provinciaSelected.idProvincias)
    this.personaService.getCiudadesById(this.provinciaSelected.idProvincias).subscribe(resp=>{
      this.ciudad=resp
      console.log(resp)
    })
  }
  getParroquias(){
    this.parroquia=[]
    console.log(this.ciudadSelected.idCiudad)
    this.personaService.getParroquiasById(this.ciudadSelected.idCiudad).subscribe(resp=>{
      this.parroquia=resp
      console.log(resp)
    })
  }
  getPersonasbyFiltros(){
    
    this.personas=[]
    this.personaService.getPersonasbyFiltros(this.provinciaSelected.idProvincias,this.ciudadSelected.idCiudad,this.parroquiaSelected.idParroquia).subscribe(resp=>{
      this.personas=resp
      console.log(resp)
   })
  }
  openConfirmationDialog(empleado: IPersonas): void {
    const dialogRef = this.matDialog.open(ConfirmacionComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de eliminar el usuario seleccionado?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.personaService.deletePersonas(empleado.idPersonas).subscribe(resp => {
          if (resp) {
            alert("Se elmino correctamente");
            this.ngOnInit();
          } else { alert("No se pudo eliminar la persona") }
        });
        console.log('Usuario confirmó');
      } else {
        console.log('Usuario canceló');
      }
    });
  }

  limpiarDatos(){
    if(this.provinciaSelected.idProvincias!=0 && this.ciudadSelected.idCiudad!=0 &&this.parroquiaSelected.idParroquia!=0){
      this.provinciaSelected.idProvincias=0;
      this.ciudadSelected.idCiudad=0;
      this.parroquiaSelected.idParroquia=0;
      this.getPersonasbyFiltros();
      }
  }

}
