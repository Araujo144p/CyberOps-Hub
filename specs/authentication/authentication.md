# Especificação de Autenticação

## 1. Objetivo

Implementar o cadastro de usuários, o login e a autenticação baseada em tokens JWT na API do CyberOps Hub.

## 2. Requisitos funcionais

- RF-01: O sistema deve permitir o cadastro de usuários com nome, e-mail e senha.
- RF-02: A API deve rejeitar dados de cadastro inválidos.
- RF-03: Os endereços de e-mail devem ser normalizados e únicos.
- RF-04: As senhas devem ser armazenadas como hashes seguros, nunca em texto puro.
- RF-05: O sistema deve permitir a autenticação por e-mail e senha.
- RF-06: Após uma autenticação bem-sucedida, a API deve retornar um token JWT.
- RF-07: Credenciais inválidas devem resultar em falha de autenticação.
- RF-08: As rotas de incidentes devem exigir um token JWT válido.
- RF-09: Os hashes das senhas nunca devem ser retornados nas respostas da API.
- RF-10: O sistema deve disponibilizar uma rota para consultar os dados do usuário autenticado.

## 3. Requisitos de segurança

- RS-01: Segredos e chaves de autenticação devem ser carregados por variáveis de ambiente.
- RS-02: As senhas devem ser armazenadas usando um algoritmo seguro de hash para senhas.
- RS-03: Os tokens JWT devem possuir prazo de expiração.
- RS-04: Rotas protegidas devem rejeitar tokens ausentes, inválidos ou expirados.
- RS-05: Mensagens de erro de autenticação não devem revelar se um e-mail está cadastrado.
- RS-06: O cadastro público não deve permitir que usuários atribuam privilégios administrativos a si mesmos.
- RS-07: Dados sensíveis não devem ser registrados em logs.
- RS-08: A validação dos dados de entrada deve ser aplicada no backend.

## 4. Endpoints iniciais

### POST /auth/register

Responsável por cadastrar um novo usuário.

### POST /auth/login

Responsável por validar as credenciais e emitir um token JWT.

### GET /auth/me

Responsável por retornar os dados do usuário autenticado. Exige um token JWT válido.

## 5. Escopo inicial

Esta etapa contempla:

- Cadastro de usuários.
- Login.
- Hash de senhas.
- Emissão e validação de JWT.
- Proteção das rotas de incidentes.
- Consulta do usuário autenticado.
- Testes automatizados.

## 6. Fora do escopo inicial

Os itens abaixo serão implementados em etapas futuras, se necessários:

- Controle de acesso baseado em funções (RBAC).
- Recuperação de senha.
- Autenticação multifator (MFA).
- Renovação de tokens (*refresh tokens*).
- Integração com provedores externos de identidade.

## 7. Critérios de aceitação

- [ ] O cadastro cria um usuário com senha protegida por hash.
- [ ] O sistema rejeita e-mails duplicados.
- [ ] O sistema rejeita dados inválidos.
- [ ] Credenciais válidas permitem o login.
- [ ] Credenciais inválidas não permitem a autenticação.
- [ ] O token JWT possui expiração e pode ser validado.
- [ ] Rotas protegidas rejeitam requisições sem autenticação.
- [ ] Os dados retornados nunca incluem o hash da senha.
- [ ] Os testes automatizados cobrem cenários de sucesso e falha.
- [ ] A API compila e inicia sem erros.
