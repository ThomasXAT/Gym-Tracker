import { Controller } from "@hotwired/stimulus";
import { generator } from "./common";

export default class extends Controller {
    connect() {
        $("#loading").remove();
        generator.display.session($("#session-identifier").text());
        $("#button-choose").attr("disabled", $("#minimum-message").hasClass("d-none") ? false: true);
        if ($("#_exercice").length) {
            $("#section-search-input").on("input", function() {
                generator.display.searchOutput($("#exercice-search").val(), $("#exercice-equipment").val());
            });
        }
        generator.display.searchOutput();
    }
    edit() {
        $.ajax({
            type: "POST",
            url: "/session/edit",
            data: $("#_edit-form").serialize(),
            success: (response) => {
                $.each(response, function(id, set) {
                    $("#" + id + "-symmetry").text(set.symmetry);
                    $("#" + id + "-repetitions").text(set.repetitions);
                    $("#" + id + "-weight").text(set.weight);
                });
            },
        });
    }
    choose() {
        generator.display.addForm();
    }
    add() {
        $.ajax({
            type: "POST",
            url: "/session/add",
            data: $("#_add-form").serialize(),
            success: (response) => {
                let exercice_index = Math.floor(($("#session-exercices").children().length) / 2);
                if (response.new) {
                    if (exercice_index) {
                        $("#session-exercices").append($("<br>"));
                    }
                    exercice_index++;
                    generator.display.exercice(exercice_index, response.last, response.sets);
                    $("#session-exercices").find(":last").remove();
                }
                else {
                    if (response.last.sequence) {
                        $.each(response.last.exercices, function(i, exercice) {
                            let part_index = i + 1;
                            let prefix = "exercice-" + exercice_index + "-part-" + part_index;
                            let set_index = exercice.sets.length;
                            let set = exercice.sets[set_index - 1];
                            generator.display.set(prefix, set_index, set, response.sets);
                        });
                    }
                    else {
                        let prefix = "exercice-" + exercice_index;
                        let set_index = response.last.sets.length;
                        let set = response.last.sets[set_index - 1];
                        generator.display.set(prefix, set_index, set, response.sets);
                    }
                }
            },
        });
    }
}
