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
translations["concentric"] = "Concentrique";
translations["isometric"] = "Isométrique";
translations["eccentric"] = "Excentrique";
translations["bodyweight"] = "PDC";
translations["band"] = "élastique";
translations["barbell"] = "barre";
translations["dumbbell"] = "haltères";
translations["cable"] = "poulie";
translations["smith"] = "barre guidée";
translations["machine"] = "machine";
translations["add_dropset"] = "Ajouter une dégressive"
translations["delete_dropset"] = "Supprimer"

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
                $("#session-exercices")
                    .empty()
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
                $("#loading").remove();
                $("#session-exercices").find(":last").remove();
                $.each(session.exercices, function(i, exercice) {
                    generator.display.exercice(i + 1, exercice, response)
                });
                if (session.exercices.length > 0) {
                    $("#session-exercices").find(":last").remove();
                }
                if (Object.keys(response).length && $("#_exercice").length) {
                    $.ajax({
                        type: "POST",
                        url: "/api/exercice",
                        success: function(response) {
                            let last_exercice = $("#session-exercices").children().last();
                            let last_exercice_id = last_exercice.attr("id");
                            let sequence = $("#" + last_exercice_id + "-sequence").val();
                            if (sequence === "true") {
                                let parts = $("#" + last_exercice_id).children().length - 2;
                                for (let part = 1; part <= parts; part++) {
                                    let id = $("#" + last_exercice_id + "-part-" + part + "-id").val();
                                    let equipment = $("#" + last_exercice_id + "-part-" + part + "-equipment").val();
                                    selector.select(response[id], equipment);
                                }
                            }
                            else {
                                let id = $("#" + last_exercice_id + "-id").val();
                                let equipment = $("#" + last_exercice_id + "-equipment").val();
                                selector.select(response[id], equipment);
                            }
                            generator.display.add_form();
                        },
                    });
                }
            }
        });
    },
    exercice: function(exercice_index, exercice, sets) {
        let exercice_id = "exercice-" + exercice_index;
        $("#session-exercices")
            .append($("<article></article")
                .attr("id", exercice_id)
                .addClass("px-1 px-md-2 mt-4 mt-md-3 pt-md-4")
                .append($("<input>")
                    .attr("id", "exercice-" + exercice_index + "-sequence")
                    .val(exercice.sequence)
                    .attr("hidden", true)
                )
                .append(!exercice.sequence ? $("<input>")
                    .attr("id", "exercice-" + exercice_index + "-id")
                    .val(exercice.id)
                    .attr("hidden", true): null
                )
                .append(!exercice.sequence ? $("<input>")
                    .attr("id", "exercice-" + exercice_index + "-equipment")
                    .val(exercice.equipment)
                    .attr("hidden", true): null
                )
                .append($("<h5></h5>")
                    .attr("id", "exercice-" + exercice_index + "-title")
                    .addClass("text-white")
                )
            )
        ;
        if (exercice.sequence) {
            $.each(exercice.exercices, function(j, exercice_part) {
                let exercice_part_index = j + 1;
                let exercice_part_id = exercice_id + "-part-" + exercice_part_index;
                let exercice_part_title = exercice_part.fullname;
                $("#exercice-" + exercice_index)
                    .append($("<article></article>")
                        .attr("id", exercice_part_id)
                        .addClass("px-2 mx-md-3")
                        .append($("<input>")
                            .attr("id", exercice_part_id + "-id")
                            .val(exercice_part.id)
                            .attr("hidden", true)
                        )
                        .append($("<input>")
                            .attr("id", exercice_part_id + "-equipment")
                            .val(exercice_part.equipment)
                            .attr("hidden", true)
                        )
                        .append($("<h6></h6>")
                            .attr("id", exercice_part_id + "-title")
                            .text(exercice_part_title)
                        )
                    )
                ;
                generator.display.exercice_part(exercice_part_id, exercice_part, sets)
            });
        }
        else {
            generator.display.exercice_part(exercice_id, exercice, sets)
        }
        $("#exercice-" + exercice_index + "-title").text(exercice.fullname);
    },
    exercice_part: function(prefix, exercice, sets) {
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
                .append($("<th></th>")
                    .attr("scope", "col")
                    .attr("colspan", 3)
                    .addClass("text-center text-body")
                    .text(translator.translate("tempo"))
                )
            )
        ;
        $.each(exercice.sets, function(i, set) {
            generator.display.set(prefix, i + 1, set, sets);
        });
    },
    set: function(prefix, set_index, set, sets) {
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
                .append($("<td></td>")
                    .attr("id", set_id + "-tempo")
                    .addClass("text-center")
                )
                .append($("<td></td>")
                    .attr("id", set_id + "-id")
                    .attr("hidden", "")
                )
                .append($("<td></td>")
                    .attr("id", set_id + "-dropping")
                    .attr("hidden", "")
                )
            )
        ;
        $.each(set, function(j, set_part_id) {
            generator.display.set_part(set_id, set_part_id, sets);
        });
        if ($("#_edit").length) {
            $("#" + set_id)
                .attr("data-bs-toggle", "modal")
                .attr("data-bs-target", "#_edit")
                .addClass("pointer-only")
                .on("click", function() {
                    let exercice_index = set_id.split("-")[1];
                    let forms = $(".form-tempo");
                    forms.addClass("d-none");
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
                            generator.display.edit_form_part("exercice-" + exercice_index + "-part-" + exercice_part_index, set_index, true);
                            exercice_part_index++;
                            next_exists = $("#exercice-" + exercice_index + "-part-" + exercice_part_index + "-set-" + set_index).length ? true: false;
                        }
                    }
                    else {
                        generator.display.edit_form_part(prefix, set_index);
                    }
                })
            ;
        }
    },
    set_part: function(set_id, set_part_id, sets) {
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
                .text(String(set_part.weight).replace(".", ","))
            )
        ;
        $("#" + set_id + "-tempo")
            .append($("<p></p>")
                .attr("id", set_part_id + "-tempo")
                .addClass("mb-0 text-white")
            )
        ;
        generator.display.tempo(set_part_id, set_part.concentric, set_part.isometric, set_part.eccentric);
        $("#" + set_id + "-id")
            .append($("<p></p>")
                .attr("id", set_part_id + "-id")
                .text(set_part.id)
            )
        ;
        $("#" + set_id + "-dropping")
            .append($("<p></p>")
                .attr("id", set_part_id + "-dropping")
                .addClass("mb-0 text-white")
                .text(set_part.dropping)
            )
        ;
    },
    tempo: function(set_part_id, concentric, isometric, eccentric) {
        let tempo = (concentric && concentric > 1) || (isometric && isometric > 1) || (eccentric && eccentric > 1);
        $("#" + set_part_id + "-tempo")
            .empty()
            .append($("<span></span>")
                .attr("id", set_part_id + "-concentric")
                .addClass("d-inline-block")
                .text(tempo ? (concentric ? concentric: 1): null)
            )
            .append(tempo ? "-": null)
            .append($("<span></span>")
                .attr("id", set_part_id + "-isometric")
                .addClass("d-inline-block")
                .text(tempo ? (isometric ? isometric: 1): null)
            )
            .append(tempo ? "-": null)
            .append($("<span></span>")
                .attr("id", set_part_id + "-eccentric")
                .addClass("d-inline-block")
                .text(tempo ? (eccentric ? eccentric: 1): null)
            )
            .append(tempo ? null: "∅")
        ;
    },
    edit_form_part: function(prefix, set_index, sequence = false) {
        let edit_set_id = "_edit-" + prefix + "-set-" + set_index;
        $("#_edit-form")
            .append($("<article></article>")
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
            .append($("<section></section>")
                .attr("id", edit_set_id + "-parts")
            )
        ;
        $.each($("#" + prefix + "-set-" + set_index + "-id").children(), function(i, set_part) {
            let set_part_id = set_part.innerText;
            generator.display.form_set_part(edit_set_id, set_part_id, $("#" + set_part_id + "-dropping").text() === "true");
        });
    },
    add_form: function() {
        let size = $("#section-selected-exercices").children().length;
        if (size) {
            let sequence = size > 1;
            let title = "";
            if (sequence) {
                $.each($("#section-selected-exercices").children(), function(index, exercice) {
                    title += $("#" + exercice.id + "-title").text() + " (" + translator.translate($("#" + exercice.id + "-equipment").val()) + "), ";
                })
                title = title.slice(0, -2);
            }
            else {
                let exercice = $("#section-selected-exercices").children()[0];
                title = $("#" + exercice.id + "-title").text() + " (" + translator.translate($("#" + exercice.id + "-equipment").val()) + ")";
            }
            $("#_add-form")
                .empty()
                .append($("<input>")
                    .attr("id", "fullname")
                    .attr("name", "fullname")
                    .attr("hidden", true)
                    .val(title)
                )
                .append($("<input>")
                    .attr("id", "size")
                    .attr("name", "size")
                    .attr("hidden", true)
                    .val(size)
                )
                .append($("<h5></h5>")
                    .addClass("text-white")
                    .text(title)
                )
            ;
            $.each($("#section-selected-exercices").children(), function(index, exercice) {
                let new_set_id = "_add-set-" + index;
                $("#_add-form")
                    .append($("<article></article>")
                        .addClass(index === $("#section-selected-exercices").children().length - 1 ? "": "mb-2")
                        .attr("id", new_set_id)
                    )
                ;
                if (sequence) {
                    $("#" + new_set_id)
                        .addClass("px-1 px-md-2")
                        .append($("<h6></h6>")
                            .addClass("mt-2 mb-1")
                            .attr("id", new_set_id + "-title")
                            .text($("#" + exercice.id + "-title").text() + " (" + translator.translate($("#" + exercice.id + "-equipment").val()) + ")")
                        )
                    ;
                }
                $("#" + new_set_id)
                    .append($("<section></section>")
                        .attr("id", new_set_id + "-parts")
                    )
                    .append($("<section></section>")
                        .attr("id", new_set_id + "-drop")
                        .addClass("d-flex")
                        .append($("<div></div>")
                            .addClass("col-8")
                            .append($("<a></a>")
                                .text("+ " + translator.translate("add_dropset"))
                                .addClass("add-drop-set text-decoration-none pointer-only")
                                .on("click", function() {
                                    generator.display.form_set_part(new_set_id, Date.now(), true, true, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
                                    $("#" + new_set_id + "-drop-delete").attr("hidden", false);
                                })
                            )
                        )
                        .append($("<div></div>")
                            .attr("id", new_set_id + "-drop-delete")
                            .attr("hidden", true)
                            .addClass("col-4 text-end")
                            .append($("<a></a>")
                            .text(translator.translate("delete_dropset"))
                                .addClass("text-decoration-none pointer-only")
                                .on("click", function() {
                                    $("#" + new_set_id + "-parts").children().last().remove();
                                    if ($("#" + new_set_id + "-parts").children().length === 1) {
                                        $("#" + new_set_id + "-drop-delete").attr("hidden", true);
                                    }
                                })
                            )
                        )
                    )
                ;
                generator.display.form_set_part(new_set_id, Date.now(), false, true, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
            });
        }
    },
    form_set_part: function(prefix, set_part_id, is_dropping = false, is_new = false, exercice_id = null, equipment = null) {
        let form_set_part_id = (is_new ? "_add-": "_edit-") + set_part_id;
        $("#" + prefix + "-parts")
            .append($("<div></div>")
                .attr("id", form_set_part_id)
                .addClass(is_dropping ? "set-part drop-set": "set-part")
                .append($("<section></section>")
                    .addClass("d-flex py-1")
                    .append($("<div></div>")
                        .addClass("col-6 pe-2")
                        .append($("<select></select>")
                            .attr("id", form_set_part_id + "-symmetry")
                            .attr("name", "sets[" + set_part_id + "][symmetry]")
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
                            .attr("id", form_set_part_id + "-repetitions")
                            .attr("name", "sets[" + set_part_id + "][repetitions]")
                            .addClass("form-control text-center" + (is_new ? " add-input-required": " edit-input-required"))
                            .attr("placeholder", translator.translate("repetitions"))
                            .val($("#" + set_part_id + "-repetitions").text())
                            .on("input", function() {
                                $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                            })
                        )
                    )
                    .append($("<div></div>")
                        .addClass("col-3 ps-1")
                        .append($("<input>")
                            .attr("id", form_set_part_id + "-weight")
                            .attr("name", "sets[" + set_part_id + "][weight]")
                            .addClass("form-control text-center" + (is_new ? " add-input-required": " edit-input-required"))
                            .attr("placeholder", translator.translate("weight"))
                            .val($("#" + set_part_id + "-weight").text())
                            .on("input", function() {
                                $(this).val($(this).val().replace(/[^0-9,]/g, "").substring(0, 6));
                            })
                        )
                    )
                )
                .append($("<section></section>")
                    .attr("id", form_set_part_id + "-tempo")
                    .addClass("form-tempo py-1 d-none")
                    .append($("<div></div>")
                        .addClass("d-flex")
                        .append($("<div></div>")
                            .addClass("col-9 d-flex justify-content-end align-items-center")
                            .append($("<span></span>")
                                .text(translator.translate("concentric"))
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 ps-1 mb-1")
                            .append($("<input>")
                                .attr("id", form_set_part_id + "-concentric")
                                .attr("name", "sets[" + set_part_id + "][concentric]")
                                .attr("placeholder", 1)
                                .addClass("form-control text-center mx-auto tempo-input")
                                .val($("#" + set_part_id + "-concentric").text() &&  $("#" + set_part_id + "-concentric").text() !== "1" ? $("#" + set_part_id + "-concentric").text(): null)
                                .on("input", function() {
                                    $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 2));
                                })
                            )
                        )
                    )
                    .append($("<div></div>")
                        .addClass("d-flex")
                        .append($("<div></div>")
                            .addClass("col-9 d-flex justify-content-end align-items-center")
                            .append($("<span></span>")
                                .text(translator.translate("isometric"))
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 ps-1")
                            .append($("<input>")
                                .attr("id", form_set_part_id + "-isometric")
                                .attr("name", "sets[" + set_part_id + "][isometric]")
                                .attr("placeholder", 1)
                                .addClass("form-control text-center mx-auto tempo-input")
                                .val($("#" + set_part_id + "-isometric").text() && $("#" + set_part_id + "-isometric").text() !== "1" ? $("#" + set_part_id + "-isometric").text(): null)
                                .on("input", function() {
                                    $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 2));
                                })
                            )
                        )
                    )
                    .append($("<div></div>")
                        .addClass("d-flex")
                        .append($("<div></div>")
                            .addClass("col-9 d-flex justify-content-end align-items-center")
                            .append($("<span></span>")
                                .text(translator.translate("eccentric"))
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 ps-1 mt-1")
                            .append($("<input>")
                                .attr("id", form_set_part_id + "-eccentric")
                                .attr("name", "sets[" + set_part_id + "][eccentric]")
                                .attr("placeholder", 1)
                                .addClass("form-control text-center mx-auto tempo-input")
                                .val($("#" + set_part_id + "-eccentric").text() && $("#" + set_part_id + "-eccentric").text() !== "1" ? $("#" + set_part_id + "-eccentric").text(): null)
                                .on("input", function() {
                                    $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 2));
                                })
                            )
                        )
                    )
                )
                .on("click keyup", function() {
                    let forms = $(".form-tempo");
                    forms.addClass("d-none");
                    $("#" + form_set_part_id + "-tempo").removeClass("d-none");
                })
                .append($("<input>")
                    .attr("id", form_set_part_id + "-dropping")
                    .attr("name", "sets[" + set_part_id + "][dropping]")
                    .attr("hidden", true)
                    .val(is_dropping)
                )
                .append(is_new ? $("<input>")
                    .attr("id", form_set_part_id + "-exercice")
                    .attr("name", "sets[" + set_part_id + "][exercice]")
                    .attr("hidden", true)
                    .val(exercice_id): null
                )
                .append(is_new ? $("<input>")
                    .attr("id", form_set_part_id + "-equipment")
                    .attr("name", "sets[" + set_part_id + "][equipment]")
                    .attr("hidden", true)
                    .val(equipment): null
                )
            )
        ;
    },
    searchOutput: function(search = null, equipment = null) {
        $.ajax({
            type: "POST",
            url: "/session/exercice/search",
            data: {
                search: search,
                equipment: equipment,
            },
            success: function(response) {
                $("#exercice-list").empty();
                $.each(response, function(id, exercice) {
                    $("#exercice-list")
                        .append($("<option></option>")
                            .val(id)
                            .text(exercice.name)
                            .on("click", function() {
                                let equipment = $("#exercice-equipment").val() !== "" ? $("#exercice-equipment").val(): null;
                                selector.select(exercice, equipment);
                            })
                        )
                    ;
                });
            },
        });
    },
}

