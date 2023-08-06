let translations = [];
translations["loading_muscles"] = "Chargement des muscles sollicités";
translations["loading_exercices"] = "Chargement des exercices...";
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
translations["concentric"] = "Concentrique";
translations["isometric"] = "Isométrique";
translations["eccentric"] = "Excentrique";

export var translator = {
    translations: translations,
    translate: function(string) {
        return this.translations[string] ? this.translations[string] : null;
    }
};

let verify = {
    firstname: function(firstname, help = false) {
        if (help) {
            validator.setNeutral(firstname);
        }
        if (firstname.val() != "") {
            if (help) { validator.setInvalid(firstname); }
            firstname.val(firstname.val().split(new RegExp(/(\s|-)+/)).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(""));
            if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(firstname.val())) {
                if (help) { $("#help-fullname").text("Prénom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées)."); }
                return false;
            }
            else if (firstname.val() != firstname.val().trim().replace(/^-+|-+$/g, '')) {
                if (help) { $("#help-fullname").text("Les espaces et les tirets sont interdits aux extrémités."); }
                return false;
            }
            else if (firstname.val().length > 24) {
                if (help) { $("#help-fullname").text("Prénom trop long. Taille maximale : 24 caractères."); }
                return false;
            }
            else {
                if (help) { validator.setValid(firstname); }
            }
        }
        return true;
    },
    surname: function(surname, help = false) {
        if (help) {
            validator.setNeutral(surname);
        }
        if (surname.val() != "") {
            if (help) { validator.setInvalid(surname); }
            surname.val(surname.val().split(new RegExp(/(\s|-)+/)).map(word => word.toUpperCase()).join(""));
            if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(surname.val())) {
                if (help) { $("#help-fullname").text("Nom incorrect. Caractères autorisés : espaces, tirets et lettres (majuscules, minuscules et accentuées)."); }
                return false;
            }
            else if (surname.val() != surname.val().trim().replace(/^-+|-+$/g, '')) {
                if (help) { $("#help-fullname").text("Les espaces et les tirets sont interdits aux extrémités."); }
                return false;
            }
            else if (surname.val().length > 24) {
                if (help) { $("#help-fullname").text("Nom trop long. Taille maximale : 24 caractères."); }
                return false;
            }
            else {
                if (help) { validator.setValid(surname); }
            }
        }
        return true;
    },
    username: function(username, help = false) {
        if (help) {
            $("#help-username").text("");
            validator.setNeutral(username);
        }
        if (username.val() != "") {
            if (help) { validator.setInvalid(username); }
            if (!new RegExp(/^[a-zA-Z0-9_]+$/).test(username.val())) {
                if (help) { $("#help-username").text("Identifiant incorrect. Caractères autorisés : espaces, tirets bas et lettres (majuscules et minuscules)."); }
            }
            else if (username.val().length < 2) {
                if (help) { $("#help-username").text("Identifiant trop court. Taille minimale : 2 caractères."); }
            }
            else if (username.val().length > 16) {
                if (help) { $("#help-username").text("Identifiant trop long. Taille maximale : 16 caractères."); }
            }
            else {
                if (help) { validator.setValid(username); }
                return true;
            }
        }
        return false;
    },
    email: function(email, help = false) {
        if (help) {
            $("#help-email").text("");
            validator.setNeutral(email);
        }
        if (email.val() != "") {
            if (help) { validator.setInvalid(email); }
            email.val(email.val().toLowerCase());
            if (!new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i).test(email.val())) {
                if (help) { $("#help-email").text("Veuillez saisir une adresse e-mail valide."); }
            }
            else if (email.val().length > 128) {
                if (help) { $("#help-email").text("Adresse trop longue. Taille maximale : 128 caractères."); }
            }
            else {
                if (help) { validator.setValid(email); }
                return true;
            }
        }
        return false;
    },
    password: function(password, help = false) {
        if (help) {
            $("#help-password").text("");
            validator.setNeutral(password);
        }
        if (password.val() != "") {
            if (help) { validator.setInvalid(password); }
            if (password.val().length < 8) {
                if (help) { $("#help-password").text("Mot de passe trop court. Taille minimale : 8 caractères."); }
            }
            else if (password.val().length > 48) {
                if (help) { $("#help-password").text("Mot de passe trop long. Taille maximale : 48 caractères."); }
            }
            else {
                if (help) { validator.setValid(password); }
                return true;
            }
        }
        return false;
    },
    confirmation: function(confirmation, password, help = false) {
        if (help) {
            $("#help-confirmation").text("");
            validator.setNeutral(confirmation);
        }
        if (confirmation.val() != "") {
            if (help) { validator.setInvalid(confirmation); }
            if (confirmation.val() != password.val()) {
                if (help) { $("#help-confirmation").text("Les mots de passe ne correspondent pas."); }
            }
            else {
                if (help) { validator.setValid(confirmation); }
                return true;
            }
        }
        return false;
    },
    height: function(height, help = false) {
        if (help) {
            validator.setNeutral(height);
        }
        if (help) { validator.setInvalid(height); }
        if (!new RegExp(/^[0-9]{3}(\.\d)?$/).test(height.val())) {
            if (help) { $("#help-measurement").text("Taille incorrecte. Toutes les mesures doivent être renseignées."); }
            return false;
        }
        else {
            if (help) { validator.setValid(height); }
        }
        return true;
    },
    weight: function(weight, help = false) {
        if (help) {
            validator.setNeutral(weight);
        }
        if (help) { validator.setInvalid(weight); }
        if (!new RegExp(/^[0-9]{2,3}(\.\d)?$/).test(weight.val())) {
            if (help) { $("#help-measurement").text("Poids incorrect. Toutes les mesures doivent être renseignées."); }
            return false;
        }
        else {
            if (help) { validator.setValid(weight); }
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

let display = {
    session: function(id) {
        $.ajax({
            url: "/api/session?id=" + id,
            type: "GET",
            dataType: "json",
            success: function(response) {
                /*
                // Muscles
                $("#session-muscles")
                    .empty()
                    .addClass("py-1")
                    .append($("<h4></h4>")
                        .text("Muscles sollicités")
                    )
                    .append($("<p></p>")
                        .addClass("px-1 px-md-2")
                        .text("Chargement des muscles sol")
                    )
                ;
                */
                // Exercices
                $("#session-exercices")
                    .empty()
                    .addClass("py-1")
                    .append($("<h4></h4>")
                        .text("Exercices")
                    )
                    .append($("<p></p>")
                        .addClass("px-1 px-md-2")
                        .text(translator.translate("loading_exercices"))
                    )
                ;
                generator.display.exercices(response[id]);
            }
        });
    },
    exercices: function(session) {
        $.ajax({
            url: "/api/set?session=" + session.id,
            type: "GET",
            dataType: "json",
            success: function(response) {
                $("#session-exercices").find(":last").remove();
                let sets = response;
                $.each(session.exercices, function(i, exercice) {
                    let exercice_index = i + 1;
                    let exercice_id = "exercice-" + exercice_index;
                    $("#session-exercices")
                        .append($("<article></article")
                            .attr("id", exercice_id)
                            .addClass("px-1 px-md-2")
                            .append($("<h5></h5>")
                                .attr("id", "exercice-" + exercice_index + "-title")
                                .addClass("text-white")
                            )
                        )
                        .append($("<br>"))
                    ;
                    // Complex exercice
                    if (exercice.sequence) {
                        let title = "";
                        $.each(exercice.exercices, function(j, exercice_part) {
                            let exercice_part_index = j + 1;
                            let exercice_part_id = exercice_id + "-part-" + exercice_part_index;
                            let exercice_part_title = exercice_part.name + " (" + translator.translate(exercice_part.equipment) + ")";
                            title += exercice_part_title;
                            if (exercice_part_index < exercice.exercices.length) {
                                title += ", ";
                            }
                            $("#exercice-" + exercice_index)
                                .append($("<article></article")
                                    .attr("id", exercice_part_id)
                                    .addClass("px-2 mx-md-3")
                                    .append($("<h6></h6>")
                                        .attr("id", exercice_part_id + "-title")
                                        .text(exercice_part_title)
                                    )
                                )
                            ;
                            generator.display.exercice(exercice_part_id, exercice_part, sets)
                        });
                        $("#exercice-" + exercice_index + "-title").text(title);
                    }
                    // Simple exercice
                    else {
                        let title = exercice.name + " (" + translator.translate(exercice.equipment) + ")";
                        $("#exercice-" + exercice_index + "-title").text(title);
                        generator.display.exercice(exercice_id, exercice, sets)
                    }
                });
                $("#session-exercices").find(":last").remove();
            }
        });
    },
    exercice: function(prefix, exercice, sets) {
        $("#" + prefix)
            .append($("<table></table>")
                .addClass("table table-dark table-striped")
                .append($("<thead></thead>")
                    .attr("id", prefix + "-head")
                )
                .append($("<tbody></tbody>")
                    .attr("id", prefix + "-body")
                )
            )
        ;
        // Table head
        $("#" + prefix + "-head")
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
                /*
                .append($("<th></th>")
                    .attr("scope", "col")
                    .addClass("text-center text-body")
                    .text(translator.translate("tempo"))
                )
                */
            )
        ;
        // Table body
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
                        .attr("id", set_id + "-weight")
                        .addClass("text-center")
                    )
                    /*
                    .append($("<td></td>")
                        .attr("id", set_id + "-tempo")
                        .addClass("text-center")
                    )
                    */
                    .append($("<td></td>")
                        .attr("id", set_id + "-id")
                        .attr("hidden", "")
                    )
                )
            ;
            $.each(set, function(j, set_part_id) {
                let set_part = sets[set_part_id];
                $("#" + set_id + "-symmetry")
                    .append($("<p></p>")
                        .attr("id", set_part_id + "-symmetry")
                        .addClass("mb-0 text-white")
                        .text(translator.translate(set_part.symmetry))
                    )
                    ;
                $("#" + set_id + "-repetitions")
                    .append($("<p></p>")
                        .attr("id", set_part_id + "-repetitions")
                        .addClass("mb-0 text-white")
                        .text(set_part.repetitions)
                    )
                    ;
                $("#" + set_id + "-weight")
                    .append($("<p></p>")
                        .attr("id", set_part_id + "-weight")
                        .addClass("mb-0 text-white")
                        .text(set_part.weight)
                    )
                ;
                /*
                if (set_part.concentric || set_part.isometric || set_part.eccentric) {
                    $("#" + set_id + "-tempo")
                        .append($("<p></p>")
                            .attr("id", set_part_id + "-tempo")
                            .addClass("mb-0 text-white")
                            .text(
                                set_part.concentric ? set_part.concentric: 0 + 
                                ":" + 
                                set_part.isometric ? set_part.isometric: 0 + 
                                ":" + , first)
                                set_part.eccentric ? set_part.eccentric: 0
                            )
                        )
                    ;
                }
                */
                $("#" + set_id + "-id")
                    .append($("<p></p>")
                        .attr("id", set_part_id + "-id")
                        .text(set_part.id)
                    )
                ;
            });
            // Current
            if ($("#_edit-form").length) {
                $("#" + set_id)
                    .attr("data-bs-toggle", "modal")
                    .attr("data-bs-target", "#_edit")
                    .addClass("pointer-only")
                    .on("click", function() {
                        let exercice_index = set_id.split("-")[1];
                        $("#_edit-form")
                            .empty()
                            .append($("<h5></h5>")
                                .addClass("text-white")
                                .text($("#exercice-" + exercice_index + "-title").text())
                            )
                        ;
                        if (set_id.split("-")[2] === "part") {
                            let exercice_part_index = 1;
                            let next_exists = true;
                            while (next_exists) {
                                generator.display.editForm("exercice-" + exercice_index + "-part-" + exercice_part_index, set_index, true);
                                exercice_part_index++;
                                next_exists = $("#exercice-" + exercice_index + "-part-" + exercice_part_index + "-set-" + set_index).length ? true: false;
                            }
                        }
                        else {
                            generator.display.editForm(prefix, set_index);
                        }
                    })
                ;
            }
        });
    },
    editForm: function(prefix, set_index, sequence = false) {
        let edit_set_id = "_edit-" + prefix + "-set-" + set_index;
        $("#_edit-form")
            .append($("<article></article>")
                .addClass("mb-1")
                .attr("id", edit_set_id)
            )
        ;
        if (sequence) {
            $("#" + edit_set_id)
                .addClass("px-1 px-md-2")
                .append($("<h6></h6>")
                    .addClass("mt-2 mb-1")
                    .attr("id", edit_set_id + "-title")
                    .text($("#" + prefix + "-title").text())
                )
            ;
        }
        $("#" + edit_set_id)
            .append($("<div></div>")
                .addClass("d-flex")
                /*
                .append($("<span></span>")
                    .addClass("d-flex justify-content-center align-items-center text-white fw-bold me-2")
                    .text(set_index)
                )
                */
                .append($("<div></div>")
                    .attr("id", edit_set_id + "-parts")
                )
            )
        ;
        $.each($("#" + prefix + "-set-" + set_index + "-id").children(), function(i, set_part) {
            let set_part_id = set_part.innerText;
            let edit_set_part_id = "_edit-" + set_part_id;
            $("#" + edit_set_id + "-parts")
                .append($("<div></div>")
                    .attr("id", edit_set_part_id)
                    .append($("<section></section>")
                        .addClass("d-flex py-1")
                        .append($("<div></div>")
                            .addClass("col-6 pe-2")
                            .append($("<select></select>")
                                .attr("id", edit_set_part_id + "-symmetry")
                                .attr("name", set_part_id + "[symmetry]")
                                .addClass("form-select")
                                .append($("<option></option>")
                                    .val("unilateral")
                                    .text(translator.translate("unilateral"))
                                )
                                .append($("<option></option>")
                                    .val("bilateral")
                                    .text(translator.translate("bilateral"))
                                )
                                .val($("#" + set_part_id + "-symmetry").text() === translator.translate("unilateral") ? "unilateral": "bilateral")
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 pe-1")
                            .append($("<input>")
                                .attr("id", edit_set_part_id + "-repetitions")
                                .attr("name", set_part_id + "[repetitions]")
                                .addClass("form-control text-center")
                                .attr("placeholder", translator.translate("repetitions"))
                                .val($("#" + set_part_id + "-repetitions").text())
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 ps-1")
                            .append($("<input>")
                                .attr("id", edit_set_part_id + "-weight")
                                .attr("name", set_part_id + "[weight]")
                                .addClass("form-control text-center")
                                .attr("placeholder", translator.translate("weight"))
                                .val($("#" + set_part_id + "-weight").text())
                            )
                        )
                    )
                )
            ;
        });
    },
}

export var generator = {
    display: display,
};