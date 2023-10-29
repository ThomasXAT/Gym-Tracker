import { Controller } from "@hotwired/stimulus";
import { 
    Generator,
    Validator,
} from "./common";

export default class extends Controller {
    connect() {
        Generator.render.session($("#session-identifier").text());
        $("#button-choose-exercice").attr("disabled", $("#minimum-message").hasClass("d-none") ? false: true);
        $(document).on("click keyup", function(event) {
            if (!$(event.target).closest($(".set-part")).length) {
                $(".form-tempo").addClass("d-none");
            }
            Validator.verify.session_form("add");
        });
        if ($("#_add").length) {
            Validator.verify.session_form("add");
            $("#button-select-exercice").on("click", function() {
                $("#_exercice_validity").val(0);
            })
        }
    }
    add() {
        $.each($(".add-input-required"), function(index, input) {
            $(input).val($(this).val().replace(",", "."));
        });
        $.ajax({
            type: "POST",
            url: "/session/set/add",
            data: $("#_add-form").serialize(),
            success: (response) => {
                Generator.render.add_form();
                let exercice_index = 0;
                if ($("#exercices").children().length > 0) {
                    exercice_index = parseInt($("#exercices").children().last().attr("id").replace("exercice-", ""));
                }
                if (response.new) {
                    exercice_index++;
                    Generator.render.exercice(exercice_index, response.last, response.sets);
                    $("#exercices").find(":last").remove();
                }
                else {
                    let sequence = response.last.sequence;
                    $.each(sequence ? response.last.exercices: [response.last], function(i, exercice) {
                        let prefix = sequence ? "exercice-" + exercice_index + "-part-" + (i + 1): "exercice-" + exercice_index;
                        let set_index = parseInt($("#" + prefix + "-body").children().last().attr("id").replace(prefix + "-set-", "")) + 1;
                        let set = exercice.sets[exercice.sets.length - 1];
                        Generator.render.set(prefix, set_index, set, response.sets);
                    });
                }
                $("#welcome").attr("hidden", true);
            },
            error: function(xhr, status, error) {
                $("#error").text(error);
            }
        });
    }
    delete() {
        $.ajax({
            type: "POST",
            url: "/session/set/delete",
            data: $("#_edit-form").serialize(),
            success: (response) => {
                
            },
        });
    }
}
