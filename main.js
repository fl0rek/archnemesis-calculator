document.owned = {};
+ function (document, window, undefined) {
    document.owned = {};

    document.safename = function(name) {
        return name
                .replace("-", "")
                .replace(" ", "");
    }

    document.filename = function (monster) {
        return "rsc/" +
            monster
                .replace(" - ", "-")
                .replace(" ", "-")
            + ".png";
    }

    document.update_recipes = function (recipes) {
        $("#recipes").html([]);
        for (var recipe in recipes) {
            var ingredients = recipes[recipe];
            var ingredient_missing = false;
            for (var i = 0; i < ingredients.length; i++) {
                if (!document.owned[ingredients[i]]) {
                    ingredient_missing = true;
                }
            }
            if (!ingredient_missing) {
                console.log(recipe, ":")
                console.log("> ", ingredients);
                var recipe = $("<li>", {
                    html: document.get_recipe(recipe, ingredients)
                });
                console.log(recipe);
                $("#recipes").append(recipe);
            }
        }
    }

    document.get_icon = function (monster) {
        var icon = $("<div>", {
            class: "monster",
            html: [
                $("<img>", {
                    src: document.filename(monster)
                }),
                $("<p>", {
                    text: monster
                })
            ]
        });

        return icon;
    }

    document.get_recipe = function (product, ingredients) {
        var product_icon = document.get_icon(product);
        var ingredients_icon = [];
        for (var i = 0; i < ingredients.length; i++) {
            ingredients_icon.push(document.get_icon(ingredients[i]));
        }

        ingredients_icon.push($("<div>", {
            text: " => "
        }));

        ingredients_icon.push(product_icon);

        return $("<div>", {
            class: "recipe",
            html: ingredients_icon
        });

    }
    document.save_state = function() {
        var state = JSON.stringify(document.owned);
        localStorage.setItem('state', state);
    }

    document.load_state = function() {
        var state_string = localStorage.getItem('state');
        var state = JSON.parse(state_string);
        document.owned = state;
        document.owned_to_display();
        document.update_recipes(document.data.recipes);
    }

    document.owned_to_display = function() {
        $('button.monster:not(.greyed-out)').addClass('greyed-out');
        for (var key in document.owned) {
            if (document.owned[key]) {
                console.log(key);
                var button_id = document.safename(key);
                var button = $("#" + button_id);
                button.removeClass('greyed-out');
                console.log(button);
            }
        }
    }


    var monster_button_click = element => {
        var target = element.currentTarget;
        console.log(element);
        var name = $(target).data("monster");
        var got_monster = !document.owned[name];
        //!$(target).data("present");
        
        $(target).data("present", got_monster);
        console.log(got_monster);


        if (got_monster) {

            $(target).removeClass("greyed-out");
            $(target).removeClass("greyed-out");

            document.owned[name] = true;
        } else {
            $(target).addClass("greyed-out");
            document.owned[name] = false;
        }

        document.update_recipes(document.data.recipes);
        document.save_state()
    };

    var droppable = document.data.droppable;
    droppable.forEach(element => {
        var icon_name = document.filename(element)
        var icon = $("<img>", { src: icon_name });
        var markup_droppable = $("<p>", { text: element });

        var droppable_button = $("<button>", {
            id: document.safename(element),
            class: "monster greyed-out",
            html: [icon, markup_droppable],
            data: {
                present: false,
                monster: element
            },
            click: monster_button_click,
        });
        $('#droppable').append($('<td>', {
            class: 'monster',
            html: droppable_button
        }));
    });

    var craftable = document.data.craftable;
    craftable.forEach(element => {
        var icon_name = document.filename(element);
        var icon = $("<img>", { src: icon_name });
        var markup_craftable = $("<p>", { text: element });

        var craftable_button = $("<button>", {
            id: document.safename(element),
            class: "monster greyed-out",
            html: [icon, markup_craftable],
            data: {
                present: false,
                monster: element
            },
            click: monster_button_click,
        });
        $('#craftable').append($('<td>', {
            class: 'monster',
            html: craftable_button
        }));
    });

    /*
    var maxlen = Math.max(craftable_container.length, droppable_container.length);
    for (let i = 0; i < maxlen; i++) {
        droppable = droppable_container[i];
        craftable = craftable_container[i];

        if (!droppable) {
            droppable = $("<p>");
        }
        if (!craftable) {
            craftable = $("<p>")
        }

        var row = $("<tr>")
            .append(
                $("<td>", { class: "monster" }).append(droppable)
            ).append(
                $("<td>", { class: "monster" }).append(craftable)
            )

        $("table#inventory tbody").append(row);
    }
    */

    document.load_state();
}(document, document.window);
