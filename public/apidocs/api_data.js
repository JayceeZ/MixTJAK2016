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
    "type": "post",
    "url": "/upload/sound",
    "title": "Upload Sound",
    "name": "PostSound",
    "group": "Sound",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "sound",
            "description": "<p>Sound file</p>"
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
            "field": "response",
            "description": "<p>Url of the uploaded file</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Sound"
  }
] });
