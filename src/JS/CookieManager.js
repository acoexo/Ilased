class CookieManager {
    constructor() {
        this.username = "";
        this.backgroundColor = "";
        this.textColor = "";
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    getBackgroundColor() {
        return this.backgroundColor;
    }

    setTextColor(color) {
        this.textColor = color;
    }

    getTextColor() {
        return this.textColor;
    }

    redirect() {
        window.location.href = '/REDIRECTIONS/bienvenida.php';
    }

    savePreferences() {
        var usernameInput = document.getElementById('username').value;
        var backgroundColorInput = document.getElementById('background-color-options').dataset.selectedColor;
        var textColorInput = document.getElementById('text-color-options').dataset.selectedColor;
        if ((usernameInput || usernameInput !== "")||(backgroundColorInput || backgroundColorInput !== "")||(textColorInput || textColorInput !== "")) {
            this.setUsername(usernameInput);
            this.setBackgroundColor(backgroundColorInput);
            this.setTextColor(textColorInput);
            let expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000));
            
            const encodedUsername = encodeURIComponent(usernameInput);
            const encodedBackgroundColor = encodeURIComponent(backgroundColorInput);
            const encodedTextColor = encodeURIComponent(textColorInput);

            this.guardarDatosUsuario(usernameInput,backgroundColorInput,textColorInput);

            document.cookie = `Username=${encodedUsername}; expires=${expiryDate.toUTCString()};`;
            document.cookie = `BackgroundColor=${encodedBackgroundColor}; expires=${expiryDate.toUTCString()};`;
            document.cookie = `TextColor=${encodedTextColor}; expires=${expiryDate.toUTCString()};`;

        }
        this.redirect();
        
    }

    getCookieName() {
        return new Promise((resolve, reject) => {
            const cookieArray = document.cookie.split(';');
            for (const cookie of cookieArray) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'Username') {
                    resolve(decodeURIComponent(value));
                    return;
                }else{
                    reject(new Error("No cookie found"))
                }
            }
        });
    }
    guardarDatosUsuario(nombre, colorFondo, colorFuente) {
        var datosUsuario = {
            "nombre": nombre,
            "colorFondo": colorFondo,
            "colorFuente": colorFuente
        };
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    }

    async printValue() {
        try {
            const cookieValue = await this.getCookieName();
            console.log(cookieValue);
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default CookieManager;
