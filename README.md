# Gerenciador de produtos

Exemplo de gerenciador de produtos simples com autenticação em node.js

### **Guia de início**

---

- Para rodar o porgrama deve-se ter instalado na máquina o [docker e docker compose](https://docs.docker.com/get-docker/)

- Para iniciar o programa basta rodar:

```bash
docker-compose up
```

- Para parar:

```bash
docker-compose down
```

Após o docker compose finalizar:

- Acessar o link: http://localhost:3000

### **Banco de dados**

---

Usando seu gerenciador de banco de dados favorito rodar as query a seguir:

Credencias de acesso ao db Postgres:

- user: `postgres`
- database: `postgres`
- password: `postgres`
- host: `localhost`
- port: `5432`

Alguns exemplos de gerenciadores:

- [DBeaver Community](https://dbeaver.io/);

- [Beekeeper Studio](https://www.beekeeperstudio.io/);

**Criar a tabela de usuários:**

```bash
create table db_usuario (
    id_usuario serial PRIMARY KEY,
	name VARCHAR ( 255 )  NOT NULL,
	password_hash VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL
);
```

**Criar a tabela de produtos:**

```bash
create table db_produto (
    id_produto serial PRIMARY KEY,
	nome VARCHAR ( 255 )  NOT NULL,
	descri VARCHAR NOT NULL,
	valor VARCHAR ( 255 ) NOT NULL
);
```

### **Funcionamento**

---

O software permite que o usuario faça:

- Login;
- Criar usuários;
- Listar produtos cadastrados na base da dados;
- Adicionar produtos;
- Alterar dados dos produtos;
- Remover produtos;

OBS: as APIs são autenticadas por tokens jwt.

## License

[MIT](https://choosealicense.com/licenses/mit/)
