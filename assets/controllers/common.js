function setValid(id) {
    if ($("#" + id).hasClass("is-invalid")) {
        $("#" + id).removeClass("is-invalid").addClass("is-valid");
    }
    else {
        $("#" + id).addClass("is-valid");
    }
}

function setInvalid(id) {
    if ($("#" + id).hasClass("is-valid")) {
        $("#" + id).removeClass("is-valid").addClass("is-invalid");
    }
    else {
        $("#" + id).addClass("is-invalid");
    }
}

function setNeutral(id) {
    if ($("#" + id).hasClass("is-valid")) {
        $("#" + id).removeClass("is-valid");
    }
    if ($("#" + id).hasClass("is-invalid")) {
        $("#" + id).removeClass("is-invalid");
    }
}

export var verify = {
    username: function(id, help = false) {
        if (help) {
            $("#help-username").html("");
            setNeutral(id);
        } 
        if ($("#" + id).val() != "") {
            if (help) {setInvalid(id);}
            if (!/^[a-zA-Z0-9_]+$/.test($("#" + id).val())) {
                if (help) {$("#help-username").html("Identifiant incorrect. Caractères autorisés : espaces, tirets bas et lettres (majuscules et minuscules).");}
            }
            else if ($("#" + id).val().length < 2) {
                if (help) {$("#help-username").html("Identifiant trop court. Taille minimale : 2 caractères.");}
            }
            else if ($("#" + id).val().length > 16) {
                if (help) {$("#help-username").html("Identifiant trop long. Taille maximale : 16 caractères.");}
            }
            else {
                if (help) {setValid(id);}
                return true;
            }
        }
        return false;
    },
    password: function(id, help = false, confirm = false) {
        if (help) {
            $("#help-password").html("");
            setNeutral(id);
        }
        if ($("#" + id).val() != "") {
            if (help) {setInvalid(id);}
            if ($("#" + id).val().length < 8) {
                if (help) {$("#help-password").html("Mot de passe trop court. Taille minimale : 8 caractères.");}
            }
            else if ($("#" + id).val().length > 48) {
                if (help) {$("#help-password").html("Mot de passe trop long. Taille maximale : 48 caractères.");}
            }
            else {
                if (help) {setValid(id);}
                if (confirm) {$("#section-confirmation").prop("hidden", false);}
                return true;
            }
        }
        if (confirm) {$("#section-confirmation").prop("hidden", true);}
        return false;
    },
    firstname: function(id, help = false) {
        if (help) {setNeutral(id);}
        if ($("#" + id).val() != "") {
            if (help) {setInvalid(id);}
            $("#" + id).val($("#" + id).val().split(/(\s|-)+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(""));
            if (!/^[a-zA-Zà-üÀ-Ü-\s]+$/.test($("#" + id).val())) {
                if (help) {$("#help-fullname").html("Prénom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées).");}  
                return false;
            }
            else if ($("#" + id).val() != $("#" + id).val().trim().replace(/^-+|-+$/g, '')) {
                if (help) {$("#help-fullname").html("Les espaces et les tirets sont interdits aux extrémités.");}
                return false;
            }
            else if ($("#" + id).val().length > 24) {
                if (help) {$("#help-fullname").html("Prénom trop long. Taille maximale : 24 caractères.");}
                return false;
            }
            else {
                if (help) {setValid(id);}
            }
        }
        return true;
    },
    surname: function(id, help = false) {
        if (help) {setNeutral(id);}
        if ($("#" + id).val() != "") {
            if (help) {setInvalid(id);}
            $("#" + id).val($("#" + id).val().split(/(\s|-)+/).map(word => word.toUpperCase()).join(""));
            if (!/^[a-zA-Zà-üÀ-Ü-\s]+$/.test($("#" + id).val())) {
                if (help) {$("#help-fullname").html("Nom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées).");}  
                return false;
            }
            else if ($("#" + id).val() != $("#" + id).val().trim().replace(/^-+|-+$/g, '')) {
                if (help) {$("#help-fullname").html("Les espaces et les tirets sont interdits aux extrémités.");}
                return false;
            }
            else if ($("#" + id).val().length > 24) {
                if (help) {$("#help-fullname").html("Nom trop long. Taille maximale : 24 caractères.");}
                return false;
            }
            else {
                if (help) {setValid(id);}
            }
        }
        return true;
    },
    fullname: function(idFirstname, idSurname, help = false) {
        if (
            verify.firstname(idFirstname, help) &&
            verify.surname(idSurname, help)
        ) {
            if (help) {$("#help-fullname").html("");}
            return true;
        }
        return false;
    },
    email: function(id, help = false) {
        if (help) {
            $("#help-email").html("");
            setNeutral(id);
        }
        if ($("#" + id).val() != "") {
            if (help) {setInvalid(id);}
            $("#" + id).val($("#" + id).val().toLowerCase());
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($("#" + id).val())) {
                if (help) {$("#help-email").html("Veuillez saisir une adresse e-mail valide.");}
            }
            else if ($("#" + id).val().length > 128) {
                if (help) {$("#help-email").html("Adresse trop longue. Taille maximale : 128 caractères.");}
            }
            else {
                if (help) {setValid(id);}
                return true;
            }
        }
        return false;
    },
    confirmation: function(idConfirmation, idPassword, help = false) {
        if (help) {
            $("#help-confirmation").html("");
            setNeutral(idConfirmation);
        }
        if ($("#" + idConfirmation).val() != "") {
            if (help) {setInvalid(idConfirmation);}
            if ($("#" + idConfirmation).val() != $("#" + idPassword).val()) {
                if (help) {$("#help-confirmation").html("Les mots de passe ne correspondent pas.");}
            }
            else {
                if (help) {setValid(idConfirmation);}
                return true;
            }
        }
        return false;
    },
}