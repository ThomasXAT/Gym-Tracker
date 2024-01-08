const SET_SUFFIXES = [
    "repetitions",
    "weight",
    "concentric",
    "isometric",
    "eccentric",
];

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

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
    VALIDATOR_USERNAME_EMPTY,
    VALIDATOR_USERNAME_CHARACTERS,
    VALIDATOR_USERNAME_SIZE_MIN,
    VALIDATOR_USERNAME_SIZE_MAX,
    VALIDATOR_USERNAME_TAKEN,
    VALIDATOR_EMAIL_EMPTY,
    VALIDATOR_EMAIL_FORMAT,
    VALIDATOR_EMAIL_SIZE_MAX,
    VALIDATOR_PASSWORD_EMPTY,
    VALIDATOR_PASSWORD_SIZE_MIN,
    VALIDATOR_PASSWORD_SIZE_MAX,
    VALIDATOR_PASSWORD_CONFIRMATION,
    SYMMETRY_UNILATERAL,
    SYMMETRY_BILATERAL,
    REPETITIONS_LABEL,
    WEIGHT,
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
    SEQUENCE_LABEL,
    MAIN_SESSION_EXERCICE_EDIT_TITLE,
    MAIN_SESSION_EXERCICE_EDIT_SUBMIT,
    OBJECTIVE,
    NO_DATA,
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
                    Validator.setNeutral(title);
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
                    height_value >= 0.5 &&
                    height_value <= 3 &&
                    weight_value >= 20 &&
                    weight_value <= 500
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
            if (help) { Validator.setInvalid(username); }
            if (username.val() === "") {
                if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_EMPTY)); }
            }
            else if (!new RegExp(/^[a-zA-Z0-9_]+$/).test(username.val())) {
                if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_CHARACTERS)); }
            }
            else if (username.val().length < 2) {
                if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_SIZE_MIN)); }
            }
            else if (username.val().length > 16) {
                if (help) { $("#help-username").text(trans(VALIDATOR_USERNAME_SIZE_MAX)); }
            }
            else {
                if (help) { Validator.setValid(username); }
                return true;
            }
            return false;
        },
        email: function(email, help = false) {
            if (help) {
                $("#help-email").text("");
                Validator.setNeutral(email);
            }
            if (help) { Validator.setInvalid(email); }
            email.val(email.val().toLowerCase());
            if (email.val() === "") {
                if (help) { $("#help-email").text(trans(VALIDATOR_EMAIL_EMPTY)); }
            }
            else if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.val())) {
                if (help) { $("#help-email").text(trans(VALIDATOR_EMAIL_FORMAT)); }
            }
            else if (email.val().length > 128) {
                if (help) { $("#help-email").text(trans(VALIDATOR_EMAIL_SIZE_MAX)); }
            }
            else {
                if (help) { Validator.setValid(email); }
                return true;
            }
            return false;
        },
        password: function(password, help = false, edit = false) {
            if (help) {
                $("#help-password").text("");
                Validator.setNeutral(password);
            }
            if (!edit || password.val() !== "") {
                if (help) { Validator.setInvalid(password); }
                if (password.val() === "") {
                    if (help) { $("#help-password").text(trans(VALIDATOR_PASSWORD_EMPTY)); }
                }
                else if (password.val().length < 8) {
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
        add_form: function() {
            let hide = false;
            $.each($(".input-required"), function(index, input) {
                if ($(input).val() === "" || !$(input).val().match(/^(?=(?:\d,?){0,6}$)\d+(?:,\d{1,2})?$/)) {
                    $(input).removeClass("border-valid").addClass("border-invalid");
                    hide = true;
                }
                else {
                    $(input).removeClass("border-invalid").addClass("border-valid");
                }
            });
            $("#button-add-set").attr("disabled", hide);
        },
        profile_form: function() {
            let fullname = false;
            if (Validator.verify.firstname($("#profile_firstname"),) && Validator.verify.surname($("#profile_surname"))) {
                $("#help-fullname").html("");
                fullname = true;
            }
            let email = Validator.verify.email($("#profile_email"), true);
            let password = true;
            if ($("#profile_password").val()) {
                password = false;
            }
            if (Validator.verify.password($("#profile_password"), true, true)) {
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
        },
        login_form: function() {
            let username = $("#login_username").val() !== "";
            let password = $("#login_password").val() !== "";
            let submit = $("#login_submit");
            username && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
        },
        register_form: function(response) {
            let fullname = false;
            if (Validator.verify.firstname($("#register_firstname")) && Validator.verify.surname($("#register_surname"))) {
                $("#help-fullname").html("");
                fullname = true;
            }
            let username = false;
            let available = true;
            $.each(response, function(i, athlete) {
                if ($("#register_username").val().toLowerCase() === athlete.username.toLowerCase()) {
                    available = false;
                }
            }); 
            if (!available) {
                $("#help-username").html(trans(VALIDATOR_USERNAME_TAKEN));
                Validator.setInvalid($("#register_username"));
            }
            else {
                username = Validator.verify.username($("#register_username"), true);
            }
            let email = Validator.verify.email($("#register_email"), true);
            let password = false;
            if (Validator.verify.password($("#register_password"), true)) {
                $("#section-confirmation").prop("hidden", false);
                if (Validator.verify.confirmation($("#register_confirmation"), $("#register_password"), true)) {
                    password = true;
                }
            }
            else {
                $("#section-confirmation").prop("hidden", true);
                $("#register_confirmation").val("");
            }
            let submit = $("#register_submit");
            fullname && username && email && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
        }
    },
};

export let Generator = {
    render: {
        bmi: function() {
            if ($("#measurement_bmi").length) {
                let height = parseFloat($("#measurement_height").val().replace(',', '.'));
                let weight = parseFloat($("#measurement_weight").val().replace(',', '.'));
                let bmi = weight / (height * height);
                if (!isNaN(height) && !isNaN(weight) && Validator.verify.measurement($("#measurement_height"), $("#measurement_weight"))) {
                    $("#measurement_bmi").val((Math.round(bmi * 10) / 10).toString().replace('.', ','));
                }
                else {
                    $("#measurement_bmi").val("");
                }
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
                },
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
                    else {
                        $("#set-delete").attr("hidden", false);
                    }
                    if ($("#session-delete").length) {
                        $("#session-delete").attr("hidden", false);
                    }
                    $("#session-exercices")
                        .append($("<table></table>")
                            .addClass("table mb-0")
                            .append($("<tbody></tbody>")
                                .attr("id", "exercices")
                            )
                        )
                    ;
                    $.each(session.exercices, function(i, exercice) {
                        Generator.render.exercice(i + 1, exercice, response)
                    });
                    if ($("#_add").length && Object.keys(session.exercices).length) {
                        $.ajax({
                            url: "/api/exercice?athlete=" + $("#athlete-identifier").text(),
                            type: "GET",
                            dataType: "json",
                            success: function(response) {
                                let last_exercice = session.exercices[session.exercices.length - 1];
                                if (last_exercice.sequence) {
                                    $.each(last_exercice.exercices, function(i, last_exercice_part) {
                                        Selector.select.exercice(response[last_exercice_part.id], last_exercice_part.equipment);
                                    });
                                } 
                                else {
                                    Selector.select.exercice(response[last_exercice.id], last_exercice.equipment);   
                                }
                                Generator.render.add_form();
                                Calculator.update.objective();
                            },
                        });
                    }
                },
            });
        },
        exercice: function(index, exercice, response, part = false, parent_index = null) {
            let exercice_id = "exercice-" + (part ? parent_index + "-part-": "") + index;
            let title = "";
            if (exercice.sequence) {
                $.each(exercice.exercices, function(i, exercice_part) {
                    title += exercice_part.name + " (" + Translator.translate.equipment(exercice_part.equipment) + "), "
                });
                title = title.slice(0, -2);
            }
            else {
                title += exercice.name + " (" + Translator.translate.equipment(exercice.equipment) + ")"
            }
            $("#" + (!part ? "exercices": "exercice-" + parent_index + "-parts"))
                .append($("<tr></tr>")
                    .attr("id", exercice_id)
                    .addClass("border-bottom-0")
                    .append($("<td></td>")
                        .addClass("border-body p-0" + (!part && index !== 1 ? " pt-3": "") + (exercice.sequence || part ? " border-bottom-0": ""))
                        .append($("<table></table>")
                            .addClass("table mb-0" + (!exercice.sequence ? " border-start": "") + (!part ? " border-end": ""))
                            .append($("<tbody></tbody>")
                                .append($("<tr></tr>")
                                    .append($("<td></td>")
                                        .attr("id", exercice_id + "-title")
                                        .attr("colspan", exercice.sequence ? 2: 1)
                                        .addClass("fw-bold" + (!exercice.sequence ? " border-bottom-0" + ((part && index !== 1) || !part ? " border-top": ""): " border-top border-start") + " exercice-title border-body" + (!part ? " text-white": " text-body"))
                                        .text(title)
                                    )
                                )
                                .append(!part && exercice.sequence ? 
                                    $("<tr></tr>")
                                        .addClass("border-bottom-0")
                                        .append(!part ? $("<td></td>")
                                            .addClass("align-middle text-center sequence-label p-0 border-bottom-0")
                                            .append($("<div></div>")
                                                .addClass("text-vertical")
                                                .text(trans(SEQUENCE_LABEL))
                                            ): ""
                                        )
                                        .append($("<td></td>")
                                            .addClass("p-0 border-body")
                                            .append($("<table></table>")
                                                .addClass("table mb-0")
                                                .append($("<tbody></tbody>")
                                                    .attr("id", exercice_id + "-parts")
                                                )
                                            )
                                        ):
                                    $("<tr></tr>")
                                        .addClass("border-bottom-0")
                                        .append($("<table></table>")
                                            .addClass("table mb-0")
                                            .append($("<tbody></tbody>")
                                                .attr("id", exercice_id + "-sets")
                                                .addClass("exercice-sets")
                                            )
                                        )
                                )
                            )
                        )
                    )
                )
            ;
            if (!part && exercice.sequence) {
                $.each(exercice.exercices, function(i, exercice_part) {
                    Generator.render.exercice(i + 1, exercice_part, response, true, index)
                });
            }
            else {
                $.each(exercice.sets, function(i, set) {
                    Generator.render.set(i + 1, set, response, "exercice-" + (part ? parent_index + "-part-": "") + index);
                });
            }
        },
        set: function(index, set, response, exercice_id) {
            let set_id = exercice_id + "-set-" + index;
            $("#" + exercice_id + "-sets")
                .append($("<tr></tr>")
                    .attr("id", set_id)
                    .addClass("border-bottom-0 border-top")
                    .append($("<td></td>")
                        .attr("id", set_id + "-index")
                        .addClass("align-middle text-center text-body px-0 border-bottom-0 border-end set-index")
                        .text(index)
                    )
                    .append($("<td></td>")
                        .addClass("border-bottom-0 px-0")
                        .append($("<table></table>")
                            .addClass("table mb-0")
                            .append($("<tbody></tbody>")
                                .attr("id", set_id + "-parts")
                            )
                        )        
                    )
                )
            ;
            $.each(set, function(i, set_part_id) {
                let set_part = response[set_part_id];
                Generator.render.set_part(i + 1, set_part, set_id);
            });
        },
        set_part: function(index, set_part, set_id) {
            let set_part_id = set_id + "-part-" + index;
            let timer;
            $("#" + set_id + "-parts")
                .append($("<tr></tr>")
                    .attr("id", set_part_id)
                    .append($("<td></td>")
                        .addClass("p-0 border-bottom-0")
                        .append($("<form></form>")
                            .attr("id", set_part.id)
                            .attr("autocomplete", "off")
                            .addClass("d-flex align-items-center")
                            .on("change input", function() {
                                clearTimeout(timer);
                                timer = setTimeout(function() {
                                    if (
                                        $("#" + set_part.id + "-symmetry").val() != set_part.symmetry ||
                                        $("#" + set_part.id + "-repetitions").val() != set_part.repetitions ||
                                        $("#" + set_part.id + "-weight").val() != set_part.weight ||
                                        $("#" + set_part.id + "-concentric").val() != set_part.concentric ||
                                        $("#" + set_part.id + "-isometric").val() != set_part.isometric ||
                                        $("#" + set_part.id + "-eccentric").val() != set_part.eccentric
                                    ) {
                                        $.ajax({
                                            type: "POST",
                                            url: "/session/set/edit",
                                            data: $("#" + set_part.id).serialize().replace("%2C", "."),
                                            success: (response) => {
                                                if ($("#" + set_part.id + "-weight").val().charAt($("#" + set_part.id + "-weight").val().length - 1) === ",") {
                                                    $("#" + set_part.id + "-weight").val($("#" + set_part.id + "-weight").val().slice(0, -1));
                                                    $("#draft").text($("#" + set_part.id + "-weight").val());
                                                    $("#" + set_part.id + "-weight").width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                                    $("#draft").text("");
                                                }
                                                set_part.symmetry = $("#" + set_part.id + "-symmetry").addClass("text-white").val();
                                                set_part.repetitions = $("#" + set_part.id + "-repetitions").addClass("text-white").val();
                                                set_part.weight = $("#" + set_part.id + "-weight").addClass("text-white").val();
                                                set_part.concentric = $("#" + set_part.id + "-concentric").addClass("text-white").val();
                                                set_part.isometric = $("#" + set_part.id + "-isometric").addClass("text-white").val();
                                                set_part.eccentric = $("#" + set_part.id + "-eccentric").addClass("text-white").val();
                                                Calculator.update.objective();
                                            },
                                        });
                                    }
                                }, 500);
                            })
                            .append($("<div></div>")
                                .addClass("col-4 d-flex justify-content-center align-items-center")
                                .append($("<select></select>")
                                    .attr("id", set_part.id + "-symmetry")
                                    .attr("name", "sets[" + set_part.id + "][symmetry]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 input-plaintext text-center text-white" + ($("#athlete-identifier").text() === $("#user-identifier").text() ? " pointer-only": ""))
                                    .append($("<option></option>")
                                        .val("unilateral")
                                        .text(trans(SYMMETRY_UNILATERAL))
                                    )
                                    .append($("<option></option>")
                                        .val("bilateral")
                                        .text(trans(SYMMETRY_BILATERAL))
                                    )
                                    .val(set_part.symmetry)
                                    .on("change", function() {
                                        if ($(this).val() != set_part.symmetry) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                    })
                                )
                            )
                            .append($("<div></div>")
                                .addClass("col-4 d-flex justify-content-center align-items-center")
                                .append($("<input></input>")
                                    .attr("id", set_part.id + "-repetitions")
                                    .attr("name", "sets[" + set_part.id + "][repetitions]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 form-control-plaintext text-white")
                                    .val(set_part.repetitions)
                                    .on("focus", function() {
                                        $(this).select();
                                    })
                                    .on("input", function() {
                                        if ($(this).val() != set_part.repetitions) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 4));
                                        if (!$(this).val().length) {
                                            $(this).val(0)
                                            if ($(this).val() == set_part.repetitions) {
                                                $(this).addClass("text-white");
                                                clearTimeout(timer);
                                            }
                                            $(this).select();
                                        }
                                        $("#draft").text($(this).val());
                                        $(this).width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                        $("#draft").text("");
                                    })
                                )
                                .append($("<div></div>")
                                    .addClass("mx-1")
                                    .text("×")
                                )
                                .append($("<input></input>")
                                    .attr("id", set_part.id + "-weight")
                                    .attr("name", "sets[" + set_part.id + "][weight]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 form-control-plaintext text-white")
                                    .val(String(Math.round(($("#user-unit").text() === "lbs" ? set_part.weight / 0.45359237: set_part.weight) * 100) / 100).replace(".", ","))
                                    .on("focus", function() {
                                        $(this).select();
                                    })
                                    .on("input", function() {
                                        if ($(this).val().replace(",", ".") != set_part.weight) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                        $(this).val($(this).val().replace(".", ","));                                   
                                        $(this).val($(this).val().replace(".", ",").replace(/[^0-9,]/g, ""));
                                        let integer_part = $(this).val().split(",")[0];
                                        let decimal_part = $(this).val().replace(integer_part, "");
                                        let max_length = $(this).val().includes(",") ? integer_part.length + 3: 4;
                                        $(this).val((integer_part + (decimal_part.length ? "," + decimal_part.replace(/[^0-9]/g, ""): "")).substring(0, max_length));
                                        if (!$(this).val().length) {
                                            $(this).val(0)
                                            if ($(this).val() == set_part.weight) {
                                                $(this).addClass("text-white");
                                                clearTimeout(timer);
                                            }
                                            $(this).select();
                                        }
                                        $("#draft").text($(this).val());
                                        $(this).width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                        $("#draft").text("");
                                    })
                                )
                                .append($("<div></div>")
                                    .addClass("ms-1")
                                    .text($("#user-unit").text())
                                )
                            )
                            .append($("<div></div>")
                                .addClass("col-4 d-flex justify-content-center align-items-center")
                                .append($("<input></input>")
                                    .attr("id", set_part.id + "-concentric")
                                    .attr("name", "sets[" + set_part.id + "][concentric]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 form-control-plaintext text-white")
                                    .val(set_part.concentric)
                                    .on("focus", function() {
                                        $(this).select();
                                    })
                                    .on("input", function() {
                                        if ($(this).val() != set_part.concentric) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                                        if (!$(this).val().length || $(this).val() === "0") {
                                            $(this).val(1)
                                            if ($(this).val() == set_part.concentric) {
                                                $(this).addClass("text-white");
                                                clearTimeout(timer);
                                            }
                                            $(this).select();
                                        }
                                        $("#draft").text($(this).val());
                                        $(this).width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                        $("#draft").text("");
                                    })
                                )
                                .append($("<div></div>")
                                    .text("-")
                                )
                                .append($("<input></input>")
                                    .attr("id", set_part.id + "-isometric")
                                    .attr("name", "sets[" + set_part.id + "][isometric]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 form-control-plaintext text-white")
                                    .val(set_part.isometric)
                                    .on("focus", function() {
                                        $(this).select();
                                    })
                                    .on("input", function() {
                                        if ($(this).val() != set_part.isometric) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                                        if (!$(this).val().length || $(this).val() === "0") {
                                            $(this).val(1)
                                            if ($(this).val() == set_part.isometric) {
                                                $(this).addClass("text-white");
                                                clearTimeout(timer);
                                            }
                                            $(this).select();
                                        }
                                        $("#draft").text($(this).val());
                                        $(this).width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                        $("#draft").text("");
                                    })
                                )
                                .append($("<div></div>")
                                    .text("-")
                                )
                                .append($("<input></input>")
                                    .attr("id", set_part.id + "-eccentric")
                                    .attr("name", "sets[" + set_part.id + "][eccentric]")
                                    .prop("disabled", $("#athlete-identifier").text() !== $("#user-identifier").text())
                                    .addClass("p-0 form-control-plaintext text-white")
                                    .val(set_part.eccentric)
                                    .on("focus", function() {
                                        $(this).select();
                                    })
                                    .on("input", function() {
                                        if ($(this).val() != set_part.eccentric) {
                                            $(this).removeClass("text-white");
                                        }
                                        else {
                                            $(this).addClass("text-white");
                                            clearTimeout(timer);
                                        }
                                        $(this).val($(this).val().replace(/[^0-9]/g, "").substring(0, 3));
                                        if (!$(this).val().length || $(this).val() === "0") {
                                            $(this).val(1)
                                            if ($(this).val() == set_part.eccentric) {
                                                $(this).addClass("text-white");
                                                clearTimeout(timer);
                                            }
                                            $(this).select();
                                        }
                                        $("#draft").text($(this).val());
                                        $(this).width($("#draft").width() > 0 ? $("#draft").width(): 0);
                                        $("#draft").text("");
                                    })
                                )
                            )
                        )
                    )
                )
            ;
            SET_SUFFIXES.forEach(suffix => {
                let id = set_part.id + "-" + suffix;
                document.getElementById(id).setAttribute("inputmode", "decimal");
                $("#draft").text($("#" + id).val());
                $("#" + id).width($("#draft").width());
            });
            $("#draft").text("");
        },
        add_form: function() {
            let size = $("#section-selected-exercices").children().length;
            if (size) {
                let sequence = size > 1;
                let title = "";
                let identifier = "";
                if (sequence) {
                    $.each($("#section-selected-exercices").children(), function(index, exercice) {
                        title += $("#" + exercice.id + "-title").text() + " (" + Translator.translate.equipment($("#" + exercice.id + "-equipment").val()) + "), ";
                        identifier += $("#" + exercice.id + "-identifier").val() + "(" + $("#" + exercice.id + "-equipment").val() + ")+";
                    })
                    title = title.slice(0, -2);
                    identifier = identifier.slice(0, -1);
                }
                else {
                    let exercice = $("#section-selected-exercices").children()[0];
                    title = $("#" + exercice.id + "-title").text() + " (" + Translator.translate.equipment($("#" + exercice.id + "-equipment").val()) + ")";
                    identifier += $("#" + exercice.id + "-identifier").val() + "(" + $("#" + exercice.id + "-equipment").val() + ")";
                }
                $("#_add-form")
                    .empty()
                    .append($("<input>")
                        .attr("id", "identifier")
                        .attr("name", "identifier")
                        .attr("hidden", true)
                        .val(identifier)
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
                                        Generator.render.form_set_part(new_set_id, Date.now(), true, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
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
                    Generator.render.form_set_part(new_set_id, Date.now(), false, $("#" + exercice.id + "-id").text(), $("#" + exercice.id + "-equipment").val());
                });
            }
        },
        form_set_part: function(prefix, set_part_id, is_dropping = false
            , exercice_id = null, equipment = null) {
            let form_set_part_id = "_add-" + set_part_id;
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
                                .addClass("form-control text-center input-required")
                                .attr("placeholder", trans(REPETITIONS_LABEL))
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
                                .addClass("form-control text-center input-required")
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
                    .append($("<input>")
                        .attr("id", form_set_part_id + "-exercice")
                        .attr("name", "sets[" + set_part_id + "][exercice]")
                        .attr("hidden", true)
                        .val(exercice_id)
                    )
                    .append($("<input>")
                        .attr("id", form_set_part_id + "-equipment")
                        .attr("name", "sets[" + set_part_id + "][equipment]")
                        .attr("hidden", true)
                        .val(equipment)
                    )
                )
            ;
            SET_SUFFIXES.forEach(suffix => {
                let input = document.getElementById(form_set_part_id + "-" + suffix);
                input.setAttribute("inputmode", "decimal");
            });
        },
        edit_exercice_form: function(id, name, equipments) {
            $("#exercice-form-title").text(trans(MAIN_SESSION_EXERCICE_EDIT_TITLE));
            $("#exercice-form-submit").text(trans(MAIN_SESSION_EXERCICE_EDIT_SUBMIT)).attr("data-action", "click->exercice#edit");
            $("#exercice_id").val(id);
            $("#exercice_name").val(name);
            $.each($("#section-equipments").find('input[type="checkbox"]'), function(i, input) {
                if (equipments.includes(input.value) && input.value) {
                    $(input).prop("checked", true);
                }
            });
            Validator.verify.name($("#exercice_name"), true);
            $("#exercice-form-submit").prop("disabled", false);
        },
        search_output: function(search = null, equipment = null) {
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
                                        .attr("data-bs-target", "#_form_exercice")
                                        .attr("data-bs-toggle", "modal")
                                        .on("click", function() {
                                            Generator.render.edit_exercice_form(id, exercice.name, exercice.equipments);
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
                    .append($("<input></input>")
                        .attr("id", "selected-" + uniqueId + "-identifier")
                        .attr("hidden", true)
                        .val(exercice.id)
                    )
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

export let Timer = {
    start(start, timer_id) {
        start = new Date(start).getTime();
        setInterval(function() {
            let current = Date.now();
            let difference = current - start;
            let seconds = Math.floor(difference / 1000);
            let days = Math.floor(seconds / (86400));
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

export let Notifier = {
    send: {
        success: function(text) {
            notyf.success(text);
        },
        error: function(text) {
            notyf.error(text);
        },
    }
}

export let Calculator = {
    update: {
        objective: function() {
            if ($("#objective").length) {
                let exercices = [];
                $.each($("#section-selected-exercices").children(), function(index, exercice) {
                    let exercice_id = $(exercice).attr("id");
                    exercices[index] = {};
                    exercices[index]['id'] = $("#" + exercice_id + "-id").text();
                    exercices[index]['equipment'] = $("#" + exercice_id + "-equipment").val();
                });
                $.ajax({
                    type: "POST",
                    url: "/session/objective",
                    data: {
                        exercices: exercices,
                    },
                    success: function(response) {
                        $("#objective").attr("hidden", false);
                        $("#objective-body").empty();
                        $.each(response, function(index, exercice) {
                            $("#objective-body")
                                .append($("<article></article>")
                                    .addClass(index === 0 ? "": " mt-2")
                                    .append($("<div></div>")
                                        .addClass("text-white fw-bold")
                                        .text(exercice.name + " (" + Translator.translate.equipment(exercice.equipment) + ")")
                                    )
                                    .append($("<div></div>")
                                        .addClass("px-2")
                                        .append(exercice.objective ? 
                                            $("<div></div>")
                                                .append($("<span></span>")
                                                    .text(trans(OBJECTIVE))
                                                )
                                                .append($("<span></span>")
                                                    .addClass("mx-1")
                                                    .text(":")
                                                )
                                                .append($("<span></span>")
                                                    .addClass("text-white")
                                                    .text(exercice.repetitions)
                                                )
                                                .append($("<span></span>")
                                                    .addClass("mx-1")
                                                    .text("×")
                                                )
                                                .append($("<span></span>")
                                                    .addClass("text-white")
                                                    .text(Math.round(($("#user-unit").text() === "lbs" ? exercice.weight / 0.45359237: exercice.weight)))
                                                )
                                                .append($("<span></span>")
                                                    .addClass("ms-1")
                                                    .text(($("#user-unit").text()))
                                                )
                                                .append($("<span></span>")
                                                    .addClass("ms-1")
                                                    .append($("<span></span>")
                                                        .text("(")
                                                    )
                                                    .append($("<span></span>")
                                                        .addClass("text-white")
                                                        .text(Translator.translate.symmetry(exercice.symmetry))
                                                    )
                                                    .append($("<span></span>")
                                                        .addClass("me-1")
                                                        .text(",")
                                                    )
                                                    .append($("<span></span>")
                                                        .addClass("text-white")
                                                        .text(exercice.concentric)
                                                    )
                                                    .append($("<span></span>")
                                                        .text("-")
                                                    )
                                                    .append($("<span></span>")
                                                        .addClass("text-white")
                                                        .text(exercice.isometric)
                                                    )
                                                    .append($("<span></span>")
                                                        .text("-")
                                                    )
                                                    .append($("<span></span>")
                                                        .addClass("text-white")
                                                        .text(exercice.eccentric)
                                                    )
                                                    .append($("<span></span>")
                                                        .text(")")
                                                    )
                                                ):
                                            $("<div></div>")
                                                .append($("<span></span>")
                                                    .text(trans(NO_DATA))
                                                )
                                        )
                                    )
                                )
                            ;
                        });
                    },
                });
            }
        }
    },
}