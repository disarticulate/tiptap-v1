import { Doc } from 'tiptap-v1'

export default class CustomDoc extends Doc {

  get schema() {
    return {
      content: 'title block+',
    }
  }

}
