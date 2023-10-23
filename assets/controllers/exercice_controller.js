import { Controller } from "@hotwired/stimulus";
import { 
    Generator,
    Validator,
} from "./common";

export default class extends Controller {
    connect() {
        $("#section-search-input").on("input", function() {
            Generator.render.searchOutput($("#exercice-search").val(), $("#exercice-equipment").val());
        });
        $("#button-select").on("click", function() {
            Generator.render.searchOutput();
        });
        Generator.render.searchOutput();
        $("#exercice-equipment").val("");
        Validator.verify.name($("#exercice_name"), true);
        $("#form-exercice").on("input", function() {
            let name = Validator.verify.name($("#exercice_name"), true);
            let equipments = $('#section-equipments input[type="checkbox"]:checked').length;
            let submit = $("#button-create-exercice");
            name && equipments ? submit.prop("disabled", false) : submit.prop("disabled", true);
        });
    }
    select() {
        $("#_exercice_validity").val(1);
        Generator.render.add_form();
    }
    create() {
        let form = $("#form-exercice");
        $.ajax({
            type: "POST",
            url: "/exercice/create",
            data: form.serialize(),
            success: (response) => {
                Generator.render.searchOutput();
                form.find('input').val('');
                form.find('input[type="checkbox"]').prop('checked', false);
                $("#button-create-exercice").prop("disabled", true)
                Validator.verify.name($("#exercice_name"), true)
            },
        });
    }
}
