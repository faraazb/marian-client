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