/* eslint-disable import/prefer-default-export */
export const defaultEditorOpts = {
  editorProps: { },
  editable: true,
  autoFocus: null,
  extensions: [],
  content: '',
  topNode: 'doc',
  emptyDocument: {
    type: 'doc',
    content: [{
      type: 'paragraph',
    }],
  },
  useBuiltInExtensions: true,
  disableInputRules: false,
  disablePasteRules: false,
  dropCursor: { },
  enableDropCursor: true,
  enableGapCursor: true,
  parseOptions: { },
  injectCSS: true,
  onInit: () => { },
  onTransaction: () => { },
  onUpdate: () => { },
  onFocus: () => { },
  onBlur: () => { },
  onPaste: () => { },
  onDrop: () => { },
}
export const defaultEditorEvents = [
  'init',
  'transaction',
  'update',
  'focus',
  'blur',
  'paste',
  'drop',
]