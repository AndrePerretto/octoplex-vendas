import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-pedidovendas',
  templateUrl: './pedidovendas.page.html',
  styleUrls: ['./pedidovendas.page.scss'],
})
export class PedidovendasPage implements OnInit {
  public clientes: Object;
  public produtos: Object;
  public pedidoprodutos: Object; 

  constructor(private http: HttpClient, private camera: Camera ) { }

  scan() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo

    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });
  }
 
  ngOnInit() {
    localStorage.setItem("pedidoVendasProdutos",null); 
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
            this.clientes = data;
            localStorage.setItem("clientes",JSON.stringify(data)); 
          }
        }            
      },
      erro => {
        this.clientes = JSON.parse(localStorage.getItem("clientes")); 
        if(erro.status == 404) {
          console.log('clientes não localizado.');
        }
      }
    );
  }
  
  listarProdutos(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cnpj': localStorage.getItem("cnpj")
      })
    }

    this.http.get(`${ "https://www.octoplex.com.br:3005/api/produtos/listarprodutos"}`, httpOptions)
    .subscribe(
      data => {
        console.log(data)
        if(data){ 
          if(data[0]){
            this.produtos = data;
            localStorage.setItem("produtos",JSON.stringify(data)); 
          }
        }            
      },
      erro => {
        this.produtos = JSON.parse(localStorage.getItem("produtos")); 
        if(erro.status == 404) {
          console.log('produtos não localizados.');
        }
      }
    );
  }

  abaClientes(){
    var elems = document.getElementsByClassName('tabs');
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['style'].display = 'none';
    }
   
    var elem = document.getElementById("clientes");
    elem.style.display = 'block';
 
    this.listarClientes();
  }

  abaProdutos(){
    var elems = document.getElementsByClassName('tabs');
    for (let index = 0; index < elems.length; index++) {
      const element = elems[index];
      console.log(element)
      element['style'].display = 'none';
    }
   
    var elem = document.getElementById("produtos");
    elem.style.display = 'block';
 
    this.listarProdutos();
  }

  selecionarCliente(id: String){
    var dados = JSON.parse(localStorage.getItem("clientes")).find(x => x.id === id);
    if(dados){
      (document.getElementById("nomeCliente") as HTMLInputElement).value = dados.nm_cliente;
      (document.getElementById("idCliente") as HTMLInputElement).value = dados.id;
    }

    var elem = document.getElementById("clientes");
    elem.style.display = 'none';
    
    var elem = document.getElementById("cliente");
    elem.style.display = 'block';
  }
  
  selecionarProduto(id: String){
    var dados = JSON.parse(localStorage.getItem("produtos")).find(x => x.id === id);
    var pedidoVendasProdutos = JSON.parse(localStorage.getItem("pedidoVendasProdutos"))
    if(dados){
      var aped = [];
      if(pedidoVendasProdutos){
        aped = pedidoVendasProdutos;
      }
      aped.push(dados);
      this.pedidoprodutos = aped;
      localStorage.setItem("pedidoVendasProdutos",JSON.stringify(aped)); 
    }

    var elem = document.getElementById("clientes");
    elem.style.display = 'none';
    
    var elem = document.getElementById("produtos");
    elem.style.display = 'none';

    var elem = document.getElementById("cliente");
    elem.style.display = 'block';
  }
 

}
