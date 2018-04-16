
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import { ViajesService } from './viajes.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']

})
export class ViajesComponent {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  private viajesService: ViajesService;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, viajesService: ViajesService) {
    this.viajesService = viajesService;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      archivo: [null, Validators.required]
    });
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('archivo').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    console.log(formModel);
    this.sendInformation(formModel.cedula, formModel.archivo.value);

  }

  clearFile() {
    if (this.form.get('archivo') != null) {
      this.form.get('archivo').setValue(null);
      this.fileInput.nativeElement.value = '';
    }
  }
  private downloadFile(data: any) {

    const blob = new Blob([atob(data)], { type: 'application/octet-stream' });
    var reader = new FileReader();
    reader.onloadend = function (e) {
      window.open(reader.result);
    }
    reader.readAsDataURL(blob);

  }

  private sendInformation(cedula: string, archivo: string) {
    console.log('Enviando el archivo.');
    this.viajesService.calcularViajes(cedula, archivo).subscribe(
      resp => {
        if (resp) {
          console.log(resp);
          console.log(JSON.stringify(resp));
          
          this.downloadFile(resp.file);
        }
      },
      error => {
        console.log('Error enviando la petición' + JSON.stringify(error.error));

        alert("Ocurrio un error! Ver el log.")


      }
    );
  }
}