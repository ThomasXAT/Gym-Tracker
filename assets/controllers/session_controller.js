import { Controller } from '@hotwired/stimulus';
import { translations } from "./common";

export default class extends Controller {
    display(athlete_id = parseInt($("#athlete-identifier").text()), session_slug = $("#session-slug").text()) {
        $.ajax({
            url: "/api/session?athlete=" + athlete_id + "&slug=" + session_slug,
            type: "GET",
            dataType: "json",
            success: function (response) {
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
                $.each(response, function (i, session) {
                    $.each(session.exercices, function (j, exercice) {
                        $("#session-exercices")
                            .append($("<article></article")
                                .attr("id", "exercice-" + (j + 1))
                                .addClass("px-1")
                                .append($("<h5></h5>")
                                    .attr("id", "exercice-" + (j + 1) + "-title")
                                    .addClass("text-white")
                                )
                            )
                        ;
                        if (!exercice.sequence) {
                            $("#exercice-" + (j + 1) + "-title").html("<span class='fw-bold'>" + exercice.name + "</span>" + " (" + translations[exercice.equipment] + ")");
                            $("#exercice-" + (j + 1))
                                .append($("<table></table>")
                                    .addClass("table table-dark table-striped")
                                    .append($("<thead></thead>")
                                        .attr("id", "exercice-" + (j + 1) + "-head")
                                        .append($("<tr></tr>")
                                            .append($("<th></th>")
                                                .attr("scope", "col")
                                                .addClass("text-center")
                                                .text("#")
                                            )
                                            .append($("<th></th>")
                                                .attr("scope", "col")
                                                .addClass("text-center")
                                                .text("Symétrie")
                                            )
                                            .append($("<th></th>")
                                                .attr("scope", "col")
                                                .addClass("text-center")
                                                .text("Réps")
                                            )
                                            .append($("<th></th>")
                                                .attr("scope", "col")
                                                .addClass("text-center")
                                                .text("Poids")
                                            )
                                            .append($("<th></th>")
                                                .attr("scope", "col")
                                                .addClass("text-center")
                                                .text("Tempo")
                                            )
                                        )
                                    )
                                    .append($("<tbody></tbody>")
                                        .attr("id", "exercice-" + (j + 1) + "-body")
                                    )
                                )
                                ;
                            $.each(exercice.sets, function (k, set) {
                                $("#exercice-" + (j + 1) + "-body")
                                    .append($("<tr></tr>")
                                        .attr("id", "exercice-" + (j + 1) + "-set-" + (k + 1))
                                        .append($("<th></th>")
                                            .attr("scope", "row")
                                            .addClass("align-middle text-center")
                                            .append($("<p></p>")
                                                .addClass("mb-0")
                                                .text(k + 1)
                                            )
                                        )
                                        .append($("<td></td>")
                                            .attr("id", "exercice-" + (j + 1) + "-set-" + (k + 1) + "-symmetry")
                                            .addClass("text-center")
                                        )
                                        .append($("<td></td>")
                                            .attr("id", "exercice-" + (j + 1) + "-set-" + (k + 1) + "-repetitions")
                                            .addClass("text-center")
                                        )
                                        .append($("<td></td>")
                                            .attr("id", "exercice-" + (j + 1) + "-set-" + (k + 1) + "-weight")
                                            .addClass("text-center")
                                        )
                                        .append($("<td></td>")
                                            .attr("id", "exercice-" + (j + 1) + "-set-" + (k + 1) + "-tempo")
                                            .addClass("text-center")
                                        )
                                    )
                                    ;
                                for (let l = 0; l < set.length; l++) {
                                    $("#exercice-" + (j + 1) + "-set-" + (k + 1) + "-symmetry")
                                        .append($("<p></p>")
                                            .addClass("mb-0")
                                            .text(translations[set[l].symmetry])
                                        )
                                        ;
                                    $("#exercice-" + (j + 1) + "-set-" + (k + 1) + "-repetitions")
                                        .append($("<p></p>")
                                            .addClass("mb-0")
                                            .text(set[l].repetitions)
                                        )
                                        ;
                                    $("#exercice-" + (j + 1) + "-set-" + (k + 1) + "-weight")
                                        .append($("<p></p>")
                                            .addClass("mb-0")
                                            .text(set[l].weight)
                                        )
                                        ;
                                    if (set[l].concentric || set[l].isometric || set[l].eccentric) {
                                        let concentric = set[l].concentric ? set[l].concentric : 0;
                                        let isometric = set[l].isometric ? set[l].isometric : 0;
                                        let eccentric = set[l].eccentric ? set[l].eccentric : 0;
                                        $("#exercice-" + (j + 1) + "-set-" + (k + 1) + "-tempo")
                                            .append($("<p></p>")
                                                .addClass("mb-0")
                                                .text(concentric + ":" + isometric + ":" + eccentric)
                                            )
                                            ;
                                    }
                                }
                            });
                        }
                    });
                });
            }
        });
    }
    connect() {
        $("#loading").remove();
        this.display()
    }
}
