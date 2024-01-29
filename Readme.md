# Taller de Auth

Auth =  Authentication + Authorization

Authorization: ¿Puedo pasar? - Login
Authentication: ¿Yo en concreto, puedo hacer lo que intento?

Authorization = [JWT](https://jwt.io/introduction)

Procesos de cara al usuario

1 - Registro

- No inmediatez / validación
- Gestión de la passwd: encriptación

2 - Login: with password / with token

- creación de sesiones
- envío de un token -> JWT

3 - Ruta protegidas ( roles )

## REST

Create - POST
Read - GET
Update - PATCH / PUT
Delete - DELETE
