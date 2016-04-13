(function() {

    tinymce.create('tinymce.plugins.LatexPlugin', {

            /**
             * Initializes the plugin, this will be executed after the plugin has been created.
             * This call is done before the editor instance has finished it's initialization so use the onInit event
             * of the editor instance to intercept that event.
             *
             * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
             * @param {string} url Absolute URL to where the plugin is located.
             */
             init : function(ed, url) {

                    // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('LatexPlugin');
                    ed.addCommand('LatexPlugin', function() {
                        ed.windowManager.open({
                            file : ed.getParam("moodle_plugin_base") + 'glatex/glatex.php',
                            width: 640 + parseInt(ed.getLang('latex.delta_width', 0)),
                            height: 480 + parseInt(ed.getLang('latex.delta_height', 0)),
                            inline : 1
                        }, {
                            plugin_url : url
                        });
                    });

                    // Register button
                    ed.addButton('glatex', {
                        title : 'LaTeX Plugin',
                        cmd : 'LatexPlugin',
                        image : url + '/img/latex.png'
                    });

                    // Node change events
                    ed.onNodeChange.add(function(ed, cm, n) {
                        cm.setActive('glatex', n.nodeName == 'IMG')
                    });

                },

            /**
             * Returns information about the plugin as a name/value array.
             * The current keys are longname, author, authorurl, infourl and version.
             *
             * @return {Object} Name/value array containing information about the plugin.
             */
             getInfo: function() {
                return {
                    longname: 'Latex plugin',
                    author: 'Diego Caponera',
                    authorurl: 'http://www.diegocaponera.com',
                    infourl: 'http://www.diegocaponera.com',
                    version: "1.0"
                }
            }
        });

    // Register plugin
    tinymce.PluginManager.add('glatex', tinymce.plugins.LatexPlugin);
})();