import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [ 
    { title: 'Dashboard', url: '/folder/Dashboard', icon: 'bar-chart' },
    { title: 'Clientes', url: 'clientes', icon: 'person-add' },
    { title: 'Pedido de Vendas', url: '/pedidovendas', icon: 'bag' },
    { title: 'Lista de Pedidos', url: '/folder/ListaPedidos', icon: 'list' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  ngOnInit() { 
    (<HTMLInputElement>document.getElementById('username')).innerHTML = localStorage.getItem("username");
    (<HTMLInputElement>document.getElementById('tipo')).innerHTML = localStorage.getItem("tipo");
    (<HTMLInputElement>document.getElementById('foto')).src = localStorage.getItem("foto");

    
  }
}
