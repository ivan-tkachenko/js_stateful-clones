'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objects = [];

  for (const action of actions) {
    const object =
      objects.length === 0 ? { ...state } : { ...objects[objects.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(object, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete object[key];
        }
        break;

      case 'clear':
        for (const key in object) {
          delete object[key];
        }
        break;

      default:
    }

    objects.push(object);
  }

  return objects;
}

module.exports = transformStateWithClones;
