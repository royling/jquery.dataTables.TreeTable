jquery.dataTables.TreeTable
===========================

This is a plugin of jquery.dataTables to integrate jquery.treeTable.

To use this plugin, 
1. Add the feature char 'T' into "sDom" property in the initial settings of jquery.dataTables.
2. Specify initial settings for jquery.treeTable integrated, which is "oTreeTable" property in the initial settings of jquery.dataTables.
For example:
$('#example').dataTable({
  "sDom": "Ttlfr",
  "oTreeTable": {
    "fnPreInit": function(nRow, aData, iDataIndex) {
      // This function will be registerd into "aoRowCallback" of jquery.dataTables, thus it has the same signature as "fnRowCallback"
      // specify "id" & "class" attributes for each row (TR) to enable jquery.treeTable
    },
    "showExpander": true,
    // other options for jquery.treeTable to override the defaults
  },
  // other options here...
});

3. Few APIs (extending jquery.dataTables) are also added to handle treeTable specifically, those are:
  a) isTreeTable()
  b) fnReloadAjaxTreeTable(sNewSource, fnCallback, bStandingDraw)

