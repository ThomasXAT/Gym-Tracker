export var input = {
    setValid: function(input) {
        if (input.hasClass("is-invalid")) {
            input.removeClass("is-invalid").addClass("is-valid");
        }
        else {
            input.addClass("is-valid");
        }
    },
    setInvalid: function(input) {
        if (input.hasClass("is-valid")) {
            input.removeClass("is-valid").addClass("is-invalid");
        }
        else {
            input.addClass("is-invalid");
        }
    },
    setNeutral: function(input) {
        if (input.hasClass("is-valid")) {
            input.removeClass("is-valid");
        }
        if (input.hasClass("is-invalid")) {
            input.removeClass("is-invalid");
        }
    },
};

export var verify = {
    firstname: function(firstname, help = false) {
        if (help) {
            input.setNeutral(firstname);
        }
        if (firstname.val() != "") {
            if (help) {input.setInvalid(firstname);}
            firstname.val(firstname.val().split(/(\s|-)+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(""));
            if (!/^[a-zA-Zà-üÀ-Ü-\s]+$/.test(firstname.val())) {
                if (help) {$("#help-fullname").html("Prénom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées).");}  
                return false;
            }
            else if (firstname.val() != firstname.val().trim().replace(/^-+|-+$/g, '')) {
                if (help) {$("#help-fullname").html("Les espaces et les tirets sont interdits aux extrémités.");}
                return false;
            }
            else if (firstname.val().length > 24) {
                if (help) {$("#help-fullname").html("Prénom trop long. Taille maximale : 24 caractères.");}
                return false;
            }
            else {
                if (help) {input.setValid(firstname);}
            }
        }
        return true;
    },
    surname: function(surname, help = false) {
        if (help) {
            input.setNeutral(surname);
        }
        if (surname.val() != "") {
            if (help) {input.setInvalid(surname);}
            surname.val(surname.val().split(/(\s|-)+/).map(word => word.toUpperCase()).join(""));
            if (!/^[a-zA-Zà-üÀ-Ü-\s]+$/.test(surname.val())) {
                if (help) {$("#help-fullname").html("Nom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées).");}  
                return false;
            }
            else if (surname.val() != surname.val().trim().replace(/^-+|-+$/g, '')) {
                if (help) {$("#help-fullname").html("Les espaces et les tirets sont interdits aux extrémités.");}
                return false;
            }
            else if (surname.val().length > 24) {
                if (help) {$("#help-fullname").html("Nom trop long. Taille maximale : 24 caractères.");}
                return false;
            }
            else {
                if (help) {input.setValid(surname);}
            }
        }
        return true;
    },
    username: function(username, help = false) {
        if (help) {
            $("#help-username").html("");
            input.setNeutral(username);
        } 
        if (username.val() != "") {
            if (help) {input.setInvalid(username);}
            if (!/^[a-zA-Z0-9_]+$/.test(username.val())) {
                if (help) {$("#help-username").html("Identifiant incorrect. Caractères autorisés : espaces, tirets bas et lettres (majuscules et minuscules).");}
            }
            else if (username.val().length < 2) {
                if (help) {$("#help-username").html("Identifiant trop court. Taille minimale : 2 caractères.");}
            }
            else if (username.val().length > 16) {
                if (help) {$("#help-username").html("Identifiant trop long. Taille maximale : 16 caractères.");}
            }
            else {
                if (help) {input.setValid(username);}
                return true;
            }
        }
        return false;
    },
    email: function(email, help = false) {
        if (help) {
            $("#help-email").html("");
            input.setNeutral(email);
        }
        if (email.val() != "") {
            if (help) {input.setInvalid(email);}
            email.val(email.val().toLowerCase());
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.val())) {
                if (help) {$("#help-email").html("Veuillez saisir une adresse e-mail valide.");}
            }
            else if (email.val().length > 128) {
                if (help) {$("#help-email").html("Adresse trop longue. Taille maximale : 128 caractères.");}
            }
            else {
                if (help) {input.setValid(email);}
                return true;
            }
        }
        return false;
    },
    password: function(password, help = false) {
        if (help) {
            $("#help-password").html("");
            input.setNeutral(password);
        }
        if (password.val() != "") {
            if (help) {input.setInvalid(password);}
            if (password.val().length < 8) {
                if (help) {$("#help-password").html("Mot de passe trop court. Taille minimale : 8 caractères.");}
            }
            else if (password.val().length > 48) {
                if (help) {$("#help-password").html("Mot de passe trop long. Taille maximale : 48 caractères.");}
            }
            else {
                if (help) {input.setValid(password);}
                return true;
            }
        }
        return false;
    },
    confirmation: function(confirmation, password, help = false) {
        if (help) {
            $("#help-confirmation").html("");
            input.setNeutral(confirmation);
        }
        if (confirmation.val() != "") {
            if (help) {input.setInvalid(confirmation);}
            if (confirmation.val() != password.val()) {
                if (help) {$("#help-confirmation").html("Les mots de passe ne correspondent pas.");}
            }
            else {
                if (help) {input.setValid(confirmation);}
                return true;
            }
        }
        return false;
    },
};

export function dataURLtoFile(dataURL, fileName) {
    var arr = dataURL.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}