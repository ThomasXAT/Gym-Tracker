import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        $.each($(".delete-measurement"), function(index, button) {
            let measurement_id = button.id.replace("delete-measurement-", "");
            $(button).on("click", function() {
                $.ajax({
                    type: "POST",
                    url: "/measurement/delete/" + measurement_id,
                    success: (response) => {
                        if ($("#measurements-body").children().length > 1) {
                            $("#measurement-" + measurement_id).remove();
                        }
                        else {
                            window.location.href = "/@" + $("#athlete-username").text();
                        }
                    },
                });
            });
        });
    }
}
