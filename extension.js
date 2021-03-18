const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Meta = imports.gi.Meta;
const Lang = imports.lang;

let activities;
let button;

const RightClickForApps = new Lang.Class({

    Name: 'RightClickForApps',
    Extends: PanelMenu.Button,

    _init() {

        this.parent(0.0, null, true);
        this.box = new St.BoxLayout({ style_class: 'activity-box' });
        this.appButton = new St.Button();

        this.appButton.child = new St.Label({
            text: "Activities",
            y_align: Clutter.ActorAlign.CENTER,
        });

        this.appButton.connect("button-press-event", (actor, event) => {
            if (event.get_button() == 3) {
                appsButtonChecked = true;
            } else {
                appsButtonChecked = false;
            }

            if (Main.overview.visible && appsButtonChecked == Main.overview.viewSelector._showAppsButton.checked) {
                Main.overview.hide();
                return;
            }

            Main.overview.viewSelector._showAppsButton.checked = appsButtonChecked;

            if (!Main.overview.visible) {
                Main.overview.show();
            } else {
                Main.overview.viewSelector._showAppsButtonToggled();
            }
            /*
            if (event.get_button() == 3) {
                if (Main.overview.visible) {
                    Main.overview.hide();
                } else {
                    Main.overview.viewSelector.showApps();
                }
                return;
            } else {
                if (Main.overview.visible) {
                    Main.overview.hide();
                } else {
                    Main.overview.show();
                }
            }*/

        });

        this.box.add_actor(this.appButton);

        this.actor.add_child(this.box);
    },

    destroy() {
        this.parent();
    },


});

function init() {
    activities = Main.panel.statusArea['activities'];
}

function enable() {
    button = new RightClickForApps();
    activities.container.hide();
    Main.panel.addToStatusArea('rightclickforapps', button, 0, 'left');
}

function disable() {
    button.destroy();
    activities.container.show();
}
