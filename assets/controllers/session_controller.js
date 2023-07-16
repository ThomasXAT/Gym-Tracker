import { Controller } from '@hotwired/stimulus';
import { translations } from "./common";

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
                        $("#session-exercices")
                            .append($("<article></article")
                                .attr("id", "exercice-" + (j + 1))
                                .addClass("px-1 px-md-2")
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
                                                .text("Répts")
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
                        else {
                            let name = "";
                            for (let k = 0; k < exercice.exercices.length; k++) {
                                name += "<span class='fw-bold'>" + exercice.exercices[k].name + "</span>" + " (" + translations[exercice.exercices[k].equipment] + ")";
                                if (k + 1 < exercice.exercices.length) {
                                    name += ", ";
                                }
                            }
                            $("#exercice-" + (j + 1) + "-title").html(name);
                            $.each(exercice.exercices, function (k, part) {
                                $("#exercice-" + (j + 1))
                                    .append($("<article></article")
                                        .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1))
                                        .addClass("px-2 mx-md-3")
                                        .append($("<h6></h6>")
                                            .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-title")
                                            .html("<span class='fw-bold'>" + part.name + "</span>" + " (" + translations[part.equipment] + ")")
                                        )
                                    )
                                ;
                                $("#exercice-" + (j + 1) + "-part-" + (k + 1))
                                    .append($("<table></table>")
                                        .addClass("table table-dark table-striped")
                                        .append($("<thead></thead>")
                                            .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-head")
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
                                                    .text("Répts")
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
                                            .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-body")
                                        )
                                    )
                                ;
                                $.each(part.sets, function (l, set) {
                                    $("#exercice-" + (j + 1) + "-part-" + (k + 1) + "-body")
                                        .append($("<tr></tr>")
                                            .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1))
                                            .append($("<th></th>")
                                                .attr("scope", "row")
                                                .addClass("align-middle text-center")
                                                .append($("<p></p>")
                                                    .addClass("mb-0")
                                                    .text(l + 1)
                                                )
                                            )
                                            .append($("<td></td>")
                                                .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-symmetry")
                                                .addClass("text-center")
                                            )
                                            .append($("<td></td>")
                                                .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-repetitions")
                                                .addClass("text-center")
                                            )
                                            .append($("<td></td>")
                                                .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-weight")
                                                .addClass("text-center")
                                            )
                                            .append($("<td></td>")
                                                .attr("id", "exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-tempo")
                                                .addClass("text-center")
                                            )
                                        )
                                    ;
                                    for (let m = 0; m < set.length; m++) {
                                        $("#exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-symmetry")
                                            .append($("<p></p>")
                                                .addClass("mb-0")
                                                .text(translations[set[m].symmetry])
                                            )
                                            ;
                                        $("#exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-repetitions")
                                            .append($("<p></p>")
                                                .addClass("mb-0")
                                                .text(set[m].repetitions)
                                            )
                                            ;
                                        $("#exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-weight")
                                            .append($("<p></p>")
                                                .addClass("mb-0")
                                                .text(set[m].weight)
                                            )
                                            ;
                                        if (set[m].concentric || set[m].isometric || set[m].eccentric) {
                                            let concentric = set[m].concentric ? set[m].concentric : 0;
                                            let isometric = set[m].isometric ? set[m].isometric : 0;
                                            let eccentric = set[m].eccentric ? set[m].eccentric : 0;
                                            $("#exercice-" + (j + 1) + "-part-" + (k + 1) + "-set-" + (l + 1) + "-tempo")
                                                .append($("<p></p>")
                                                    .addClass("mb-0")
                                                    .text(concentric + ":" + isometric + ":" + eccentric)
                                                )
                                                ;
                                        }
                                    }
                                });
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
