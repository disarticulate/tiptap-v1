import { Node } from 'tiptap-v1'
import { wrappingInputRule, toggleWrap } from 'tiptap-commands-v1'

export default class Blockquote extends Node {

  get name() {
    return 'blockquote'
  }

  get schema() {
    return {
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'blockquote' },
      ],
      toDOM: () => ['blockquote', 0],
    }
  }

  commands({ type }) {
    return () => toggleWrap(type)
  }

  keys({ type }) {
    return {
      'Ctrl->': toggleWrap(type),
    }
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*>\s$/, type),
    ]
  }

}
