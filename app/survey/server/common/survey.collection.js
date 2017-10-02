'use strict';

/*exports.arraymove = function(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
};*/
exports.arraymove = function (arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

exports.mixObject = function(source, target) {
    for(var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
};

exports.swap = function(input, index_A, index_B) {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;

    return input;
};

exports.insertAt = function (arr, index, item ) {
    arr.splice( index, 0, item );
    return arr;
};
