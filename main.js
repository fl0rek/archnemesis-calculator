$("#one").text("two");

document.owned = {};

var droppable =
    [
        "Toxic",
        "Chaosweaver",
        "Frostweaver",
        "Permafrost",
        "Hasted",
        "Deadeye",
        "Bombardier",
        "Flameweaver",
        "Incendiary",
        "Arcane Buffer",
        "Echoist",
        "Stormweaver",
        "Dynamo",
        "Bonebreaker",
        "Bloodletter",
        "Steel-infused",
        "Gargantuan",
        "Berserker",
        "Sentinel",
        "Juggernaut",
        "Vampiric",
        "Overcharged",
        "Soul Conduit",
        "Opulent",
        "Malediction",
        "Consecrator",
        "Frenzied"
    ];

var craftable =
    [
        "Heralding Minions",
        "Empowering Minions",
        "Assassin",
        "Trickster",
        "Necromancer",
        "Rejuvenating",
        "Executioner",
        "Hexer",
        "Drought Bringer",
        "Entangler",
        "Temporal Bubble",
        "Treant Horde",
        "Frost Strider",
        "Ice Prison",
        "Soul Eater",
        "Flame Strider",
        "Corpse Detonator",
        "Evocationist",
        "Magma Barrier",
        "Mirror Image",
        "Storm Strider",
        "Mana Siphoner",
        "Corrupter",
        "Invulnerable",
        "Crystal - skinned",
        "Empowered Elements",
        "Effigy",
        "Lunaris - touched",
        "Solaris - touched",
        "Arakaali - touched",
        "Brine King - touched",
        "Tukohama - touched",
        "Abberath - touched",
        "Shakari - touched",
        "Innocence - touched",
        "Kitava - touched",
    ]


var droppable_container = [];
droppable.forEach(element => {
    var icon_name = element.replace(" ", "-") + ".png"
    var icon = $("<img>", { src: "rsc/" + icon_name });
    var markup_droppable = $("<p>", { text: element });
    droppable_container.push($("<button>", {
        class: "monster greyed-out",
        html: [icon, markup_droppable],
        data: {
            present: false,
            monster: element
        }
    }));
});

var craftable_container = [];
craftable.forEach(element => {
    var icon_name = element
        .replace(" - ", "-")
        .replace(" ", "-")
        + ".png";
    var icon = $("<img>", { src: "rsc/" + icon_name });
    var markup_craftable = $("<p>", { text: element });
    craftable_container.push($("<button>", {
        class: "monster greyed-out",
        html: [icon, markup_craftable],
        data: {
            present: false,
            monster: element
        }
    }));
});

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

$("button.monster").click(element => {
    var target = element.currentTarget;
    //console.log(element);
    //$(target).prop("readonly", true);
    var got_monster = !$(target).data("present");
    $(target).data("present", got_monster);
    console.log(got_monster);


    var name = $(target).data("monster");
    if (got_monster) {

        $(target).removeClass("greyed-out");
        $(target).removeClass("greyed-out");

        document.owned[name] = true;
    } else {
        $(target).addClass("greyed-out");
        document.owned[name] = false;
    }
})


var recipes = {
    'Heralding Minions': [
        'Dynamo',
        'Arcane Buffer'
    ],

    'Empowering Minions': [
        'Necromancer', 'Executioner', 'Gargantuan'
    ],

    'Assassin': [
        'Deadeye', 'Vampiric'
    ],

    'Trickster': [
        'Overcharged', 'Assassin', 'Echoist'
    ],

    'Necromancer': [
        'Bombardier', 'Overcharged'
    ],

    'Rejuvenating': [
        'Gargantuan', 'Vampiric'
    ],

    'Executioner': [
        'Frenzied', 'Berserker'
    ],

    'Hexer': [
        'Chaosweaver', 'Echoist'
    ],

    'Drought Bringer': [
        'Malediction', 'Deadeye'
    ],

    'Entangler': [
        'Toxic', 'Bloodletter'
    ],

    'Temporal Bubble': [
        'Juggernaut', 'Hexer', 'Arcane Buffer'
    ],

    'Treant Horde': [
        'Toxic', 'Sentinel', 'Steel-infused'
    ],

    'Frost Strider': [
        'Frostweaver', ' Hasted',
    ],

    'Ice Prison': [
        'Permafrost', ' Sentinel',
    ],

    'Soul Eater': [
        'Soul Conduit', ' Necromancer', ' Gargantuan',
    ],

    'Flame Strider': [
        'Flameweaver', ' Hasted',
    ],

    'Corpse Detonator': [
        'Necromancer', ' Incendiary',
    ],

    'Evocationist': [
        'Flameweaver', ' Frostweaver', ' Stormweaver',
    ],

    'Magma Barrier': [
        'Incendiary', ' Bonebreaker',
    ],

    'Mirror Image': [
        'Echoist', ' Soul Conduit',
    ],

    'Storm Strider': [
        'Stormweaver', ' Hasted',
    ],

    'Mana Siphoner': [
        'Consecrator', ' Dynamo',
    ],

    'Corrupter': [
        'Bloodletter', ' Chaosweaver',
    ],

    'Invulnerable': [
        'Sentinel', ' Juggernaut', ' Consecrator',
    ],

    'Crystal-skinned': [
        'Permafrost', ' Rejuvenating', ' Berserker',
    ],

    'Empowered Elements': [
        'Evocationist', ' Steel-infused', ' Chaosweaver',
    ],

    'Effigy': [
        'Hexer', ' Malediction', ' Corrupter',
    ],

    'Lunaris-touched': [
        'Invulnerable', ' Frost Strider', ' Empowering Minions',
    ],

    'Solaris-touched': [
        'Invulnerable', ' Magma Barrier', ' Empowering Minions',
    ],

    'Arakaali-touched': [
        'Corpse Detonator', ' Entangler', ' Assassin',
    ],

    'Brine King-touched': [
        'Ice Prison', ' Storm Strider', ' Heralding Minions',
    ],

    'Tukohama-touched': [
        'Bonebreaker', ' Executioner', ' Magma Barrier',
    ],

    'Abberath-touched': [
        'Flame Strider', ' Frenzied', ' Rejuvenating',
    ],

    'Shakari-touched': [
        'Entangler', ' Soul Eater', ' Drought Bringer',
    ],

    'Innocence-touched': [
        'Lunaris-touched', ' Solaris-touched', ' Mirror Image', ' Mana Siphoner',
    ],

    'Kitava-touched': [
        'Tukohama-touched', ' Abberath-touched', ' Corrupter', ' Corpse Detonator',
    ]
}


for (var k in recipes) {

    console.log(k, " => ", recipes[k]);
    
}