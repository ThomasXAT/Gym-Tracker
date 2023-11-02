import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
        Validator.verify.title($("#session-title"), true);
        $("#session-title").on("input", function() {
            Validator.verify.title($(this), true) ?
            $("#session-start").prop("disabled", false) :
            $("#session-start").prop("disabled", true);
        });
    }
}
