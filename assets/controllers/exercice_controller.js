import { Controller } from "@hotwired/stimulus";
import { 
    Generator,
    Validator,
    Calculator,
    Notifier,
} from "./common";
import {
    trans,
    MAIN_SESSION_EXERCICE_CREATE_TITLE,
    NOTIFIER_EXERCICE_SAVE_SUCCESS,
    NOTIFIER_EXERCICE_SAVE_ERROR,
} from '../translator';

export default class extends Controller {
    connect() {
        $("#section-search-input").on("input", function() {
            Generator.render.search_output($("#exercice-search").val(), $("#exercice-equipment").val());
        });
        $("#button-select").on("click", function() {
            Generator.render.search_output();
        });
        Generator.render.search_output();
        $("#exercice-equipment").val("");
        $("#form-exercice, #exercice-form-submit").on("input click keyup", function() {
            let name = Validator.verify.name($("#exercice_name"), true);
            let equipments = $('#section-equipments input[type="checkbox"]:checked').length;
            let submit = $("#exercice-form-submit");
            name && equipments ? submit.prop("disabled", false) : submit.prop("disabled", true);
            if ($("#minimum-message").hasClass("d-none")) {
                $("#minimum-message").removeClass("d-none");
                $("#button-choose-exercice").attr("disabled", true);
                $("#section-selected-exercices").empty();
            }
        });
        $("#button-form-exercice").on("click", function() {
            $("#exercice-form-title").text(trans(MAIN_SESSION_EXERCICE_CREATE_TITLE));
            $("#exercice-form-submit").attr("data-action", "click->exercice#create");
            $("#exercice_name").val($("#exercice-search").val());
            Validator.verify.name($("#exercice_name"), true);
        });
    }
    select() {
        $("#_exercice_validity").val(1);
        Generator.render.add_form();
        Calculator.update.objective();
    }
    create() {
        let form = $("#form-exercice");
        $.ajax({
            type: "POST",
            url: "/exercice/create",
            data: form.serialize(),
            success: (response) => {
                Generator.render.search_output();
                $("#exercice_name").val("");
                form.find('input[type="checkbox"]').prop('checked', false);
                $("#exercice-form-submit").prop("disabled", true)
                Validator.setNeutral($("#exercice_name"));
                Notifier.send.success(trans(NOTIFIER_EXERCICE_SAVE_SUCCESS));
            },
            error: () => {
                Notifier.send.error(trans(NOTIFIER_EXERCICE_SAVE_ERROR));
            }
        });
    }
    edit() {
        let form = $("#form-exercice");
        $.ajax({
            type: "POST",
            url: "/exercice/edit",
            data: form.serialize(),
            success: (response) => {
                Generator.render.search_output();
                $("#exercice_name").val("");
                form.find('input[type="checkbox"]').prop('checked', false);
                $("#exercice-form-submit").prop("disabled", true)
                Validator.setNeutral($("#exercice_name"));
                Notifier.send.success(trans(NOTIFIER_EXERCICE_SAVE_SUCCESS));
            },
            error: () => {
                Notifier.send.error(trans(NOTIFIER_EXERCICE_SAVE_ERROR));
            }
        });
    }
}
