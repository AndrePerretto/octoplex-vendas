import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public feeds: Object;
  constructor(private http: HttpClient) { 
    
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

    this.http.get(`${ "http://www.octoplex.com.br:3000/api/clientes/listarclientes"}`, httpOptions)
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
}
