let translations = [];
translations["bilateral"] = "Bilatéral";
translations["unilateral"] = "Unilatéral";
translations["bodyweight"] = "poids du corps";
translations["band"] = "élastique";
translations["barbell"] = "barre";
translations["dumbbell"] = "haltères";
translations["cable"] = "poulie";
translations["smith"] = "barre guidée";
translations["machine"] = "machine";

import {
    trans,
    VALIDATOR_TITLE_EMPTY,
    VALIDATOR_TITLE_SIZE_MAX,
    VALIDATOR_NAME_EMPTY,
    VALIDATOR_NAME_SIZE_MAX,
    VALIDATOR_FIRSTNAME_CHARACTERS,
    VALIDATOR_FIRSTNAME_EXTREMITIES,
    VALIDATOR_FIRSTNAME_SIZE_MAX,
    VALIDATOR_SURNAME_CHARACTERS,
    VALIDATOR_SURNAME_EXTREMITIES,
    VALIDATOR_SURNAME_SIZE_MAX,
    VALIDATOR_USERNAME_CHARACTERS,
    VALIDATOR_USERNAME_SIZE_MIN,
    VALIDATOR_USERNAME_SIZE_MAX,
    VALIDATOR_EMAIL_FORMAT,
    VALIDATOR_EMAIL_SIZE_MAX,
    VALIDATOR_PASSWORD_SIZE_MIN,
    VALIDATOR_PASSWORD_SIZE_MAX,
    VALIDATOR_PASSWORD_CONFIRMATION,
    SET,
    SYMMETRY_LABEL,
    SYMMETRY_UNILATERAL,
    SYMMETRY_BILATERAL,
    REPETITIONS,
    WEIGHT,
    TEMPO_LABEL,
    TEMPO_CONCENTRIC,
    TEMPO_ISOMETRIC,
    TEMPO_ECCENTRIC,
    DROPSET_ADD,
    DROPSET_DELETE,
    BODYWEIGHT,
    BAND,
    BARBELL,
    DUMBBELL,
    CABLE,
    SMITH,
    MACHINE,
} from '../translator';

export let Translator = {
    translate: {
        symmetry: function(symmetry) {
            switch (symmetry) {
                case "unilateral":
                    return trans(SYMMETRY_UNILATERAL);
                case "bilateral":
                    return trans(SYMMETRY_BILATERAL);
                default:
                    return symmetry;
            }
        },
        equipment: function(equipment) {
            switch (equipment) {
                case "bodyweight":
                    return trans(BODYWEIGHT);
                case "band":
                    return trans(BAND);
                case "barbell":
                    return trans(BARBELL);
                case "dumbbell":
                    return trans(DUMBBELL);
                case "cable":
                    return trans(CABLE);
                case "smith":
                    return trans(SMITH);
                case "machine":
                    return trans(MACHINE);
                default:
                    return equipment;
            }
        },
    },
};    

