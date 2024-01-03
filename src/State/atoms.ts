import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage
})

export const appState = atom({
    key: "app",
    default: {
        email: "",
        password: "",
        token: "",
        isLogged: false,
        lat: 0,
        lng: 0,
    },
    effects_UNSTABLE: [persistAtom]
})

export const dataUser = atom({
    key: "dataUser",
    default: {
        id: "",
        userName: "",
        email: "",
        password: "",
        profilePhoto: "",
    },
    effects_UNSTABLE: [persistAtom]
})

export const forgotPassword = atom({
    key: "forgotPassword",
    default: {
        email: "",
        token: "",
        password: "",
        confirmPassword: ""
    },
    effects_UNSTABLE: [persistAtom]
})

export const searchLocation = atom({
    key: "searchLocation",
    default: {
        lat: 0,
        lon: 0,
        display_name: ""
    },
    effects_UNSTABLE: [persistAtom]
})

export const dataReport = atom({
    key: "dataReport",
    default: {
        nameReporter: "",
        phoneNumber:1511121212,
        info: ""
    }
})

export const pet = atom({
    key: "pet",
    default: {
        id: "",
        petName: "",
        petPhoto: "",
        lat: 0,
        lng: 0,
        zoneReport: "",
        found: false,
        petPhotoChanged: false,
        userId: 0
    },
    effects_UNSTABLE: [persistAtom]
})

export const addPets = selector({
    key: "addPets",
    get: ({ get }) => {
        const myPets = get(myPetsLists);
        return myPets;
    },
    set: ({ set, get }, newPet) => {
        const currentPets = get(myPetsLists);
        // Verificar si ya existe una mascota con el mismo ID
        const existingPetIndex = currentPets.findIndex((pet) => pet.id === newPet.id);
        if (existingPetIndex !== -1) {
            // Si ya existe, reemplaza toda la información de la mascota existente
            const updatedPets = [...currentPets];
            updatedPets[existingPetIndex] = newPet;
            set(myPetsLists, updatedPets);
        } else {
            // Si no existe, agregar la nueva mascota
            const updatedPets = [newPet, ...currentPets];
            set(myPetsLists, updatedPets);
        }
    },
});

export const myPetsLists = atom({
    key: "myPetsList",
    default: [],
    effects_UNSTABLE: [persistAtom]
});
