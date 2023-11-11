import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
        $.ajax({
            url: "/api/athlete",
            type: "GET",
            dataType: "json",
            success: function(response) {  
                $("#form-register").on("input click keyup", function() {
                    Validator.verify.register_form(response);
                });
                $("#section-firstname").on("input click keyup", function() {
                    Validator.verify.surname($("#register_surname"), true);
                    Validator.verify.firstname($("#register_firstname"), true);
                });
                $("#section-surname").on("input click keyup", function() {
                    Validator.verify.firstname($("#register_firstname"), true);
                    Validator.verify.surname($("#register_surname"), true);
                });
            }
        });
    }
}