export let Validator = {
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
    verify: {
        title: function(title, help = false) {
            if (help) {
                $("#help-title").text(trans(VALIDATOR_TITLE_EMPTY));
                Validator.setInvalid(title);
            }
            if (title.val() !== "") {
                if (title.val().length > 64) {
                    $("#help-title").text(trans(VALIDATOR_TITLE_SIZE_MAX));
                }
                else {
                    $("#help-title").text("");
                    Validator.setValid(title);
                    return true;
                }
            }
            return false;
        },
        name: function(name, help = false) {
            if (help) {
                $("#help-name").text(trans(VALIDATOR_NAME_EMPTY));
                Validator.setInvalid(name);
            }
            if (name.val() !== "") {
                if (name.val().length > 48) {
                    $("#help-name").text(trans(VALIDATOR_NAME_SIZE_MAX));
                }
                else {
                    $("#help-name").text("");
                    Validator.setValid(name);
                    return true;
                }
            }
            return false;
        },
        measurement: function(height, weight) {
            let height_value = parseFloat(height.val().replace(",", "."));
            let weight_value = parseFloat(weight.val().replace(",", "."));
            if (
                (
                    !height_value && 
                    !weight_value
                ) || (
                    height_value >= 1.2 &&
                    height_value <= 2.2 &&
                    weight_value >= 20 &&
                    weight_value <= 200
                )
            ) {
                return true;
            }
            return false;
        },
        firstname: function(firstname, help = false) {
            if (help) {
                Validator.setNeutral(firstname);
            }
            if (firstname.val() !== "") {
                if (help) { Validator.setInvalid(firstname); }
                firstname.val(firstname.val().split(new RegExp(/(\s|-)+/)).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(""));
                if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(firstname.val())) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_FIRSTNAME_CHARACTERS)); }
                    return false;
                }
                else if (firstname.val() !== firstname.val().trim().replace(/^-+|-+$/g, '')) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_FIRSTNAME_EXTREMITIES)); }
                    return false;
                }
                else if (firstname.val().length > 24) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_FIRSTNAME_SIZE_MAX)); }
                    return false;
                }
                else {
                    if (help) { Validator.setValid(firstname); }
                }
            }
            return true;
        },
        surname: function(surname, help = false) {
            if (help) {
                Validator.setNeutral(surname);
            }
            if (surname.val() !== "") {
                if (help) { Validator.setInvalid(surname); }
                surname.val(surname.val().split(new RegExp(/(\s|-)+/)).map(word => word.toUpperCase()).join(""));
                if (!new RegExp(/^[a-zA-Zà-üÀ-Ü-\s]+$/).test(surname.val())) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_SURNAME_CHARACTERS)); }
                    return false;
                }
                else if (surname.val() !== surname.val().trim().replace(/^-+|-+$/g, '')) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_SURNAME_EXTREMITIES)); }
                    return false;
                }
                else if (surname.val().length > 24) {
                    if (help) { $("#help-fullname").text(trans(VALIDATOR_SURNAME_SIZE_MAX)); }
                    return false;
                }
                else {
                    if (help) { Validator.setValid(surname); }
                }
            }
            return true;
        },
        username: function(username, help = false) {
            if (help) {
                $("#help-username").text("");
                Validator.setNeutral(username);
            }
            if (username.val() !== "") {
                if (help) { Validator.setInvalid(username); }
                if (!new RegExp(/^[a-zA-Z0-9_]+$/).test(username.val())) {
                    if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_CHARACTERS)); }
                }
                else if (username.val().length < 2) {
                    if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_SIZE_MIN)); }
                }
                else if (username.val().length > 16) {
                    if (help) { $("#help-username").text(VALIDATOR_USERNAME_SIZE_MAX); }
                }
                else {
                    if (help) { Validator.setValid(username); }
                    return true;
                }
            }
            return false;
        },
        email: function(email, help = false, edit = false) {
            if (help) {
                $("#help-email").text("");
                Validator.setNeutral(email);
            }
            if (email.val() !== "" || edit) {
                if (help) { Validator.setInvalid(email); }
                email.val(email.val().toLowerCase());
                if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.val())) {
                    if (help) { $("#help-email").text(trans(VALIDATOR_EMAIL_FORMAT)); }
                }
                else if (email.val().length > 128) {
                    if (help) { $("#help-email").text(VALIDATOR_EMAIL_SIZE_MAX); }
                }
                else {
                    if (help) { Validator.setValid(email); }
                    return true;
                }
            }
            return false;
        },
        password: function(password, help = false) {
            if (help) {
                $("#help-password").text("");
                Validator.setNeutral(password);
            }
            if (password.val() !== "") {
                if (help) { Validator.setInvalid(password); }
                if (password.val().length < 8) {
                    if (help) { $("#help-password").text(trans(VALIDATOR_PASSWORD_SIZE_MIN)); }
                }
                else if (password.val().length > 48) {
                    if (help) { $("#help-password").text(trans(VALIDATOR_PASSWORD_SIZE_MAX)); }
                }
                else {
                    if (help) { Validator.setValid(password); }
                    return true;
                }
            }
            return false;
        },
        confirmation: function(confirmation, password, help = false) {
            if (help) {
                $("#help-confirmation").text("");
                Validator.setInvalid(confirmation);
            }
            if (confirmation.val() !== password.val()) {
                if (help) { $("#help-confirmation").text(trans(VALIDATOR_PASSWORD_CONFIRMATION)); }
            }
            else {
                if (help) { Validator.setValid(confirmation); }
                return true;
            }
            return false;
        },
        session_form: function(form) {
            let hide = false;
            $.each($("." + form + "-input-required"), function(index, input) {
                if ($(input).val() === "" || !$(input).val().match(/^(?=(?:\d,?){0,6}$)\d+(?:,\d{1,2})?$/)) {
                    $(input).removeClass("border-valid").addClass("border-invalid");
                    hide = true;
                }
                else {
                    $(input).removeClass("border-invalid").addClass("border-valid");
                }
            });
            $("#button-" + form + "-set").attr("disabled", hide);
        },
        profile_form: function() {
            let fullname = false;
            if (Validator.verify.firstname($("#profile_firstname"),) && Validator.verify.surname($("#profile_surname"))) {
                $("#help-fullname").html("");
                fullname = true;
            }
            let email = Validator.verify.email($("#profile_email"), true, true);
            let password = true;
            if ($("#profile_password").val()) {
                password = false;
            }
            if (Validator.verify.password($("#profile_password"), true)) {
                $("#section-confirmation").prop("hidden", false);
                if (Validator.verify.confirmation($("#profile_confirmation"), $("#profile_password"), true)) {
                    password = true;
                }
            }
            else {
                $("#section-confirmation").prop("hidden", true);
                $("#profile_confirmation").val("");
            }
            let submit = $("#profile_submit");
            picture && fullname && email && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
        }
    },
};

