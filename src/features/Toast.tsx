import {Position, Toaster} from "@blueprintjs/core";


export const LoginSuccessfulToast = Toaster.create({
    className: "toast-login-successful",
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true,
})

export const SignupToast = Toaster.create({
    className: "toast-signup",
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true,
})

export const PickupRequestToast = Toaster.create({
    className: "toast-pickup-request",
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true,
})

export const GenericToast = Toaster.create({
    className: "toast-generic",
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true,
})


export const DashboardToast = Toaster.create({
    className: "toast-dashboard",
    position: Position.TOP,
    autoFocus: false,
    canEscapeKeyClear: true,
})