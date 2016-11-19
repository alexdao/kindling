window.addEvent("domready", function () {
    var settings = new FancySettings("Kindling Settings", "favicon.ico");

    var username = settings.create({
        "tab": i18n.get("about"),
        "group": i18n.get("General"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });

    myButton.addEvent("action", function () {
        alert("You clicked me!");
    });

    settings.align([
        username,
        password
    ]);

});
