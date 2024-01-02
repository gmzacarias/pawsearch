import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { dataUser, forgotPassword, searchLocation, pet, appState, addPets, myPetsLists, dataReport } from "State/atoms";

/*Data App*/
export const useApp = () => useRecoilState(appState)
export const useAppValue = () => useRecoilValue(appState)
/* Data User*/
export const useDataUser = () => useRecoilState(dataUser)
export const useDataUserValue = () => useRecoilValue(dataUser)
/* Forgot Password*/
export const useForgotPassword = () => useRecoilState(forgotPassword)
/*Search Location*/
export const useSearchLocation = () => useRecoilState(searchLocation)
export const useSearchLocationValue = () => useRecoilValue(searchLocation)
/*New Pet*/
export const usePet = () => useRecoilState(pet)
/*Add Pets*/
export const useAddPet = () => useRecoilState(addPets)
/*Pets Lists*/
export const usePetsListValue=()=>useRecoilValue(myPetsLists)
/*Report Pet*/
export const useReportPet=()=> useRecoilState(dataReport)
