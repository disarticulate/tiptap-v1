import { Node } from 'tiptap-v1'
import TableNodes from './TableNodes'

export default class TableRow extends Node {

  get name() {
    return 'table_row'
  }

  get schema() {
    return TableNodes.table_row
  }

}
