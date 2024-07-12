# AgendaTenis

![Topologia da aplicação](./imagens/Raquete.PNG)
Fonte: [standret](https://br.freepik.com/fotos-gratis/uma-raquete-de-tenis-e-uma-bola-de-tenis-nova-em-uma-quadra-recem-pintada_10138885.htm#query=raquete%20tenis&position=2&from_view=keyword&track=ais)

## Índice

- [Sobre](#sobre)
- [Features](#features)
- [Valores de domínio](#valores_dominio)
- [Descrição técnica do sistema](#descricao_tecnica)
- [Como executar](#como_executar)
- [Exemplo de uso da API](#exemplo_uso)
- [Considerações sobre o projeto](#consideracoes)

## Sobre<a name = "sobre"></a>

Agenda Tênis é uma aplicação web na qual tênista de todos os níveis podem se cadastrar e encontrar adversários para agendar partidas.


## Descrição técnica
### Topologia da aplicação
![Topologia da aplicação](./imagens/topologia.PNG)

## Como executar <a name = "como_executar"></a>
1. git clone {repourl}
2. cd .\AgendaTenis\
3. docker-compose up

Observação: É um pré-requisito que você tenha o docker instalado em sua máquina

## Considerações sobre o projeto <a name = "consideracoes"></a>
1. Hoje só é possível convidar 1 jogador para a partida, ou seja, o sistema ainda não suporta partidas de duplas
2. Na feature convidar para jogar, o sistema ainda não valida o valor informado em AdversarioId.
    No futuro vou criar esta validação, mas por enquanto **é muito importante informar o UsuarioId do seu adversario e não o JogadorId**. 
    O UsuarioId do seu adversario pode ser obtido em Buscar Adversarios.
3. Ainda não criei testes de unidade. É algo que está no backlog.
4. No projeto AgendaTenis.Core.Identity, criei uma implementação bastante simples de cadastro de usuários. No futuro será interessante melhorar esta implementação, utilizando bibliotecas robustas como o Microsoft.AspNetCore.Identity que conta com um modelo de dados bastante completo para autenticação e autorização de usuário.
5. Inicialmente eu ia utilizar o projeto AgendaTenis.Workers.EventBus para ser o worker da aplicação e consumir mensagens do RabbitMQ, mas não deu tempo de configurar ele para rodar dentro do container docker.\
    Então criei um worker com a mesma funcionalidade dentro do projeto AgendaTenis.WebApi chamado PlacarConfirmadoWorker.\
    Observa-se que não excluí o projeto AgendaTenis.Workers.EventBus, mas ele vai ficar inativo por enquanto.
6. Seria interessante criar uma interface de usuário para os tenistas utilizarem o sistema. Talvez um aplicativo mobile ou uma Web UI.

