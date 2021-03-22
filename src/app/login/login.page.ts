import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ToastController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

 
export class LoginPage implements OnInit {  
  
  constructor(private http: HttpClient, public toast: ToastController ) { }

  ngOnInit() {
  }

  logar() { 
    var cnpj = (<HTMLInputElement>document.getElementById('cnpj')).value; 
    var login = (<HTMLInputElement>document.getElementById('login')).value; 
    var senha = (<HTMLInputElement>document.getElementById('senha')).value;  
    // Http Options
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cnpj': cnpj
      })
    }

    this.http.get(`${ "https://www.octoplex.com.br:3005/api/administrador/login/" + login + "/" + senha  }`, httpOptions)
    .subscribe(
      data => {
        if(data){ 
          if(data[0]){
              localStorage.setItem("username", data[0].nm_nome);
              localStorage.setItem("userid", data[0].id);
              localStorage.setItem("cnpj", cnpj);

              localStorage.setItem("tipo", data[0].nm_tipousuario);
              localStorage.setItem("foto", data[0].img_foto);
              
              window.location.href = "/folder/Dashboard";
              
          }else{                      
            var message = 'Login ou senha não localizado!';
            this.showToast(message);         
          }  
        }else{                  
          var message ='Login ou senha não localizado!';
          this.showToast(message); 
        }
            
      },
      erro => {
        if(erro.status == 404) {
          console.log('Produto não localizado.');
        }
      }
    );

    //window.location.href = "/folder/Dashboard";
  }
 
  showToast(mensagem) {
    this.toast.create({
      message: mensagem,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
}
