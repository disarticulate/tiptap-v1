import { Node } from 'tiptap-v1'
import { splitListItem, liftListItem, sinkListItem } from 'tiptap-commands-v1'

export default class ListItem extends Node {

  get name() {
    return 'list_item'
  }

  get schema() {
    return {
      content: 'paragraph block*',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'li' },
      ],
      toDOM: () => ['li', 0],
    }
  }

  keys({ type }) {
    return {
      Enter: splitListItem(type),
      Tab: sinkListItem(type),
      'Shift-Tab': liftListItem(type),
    }
  }

}
