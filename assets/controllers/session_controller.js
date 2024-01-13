import { Controller } from "@hotwired/stimulus";
import { 
    Generator,
    Validator,
    Calculator,
} from "./common";

export default class extends Controller {
    connect() {
        let timer;
        Generator.render.session($("#session-identifier").text());
        $("#button-choose-exercice").attr("disabled", $("#minimum-message").hasClass("d-none") ? false: true);
        $(document).on("click keyup", function(event) {
            if (!$(event.target).closest($(".set-part")).length) {
                $(".form-tempo").addClass("d-none");
            }
            Validator.verify.add_form();
        });
        if ($("#_add").length) {
            Validator.verify.add_form();
            $("#button-select-exercice").on("click", function() {
                $("#_exercice_validity").val(0);
            })
        }
        $(".input-session-title").on("input", function() {
            clearTimeout(timer);
            let title = $(this);
            if (!title.val().length) {
                title.val("Ma séance du " + $("#session-date").text()).select();
            }
            $.each($(".input-session-title"), function(i, input) {
                $(input).val(title.val().substring(0, 64));
                if (title.val() === $("#old-title").val()) {
                    $(input).addClass("text-white");
                }
                else {
                    $(input).removeClass("text-white");
                }
            });
            if (title.val() !== $("#old-title").val()) {
                timer = setTimeout(function() {
                    if (Validator.verify.title(title)) {
                        $.ajax({
                            type: "POST",
                            url: "/session/title/edit",
                            data: $("#form-title").serialize(),
                            success: () => {
                                $("#old-title").val(title.val());
                                $.each($(".input-session-title"), function(i, input) {
                                    $(input).addClass("text-white");
                                });
                            },
                        });
                    }
                }, 500);
            }
        });
        let objective = $('#objective');
        if (objective.length) {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() + $(window).height() === $(document).height()) {
                    objective.fadeOut(150);
                } 
                else {
                    objective.fadeIn(200);
                }
            });
            objective.on("click", function() {
                $(this).fadeOut(150);
            });
        }
    }
    add() {
        $.each($(".input-required"), function(index, input) {
            $(input).val($(this).val().replace(",", "."));
        });
        $.ajax({
            type: "POST",
            url: "/session/set/add",
            data: $("#_add-form").serialize(),
            success: (response) => {
                $("#set-delete").attr("hidden", false)
                let exercice_index = 0;
                if ($("#exercices").children().length > 0) {
                    exercice_index = parseInt($("#exercices").children().last().attr("id").replace("exercice-", ""));
                }
                if (response.new) {
                    exercice_index++;
                    Generator.render.exercice(exercice_index, response.last, response.sets);
                }
                else {
                    let sequence = response.last.sequence;
                    $.each(sequence ? response.last.exercices: [response.last], function(i, exercice) {
                        let exercice_id = sequence ? "exercice-" + exercice_index + "-part-" + (i + 1): "exercice-" + exercice_index;
                        let set_index = parseInt($("#" + exercice_id + "-sets").children().last().attr("id").replace(exercice_id + "-set-", "")) + 1;
                        let set = exercice.sets[exercice.sets.length - 1];
                        Generator.render.set(set_index, set, response.sets, exercice_id);
                    });
                }
                $("#welcome").attr("hidden", true);
                Calculator.update.objective();
                Generator.render.add_form();
            },
        });
    }
    delete() {
        $.ajax({
            type: "POST",
            url: "/session/set/delete",
            success: (response) => {
                $.each(response, function(i, id) {
                    $("#" + id).remove();
                    $("#set-delete").attr("hidden", $("#exercices").children().length ? false: true);
                    $("#welcome").attr("hidden", $("#exercices").children().length ? true: false)
                });
                Calculator.update.objective();
            },
        });
    }
}
