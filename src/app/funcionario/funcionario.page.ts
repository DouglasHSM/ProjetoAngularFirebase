import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage {

  isLoading: boolean = false;
  funcionarios: any;

  constructor(){
    this.getFuncionarios()
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/douglas/EndpointsExercicio/listar_funcionarios.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios=response['funcionarios']
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(codigo:any){
    this.isLoading = true;
    fetch('http://localhost/douglas/EndpointsExercicio/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ id: codigo})
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

}
