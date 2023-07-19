let translations = [];
translations["set"] = "Série";
translations["symmetry"] = "Symétrie";
translations["repetitions"] = "Répts";
translations["weight"] = "Poids";
translations["tempo"] = "Tempo";
translations["bilateral"] = "bilatéral";
translations["unilateral"] = "unilatéral";
translations["barbell"] = "barre";
translations["dumbbell"] = "haltères";
translations["machine"] = "machine";
translations["cable"] = "poulie";

export var translator = {
    translations: translations,
    translate: function(string) {
        return this.translations[string] ? this.translations[string]: null;
    }
};

let verify = {
    firstname: function(firstname, help = false) {
        if (help) {
            validator.setNeutral(firstname);
        }
        if (firstname.val() != "") {
            if (help) {validator.setInvalid(firstname);}
            firstname.val(firstname.val().split(new RegExp(/(\s|-)+/)).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(""));
            if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(firstname.val())) {
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
                if (help) {validator.setValid(firstname);}
            }
        }
        return true;
    },
    surname: function(surname, help = false) {
        if (help) {
            validator.setNeutral(surname);
        }
        if (surname.val() != "") {
            if (help) {validator.setInvalid(surname);}
            surname.val(surname.val().split(new RegExp(/(\s|-)+/)).map(word => word.toUpperCase()).join(""));
            if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(surname.val())) {
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
                if (help) {validator.setValid(surname);}
            }
        }
        return true;
    },
    username: function(username, help = false) {
        if (help) {
            $("#help-username").html("");
            validator.setNeutral(username);
        } 
        if (username.val() != "") {
            if (help) {validator.setInvalid(username);}
            if (!new RegExp(/^[a-zA-Z0-9_]+$/).test(username.val())) {
                if (help) {$("#help-username").html("Identifiant incorrect. Caractères autorisés : espaces, tirets bas et lettres (majuscules et minuscules).");}
            }
            else if (username.val().length < 2) {
                if (help) {$("#help-username").html("Identifiant trop court. Taille minimale : 2 caractères.");}
            }
            else if (username.val().length > 16) {
                if (help) {$("#help-username").html("Identifiant trop long. Taille maximale : 16 caractères.");}
            }
            else {
                if (help) {validator.setValid(username);}
                return true;
            }
        }
        return false;
    },
    email: function(email, help = false) {
        if (help) {
            $("#help-email").html("");
            validator.setNeutral(email);
        }
        if (email.val() != "") {
            if (help) {validator.setInvalid(email);}
            email.val(email.val().toLowerCase());
            if (!new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i).test(email.val())) {
                if (help) {$("#help-email").html("Veuillez saisir une adresse e-mail valide.");}
            }
            else if (email.val().length > 128) {
                if (help) {$("#help-email").html("Adresse trop longue. Taille maximale : 128 caractères.");}
            }
            else {
                if (help) {validator.setValid(email);}
                return true;
            }
        }
        return false;
    },
    password: function(password, help = false) {
        if (help) {
            $("#help-password").html("");
            validator.setNeutral(password);
        }
        if (password.val() != "") {
            if (help) {validator.setInvalid(password);}
            if (password.val().length < 8) {
                if (help) {$("#help-password").html("Mot de passe trop court. Taille minimale : 8 caractères.");}
            }
            else if (password.val().length > 48) {
                if (help) {$("#help-password").html("Mot de passe trop long. Taille maximale : 48 caractères.");}
            }
            else {
                if (help) {validator.setValid(password);}
                return true;
            }
        }
        return false;
    },
    confirmation: function(confirmation, password, help = false) {
        if (help) {
            $("#help-confirmation").html("");
            validator.setNeutral(confirmation);
        }
        if (confirmation.val() != "") {
            if (help) {validator.setInvalid(confirmation);}
            if (confirmation.val() != password.val()) {
                if (help) {$("#help-confirmation").html("Les mots de passe ne correspondent pas.");}
            }
            else {
                if (help) {validator.setValid(confirmation);}
                return true;
            }
        }
        return false;
    },
    height: function(height, help = false) {
        if (help) {
            validator.setNeutral(height);
        }
        if (help) {validator.setInvalid(height);}
        if (!new RegExp(/^[0-9]{3}(\.\d)?$/).test(height.val())) {
            if (help) {$("#help-measurement").html("Taille incorrecte. Toutes les mesures doivent être renseignées.");}  
            return false;
        }
        else {
            if (help) {validator.setValid(height);}
        }
        return true;
    },
    weight: function(weight, help = false) {
        if (help) {
            validator.setNeutral(weight);
        }
        if (help) {validator.setInvalid(weight);}
        if (!new RegExp(/^[0-9]{2,3}(\.\d)?$/).test(weight.val())) {
            if (help) {$("#help-measurement").html("Poids incorrect. Toutes les mesures doivent être renseignées.");}  
            return false;
        }
        else {
            if (help) {validator.setValid(weight);}
        }
        return true;
    },
};

export var validator = {
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
    verify: verify,
};

