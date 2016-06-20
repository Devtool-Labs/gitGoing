export const DEBUG_MODE_ON = 'DEBUG_ON';
export const DEBUG_MODE_OFF = 'DEBUG_OFF';

export const on = function() {
  return {
    type: DEBUG_ON
  }
}

export const off = function() {
  return {
    type: DEBUG_OFF
  }
}
