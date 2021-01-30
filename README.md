# GS Labs -Vaga Java

### What is this repository for?

- repositorio contem o codigo para a vaga de desenvolverdor na GSlabs

### guia de start

Para iniciar o programa basta rodar:

```bash
docker-compose up
```

Para parar:

```bash
docker-compose down
```

Apos o docker compose finalizar

Acesasr o link: https://localhost:3000

### Banco de dados

Usando seu gerenciador de banco de dados favorito rodar as query a seguir:

Criar a table de usuarios:

```bash
create table db_usuario (
    id_usuario serial PRIMARY KEY,
	name VARCHAR ( 255 )  NOT NULL,
	password_hash VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL
);
```

Criar a tabela de produto:

```bash
create table db_produto (
    id_produto serial PRIMARY KEY,
	nome VARCHAR ( 255 )  NOT NULL,
	descri VARCHAR NOT NULL,
	valor VARCHAR ( 255 ) NOT NULL
);
```

### Funcionamento

O software permite que o usuario faça login, adicione produto, remova, lista e alterar

todas as api de backend so pode ser acessadas com um token valido que é gerado no login de usuarios cadastrados

## License

[MIT](https://choosealicense.com/licenses/mit/)
