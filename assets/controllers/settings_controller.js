import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        $("#settings_objective").on("change", function() {
            $("#section-warm-up").attr("hidden", !$(this).prop('checked'));
        });
    }
    update() {
        $.ajax({
            type: "POST",
            url: "/settings/update",
            data: $("#form-settings").serialize(),
            success: (response) => {
                location.reload();
            },
        });
    }
}