export let Generator = {
    render: {
        bmi: function() {
            let height_value = parseFloat($("#measurement_height").val().replace(',', '.'));
            let weight_value = parseFloat($("#measurement_weight").val().replace(',', '.'));
            if (
                $("#measurement_height").val() != "" &&
                $("#measurement_weight").val() != "" &&
                height_value >= 1.2 &&
                height_value <= 2.2 &&
                weight_value >= 20 &&
                weight_value <= 200
            ) {   
                let bmi = weight_value / (height_value * height_value);
                if (
                    $("#measurement_height").val() != "" &&
                    $("#measurement_weight").val() != ""
                ) {
                    $("#measurement_bmi").val((Math.ceil(bmi * 10) / 10).toString().replace('.', ','));
                }
            }
            else {
                $("#measurement_bmi").val("");
            }
        },
        session: function(id) {
            $.ajax({
                url: "/api/session?id=" + id,
                type: "GET",
                dataType: "json",
                success: function(response) {
                    Timer.start(response[id].start, "session-timer");
                    $("#session-exercices")
                        .empty()
                    ;
                    Generator.render.exercices(response[id]);
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
                    if (response.length === 0) {
                        $("#welcome").attr("hidden", false);
                    }
                    if ($("#session-delete").length) {
                        $("#session-delete").attr("hidden", false);
                    }
                    $.each(session.exercices, function(i, exercice) {
                        Generator.render.exercice(i + 1, exercice, response)
                    });
                    if (Object.keys(response).length && $("#_select_exercice").length) {
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
                                        Selector.select.exercice(response[id], equipment);
                                    }
                                }
                                else {
                                    let id = $("#" + last_exercice_id + "-id").val();
                                    let equipment = $("#" + last_exercice_id + "-equipment").val();
                                    Selector.select.exercice(response[id], equipment);
                                }
                                Generator.render.add_form();
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
                    .addClass("mt-3 pt-1 pt-md-3")
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
                    Generator.render.exercice_part(exercice_part_id, exercice_part, sets)
                });
            }
            else {
                Generator.render.exercice_part(exercice_id, exercice, sets)
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
                        .text(trans(SYMMETRY_LABEL))
                    )
                    .append($("<th></th>")
                        .attr("scope", "col")
                        .addClass("text-center text-body")
                        .text(trans(REPETITIONS))
                    )
                    .append($("<th></th>")
                        .attr("scope", "col")
                        .addClass("text-center text-body")
                        .text(trans(WEIGHT))
                    )
                    .append($("<th></th>")
                        .attr("scope", "col")
                        .attr("colspan", 3)
                        .addClass("text-center text-body")
                        .text(trans(TEMPO_LABEL))
                    )
                )
            ;
            $.each(exercice.sets, function(i, set) {
                Generator.render.set(prefix, i + 1, set, sets);
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
                Generator.render.set_part(set_id, set_part_id, sets);
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
                                Generator.render.edit_form_part("exercice-" + exercice_index + "-part-" + exercice_part_index, set_index, true);
                                exercice_part_index++;
                                next_exists = $("#exercice-" + exercice_index + "-part-" + exercice_part_index + "-set-" + set_index).length ? true: false;
                            }
                        }
                        else {
                            Generator.render.edit_form_part(prefix, set_index);
                        }
                        Validator.verify.session_form("edit");
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
                    .text(Translator.translate.symmetry(set_part.symmetry))
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
                    .text(String(Math.floor(($("#athlete-unit").text() === "lbs" ? set_part.weight / 0.45359237: set_part.weight) * 100) / 100).replace(".", ","))
                )
            ;
            $("#" + set_id + "-tempo")
                .append($("<p></p>")
                    .attr("id", set_part_id + "-tempo")
                    .addClass("mb-0 text-white")
                )
            ;
            Generator.render.tempo(set_part_id, set_part.concentric, set_part.isometric, set_part.eccentric);
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
                Generator.render.form_set_part(edit_set_id, set_part_id, $("#" + set_part_id + "-dropping").text() === "true");
            });
        },
        add_form: function() {
            let size = $("#section-selected-exercices").children().length;
            if (size) {
                let sequence = size > 1;
                let title = "";
                if (sequence) {
                    $.each($("#section-selected-exercices").children(), function(index, exercice) {
                        title += $("#" + exercice.id + "-title").text() + " (" + Translator.translate.equipment($("#" + exercice.id + "-equipment").val()) + "), ";
                    })
                    title = title.slice(0, -2);
                }
                else {
                    let exercice = $("#section-selected-exercices").children()[0];
                    title = $("#" + exercice.id + "-title").text() + " (" + Translator.translate.equipment($("#" + exercice.id + "-equipment").val()) + ")";
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
                                .text($("#" + exercice.id + "-title").text() + " (" + Translator.translate.equipment($("#" + exercice.id + "-equipment").val()) + ")")
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
                                    .text("+ " + trans(DROPSET_ADD))
                                    .addClass("add-drop-set text-decoration-none pointer-only")
                                    .on("click", function() {
                                        Generator.render.form_set_part(new_set_id, Date.now(), true, true, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
                                        $("#" + new_set_id + "-drop-delete").attr("hidden", false);
                                    })
                                )
                            )
                            .append($("<div></div>")
                                .attr("id", new_set_id + "-drop-delete")
                                .attr("hidden", true)
                                .addClass("col-4 text-end")
                                .append($("<a></a>")
                                .text(trans(DROPSET_DELETE))
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
                    Generator.render.form_set_part(new_set_id, Date.now(), false, true, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
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
                                    .text(trans(SYMMETRY_UNILATERAL))
                                )
                                .append($("<option></option>")
                                    .val("bilateral")
                                    .text(trans(SYMMETRY_BILATERAL))
                                )
                                .val($("#" + set_part_id + "-symmetry").text() === Translator.translate.equipment("unilateral") ? "unilateral": "bilateral")
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 pe-1")
                            .append($("<input>")
                                .attr("id", form_set_part_id + "-repetitions")
                                .attr("name", "sets[" + set_part_id + "][repetitions]")
                                .addClass("form-control text-center" + (is_new ? " add-input-required": " edit-input-required"))
                                .attr("placeholder", trans(REPETITIONS))
                                .val($("#" + set_part_id + "-repetitions").text())
                                .on("input", function() {
                                    $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 4));
                                })
                            )
                        )
                        .append($("<div></div>")
                            .addClass("col-3 ps-1")
                            .append($("<input>")
                                .attr("id", form_set_part_id + "-weight")
                                .attr("name", "sets[" + set_part_id + "][weight]")
                                .addClass("form-control text-center" + (is_new ? " add-input-required": " edit-input-required"))
                                .attr("placeholder", trans(WEIGHT))
                                .val($("#" + set_part_id + "-weight").text())
                                .on("input", function() {
                                    $(this).val($(this).val().replace(".", ",").replace(/[^0-9,]/g, "").substring(0, 7));
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
                                    .text(trans(TEMPO_CONCENTRIC))
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
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                                    })
                                )
                            )
                        )
                        .append($("<div></div>")
                            .addClass("d-flex")
                            .append($("<div></div>")
                                .addClass("col-9 d-flex justify-content-end align-items-center")
                                .append($("<span></span>")
                                    .text(trans(TEMPO_ISOMETRIC))
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
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                                    })
                                )
                            )
                        )
                        .append($("<div></div>")
                            .addClass("d-flex")
                            .append($("<div></div>")
                                .addClass("col-9 d-flex justify-content-end align-items-center")
                                .append($("<span></span>")
                                    .text(trans(TEMPO_ECCENTRIC))
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
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
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
            let suffixes = [
                "repetitions",
                "weight",
                "concentric",
                "isometric",
                "eccentric",
            ];
            suffixes.forEach(suffix => {
                let input = document.getElementById(form_set_part_id + "-" + suffix);
                input.setAttribute("inputmode", "decimal");
            });
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
                    if (!Object.keys(response).length) {
                        $("#empty-list").removeClass("d-none")
                    }
                    else {
                        $("#empty-list").addClass("d-none")
                    }
                    $("#exercice-list").empty();
                    $.each(response, function(id, exercice) {
                        $("#exercice-list")
                            .append($("<tr></tr>")
                                .addClass("pointer-only")
                                .append($("<td></td>")
                                    .addClass("text-body pointer-text")
                                    .val(id)
                                    .text(exercice.name)
                                    .on("click", function() {
                                        let equipment = $("#exercice-equipment").val() !== "" ? $("#exercice-equipment").val(): null;
                                        Selector.select.exercice(exercice, equipment);
                                    })
                                )
                                .append($("<td></td>")
                                    .addClass("text-end align-middle edit-exercice text-nowrap")
                                    .append($("<a></a>")
                                        .addClass("text-decoration-none")
                                        .append($("<i></i>")
                                            .addClass("fa-solid fa-pen-to-square")
                                        )
                                        .on("click", function() {
                                            alert("ok");
                                        })
                                    )
                                )
                            )
                        ;
                    });
                },
            });
        },
    },
};

