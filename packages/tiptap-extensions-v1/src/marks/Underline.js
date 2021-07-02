import { Mark } from 'tiptap-v1'
import { toggleMark } from 'tiptap-commands-v1'

export default class Underline extends Mark {

  get name() {
    return 'underline'
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'u',
        },
        {
          style: 'text-decoration',
          getAttrs: value => value === 'underline',
        },
      ],
      toDOM: () => ['u', 0],
    }
  }

  keys({ type }) {
    return {
      'Mod-u': toggleMark(type),
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }

}
