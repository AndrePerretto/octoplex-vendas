import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ToastController, AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public feeds: Object;
  constructor(private http: HttpClient, public toast: ToastController, public alertController: AlertController) { 
    
  }

  ngOnInit() {
    this.listarClientes();
  }

  deslogar() {
    window.location.href = "/login";
  }


  listarClientes(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cnpj': localStorage.getItem("cnpj")
      })
    }

    this.http.get(`${ "https://www.octoplex.com.br:3005/api/clientes/listarclientes"}`, httpOptions)
    .subscribe(
      data => {
        console.log(data)
        if(data){ 
          if(data[0]){
            this.feeds = data;
            localStorage.setItem("clientes",JSON.stringify(data)); 
          }
        }            
      },
      erro => {
        this.feeds = JSON.parse(localStorage.getItem("clientes")); 
        if(erro.status == 404) {
          console.log('clientes não localizado.');
        }
      }
    );
  }

  buscarCliente(id: String){ 
    var dados = JSON.parse(localStorage.getItem("clientes")).find(x => x.id === id);
    if(dados){
      for (const [key, value] of Object.entries(dados)) {
        console.log(key, value);
        var eleme = document.getElementById(key);
        if(eleme && value !== null){ 
          (document.getElementById(key) as HTMLInputElement).value= value.toString();
        }
      }
    }
    this.abaDados();
  }

  buttonClick(){
    alert("OK")
  }

  abaClientes(){
    window.location.href = "/clientes";
  }

  abaDados(){
    var elems = document.getElementsByClassName('tabs');
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['style'].display = 'none';
    }
   
    var elem = document.getElementById("dados");
    elem.style.display = 'block';

    var elemTool = document.getElementById("toolbarCrud");
    elemTool.style.display = 'block';
  }

  abaEndereco(){
    var elems = document.getElementsByClassName('tabs');
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['style'].display = 'none';
    }
   
    var elem = document.getElementById("endereco");
    elem.style.display = 'block';
  }

  abaContato(){
    var elems = document.getElementsByClassName('tabs');
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['style'].display = 'none';
    }
   
    var elem = document.getElementById("contato");
    elem.style.display = 'block';
  }

  novo(){
    var elems = document.getElementsByClassName('input'); 
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['value'] = "";
    }
  }

  deletar(){
    this.showToastQuestionDeletar()
  }

  deletarConfirmado(){
    var elems = document.getElementById("id"); 

    if(elems){
      var id = elems['value'];

      if(id){
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'cnpj': localStorage.getItem("cnpj")
          })
        }
    
        this.http.get(`${ "https://www.octoplex.com.br:3005/api/clientes/delete/" + id}`, httpOptions)
        .subscribe(
          data => {
            this.abaClientes();         
          },
          erro => {            
            if(erro.status == 404) {
              this.showToast("Não foi possível excluir este cliente. Tente novamente mais tarde.");
            }
          }
        );
      }
    }   
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

  showToastQuestionDeletar() { 
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        message: 'Deseja deletar este cliente?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              this.deletarConfirmado();
            }
          }
        ]
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
   
  }


  gravar(){
    this.showToastQuestionSave()
  }

  gravarConfirmado(){
    var postData = {};
    var elems = document.getElementsByClassName('input'); 
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      postData[element['id']] = element['value'];      
    }


    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cnpj': localStorage.getItem("cnpj")
      })
    }

    this.http.post(`${ "https://www.octoplex.com.br:3005/api/clientes/gravar"}`, postData, httpOptions)
    .subscribe(
      data => {
        this.abaClientes();         
      },
      erro => {            
        if(erro.status == 404) {
          this.showToast("Não foi possível gravar este cliente. Tente novamente mais tarde.");
        }
      }
    );
  }

  showToastQuestionSave() { 
    this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Deseja gravar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.gravarConfirmado();
          }
        }
      ]
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
 
}

}
