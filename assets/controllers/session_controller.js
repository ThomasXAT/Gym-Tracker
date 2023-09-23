import { Controller } from "@hotwired/stimulus";
import { 
    Generator,
    Validator,
    Translator,
} from "./common";

export default class extends Controller {
    connect() {
        Generator.render.session($("#session-identifier").text());
        $("#button-choose").attr("disabled", $("#minimum-message").hasClass("d-none") ? false: true);
        $(document).on("click keyup", function(event) {
            if (!$(event.target).closest($(".set-part")).length) {
                $(".form-tempo").addClass("d-none");
            }
            Validator.verify.form("add");
        });
        if ($("#_exercice").length) {
            $("#section-search-input").on("input", function() {
                Generator.render.searchOutput($("#exercice-search").val(), $("#exercice-equipment").val());
            });
        }
        if ($("#_add").length) {
            Validator.verify.form("add");
            $("#button-select-exercice").on("click", function() {
                $("#_exercice_validity").val(0);
            })
        }
        if ($("#_edit").length) {
            $("#_edit-form").on("input click change", function() {
                Validator.verify.form("edit");
            });
        }
        Generator.render.searchOutput();
        $("#exercice-equipment").val("");
    }
    edit() {
        $.each($(".edit-input-required"), function(index, input) {
            $(input).val($(this).val().replace(",", "."));
        });
        $.ajax({
            type: "POST",
            url: "/session/set/edit",
            data: $("#_edit-form").serialize(),
            success: (response) => {
                $.each(response["sets"], function(id, set) {
                    $("#" + id + "-symmetry").text(Translator.translate.symmetry(set.symmetry));
                    $("#" + id + "-repetitions").text(set.repetitions ? set.repetitions: 0);
                    $("#" + id + "-weight").text(String(set.weight ? set.weight.replace(".", ","): 0));
                    Generator.render.tempo(id, set.concentric, set.isometric, set.eccentric);
                });
            },
        });
    }
    choose() {
        $("#_exercice_validity").val(1);
        Generator.render.add_form();
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
                if ($("#session-exercices").children().length > 0) {
                    exercice_index = parseInt($("#session-exercices").children().last().attr("id").replace("exercice-", ""));
                }
                if (response.new) {
                    exercice_index++;
                    Generator.render.exercice(exercice_index, response.last, response.sets);
                    $("#session-exercices").find(":last").remove();
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
                let sets = $("#_edit-form").children().slice(1);
                let splitted_first_set_id = sets.first().attr("id").replace("_edit-", "").split("-");
                let exercice_id = splitted_first_set_id[0] + "-" + splitted_first_set_id[1];
                let exercice = $("#" + exercice_id);
                let sequence = splitted_first_set_id.length === 6 ? true: false;
                $.each(sets, function(i, set) {
                    let set_id = set.id.replace("_edit-", "");
                    $("#" + set_id).remove();
                });
                let prefix = sequence ? exercice.children().last().attr("id"): exercice_id;
                if (!$("#" + prefix + "-body").children().length) {
                    exercice.remove();
                }
                if ($("#session-exercices").children().length === 0) {
                    $("#welcome").attr("hidden", false);
                }
            },
        });
    }
}
