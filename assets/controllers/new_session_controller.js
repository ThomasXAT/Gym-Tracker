import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        $("#session-title").on("input", function() {
            $("#session-title").val() === "" || $("#session-title").val().length > 64 ?
            $("#session-start").prop("disabled", true) :
            $("#session-start").prop("disabled", false);
        });
    }
}
