import { Controller } from "@hotwired/stimulus";
import { Notifier } from "./common";
import {
    trans,
    NOTIFIER_MEASUREMENT_DELETE_SUCCESS,
    NOTIFIER_MEASUREMENT_DELETE_ERROR,
} from '../translator';

export default class extends Controller {
    connect() {
        $.each($(".delete-measurement"), function(index, button) {
            let measurement_id = button.id.replace("delete-measurement-", "");
            $(button).on("click", function() {
                $.ajax({
                    type: "POST",
                    url: "/measurement/delete/" + measurement_id,
                    success: () => {
                        if ($("#measurements-body").children().length > 1) {
                            Notifier.send.success(trans(NOTIFIER_MEASUREMENT_DELETE_SUCCESS));
                            $("#measurement-" + measurement_id).remove();
                        }
                        else {
                            localStorage.setItem("flashes", JSON.stringify([{type: "success", message: trans(NOTIFIER_MEASUREMENT_DELETE_SUCCESS)}]));
                            window.location.href = "/@" + $("#athlete-username").text();
                        }
                    },
                    error: () => {
                        Notifier.send.error(trans(NOTIFIER_MEASUREMENT_DELETE_ERROR));
                    }
                });
            });
        });
    }
}
