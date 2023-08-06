import { Controller } from "@hotwired/stimulus";
import { generator } from "./common";

export default class extends Controller {
    connect() {
        $("#loading").remove();
        generator.display.session($("#session-identifier").text());
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
    add() {
        $.ajax({
            type: "POST",
            url: "/session/add",
            data: $("#_add-form").serialize(),
            success: (response) => {
                
            },
        });
    }
}
