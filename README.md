jquery.dataTables.TreeTable
===========================

This is a plugin of [jquery.dataTables](http://datatables.net) to integrate [jquery.treeTable v2.x](https://github.com/ludo/jquery-treetable/tree/2.3.1). **Not working with the latest jquery-treetable plugin**

If you are still interested, I did create a live example [here](https://jsfiddle.net/royling/zg9q6sjd/), hope this makes things clear.

To use this plugin, check out the first 2 points and make use of the APIs in point 3:
* Add the feature char `'T'` into `"sDom"` property in the initial settings of jquery.dataTables.
* Specify initial settings for jquery.treeTable integrated, which is `"oTreeTable"` property in the initial settings of jquery.dataTables.
For example:

```javascript
    $('#example').dataTable({
        "sDom": "Ttfr",
        "oTreeTable": {
            "fnPreInit": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // This function will be registerd as "aoRowCallback" of jquery.dataTables,
            //  thus it has the same signature as "fnRowCallback".
            // Specify "id" & "class" attributes for each row (TR) required by jquery.treeTable:
            //   for parent rows, add class 'parent';
            //   for children rows, add a class with name of prefix - 'child-of-' and parent id
            },
            "showExpander": true,
            // The other settings to override the default options of jquery.treeTable, e.g. childPrefix, etc.
        },
        // The other settings of jquery.dataTables here...
    });
```

* Few APIs (extending jquery.dataTables) are also added to handle treeTable specifically, those are:
  1. `isTreeTable()`
  2. `fnReloadAjaxTreeTable(sNewSource, fnCallback, bStandingDraw)`

