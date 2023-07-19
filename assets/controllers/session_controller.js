import { Controller } from '@hotwired/stimulus';
import { translator } from "./common";
import { generator } from "./common";

export default class extends Controller {
    display(athlete_id = parseInt($("#athlete-identifier").text()), session_slug = $("#session-slug").text()) {
        $.ajax({
            url: "/api/session?athlete=" + athlete_id + "&slug=" + session_slug,
            type: "GET",
            dataType: "json",
            success: function (response) {
                $.each(response, function (i, session) {
                    $("#session-muscles")
                        .empty()
                        .append($("<h4></h4>")
                            .text("Muscles sollicités")
                        )
                    ;
                    $("#session-exercices")
                        .empty()
                        .append($("<h4></h4>")
                            .text("Exercices")
                        )
                    ;
                    $.each(session.exercices, function (j, exercice) {
                        let exercice_index = j + 1;
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
                        if (!exercice.sequence) {
                            let name = "<span class='fw-bold'>" + exercice.name + "</span>" + " <span>(" + translator.translate(exercice.equipment) + ")</span>";
                            $("#exercice-" + exercice_index + "-title").html(name);
                            generator.displayExerciceTable(exercice_id, exercice)
                        }
                        else {
                            let name = "";
                            for (let k = 0; k < exercice.exercices.length; k++) {
                                name += "<span class='fw-bold'>" + exercice.exercices[k].name + "</span>" + " <span>(" + translator.translate(exercice.exercices[k].equipment) + ")</span>";
                                if (k + 1 < exercice.exercices.length) {
                                    name += "<span class='text-body'>, </span>";
                                }
                            }
                            $("#exercice-" + exercice_index + "-title").html(name);
                            $.each(exercice.exercices, function (k, exercice_part) {
                                let exercice_part_index = k + 1;
                                let exercice_part_id = exercice_id + "-part-" + exercice_part_index;
                                let exercice_part_name = "<span class='fw-bold'>" + exercice_part.name + "</span>" + " <span>(" + translator.translate(exercice_part.equipment) + ")</span>";
                                $("#exercice-" + exercice_index)
                                    .append($("<article></article")
                                        .attr("id", exercice_part_id)
                                        .addClass("px-2 mx-md-3")
                                        .append($("<h6></h6>")
                                            .attr("id", exercice_part_id + "-title")
                                            .html(exercice_part_name)
                                        )
                                    )
                                ;
                                generator.displayExerciceTable(exercice_part_id, exercice_part)
                            });
                        }
                    });
                    $("#session-exercices").find(":last").remove();
                });
            }
        });
    }
    connect() {
        $("#loading").remove();
        this.display();
    }
}
