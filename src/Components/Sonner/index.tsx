import React from "react";
import { toast } from "sonner";

/*Check email*/
export function onCheckUser() {
  toast.info("¡Hola! Parece que eres nuevo aquí. Regístrate para comenzar", { duration: 3000 })
}

/*Sign in*/
export function onLoginSuccess() {
  toast.success("Inicio de sesion exitoso")
}

export function onLoginFailure() {
  toast.error("Inicio de sesion incorrecto")
}

/*Edit user */
export function onUserDataChange() {
  toast.success(`Datos modificados`)
}

export function onUserDataChangeError() {
  toast.error("Hubo un error al modificar los datos")
}

/*Sign up*/
export function onRegister() {
  toast.success("Bienvenido/a a PawSearch")
}

export function onChangePhoto() {
  toast.warning("La imagen no ha sido modificada")
}

/*Create Pet */
export function onNewPet() {
  toast.success("Mascota Creada con exito")
}


/*Search Leaflet */
export function onNotSearch() {
  toast.error("Debes ingresar una busqueda")
}

/*Edit Pet */
export function onUpdatePet() {
  toast.success("Mascota Creada con exito")
}
 
export function onNotUpdatePet() {
  toast.error("Debes ingresar una busqueda")
}

export function onFoundPet() {
  toast.success("Reporte actualizado con exito")
}

export function onDeletePet() {
  toast.success("Reporte actualizado con exito")
}

/*Send email*/
export function onSendEmail() {
  toast.success("Email de recuperacion de contraseña,enviado")
}

/*Reset password*/
export function onResetPassword() {
  toast.success("Contraseña modificada con exito")
}

export function onNotResetPassword() {
  toast.warning("Deben coincidir las dos contraseñas")
}

export function onErrorResetPassword() {
  toast.warning("Hubo un problema al cambiar la contraseña")
}


/*Report pet*/
export function onReportPet() {
  toast.success("Reporte enviado con exito")
}
 
export function onNotReportPet() {
  toast.error("Reporte no enviado")
}
