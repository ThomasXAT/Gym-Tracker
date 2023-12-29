import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
        Validator.verify.title($("#session-title"), true);
        $("#form-new_session").on("input click keyup", function() {
            Validator.verify.title($("#session-title"), true) ?
            $("#session-start").prop("disabled", false) :
            $("#session-start").prop("disabled", true);
        });
    }
}
