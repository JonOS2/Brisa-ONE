
##  Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Java 21** ou superior ([Download JDK](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.8+** ([Download Maven](https://maven.apache.org/download.cgi))
- **PostgreSQL 12+** ([Download PostgreSQL](https://www.postgresql.org/download/))
- **Git** ([Download Git](https://git-scm.com/downloads))

##  Configuração do Banco de Dados

1. Instale e inicie o PostgreSQL
2. Crie um banco de dados chamado `brisa`:

```sql
CREATE DATABASE brisa;
```

3. Configure as credenciais do banco no arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/brisa
spring.datasource.username=postgres
spring.datasource.password=root
```

> **Nota:** Altere `username` e `password` conforme suas configurações locais do PostgreSQL.

##  Configuração de Email (Opcional)

Para funcionalidades de envio de email (verificação, recuperação de senha), configure no `application.properties`:

```properties
spring.mail.username=seu-email@gmail.com
spring.mail.password=sua-senha-de-app
spring.mail.from=seu-email@gmail.com
```

> **Importante:** Use uma senha de aplicativo do Gmail, não sua senha normal.

##  Como Rodar o Projeto

### Opção 1: Usando Maven Wrapper (Recomendado)

No diretório raiz do projeto, execute:

**Windows (PowerShell/CMD):**
```powershell
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Opção 2: Usando Maven Instalado

```bash
mvn clean install
mvn spring-boot:run
```

### Opção 3: Executando o JAR

```bash
mvn clean package
java -jar target/brisa-0.0.1-SNAPSHOT.jar
```

O servidor estará disponível em: `http://localhost:8082`

##  Tecnologias Utilizadas

- **Spring Boot 3.1.1** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Security** - Autenticação e autorização
- **PostgreSQL** - Banco de dados
- **Lombok** - Redução de código boilerplate
- **JWT (java-jwt)** - Tokens de autenticação
- **Spring Mail** - Envio de emails
- **Maven** - Gerenciamento de dependências

##  Estrutura do Projeto

```
src/main/java/com/example/brisa/
 config/           # Configurações (CORS, Security, etc)
 controllers/      # Controladores REST
 dtos/            # Data Transfer Objects
 enums/           # Enumerações
 exceptions/      # Tratamento de exceções
 infra/           # Infraestrutura (segurança, etc)
 models/          # Entidades JPA
 repositories/    # Repositórios JPA
 services/        # Lógica de negócio
 seeders/         # Dados iniciais
```

Exemplo de uso:

```bash
export JWT_SECRET=minha-chave-super-secreta
java -jar target/brisa-0.0.1-SNAPSHOT.jar
```

##  Notas Adicionais

- O projeto usa **Hibernate DDL auto-update**, que criará automaticamente as tabelas no banco
- A porta padrão é **8082** (pode ser alterada em `application.properties`)
- O servidor está configurado com `server.address=0.0.0.0`, o que significa que ele aceita conexões de qualquer interface de rede da máquina (localhost, IP local da rede, etc.)


##  Troubleshooting

### Erro de conexão com PostgreSQL:
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais em `application.properties`
- Certifique-se de que o banco `brisa` foi criado

### Erro de porta já em uso:
- Altere a porta em `application.properties`: `server.port=8083`

### Erro de compilação do Lombok:
- Certifique-se de que o Lombok está habilitado na sua IDE
- Execute: `mvn clean install -U`

##  Licença

Este projeto está sob a licença MIT.