export let Selector = {
    select: {
        exercice: function(exercice, equipment = null) {
            if (!$("#minimum-message").hasClass("d-none")) {
                $("#minimum-message").addClass("d-none");
                $("#button-choose-exercice").attr("disabled", false);
            }
            let uniqueId = Date.now();
            $("#section-selected-exercices")
                .append($("<article></article>")
                    .attr("id", "selected-" + uniqueId)
                    .addClass("d-flex align-items-center py-1")
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
                                    $("#button-choose-exercice").attr("disabled", true);
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
                        .text(Translator.translate.equipment(value).charAt(0).toUpperCase() + Translator.translate.equipment(value).slice(1))
                    )
                ;
            });
            if (equipment) {
                $("#selected-" + uniqueId + "-equipment").val(equipment);
            }
        },
    },
}

export var Timer = {
    start(start, timer_id) {
        start = new Date(start).getTime();
        setInterval(function() {
            let current = Date.now();
            let difference = current - start;
            let seconds = Math.floor(difference / 1000);
            let days = Math.floor(seconds / 86400);
            seconds = seconds % 86400;
            let hours = Math.floor(seconds / 3600);
            seconds = seconds % 3600;
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            $("#" + timer_id + "-separator").text(days ? ":": "");
            $("#" + timer_id + "-days").text(days ? days: "");
            $("#" + timer_id + "-hours").text(hours < 10 ? "0" + hours: hours);
            $("#" + timer_id + "-minutes").text(minutes < 10 ? "0" + minutes: minutes);
            $("#" + timer_id + "-seconds").text(seconds < 10 ? "0" + seconds: seconds);
        }, 1000);
    }
}