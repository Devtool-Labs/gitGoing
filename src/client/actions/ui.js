export const SHOW_BRANCHES = 'SHOW_BRANCHES';
export const SHOW_COMMITS = 'SHOW_COMMITS';
export const SHOW_FILE_STRUCTURE = 'SHOW_FILE_STRUCTURE';
export const UPDATE_EDITOR = 'UPDATE_EDITOR';

export const showBranches = function(display) {
  return {
    type: SHOW_BRANCHES,
    display
  }
}

export const showCommits = function(display) {
  return {
    type: SHOW_COMMITS,
    display
  }
}

export const showFileStructure = function(display, commitSha) {
  return {
    type: SHOW_FILE_STRUCTURE,
    display,
    commitSha
  }
}

export const updateEditor = function(fileContent) {
  return {
    type: UPDATE_EDITOR,
    fileContent
  }
}
