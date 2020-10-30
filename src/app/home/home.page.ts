import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensagens = [];
  mensagem: string = "";
  baseApi = 'http://localhost:8080/';
  sessao = null;

  constructor(
    private http: HttpClient
  ) {
    //Capturar token de sessão
    this.http.post(this.baseApi + 'createSession', {}, {})
      .subscribe((r) => {
        console.log('Sessão response', r);
        this.sessao = r['session'];
      })
  }

  enviar() {
    if (this.mensagem != '') {
      console.log('enviar mensagem');

      //Gravar mensagem do usuario
      this.mensagens.push({ texto: this.mensagem, de: 'user' });

      //Enviar para o bot e obter uma resposta
      this.http.post(this.baseApi + 'newMessage', { session: this.sessao, text: this.mensagem }, {})
        .subscribe((r) => {
          console.log('Mensagem response', r);
          //Gravar mensagem do bot
          this.mensagens.push({ texto: r['response'], de: 'bot' });

          //Limpar caixa de texto
          this.mensagem = "";
        })
    }
  }

}