export var generator = {
    displayEditForm: function(prefix, set_index) {
        let edit_set_id = "_edit-" + prefix + "-set-" + set_index;
        $("#_edit-body")
            .append($("<article></article>")
                .attr("id", edit_set_id)
                .append($("<span></span>")
                    .attr("id", edit_set_id + "-title")
                    .addClass("fs-5")
                    .html($("#" + prefix + "-title").html())
                )
                .append($("<form></form>")
                    .attr("id", edit_set_id + "-form")
                    .addClass("px-1 px-md-2")
                        .append($("<p></p>")
                        .addClass("fs-6")
                        .text(translator.translate("set") + " " + set_index)
                    )
                )
            )
        ;
        $.each($("#" + prefix + "-set-" + set_index + "-id").children(), function(i, set_part) {
            $("#" + edit_set_id + "-form")
                .append($("<p></p>")
                    .text(set_part.innerText)
                )
            ;
        });
    },
    displayExerciceTable: function(prefix, exercice) {
        $("#" + prefix)
            .append($("<table></table>")
                .addClass("table table-dark table-striped")
                .append($("<thead></thead>")
                    .attr("id", prefix + "-head")
                    .append($("<tr></tr>")
                        .append($("<th></th>")
                            .attr("scope", "col")
                            .addClass("text-center text-body")
                            .text("#")
                        )
                        .append($("<th></th>")
                            .attr("scope", "col")
                            .addClass("text-center text-body")
                            .text(translator.translate("symmetry"))
                        )
                        .append($("<th></th>")
                            .attr("scope", "col")
                            .addClass("text-center text-body")
                            .text(translator.translate("repetitions"))
                        )
                        .append($("<th></th>")
                            .attr("scope", "col")
                            .addClass("text-center text-body")
                            .text(translator.translate("weight"))
                        )
                        .append($("<th></th>")
                            .attr("scope", "col")
                            .addClass("text-center text-body")
                            .text(translator.translate("tempo"))
                        )
                    )
                )
                .append($("<tbody></tbody>")
                    .attr("id", prefix + "-body")
                )
            )
        ;
        $.each(exercice.sets, function(i, set) {
            let set_index = i + 1;
            let set_id = prefix + "-set-" + set_index;
            $("#" + prefix + "-body")
                .append($("<tr></tr>")
                    .attr("id", set_id)
                    .append($("<th></th>")
                    .attr("scope", "row")
                    .addClass("align-middle text-center")
                    .append($("<p></p>")
                            .addClass("mb-0 text-white")
                            .text(set_index)
                        )
                    )
                    .append($("<td></td>")
                        .attr("id", set_id + "-symmetry")
                        .addClass("text-center")
                    )
                    .append($("<td></td>")
                        .attr("id", set_id + "-repetitions")
                        .addClass("text-center")
                    )
                    .append($("<td></td>")
                        .attr("id", set_id+ "-weight")
                        .addClass("text-center")
                    )
                    .append($("<td></td>")
                        .attr("id", set_id + "-tempo")
                        .addClass("text-center")
                    )
                    .append($("<td></td>")
                        .attr("id", set_id + "-id")
                        .attr("hidden", "")
                    )
                )
            ;
            if ($("#_edit-body").length) {
                $("#" + set_id)
                    .attr("data-bs-toggle", "modal")
                    .attr("data-bs-target", "#_edit")
                    .addClass("pointer-only")
                    .on("click", function() {
                        $("#_edit-body").empty();
                        let exercice_index = set_id.split("-")[1];
                        if (set_id.split("-")[2] === "part") {
                            let part_index = 1;
                            let exists = true;
                            while (exists) {
                                generator.displayEditForm("exercice-" + exercice_index + "-part-" + part_index, set_index);
                                part_index++;
                                exists = $("#exercice-" + exercice_index + "-part-" + part_index + "-set-" + set_index).length ? true: false; 
                            }
                        }
                        else {
                            generator.displayEditForm(prefix, set_index);
                        }
                    })
                ;
            }
            for (let j = 0; j < set.length; j++) {
                $("#" + set_id + "-symmetry")
                    .append($("<p></p>")
                        .addClass("mb-0 text-white")
                        .text(translator.translate(set[j].symmetry))
                    )
                ;
                $("#" + set_id + "-repetitions")
                    .append($("<p></p>")
                        .addClass("mb-0 text-white")
                        .text(set[j].repetitions)
                    )
                ;
                $("#" + set_id + "-weight")
                    .append($("<p></p>")
                        .addClass("mb-0 text-white")
                        .text(set[j].weight)
                    )
                ;
                if (set[j].concentric || set[j].isometric || set[j].eccentric) {
                    let concentric = set[j].concentric ? set[j].concentric : 0;
                    let isometric = set[j].isometric ? set[j].isometric : 0;
                    let eccentric = set[j].eccentric ? set[j].eccentric : 0;
                    $("#" + set_id + "-tempo")
                        .append($("<p></p>")
                            .addClass("mb-0 text-white")
                            .text(concentric + ":" + isometric + ":" + eccentric)
                        )
                    ;
                }
                $("#" + set_id + "-id")
                    .append($("<p></p>")
                        .text(set[j].id)
                    )
                ;
            }
        });
    }
};