define({ "api": [
  {
    "type": "get",
    "url": "/playlist/:id",
    "title": "Request Playlist",
    "name": "GetPlaylist",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Playlist unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "sounds",
            "description": "<p>Sounds of the Playlist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlist/:id/sounds",
    "title": "Request Playlist Sounds",
    "name": "GetPlaylistSounds",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Playlist unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "response",
            "description": "<p>itself Sounds of the playlist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Playlist"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidocs/main.js",
    "group": "_home_isoard_Projets_MixTJAK2016_server_apidocs_main_js",
    "groupTitle": "_home_isoard_Projets_MixTJAK2016_server_apidocs_main_js",
    "name": ""
  }
] });
