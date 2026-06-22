# INH Control de Predios
## Guía de claves y autorización de usuarios

**Versión:** 1.0  
**Sistema:** INH Control de Predios (acceso web)

---

## 1. Usuarios iniciales del sistema

Si el sistema no ha sido modificado, estos son los accesos de prueba:

| ID de usuario | Clave inicial | Rol            | Permisos principales                          |
|---------------|---------------|----------------|-----------------------------------------------|
| admin         | 1234          | Administrador  | Acceso completo, usuarios, respaldos, edición |
| operador      | 1234          | Operador       | Registrar información                         |
| consulta      | 1234          | Consulta       | Solo consultar, buscar e imprimir             |

> **Importante:** Si alguien cambió las claves, los valores anteriores ya no aplican. Use la clave vigente de cada usuario.

---

## 2. ¿Qué es la “clave de autorización”?

No existe una clave especial aparte.

La **autorización del administrador** es simplemente el **ID y la clave normales** de un usuario con rol **Administrador** (por ejemplo: `admin` / `1234`).

El sistema verifica que:

- El ID exista
- La clave sea correcta
- El usuario tenga rol **Administrador**
- El usuario esté **activo**

---

## 3. Proceso A — Cambiar clave (recuerda la clave actual)

**Quién puede usarlo:** Todos los usuarios  
**Autorización admin:** No requerida

### Pasos

1. Inicie sesión con su ID y clave.
2. En la barra superior del panel principal, pulse **Cambiar / restablecer clave**.
3. Deje activa la pestaña **Cambiar clave**.
4. Complete:
   - Clave actual
   - Nueva clave (mínimo 4 caracteres)
   - Confirmar nueva clave
5. Pulse **Guardar nueva clave**.

### Resultado

La clave queda actualizada de inmediato para su usuario.

---

## 4. Proceso B — Restablecer clave estando dentro del sistema

**Quién puede usarlo:** Cualquier usuario que ya inició sesión  
**Autorización admin:** Sí, obligatoria

Use esta opción si **olvidó su clave** pero aún puede entrar al sistema (o alguien le prestó acceso temporal).

### Pasos

1. Inicie sesión.
2. Pulse **Cambiar / restablecer clave**.
3. Cambie a la pestaña **Restablecer clave**.
4. Complete:
   - Nueva clave
   - Confirmar nueva clave
   - Confirmar su ID de usuario (debe coincidir exactamente con el suyo)
   - ID administrador autorizador (ejemplo: `admin`)
   - Clave del administrador (ejemplo: `1234` o la clave actual del admin)
5. Pulse **Restablecer clave**.

### Resultado

Su clave se actualiza sin necesidad de conocer la clave anterior.

---

## 5. Proceso C — Restablecer clave desde la pantalla de acceso

**Quién puede usarlo:** Cualquier usuario que **no puede iniciar sesión**  
**Autorización admin:** Sí, obligatoria

### Pasos

1. En la pantalla de login, pulse **Restablecer clave**.
2. Complete:
   - ID de usuario a restablecer
   - Nueva clave
   - Confirmar nueva clave
   - ID administrador
   - Clave del administrador
3. Pulse **Guardar nueva clave**.
4. Inicie sesión con el mismo ID y la **nueva clave**.

### Resultado

El usuario queda habilitado para entrar con la nueva clave.

---

## 6. Proceso D — El administrador cambia la clave de otro usuario

**Quién puede usarlo:** Solo el **Administrador**  
**Autorización admin:** No (el admin ya está autenticado)

### Pasos

1. Inicie sesión como **admin** (u otro administrador).
2. Pulse **Crear usuario** para abrir la gestión de usuarios.
3. En la tabla **Usuarios registrados**, pulse **Editar** en la fila del usuario.
4. Si desea cambiar la clave, complete:
   - Nueva clave
   - Confirmar nueva clave  
   (Si deja estos campos vacíos, la clave no cambia.)
5. Pulse **Guardar cambios**.

### Resultado

El administrador puede actualizar nombre, rol y clave del usuario seleccionado.

---

## 7. Reglas generales

- La nueva clave debe tener **mínimo 4 caracteres**.
- **Nueva clave** y **Confirmar nueva clave** deben ser **iguales**.
- Un usuario **inactivo** no puede restablecer clave hasta que el administrador lo active.
- Los cambios se guardan en el navegador del equipo (`localStorage`).
- Cierre sesión y vuelva a entrar para confirmar que la nueva clave funciona.

---

## 8. Ejemplo práctico

**Situación:** El usuario `operador` olvidó su clave y no puede entrar.

**Solución:**

1. El administrador autoriza el cambio.
2. En la pantalla de acceso → **Restablecer clave**.
3. Datos de ejemplo:
   - ID de usuario: `operador`
   - Nueva clave: `5678`
   - Confirmar nueva clave: `5678`
   - ID administrador: `admin`
   - Clave del administrador: `1234` (o la clave actual del admin)
4. Guardar y entrar con: `operador` / `5678`.

---

## 9. Si nadie recuerda la clave del administrador

Opciones:

1. **Restaurar un respaldo JSON** del sistema (si existe), desde **Reportes y respaldos → Respaldos**.
2. **Contactar al responsable técnico** del sistema.
3. Como último recurso en ese equipo: borrar los datos guardados del navegador para el sitio (esto puede **eliminar la información del sistema** en ese navegador).

---

## 10. Resumen rápido

| Situación                         | Dónde                         | ¿Pide admin? |
|----------------------------------|-------------------------------|--------------|
| Cambio normal de clave           | Dentro del sistema            | No           |
| Olvidó clave (está dentro)       | Cambiar / restablecer clave   | Sí           |
| Olvidó clave (no puede entrar)   | Login → Restablecer clave     | Sí           |
| Admin cambia clave de otro       | Crear usuario → Editar        | No           |

**Autorización = ID admin + clave admin** (no es una clave diferente).

---

*Documento para uso interno — INH Constructores / Control Predial*
