import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { ProtectedRoutes } from "./protectedroutes";
import { Layout } from "Components/Layout";
import { ErrorPage } from "Pages/ErrorPage";
import { Home } from "Pages/Home";
import { About } from "Pages/About"
import { Auth } from "Pages/Users/Auth"
import { SignIn } from "Pages/Users/SignIn";
import { SignUp } from "Pages/Users/SignUp"
import { MyProfile } from "Pages/Users/MyProfile";
import { EditProfile } from "Pages/Users/EditProfile";
import { ForgotPassword } from "Pages/Users/ForgotPassword";
import { ResetPassword } from "Pages/Users/ResetPassword";
import { CreatePet } from "Pages/Pets/CreatePet";
import { MyPets } from "Pages/Pets/MyPets";
import { EditPet } from "Pages/Pets/EditPet";
import { NearPets } from "Pages/Pets/NearPets";

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
                <Route index={true} element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="auth" element={<Auth />} />
                <Route path="auth/signin" element={<SignIn />} />
                <Route path="auth/signup" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="near-pets" element={<NearPets />} />
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="myprofile/edit-user" element={<EditProfile />} />
                    <Route path="createpet" element={<CreatePet />} />
                    <Route path="mypets" element={<MyPets />} />
                    <Route path="mypets/edit-pet" element={<EditPet />} />
                </Route>
            </Route>
        </>
    )
)

















