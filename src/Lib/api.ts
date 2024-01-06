import 'dotenv/config'

const API_BASE_URL = process.env.NODE_ENV === 'development'? "http://localhost:3000" : "https://backend-pawsearch.onrender.com"

/*verificando si existe mail en la DB* */
export async function checkEmail(email?: string) {
    try {
        const verifyEmail = await fetch(`${API_BASE_URL}/check-email?email=${email}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
        if (verifyEmail.ok) {
            const response = await verifyEmail.json();
            // console.log("Mensaje del servidor:", response.message);
            if (response.message === "El correo electrónico existe en la base de datos") {
                return true;
            }
        } else {
            console.log("El correo electrónico no existe en la base de datos,seras redirigido a crearte una cuenta 😉");
            return false;
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

/*iniciar sesion*/
export async function signIn(email: string, password: string) {
    const user = { email, password };
    try {
        const checkToken = await fetch(`${API_BASE_URL}/auth/token`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
        if (!checkToken.ok) {
            console.log("Hubo un problema al iniciar sesion")
        }
        const { token, userId } = await checkToken.json();
        return { token, userId };
    } catch (error) {
        console.log(error)
        
    }
}

/*Crear Cuenta*/
export async function signUp(userName: string, email: string, password: string, profilePhoto: string) {
    const data = { userName, email, password, profilePhoto }
    try {
        const registerUser = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })

        if (registerUser.ok) {
            const user = await registerUser.json();
            console.log("Usuario registrado correctamente:", user);
            return user;
        } else {
            console.log("Error al registrar el usuario:", registerUser.status);
        }
    } catch (error) {
        console.error(error)
    }
}

/*Obtener la data del usuario*/
export async function myData(userId: string, token: string) {
    const authorization = `bearer ${token}`;
    try {
        const responseData = await fetch(`${API_BASE_URL}/user?userId=${userId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            },
        })
        if (!responseData.ok) {
            console.log("No se pudo obtener la data del usuario");
        }
        const data = await responseData.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

/*Actualizar info del usuario*/
export async function updateUser(userId: string, data: string, token: string) {
    const authorization = `bearer ${token}`;
    try {
        const updateUserData = await fetch(`${API_BASE_URL}/update-user?userId=${userId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: authorization
            },
            body: JSON.stringify(data)
        })
        const newUserData = await updateUserData.json()
        // console.log("datos actualizados")
        return newUserData
    } catch (error) {
        console.log(error)
    }
}

/*Enviar mail,para restablecer la contraseña */
export async function recoverPassword(email: string, token?: string) {
    const data = { email };
    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            console.log("No se pudo obtener la data del usuario");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}

/*Restablecer la contraseña*/
export async function resetPasswordConfirmation(token: string, password: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/reset-password`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token, password })
        })
        if (!response) {
            console.log("Hubo un error al actualizar la contraseña")
        }
        const data = await response.json()
        console.log(data.message)
        return data;
    }
    catch (error) {
        console.log(error)
        return null
    }
}

/*Crear reporte de una mascota*/
export async function createNewPet(userId: string, token: string, petName: string, imageURL: string, lat: number, lng: number, zoneReport: string) {
    const authorization = `bearer ${token}`;
    const data = { petName, imageURL, lat, lng, zoneReport }
    try {
        const createPet = await fetch(`${API_BASE_URL}/user/create-pet?userId=${userId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            },
            body: JSON.stringify(data)
        })
        if(!createPet){
            console.log("Hubo un problema al crear la mascota")
        }
        const newPet = await createPet.json()
        console.log(`Hola,ya se creo el reporte de ${data.petName}`)
        return newPet
    } catch (error) {
        console.log(error)
    }
}

export async function myPets(userId: string, token: string) {
    const authorization = `bearer ${token}`;
    try {
        const getMyPets = await fetch(`${API_BASE_URL}/user/pets?userId=${userId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            }
        })
        if (!getMyPets) {
            console.log("No se pudieron obtener mis reportes")
        } else {
            return getMyPets
        }
    } catch (error) {
        console.error(error)
    }
}

/* Obtener las mascotas cercanas a mi ubicación */
export async function nearPets(lat: number, lng: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/pets-around-me?lat=${lat}&lng=${lng}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        console.log(`Mascotas cercanas a la ubicación ${lat}, ${lng}:`);
        return response
    } catch (error) {
        console.log(error);
    }
}

/*Reportar Mascota vista en un lugar */
export async function reportPet(petId: string, name_reporter: string, phone_number: number, pet_info: string) {
    const data = { name_reporter, phone_number, pet_info }
    try {
        const response = await fetch(`${API_BASE_URL}/user/report-pet?petId=${petId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (!response) {
            console.log("no se pudo realizar el reporte")
        } else {
            const dataEMail = await response.json()
            const { name_pet } = dataEMail
            console.log(`Se envio un email con informacion ,al dueño de ${name_pet}`)
        }
    } catch (error) {
        console.log(error)
    }
}

/*Actualizar Mascota */
export async function updatePet(petId: string, token: string, petName: string, imageURL: string, lat: number, lng: number, zoneReport: string) {
    const authorization = `bearer ${token}`;
    const data = { petName, imageURL, lat, lng, zoneReport }
    try {
        const createPet = await fetch(`${API_BASE_URL}/user/update-pet?petId=${petId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            },
            body: JSON.stringify(data)
        })
        const newPet = await createPet.json()
        console.log(`Hola,ya se creo el reporte de ${data.petName}`)
        return newPet
    } catch (error) {
        console.log(error)
    }
}
/*Actualizar Status de la Mascota */
export async function foundPet(petId: string, token: string) {
    const authorization = `bearer ${token}`;
    try {
        const updatePetStatus = await fetch(`${API_BASE_URL}/user/found-pet?petId=${petId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            },
        })
        console.log("Status actualizado con exito,mascota encontrada")
        return updatePetStatus
    } catch (error) {
        console.error(error)
    }
}

/*Eliminar Reporte de la mascota*/
export async function deleteReport(petId: string, token: string) {
    const authorization = `bearer ${token}`;
    try {
        const deletePet = await fetch(`${API_BASE_URL}/user/delete-pet?petId=${petId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: authorization,
            },
        })
        if (!deletePet) {
            console.log("No se pudo eliminar la mascota")
        } else {
            console.log("Reporte de mascota eliminado")
        }
    } catch (error) {
        console.error(error)
    }
}
































