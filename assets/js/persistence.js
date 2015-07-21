/* ==========================================================================
   Layer-ul de persistenta.
   Defineste metodele de get, set, put, delete ce interactioneaza cu
   localstorage-ul
   @property {object} persistence, member of THUNDERSTORM.modules
   ========================================================================== */
(function (window, THUNDERSTORM) {
    'use strict';
    var API = {};
    API.moduleName = "persistence";
    
    API.data = {};
    
    API.set = function (options) {
        var data = options.data;
        var sourceName = options.sourcename;

        if (typeof data !== 'object') {
            throw new Error('Arg data {object} nu este definit sau nu este obiect.');
        }

        if (typeof sourceName !== 'string') {
            throw new Error('Arg sourceName {string} nu este definit.');
        }
        window.localStorage.setItem(sourceName, JSON.stringify(data));
        return true;
    };
    
    API.get = function (options) {
        var dataFromLs;
        var id = options.id;
        var source = options.source;

        if (typeof source !== 'string') {
            throw new Error('Sursa obiectului in localstorage lipseste sau nu este in format string.');
        }
        
        dataFromLs = window.localStorage.getItem(source);
        if (dataFromLs === null) {
            throw new Error('Sursa nu a fost gasita in localstorage.');
        } else {
            dataFromLs = JSON.parse(dataFromLs);
            if (typeof id !== 'undefined') {
                dataFromLs = dataFromLs[id - 1];
            }
        }
        return dataFromLs;
    };

    //MIO: Asta, precum si put, delete, trebuie terminate cand ne mai ramane timp.
    API.delete = function () {

    };

    API.put = function () {
      
    };

    THUNDERSTORM.modules[API.moduleName] = API;
}(window, window.THUNDERSTORM));