export var generator = {
    display: display,
};

export var selector = {
    select: function(exercice, equipment = null) {
        if (!$("#minimum-message").hasClass("d-none")) {
            $("#minimum-message").addClass("d-none");
            $("#button-choose").attr("disabled", false);
        }
        let uniqueId = Date.now();
        $("#section-selected-exercices")
            .append($("<article></article>")
                .attr("id", "selected-" + uniqueId)
                .addClass("d-flex align-items-center text-truncate py-1")
                .append($("<div></div>")
                    .attr("id", "selected-" + uniqueId + "-title")
                    .addClass("col-7 text-white text-end pe-2 pe-md-3")
                    .text(exercice.name)
                )
                .append($("<div></div>")
                    .addClass("col-4")
                    .append($("<select></select>")
                        .attr("id", "selected-" + uniqueId + "-equipment")
                        .addClass("form-select")
                    )
                )
                .append($("<div></div>")
                    .addClass("col-1 text-center")
                    .append($("<i></i>")
                        .addClass("fa-solid fa-xmark pointer")
                    )
                    .on("click", function() {
                        $("#selected-" + uniqueId).remove();
                        if ($("#section-selected-exercices").children().length < 1) {
                            if ($("#minimum-message").hasClass("d-none")) {
                                $("#minimum-message").removeClass("d-none");
                                $("#button-choose").attr("disabled", true);
                            }
                        }
                    })
                )
                .append($("<div></div>")
                    .attr("id", "selected-" + uniqueId + "-id")
                    .text(exercice.id)
                    .attr("hidden", true)
                )
            )
        ;
        $.each(exercice.equipments, function(index, value) {
            $("#selected-" + uniqueId + "-equipment")
                .append($("<option></option>")
                    .val(value)
                    .text(translator.translate(value).charAt(0).toUpperCase() + translator.translate(value).slice(1))
                )
            ;
        });
        if (equipment) {
            $("#selected-" + uniqueId + "-equipment").val(equipment);
        }
    }
}