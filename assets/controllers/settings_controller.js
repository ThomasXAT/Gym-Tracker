import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        $
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